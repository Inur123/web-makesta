<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Peserta;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // IPNU Stats
        $ipnuKegiatan = Kegiatan::where('organisasi', 'ipnu')->count();
        $ipnuPeserta = Peserta::whereHas('kegiatan', function($q) {
            $q->where('organisasi', 'ipnu');
        })->count();
        $ipnuPending = Kegiatan::where('organisasi', 'ipnu')->where('selesai', false)->count();

        // IPPNU Stats
        $ippnuKegiatan = Kegiatan::where('organisasi', 'ippnu')->count();
        $ippnuPeserta = Peserta::whereHas('kegiatan', function($q) {
            $q->where('organisasi', 'ippnu');
        })->count();
        $ippnuPending = Kegiatan::where('organisasi', 'ippnu')->where('selesai', false)->count();

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
                    'pending' => $ipnuPending,
                ],
                'ippnu' => [
                    'kegiatan' => $ippnuKegiatan,
                    'peserta' => $ippnuPeserta,
                    'pending' => $ippnuPending,
                ],
                'total' => [
                    'kegiatan' => $ipnuKegiatan + $ippnuKegiatan,
                    'peserta' => $ipnuPeserta + $ippnuPeserta,
                    'pending' => $ipnuPending + $ippnuPending,
                ]
            ],
            'recentKegiatan' => $recentKegiatan
        ]);
    }
}
