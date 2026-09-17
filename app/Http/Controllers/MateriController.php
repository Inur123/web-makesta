<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Materi;
use Illuminate\Http\Request;

class MateriController extends Controller
{
    public function store(Request $request, $org, Kegiatan $kegiatan)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $maxUrutan = $kegiatan->materi()->max('urutan') ?? 0;

        $kegiatan->materi()->create([
            'nama' => $request->nama,
            'urutan' => $maxUrutan + 1,
        ]);

        return back()->with('success', 'Materi berhasil ditambahkan');
    }

    public function update(Request $request, $org, Materi $materi)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $materi->update([
            'nama' => $request->nama,
        ]);

        return back()->with('success', 'Materi berhasil diperbarui');
    }

    public function destroy($org, Materi $materi)
    {
        $kegiatanId = $materi->kegiatan_id;
        $deletedUrutan = $materi->urutan;

        $materi->delete();

        // Reorder remaining materi
        Materi::where('kegiatan_id', $kegiatanId)
            ->where('urutan', '>', $deletedUrutan)
            ->decrement('urutan');

        return back()->with('success', 'Materi berhasil dihapus');
    }

    public function moveUp($org, Materi $materi)
    {
        if ($materi->urutan > 1) {
            $previousMateri = Materi::where('kegiatan_id', $materi->kegiatan_id)
                ->where('urutan', $materi->urutan - 1)
                ->first();

            if ($previousMateri) {
                $previousMateri->increment('urutan');
                $materi->decrement('urutan');
            }
        }
        return back();
    }

    public function moveDown($org, Materi $materi)
    {
        $maxUrutan = Materi::where('kegiatan_id', $materi->kegiatan_id)->max('urutan');

        if ($materi->urutan < $maxUrutan) {
            $nextMateri = Materi::where('kegiatan_id', $materi->kegiatan_id)
                ->where('urutan', $materi->urutan + 1)
                ->first();

            if ($nextMateri) {
                $nextMateri->decrement('urutan');
                $materi->increment('urutan');
            }
        }
        return back();
    }
}
