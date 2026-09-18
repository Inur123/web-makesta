<?php

namespace App\Services;

use App\Models\Kegiatan;
use PhpOffice\PhpWord\TemplateProcessor;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Helpers\NilaiHelper;

class SertifikatService
{

    public function generateBulkIppnu(array $data, Kegiatan $kegiatan, string $templateDepanPath, string $templateBelakangPath, bool $isPreview = false)
    {
        $kegiatan->load(['peserta.nilai', 'materi' => function($q) {
            $q->orderBy('urutan');
        }]);
        
        $pesertaQuery = $kegiatan->peserta();
        if ($isPreview) {
            $pesertaQuery->limit(1);
        } else if (!empty($data['no_surat_akhir'])) {
            $limit = ($data['no_surat_akhir'] - $data['no_surat_awal']) + 1;
            if ($limit > 0) {
                $pesertaQuery->limit($limit);
            }
        }
        
        $pesertaList = $pesertaQuery->get();

        if ($pesertaList->isEmpty()) {
            throw new \Exception('Belum ada peserta di kegiatan ini.');
        }

        if (!is_dir(storage_path('app/temp'))) {
            mkdir(storage_path('app/temp'), 0755, true);
        }

        $replacementsDepan = [];
        $replacementsBelakang = [];
        $currentNo = (int) $data['no_surat_awal'];
        $materis = $kegiatan->materi;

        foreach ($pesertaList as $peserta) {
            $noSuratStr = str_pad($currentNo, 3, '0', STR_PAD_LEFT) . $data['format_nomor'];
            $totalNilai = $peserta->nilai->sum('nilai');
            $rataRata = $peserta->nilai->avg('nilai');
            $predikat = $rataRata !== null ? NilaiHelper::indeks(round($rataRata)) : '-';

            // Depan vars
            $replacementsDepan[] = [
                'no_surat' => htmlspecialchars($noSuratStr),
                'nama_peserta' => htmlspecialchars($peserta->nama),
                'tempat' => htmlspecialchars($peserta->tempat_lahir ?? '-'),
                'tgl_lahir' => htmlspecialchars($peserta->tanggal_lahir ? Carbon::parse($peserta->tanggal_lahir)->translatedFormat('d F Y') : '-'),
                'alamat' => htmlspecialchars($peserta->alamat ?? '-'),
                'predikat' => htmlspecialchars($predikat),
            ];

            // Belakang vars
            $belakangItem = [
                'no_surat' => htmlspecialchars($noSuratStr),
                'jumlah_nilai' => $totalNilai > 0 ? htmlspecialchars((string)$totalNilai) : '-',
                'rata_rata_nilai' => $rataRata !== null ? htmlspecialchars((string)round($rataRata, 2)) : '-',
                'predikat' => htmlspecialchars($predikat),
            ];

            // Build dynamic material rows mapping
            $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();
            
            // Limit to max 10 to avoid excessive variables, assume typical 6-10 materi
            $maxMateri = 15; 
            for ($j = 1; $j <= $maxMateri; $j++) {
                if ($j <= $materis->count()) {
                    $materi = $materis[$j - 1];
                    $val = $nilaiMap[$materi->id] ?? null;
                    $indeks = $val !== null ? NilaiHelper::indeks($val) : '-';
                    $nilaiAngka = $val !== null ? $val : '-';
                    
                    $belakangItem['no_' . $j] = htmlspecialchars((string)$j);
                    $belakangItem['materi_' . $j] = htmlspecialchars($materi->nama);
                    $belakangItem['indeks_' . $j] = htmlspecialchars($indeks);
                    $belakangItem['nilai_' . $j] = htmlspecialchars((string)$nilaiAngka);
                } else {
                    $belakangItem['no_' . $j] = '';
                    $belakangItem['materi_' . $j] = '';
                    $belakangItem['indeks_' . $j] = '';
                    $belakangItem['nilai_' . $j] = '';
                }
            }
            
            $replacementsBelakang[] = $belakangItem;
            $currentNo++;
        }

        // Process Depan (Safely using manual index replacement instead of array replacement)
        $tpDepan = new TemplateProcessor($templateDepanPath);
        $tpDepan->cloneBlock('sertifikat', $pesertaList->count(), true, true);
        
        $i = 1;
        foreach ($pesertaList as $peserta) {
            $noSuratStr = str_pad((int)$data['no_surat_awal'] + $i - 1, 3, '0', STR_PAD_LEFT) . $data['format_nomor'];
            $rataRata = $peserta->nilai->avg('nilai');
            $predikat = $rataRata !== null ? NilaiHelper::indeks(round($rataRata)) : '-';
            
            $tpDepan->setValue('no_surat#' . $i, htmlspecialchars($noSuratStr));
            $tpDepan->setValue('nama_peserta#' . $i, htmlspecialchars($peserta->nama));
            $tpDepan->setValue('tempat#' . $i, htmlspecialchars($peserta->tempat_lahir ?? '-'));
            $tpDepan->setValue('tgl_lahir#' . $i, htmlspecialchars($peserta->tanggal_lahir ? Carbon::parse($peserta->tanggal_lahir)->translatedFormat('d F Y') : '-'));
            $tpDepan->setValue('alamat#' . $i, htmlspecialchars($peserta->alamat ?? '-'));
            $tpDepan->setValue('predikat#' . $i, htmlspecialchars($predikat));
            $i++;
        }
        
        $docDepanName = 'Sertif_' . \Illuminate\Support\Str::slug($kegiatan->nama) . '_Depan.docx';
        $outDepanPath = storage_path('app/temp/' . $docDepanName);
        $tpDepan->saveAs($outDepanPath);

        
        // Process Belakang (Advanced Nested Cloning)
        $tpBelakang = new TemplateProcessor($templateBelakangPath);
        $tpBelakang->cloneBlock('sertifikat', $pesertaList->count(), true, true);

        $i = 1;
        foreach ($pesertaList as $peserta) {
            $totalNilai = $peserta->nilai->sum('nilai');
            $rataRata = $peserta->nilai->avg('nilai');
            $predikat = $rataRata !== null ? NilaiHelper::indeks(round($rataRata)) : '-';
            $noSuratStr = str_pad((int)$data['no_surat_awal'] + $i - 1, 3, '0', STR_PAD_LEFT) . $data['format_nomor'];

            // Set global stats for this block
            $tpBelakang->setValue('no_surat#' . $i, htmlspecialchars($noSuratStr));
            $tpBelakang->setValue('jumlah_nilai#' . $i, $totalNilai > 0 ? htmlspecialchars((string)$totalNilai) : '-');
            $tpBelakang->setValue('rata_rata_nilai#' . $i, $rataRata !== null ? htmlspecialchars((string)round($rataRata, 2)) : '-');
            $tpBelakang->setValue('predikat#' . $i, htmlspecialchars($predikat));

            // Dynamic Rows for this specific block!
            if ($materis->count() > 0) {
                // cloneRow searches for the exact macro string. 
                // Since cloneBlock appended '#' . $i to 'materi', we clone 'materi#$i'
                $tpBelakang->cloneRow('materi#' . $i, $materis->count());
                
                $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();
                $rowIdx = 1;
                foreach ($materis as $materi) {
                    $val = $nilaiMap[$materi->id] ?? null;
                    $nilaiAngka = $val !== null ? $val : '-';
                    $indeks = $val !== null ? NilaiHelper::indeks($val) : '-';
                    
                    // The variables now have the block suffix AND the row suffix: no#{block}#{row}
                    $tpBelakang->setValue('no#' . $i . '#' . $rowIdx, htmlspecialchars((string)$rowIdx));
                    $tpBelakang->setValue('materi#' . $i . '#' . $rowIdx, htmlspecialchars($materi->nama));
                    $tpBelakang->setValue('indeks#' . $i . '#' . $rowIdx, htmlspecialchars($indeks));
                    $tpBelakang->setValue('nilai#' . $i . '#' . $rowIdx, htmlspecialchars((string)$nilaiAngka));
                    $rowIdx++;
                }
            }
            $i++;
        }
        
        $docBelakangName = 'Sertif_' . \Illuminate\Support\Str::slug($kegiatan->nama) . '_Belakang.docx';
        $outBelakangPath = storage_path('app/temp/' . $docBelakangName);
        $tpBelakang->saveAs($outBelakangPath);


        // Zip them
        $zipFileName = 'Sertifikat_IPPNU_' . \Illuminate\Support\Str::slug($kegiatan->nama) . '_' . date('YmdHis') . '.zip';
        $zipPath = storage_path('app/temp/' . $zipFileName);
        
        $zip = new \ZipArchive();
        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            $zip->addFile($outDepanPath, $docDepanName);
            $zip->addFile($outBelakangPath, $docBelakangName);
            $zip->close();
            
            // File template asli sengaja disimpan (tidak dihapus)
            // @unlink($templateDepanPath);
            // @unlink($templateBelakangPath);
            @unlink($outDepanPath);
            @unlink($outBelakangPath);
            
            return response()->download($zipPath)->deleteFileAfterSend(true);
        }

