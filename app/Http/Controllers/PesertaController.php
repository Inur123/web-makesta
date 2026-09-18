<?php
namespace App\Http\Controllers;

use App\Helpers\NilaiHelper;
use App\Models\Kegiatan;
use App\Models\Peserta;
use App\Models\Nilai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StorePesertaRequest;
use App\Http\Requests\UpdatePesertaRequest;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PesertaController extends Controller
{
    public function create(string $org, Kegiatan $kegiatan): Response
    {
        $kegiatan->load(['materi' => function($q) {
            $q->orderBy('urutan');
        }]);

        return inertia('peserta/create', [
            'org' => $org,
            'kegiatan' => $kegiatan,
        ]);
    }

    public function store(StorePesertaRequest $request, string $org, Kegiatan $kegiatan): RedirectResponse
    {
        DB::transaction(function () use ($request, $kegiatan) {
            $peserta = $kegiatan->peserta()->create([
                'nama' => $request->nama,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'alamat' => $request->alamat,
                'no_hp' => $request->no_hp,
                'sekolah' => $request->sekolah,
            ]);

            if ($request->has('nilai')) {
                foreach ($request->nilai as $materiId => $nilaiValue) {
                    if ($nilaiValue !== null) {
                        $peserta->nilai()->create([
                            'materi_id' => $materiId,
                            'nilai' => $nilaiValue,
                        ]);
                    }
                }
            }
        });

        if ($request->input('simpan_lagi')) {
            return back()->with('success', 'Peserta berhasil disimpan. Silakan tambah lagi.');
        }

        return redirect()->route('kegiatan.show', ['org' => $org, 'kegiatan' => $kegiatan->id])
            ->with('success', 'Peserta dan nilai berhasil disimpan.');
    }

    public function show(string $org, Kegiatan $kegiatan, Peserta $peserta): Response
    {
        $kegiatan->load(['materi' => function($q) {
            $q->orderBy('urutan');
        }]);
        $peserta->load('nilai');

        // Map existing nilai by materi_id
        $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();

        return inertia('peserta/show', [
            'org' => $org,
            'kegiatan' => $kegiatan,
            'peserta' => $peserta,
            'nilaiMap' => (object)$nilaiMap,
        ]);
    }

    public function edit(string $org, Kegiatan $kegiatan, Peserta $peserta): Response
    {
        $kegiatan->load(['materi' => function($q) {
            $q->orderBy('urutan');
        }]);
        $peserta->load('nilai');

        // Map existing nilai by materi_id
        $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();

        return inertia('peserta/edit', [
            'org' => $org,
            'kegiatan' => $kegiatan,
            'peserta' => $peserta,
            'nilaiMap' => (object)$nilaiMap,
        ]);
    }

    public function update(UpdatePesertaRequest $request, string $org, Peserta $peserta): RedirectResponse
    {
        $kegiatan = $peserta->kegiatan;

        DB::transaction(function () use ($request, $peserta) {
            $peserta->update([
                'nama' => $request->nama,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'alamat' => $request->alamat,
                'no_hp' => $request->no_hp,
                'sekolah' => $request->sekolah,
            ]);

            // Sync nilai manually
            if ($request->has('nilai')) {
                foreach ($request->nilai as $materiId => $nilaiValue) {
                    if ($nilaiValue === null || $nilaiValue === '') {
                        $peserta->nilai()->where('materi_id', $materiId)->delete();
                    } else {
                        $peserta->nilai()->updateOrCreate(
                            ['materi_id' => $materiId],
                            ['nilai' => $nilaiValue]
                        );
                    }
                }
            }
        });

        return redirect()->route('kegiatan.show', ['org' => $kegiatan->organisasi, 'kegiatan' => $kegiatan->id])
            ->with('success', 'Data peserta dan nilai berhasil diperbarui.');
    }

    public function destroy(string $org, Peserta $peserta): RedirectResponse
    {
        $peserta->delete();
        return back()->with('success', 'Peserta berhasil dihapus.');
    }
}
