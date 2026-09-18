<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Exports\KegiatanExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\StoreKegiatanRequest;
use App\Http\Requests\UpdateKegiatanRequest;
use App\Services\SertifikatService;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class KegiatanController extends Controller
{
    public function index(Request $request, string $org): Response
    {
        $search = $request->query('search');
        $status = $request->query('status', 'semua');

        $query = Kegiatan::where('organisasi', $org)
            ->withCount('peserta')
            ->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('lokasi', 'like', "%{$search}%");
            });
        }

        if ($status === 'belum') {
            $query->where('selesai', false);
        } elseif ($status === 'selesai') {
            $query->where('selesai', true);
        }

        $kegiatans = $query->paginate(10)->withQueryString();

        return inertia('kegiatan/index', [
            'kegiatans' => $kegiatans,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'org' => $org,
        ]);
    }

    public function create(string $org): Response
    {
        return inertia('kegiatan/create', [
            'org' => $org,
        ]);
    }

    public function store(StoreKegiatanRequest $request, string $org): RedirectResponse
    {
        $data = $request->validated();

        $kegiatan = Kegiatan::create([
            'organisasi' => $org,
            'nama' => $data['nama'],
            'lokasi' => $data['lokasi'],
            'tanggal_teks' => $data['tanggal_teks'],
            'catatan' => $data['catatan'] ?? null,
            'selesai' => false,
        ]);

        if (!empty($data['pj'])) {
            foreach ($data['pj'] as $nama) {
                $kegiatan->petugas()->create(['peran' => 'pj', 'nama' => $nama]);
            }
        }
        if (!empty($data['instruktur'])) {
            foreach ($data['instruktur'] as $nama) {
                $kegiatan->petugas()->create(['peran' => 'instruktur', 'nama' => $nama]);
            }
        }

        return redirect()->route('kegiatan.index', $org)->with('success', 'Kegiatan berhasil ditambahkan');
    }

    public function show(string $org, Kegiatan $kegiatan): Response
    {
        $kegiatan->load(['petugas', 'materi' => function($q) {
            $q->orderBy('urutan');
        }]);

        $peserta = $kegiatan->peserta()->with('nilai')->paginate(10)->withQueryString();

        return inertia('kegiatan/show', [
            'org' => $org,
            'kegiatan' => $kegiatan,
            'pesertaPaginated' => $peserta,
        ]);
    }

    public function edit(string $org, Kegiatan $kegiatan): Response
    {
        $kegiatan->load('petugas');

        return inertia('kegiatan/edit', [
            'org' => $org,
            'kegiatan' => $kegiatan,
        ]);
    }

    public function update(UpdateKegiatanRequest $request, string $org, Kegiatan $kegiatan): RedirectResponse
    {
        $data = $request->validated();

        $kegiatan->update([
            'nama' => $data['nama'],
            'lokasi' => $data['lokasi'],
            'tanggal_teks' => $data['tanggal_teks'],
            'catatan' => $data['catatan'] ?? null,
        ]);

        $kegiatan->petugas()->delete();

        if (!empty($data['pj'])) {
            foreach ($data['pj'] as $nama) {
                $kegiatan->petugas()->create(['peran' => 'pj', 'nama' => $nama]);
            }
        }
        if (!empty($data['instruktur'])) {
            foreach ($data['instruktur'] as $nama) {
                $kegiatan->petugas()->create(['peran' => 'instruktur', 'nama' => $nama]);
            }
        }

        return redirect()->route('kegiatan.show', [$org, $kegiatan->id])->with('success', 'Kegiatan berhasil diperbarui');
    }

    public function destroy(string $org, Kegiatan $kegiatan): RedirectResponse
    {
        $kegiatan->delete();
        return redirect()->route('kegiatan.index', $org)->with('success', 'Kegiatan berhasil dihapus');
    }

    public function toggleStatus(string $org, Kegiatan $kegiatan): RedirectResponse
    {
        $kegiatan->update([
            'selesai' => !$kegiatan->selesai
        ]);

        return back()->with('success', 'Status kegiatan berhasil diubah');
    }

    public function export(string $org, Kegiatan $kegiatan): BinaryFileResponse
    {
        $filename = 'Data_Makesta_' . Str::slug($kegiatan->nama) . '_' . date('Ymd_His') . '.xlsx';
        return Excel::download(new KegiatanExport($kegiatan), $filename);
    }

    public function generateSertifikat(Request $request, string $org, Kegiatan $kegiatan, SertifikatService $service): BinaryFileResponse|RedirectResponse
    {
        $data = $request->validate([
            'no_surat_awal' => 'required|integer',
            'no_surat_akhir' => 'nullable|integer',
            'format_nomor' => 'required|string',
            'tempat' => 'required|string',
            'tgl_m_hari' => 'required|string',
            'tgl_m_bulan' => 'required|string',
            'tgl_m_tahun' => 'required|string',
            'tgl_h_hari' => 'required|string',
            'tgl_h_bulan' => 'required|string',
            'tgl_h_tahun' => 'required|string',
            'nama_ketua' => 'required|string',
            'nia_ketua' => 'required|string',
            'nama_sekretaris' => 'required|string',
            'nia_sekretaris' => 'required|string',
            'header_depan' => 'required|string',
            'header_belakang' => 'required|string',
        ]);

        $isPreview = $request->has('is_preview') && $request->is_preview;

        try {
            $filePath = $service->generate($data, $org, $kegiatan, $isPreview);
            return response()->download($filePath)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
