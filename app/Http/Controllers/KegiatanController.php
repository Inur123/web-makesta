<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use App\Exports\KegiatanExport;
use Maatwebsite\Excel\Facades\Excel;

class KegiatanController extends Controller
{
    public function index(Request $request, string $org)
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

    public function create(string $org)
    {
        return inertia('kegiatan/create', [
            'org' => $org,
        ]);
    }

    public function store(Request $request, string $org)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'tanggal_teks' => 'required|string|max:255',
            'catatan' => 'nullable|string',
            'pj' => 'array',
            'pj.*' => 'required|string|max:255',
            'instruktur' => 'array',
            'instruktur.*' => 'required|string|max:255',
        ]);

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

        public function show(string $org, Kegiatan $kegiatan)
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

    public function edit(string $org, Kegiatan $kegiatan)
    {
        $kegiatan->load('petugas');

        return inertia('kegiatan/edit', [
            'org' => $org,
            'kegiatan' => $kegiatan,
        ]);
    }

    public function update(Request $request, string $org, Kegiatan $kegiatan)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'tanggal_teks' => 'required|string|max:255',
            'catatan' => 'nullable|string',
            'pj' => 'array',
            'pj.*' => 'required|string|max:255',
            'instruktur' => 'array',
            'instruktur.*' => 'required|string|max:255',
        ]);

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

    public function destroy(string $org, Kegiatan $kegiatan)
    {
        $kegiatan->delete();
        return redirect()->route('kegiatan.index', $org)->with('success', 'Kegiatan berhasil dihapus');
    }

    public function toggleStatus(string $org, Kegiatan $kegiatan)
    {
        $kegiatan->update([
            'selesai' => !$kegiatan->selesai
        ]);

        return back()->with('success', 'Status kegiatan berhasil diubah');
    }

    public function export(string $org, Kegiatan $kegiatan)
    {
        $filename = 'Data_Makesta_' . \Illuminate\Support\Str::slug($kegiatan->nama) . '_' . date('Ymd_His') . '.xlsx';
        return Excel::download(new KegiatanExport($kegiatan), $filename);
    }

    public function generateSertifikat(Request $request, string $org, Kegiatan $kegiatan)
    {
        $request->validate([
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

        $templatePath = storage_path('app/templates/template-sertif-makesta-' . $org . '.docx');
        
        if (!file_exists($templatePath)) {
            // Throw an exception so Inertia handles it or return redirect with flash
            return back()->with('error', 'Template sertifikat (' . basename($templatePath) . ') belum ditaruh di folder storage/app/templates/.');
        }

        $kegiatan->load(['peserta.nilai', 'materi' => function($q) {
            $q->orderBy('urutan');
        }]);
        
        $pesertaQuery = $kegiatan->peserta();
        
        $limit = null;
        if ($request->no_surat_akhir) {
            $limit = ($request->no_surat_akhir - $request->no_surat_awal) + 1;
            if ($limit > 0) {
                $pesertaQuery->limit($limit);
            }
        }
        
        $pesertaList = $pesertaQuery->get();

        if ($pesertaList->isEmpty()) {
            return back()->with('error', 'Belum ada peserta di kegiatan ini.');
        }

        if (!is_dir(storage_path('app/temp'))) {
            mkdir(storage_path('app/temp'), 0755, true);
        }

        // PREVIEW LOGIC: If 'is_preview' is passed, just generate the first participant as a direct .docx download
        if ($request->has('is_preview') && $request->is_preview) {
            $peserta = $pesertaList->first();
            $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($templatePath);
            
            $noSuratStr = str_pad((int) $request->no_surat_awal, 3, '0', STR_PAD_LEFT) . $request->format_nomor;
            $templateProcessor->setValue('no_surat', $noSuratStr);
            $templateProcessor->setValue('nama_peserta', $peserta->nama);
            $templateProcessor->setValue('tempat', $peserta->tempat_lahir ?? '-');
            $templateProcessor->setValue('tgl_lahir', $peserta->tanggal_lahir ? \Carbon\Carbon::parse($peserta->tanggal_lahir)->translatedFormat('d F Y') : '-');
            $templateProcessor->setValue('tempat_cetak', $request->tempat);
            
            $tglMasehi = $request->tgl_m_hari . ' ' . $request->tgl_m_bulan . ' ' . $request->tgl_m_tahun;
            $tglHijriah = $request->tgl_h_hari . ' ' . $request->tgl_h_bulan . ' ' . $request->tgl_h_tahun;
            
            $templateProcessor->setValue('tgl_masehi', $tglMasehi);
            $templateProcessor->setValue('tgl_hijriah', $tglHijriah);
            
            $templateProcessor->setValue('tgl_m_hari', $request->tgl_m_hari);
            $templateProcessor->setValue('tgl_m_bulan', $request->tgl_m_bulan);
            $templateProcessor->setValue('tgl_m_tahun', $request->tgl_m_tahun);
            $templateProcessor->setValue('tgl_h_hari', $request->tgl_h_hari);
            $templateProcessor->setValue('tgl_h_bulan', $request->tgl_h_bulan);
            $templateProcessor->setValue('tgl_h_tahun', $request->tgl_h_tahun);
            $templateProcessor->setValue('nama_ketua', $request->nama_ketua);
            
            // Format NIA Ketua
            $niaKetua = trim($request->nia_ketua);
            if (!preg_match('/^NIA[\.\s]*/i', $niaKetua)) {
                $niaKetua = 'NIA. ' . $niaKetua;
            }
            $templateProcessor->setValue('nia_ketua', $niaKetua);
            
            $templateProcessor->setValue('nama_sekretaris', $request->nama_sekretaris);
            
            // Format NIA Sekretaris
            $niaSekretaris = trim($request->nia_sekretaris);
            if (!preg_match('/^NIA[\.\s]*/i', $niaSekretaris)) {
                $niaSekretaris = 'NIA. ' . $niaSekretaris;
            }
            $templateProcessor->setValue('nia_sekretaris', $niaSekretaris);
            
            $headerDepan = str_replace("
", '</w:t><w:br/><w:t>', htmlspecialchars($request->header_depan));
            $templateProcessor->setValue('header_depan', $headerDepan);
            
            $headerBelakang = str_replace("
", '</w:t><w:br/><w:t>', htmlspecialchars($request->header_belakang));
            $templateProcessor->setValue('header_belakang', $headerBelakang);

            // Hitung Rata-rata Nilai dan Predikat
            $rataRata = $peserta->nilai->avg('nilai');
            $predikat = $rataRata !== null ? \App\Helpers\NilaiHelper::indeks(round($rataRata)) : '-';
            $templateProcessor->setValue('predikat', $predikat);

            $materis = $kegiatan->materi;
            if ($materis->count() > 0) {
                $templateProcessor->cloneRow('materi', $materis->count());
                $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();
                $i = 1;
                foreach ($materis as $materi) {
                    $val = $nilaiMap[$materi->id] ?? null;
                    $indeks = $val !== null ? \App\Helpers\NilaiHelper::indeks($val) : '-';
                    $templateProcessor->setValue('no#' . $i, $i);
                    $templateProcessor->setValue('materi#' . $i, htmlspecialchars($materi->nama));
                    $templateProcessor->setValue('indeks#' . $i, $indeks);
                    $i++;
                }
            }

            $tempDocPath = storage_path('app/temp/Preview_' . \Illuminate\Support\Str::slug($peserta->nama) . '.docx');
            $templateProcessor->saveAs($tempDocPath);
            
            return response()->download($tempDocPath)->deleteFileAfterSend(true);
        }

        $zipFileName = 'Sertifikat_' . \Illuminate\Support\Str::slug($kegiatan->nama) . '_' . date('YmdHis') . '.zip';
        $zipPath = storage_path('app/temp/' . $zipFileName);
        
        if (!is_dir(storage_path('app/temp'))) {
            mkdir(storage_path('app/temp'), 0755, true);
        }

        $zip = new \ZipArchive();
        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            $currentNo = (int) $request->no_surat_awal;
            
            foreach ($pesertaList as $index => $peserta) {
                $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($templatePath);
                
                $noSuratStr = str_pad($currentNo, 3, '0', STR_PAD_LEFT) . $request->format_nomor;
                
                $templateProcessor->setValue('no_surat', $noSuratStr);
                $templateProcessor->setValue('nama_peserta', $peserta->nama);
                $templateProcessor->setValue('tempat', $peserta->tempat_lahir ?? '-');
                $templateProcessor->setValue('tgl_lahir', $peserta->tanggal_lahir ? \Carbon\Carbon::parse($peserta->tanggal_lahir)->translatedFormat('d F Y') : '-');
                $templateProcessor->setValue('tempat_cetak', $request->tempat);
                
                $tglMasehi = $request->tgl_m_hari . ' ' . $request->tgl_m_bulan . ' ' . $request->tgl_m_tahun;
                $tglHijriah = $request->tgl_h_hari . ' ' . $request->tgl_h_bulan . ' ' . $request->tgl_h_tahun;
                
                $templateProcessor->setValue('tgl_masehi', $tglMasehi);
                $templateProcessor->setValue('tgl_hijriah', $tglHijriah);
                
                $templateProcessor->setValue('tgl_m_hari', $request->tgl_m_hari);
                $templateProcessor->setValue('tgl_m_bulan', $request->tgl_m_bulan);
                $templateProcessor->setValue('tgl_m_tahun', $request->tgl_m_tahun);
                $templateProcessor->setValue('tgl_h_hari', $request->tgl_h_hari);
                $templateProcessor->setValue('tgl_h_bulan', $request->tgl_h_bulan);
                $templateProcessor->setValue('tgl_h_tahun', $request->tgl_h_tahun);
                $templateProcessor->setValue('nama_ketua', $request->nama_ketua);
                
                $niaKetua = trim($request->nia_ketua);
                if (!preg_match('/^NIA[\.\s]*/i', $niaKetua)) {
                    $niaKetua = 'NIA. ' . $niaKetua;
                }
                $templateProcessor->setValue('nia_ketua', $niaKetua);
                
                $templateProcessor->setValue('nama_sekretaris', $request->nama_sekretaris);
                
                $niaSekretaris = trim($request->nia_sekretaris);
                if (!preg_match('/^NIA[\.\s]*/i', $niaSekretaris)) {
                    $niaSekretaris = 'NIA. ' . $niaSekretaris;
                }
                $templateProcessor->setValue('nia_sekretaris', $niaSekretaris);
                
                $headerDepan = str_replace("
", '</w:t><w:br/><w:t>', htmlspecialchars($request->header_depan));
                $templateProcessor->setValue('header_depan', $headerDepan);
                
                $headerBelakang = str_replace("
", '</w:t><w:br/><w:t>', htmlspecialchars($request->header_belakang));
                $templateProcessor->setValue('header_belakang', $headerBelakang);

                // Hitung Rata-rata Nilai dan Predikat
                $rataRata = $peserta->nilai->avg('nilai');
                $predikat = $rataRata !== null ? \App\Helpers\NilaiHelper::indeks(round($rataRata)) : '-';
                $templateProcessor->setValue('predikat', $predikat);

                $materis = $kegiatan->materi;
                if ($materis->count() > 0) {
                    $templateProcessor->cloneRow('materi', $materis->count());
                    
                    $nilaiMap = $peserta->nilai->pluck('nilai', 'materi_id')->toArray();
                    
                    $i = 1;
                    foreach ($materis as $materi) {
                        $val = $nilaiMap[$materi->id] ?? null;
                        $indeks = $val !== null ? \App\Helpers\NilaiHelper::indeks($val) : '-';
                        
                        $templateProcessor->setValue('no#' . $i, $i);
                        $templateProcessor->setValue('materi#' . $i, htmlspecialchars($materi->nama));
                        $templateProcessor->setValue('indeks#' . $i, $indeks);
                        $i++;
                    }
                }

                $fileName = str_pad($currentNo, 3, '0', STR_PAD_LEFT) . '_' . \Illuminate\Support\Str::slug($peserta->nama) . '.docx';
                $tempDocPath = storage_path('app/temp/' . $fileName);
                $templateProcessor->saveAs($tempDocPath);
                
                $zip->addFile($tempDocPath, $fileName);
                
                $currentNo++;
            }
            $zip->close();
            
            foreach ($pesertaList as $i => $peserta) {
                $noStr = str_pad((int)$request->no_surat_awal + $i, 3, '0', STR_PAD_LEFT);
                $fileName = $noStr . '_' . \Illuminate\Support\Str::slug($peserta->nama) . '.docx';
                @unlink(storage_path('app/temp/' . $fileName));
            }
            
            return response()->download($zipPath)->deleteFileAfterSend(true);
        }

        return back()->with('error', 'Gagal membuat file ZIP sertifikat.');
    }
}
