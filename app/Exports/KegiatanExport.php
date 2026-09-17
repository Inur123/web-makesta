<?php
namespace App\Exports;

use App\Models\Kegiatan;
use App\Helpers\NilaiHelper;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class KegiatanExport implements FromView, ShouldAutoSize
{
    protected $kegiatan;

    public function __construct(Kegiatan $kegiatan)
    {
        $this->kegiatan = $kegiatan;
        // Eager load everything needed
        $this->kegiatan->load(['materi' => function($q) {
            $q->orderBy('urutan');
        }, 'peserta.nilai', 'petugas']);
    }

    public function view(): View
    {
        return view('exports.kegiatan', [
            'kegiatan' => $this->kegiatan
        ]);
    }
}