        throw new \Exception('Gagal membuat file ZIP sertifikat IPPNU.');
    }

    public function generate(array $data, string $org, Kegiatan $kegiatan, bool $isPreview = false)
    {
        $templatePath = storage_path('app/templates/template-sertif-makesta-' . $org . '.docx');
        
        if (!file_exists($templatePath)) {
            throw new \Exception('Template sertifikat (' . basename($templatePath) . ') belum ditaruh di folder storage/app/templates/.');
        }

        $kegiatan->load(['peserta.nilai', 'materi' => function($q) {
            $q->orderBy('urutan');
        }]);
        
        $pesertaQuery = $kegiatan->peserta();
        
        $limit = null;
        if (!empty($data['no_surat_akhir'])) {
            $limit = ($data['no_surat_akhir'] - $data['no_surat_awal']) + 1;
            if ($limit > 0) {
                $pesertaQuery->limit($limit);
            }
        }
        
        $pesertaList = $pesertaQuery->get();

        if ($pesertaList->isEmpty()) {
            throw new \Exception('Belum ada peserta di kegiatan ini.');
        }

        if (!is_dir(storage_path('app/temp'))) {
            mkdir(storage_path('app/temp'), 0755, true);
        }

        if ($isPreview) {
            return $this->preview($data, $pesertaList->first(), $kegiatan, $templatePath);
        }

        return $this->generateZip($data, $pesertaList, $kegiatan, $templatePath);
    }

    private function processTemplate(TemplateProcessor $templateProcessor, array $data, $peserta, Kegiatan $kegiatan, int $currentNo)
    {
        $noSuratStr = str_pad($currentNo, 3, '0', STR_PAD_LEFT) . $data['format_nomor'];
        $templateProcessor->setValue('no_surat', $noSuratStr);
        $templateProcessor->setValue('nama_peserta', $peserta->nama);
        $templateProcessor->setValue('tempat', $peserta->tempat_lahir ?? '-');
        $templateProcessor->setValue('tgl_lahir', $peserta->tanggal_lahir ? Carbon::parse($peserta->tanggal_lahir)->translatedFormat('d F Y') : '-');
        $templateProcessor->setValue('tempat_cetak', $data['tempat']);
        
        $tglMasehi = $data['tgl_m_hari'] . ' ' . $data['tgl_m_bulan'] . ' ' . $data['tgl_m_tahun'];
        $tglHijriah = $data['tgl_h_hari'] . ' ' . $data['tgl_h_bulan'] . ' ' . $data['tgl_h_tahun'];
        
        $templateProcessor->setValue('tgl_masehi', $tglMasehi);
        $templateProcessor->setValue('tgl_hijriah', $tglHijriah);
        
        $templateProcessor->setValue('tgl_m_hari', $data['tgl_m_hari']);
        $templateProcessor->setValue('tgl_m_bulan', $data['tgl_m_bulan']);
        $templateProcessor->setValue('tgl_m_tahun', $data['tgl_m_tahun']);
        $templateProcessor->setValue('tgl_h_hari', $data['tgl_h_hari']);
        $templateProcessor->setValue('tgl_h_bulan', $data['tgl_h_bulan']);
        $templateProcessor->setValue('tgl_h_tahun', $data['tgl_h_tahun']);
                $templateProcessor->setValue('nama_ketua', $data['nama_ketua'] ?? '');
        
        $niaKetua = trim($data['nia_ketua'] ?? '');
        if ($niaKetua && !preg_match('/^NIA[\.\s]*/i', $niaKetua)) {
            $niaKetua = 'NIA. ' . $niaKetua;
        }
        $templateProcessor->setValue('nia_ketua', $niaKetua);
        
        $templateProcessor->setValue('nama_sekretaris', $data['nama_sekretaris'] ?? '');
        
        $niaSekretaris = trim($data['nia_sekretaris'] ?? '');
        if ($niaSekretaris && !preg_match('/^NIA[\.\s]*/i', $niaSekretaris)) {
            $niaSekretaris = 'NIA. ' . $niaSekretaris;
        }
        $templateProcessor->setValue('nia_sekretaris', $niaSekretaris);

        // IPPNU Signatures
        $templateProcessor->setValue('jabatan_kiri', $data['jabatan_kiri'] ?? '');
        $templateProcessor->setValue('nama_kiri', $data['nama_kiri'] ?? '');
        $templateProcessor->setValue('nia_kiri', $data['nia_kiri'] ?? '');
        
        $templateProcessor->setValue('jabatan_tengah', $data['jabatan_tengah'] ?? '');
        $templateProcessor->setValue('nama_tengah', $data['nama_tengah'] ?? '');
        $templateProcessor->setValue('nia_tengah', $data['nia_tengah'] ?? '');
        
        $templateProcessor->setValue('jabatan_kanan', $data['jabatan_kanan'] ?? '');
        $templateProcessor->setValue('nama_kanan', $data['nama_kanan'] ?? '');
        $templateProcessor->setValue('nia_kanan', $data['nia_kanan'] ?? '');
        
        $templateProcessor->setValue('nama_pelatih', $data['nama_pelatih'] ?? '');
        $templateProcessor->setValue('nia_pelatih', $data['nia_pelatih'] ?? '');
        
        $headerDepan = str_replace("\n", '</w:t><w:br/><w:t>', htmlspecialchars($data['header_depan']));
        $templateProcessor->setValue('header_depan', $headerDepan);
        
        $headerBelakang = str_replace("\n", '</w:t><w:br/><w:t>', htmlspecialchars($data['header_belakang']));
        $templateProcessor->setValue('header_belakang', $headerBelakang);

                $totalNilai = $peserta->nilai->sum('nilai');
        $rataRata = $peserta->nilai->avg('nilai');
        $predikat = $rataRata !== null ? NilaiHelper::indeks(round($rataRata)) : '-';
        
        $templateProcessor->setValue('jumlah_nilai', $totalNilai > 0 ? $totalNilai : '-');
        $templateProcessor->setValue('rata_rata_nilai', $rataRata !== null ? round($rataRata, 2) : '-');
        $templateProcessor->setValue('predikat', $predikat);

        $materis = $kegiatan->materi;
        if ($materis->count() > 0) {
            $templateProcessor->cloneRow('materi', $materis->count());
            $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();
            $i = 1;
            foreach ($materis as $materi) {
                $val = $nilaiMap[$materi->id] ?? null;
                $indeks = $val !== null ? NilaiHelper::indeks($val) : '-';
                $nilaiAngka = $val !== null ? $val : '-';
                $templateProcessor->setValue('no#' . $i, $i);
                $templateProcessor->setValue('materi#' . $i, htmlspecialchars($materi->nama));
                $templateProcessor->setValue('indeks#' . $i, $indeks);
                $templateProcessor->setValue('nilai#' . $i, $nilaiAngka);
                $i++;
            }
        }
        return $templateProcessor;
    }

    private function preview(array $data, $peserta, Kegiatan $kegiatan, string $templatePath)
    {
        $templateProcessor = new TemplateProcessor($templatePath);
        $templateProcessor = $this->processTemplate($templateProcessor, $data, $peserta, $kegiatan, (int) $data['no_surat_awal']);
        
        $tempDocPath = storage_path('app/temp/Preview_' . Str::slug($peserta->nama) . '.docx');
        $templateProcessor->saveAs($tempDocPath);
        
        return $tempDocPath;
    }

    private function generateZip(array $data, $pesertaList, Kegiatan $kegiatan, string $templatePath)
    {
        $zipFileName = 'Sertifikat_' . Str::slug($kegiatan->nama) . '_' . date('YmdHis') . '.zip';
        $zipPath = storage_path('app/temp/' . $zipFileName);
        
        $zip = new \ZipArchive();
        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            $currentNo = (int) $data['no_surat_awal'];
            
            foreach ($pesertaList as $peserta) {
                $templateProcessor = new TemplateProcessor($templatePath);
                $templateProcessor = $this->processTemplate($templateProcessor, $data, $peserta, $kegiatan, $currentNo);
                
                $fileName = str_pad($currentNo, 3, '0', STR_PAD_LEFT) . '_' . Str::slug($peserta->nama) . '.docx';
                $tempDocPath = storage_path('app/temp/' . $fileName);
                $templateProcessor->saveAs($tempDocPath);
                
                $zip->addFile($tempDocPath, $fileName);
                $currentNo++;
            }
            $zip->close();
            
            // Cleanup individual docs
            foreach ($pesertaList as $i => $peserta) {
                $noStr = str_pad((int)$data['no_surat_awal'] + $i, 3, '0', STR_PAD_LEFT);
                $fileName = $noStr . '_' . Str::slug($peserta->nama) . '.docx';
                @unlink(storage_path('app/temp/' . $fileName));
            }
            
            return $zipPath;
        }

        throw new \Exception('Gagal membuat file ZIP sertifikat.');
    }
}
