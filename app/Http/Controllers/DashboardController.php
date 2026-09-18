<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Peserta;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Optimize querying with conditional aggregation and GROUP BY
        $kegiatanStats = Kegiatan::selectRaw('organisasi, COUNT(*) as total, SUM(CASE WHEN selesai = false THEN 1 ELSE 0 END) as pending')
            ->groupBy('organisasi')
            ->get()
            ->keyBy('organisasi');

        $pesertaStats = Peserta::selectRaw('kegiatan.organisasi, COUNT(peserta.id) as total')
            ->join('kegiatan', 'peserta.kegiatan_id', '=', 'kegiatan.id')
            ->groupBy('kegiatan.organisasi')
            ->get()
            ->keyBy('organisasi');

        $ipnuKegiatan = $kegiatanStats['ipnu']->total ?? 0;
        $ipnuPending = $kegiatanStats['ipnu']->pending ?? 0;
        $ipnuPeserta = $pesertaStats['ipnu']->total ?? 0;

        $ippnuKegiatan = $kegiatanStats['ippnu']->total ?? 0;
        $ippnuPending = $kegiatanStats['ippnu']->pending ?? 0;
        $ippnuPeserta = $pesertaStats['ippnu']->total ?? 0;

        // 5 Kegiatan Terbaru
        $recentKegiatan = Kegiatan::withCount('peserta')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return inertia('dashboard', [
            'stats' => [
                'ipnu' => [
                    'kegiatan' => $ipnuKegiatan,
                    'peserta' => $ipnuPeserta,
                    'pending' => (int) $ipnuPending,
                ],
                'ippnu' => [
                    'kegiatan' => $ippnuKegiatan,
                    'peserta' => $ippnuPeserta,
                    'pending' => (int) $ippnuPending,
                ],
                'total' => [
                    'kegiatan' => $ipnuKegiatan + $ippnuKegiatan,
                    'peserta' => $ipnuPeserta + $ippnuPeserta,
                    'pending' => (int) ($ipnuPending + $ippnuPending),
                ]
            ],
            'recentKegiatan' => $recentKegiatan
        ]);
    }
}
