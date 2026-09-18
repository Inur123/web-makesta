<?php

namespace App\Services;

use App\Models\Kegiatan;
use PhpOffice\PhpWord\TemplateProcessor;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Helpers\NilaiHelper;

class SertifikatService
{
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
        $templateProcessor->setValue('nama_ketua', $data['nama_ketua']);
        
        $niaKetua = trim($data['nia_ketua']);
        if (!preg_match('/^NIA[\.\s]*/i', $niaKetua)) {
            $niaKetua = 'NIA. ' . $niaKetua;
        }
        $templateProcessor->setValue('nia_ketua', $niaKetua);
        
        $templateProcessor->setValue('nama_sekretaris', $data['nama_sekretaris']);
        
        $niaSekretaris = trim($data['nia_sekretaris']);
        if (!preg_match('/^NIA[\.\s]*/i', $niaSekretaris)) {
            $niaSekretaris = 'NIA. ' . $niaSekretaris;
        }
        $templateProcessor->setValue('nia_sekretaris', $niaSekretaris);
        
        $headerDepan = str_replace("\n", '</w:t><w:br/><w:t>', htmlspecialchars($data['header_depan']));
        $templateProcessor->setValue('header_depan', $headerDepan);
        
        $headerBelakang = str_replace("\n", '</w:t><w:br/><w:t>', htmlspecialchars($data['header_belakang']));
        $templateProcessor->setValue('header_belakang', $headerBelakang);

        $rataRata = $peserta->nilai->avg('nilai');
        $predikat = $rataRata !== null ? NilaiHelper::indeks(round($rataRata)) : '-';
        $templateProcessor->setValue('predikat', $predikat);

        $materis = $kegiatan->materi;
        if ($materis->count() > 0) {
            $templateProcessor->cloneRow('materi', $materis->count());
            $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();
            $i = 1;
            foreach ($materis as $materi) {
                $val = $nilaiMap[$materi->id] ?? null;
                $indeks = $val !== null ? NilaiHelper::indeks($val) : '-';
                $templateProcessor->setValue('no#' . $i, $i);
                $templateProcessor->setValue('materi#' . $i, htmlspecialchars($materi->nama));
                $templateProcessor->setValue('indeks#' . $i, $indeks);
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
