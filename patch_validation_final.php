<?php
$file = 'app/Http/Controllers/KegiatanController.php';
$content = file_get_contents($file);

$startToken = 'public function simpanPengaturanSertifikat(Request $request, string $org, Kegiatan $kegiatan): RedirectResponse';
$endToken = 'return back()->with(\'success\', \'Pengaturan sertifikat berhasil disimpan!\');';

$start = strpos($content, $startToken);
$end = strpos($content, $endToken, $start);

if ($start !== false && $end !== false) {
    // Find the end of the return statement block
    $endToken2 = "    }\n";
    $end2 = strpos($content, $endToken2, $end);
    
    $replacement = "public function simpanPengaturanSertifikat(Request \$request, string \$org, Kegiatan \$kegiatan): RedirectResponse
    {
        \$rules = [
            'no_surat_awal' => 'required|integer',
            'no_surat_akhir' => 'nullable|integer',
            'format_nomor' => 'required|string',
            'template_depan' => 'nullable|file|mimes:docx',
            'template_belakang' => 'nullable|file|mimes:docx',
        ];
        
        \$data = \$request->validate(\$rules);
        \$pengaturan = \$kegiatan->pengaturan_sertifikat ?? [];

        // Hapus & Ganti template_depan jika ada upload baru
        if (\$request->hasFile('template_depan')) {
            if (isset(\$pengaturan['template_depan']) && \Storage::disk('local')->exists(\$pengaturan['template_depan'])) {
                \Storage::disk('local')->delete(\$pengaturan['template_depan']);
            }
            \$data['template_depan'] = \$request->file('template_depan')->storeAs('templates/arsip_' . \$org . '/' . \$kegiatan->id, 'template_depan_' . time() . '.docx');
        } else {
            \$data['template_depan'] = \$pengaturan['template_depan'] ?? null;
        }

        // Hapus & Ganti template_belakang jika ada upload baru
        if (\$request->hasFile('template_belakang')) {
            if (isset(\$pengaturan['template_belakang']) && \Storage::disk('local')->exists(\$pengaturan['template_belakang'])) {
                \Storage::disk('local')->delete(\$pengaturan['template_belakang']);
            }
            \$data['template_belakang'] = \$request->file('template_belakang')->storeAs('templates/arsip_' . \$org . '/' . \$kegiatan->id, 'template_belakang_' . time() . '.docx');
        } else {
            \$data['template_belakang'] = \$pengaturan['template_belakang'] ?? null;
        }

        \$kegiatan->update([
            'pengaturan_sertifikat' => \$data
        ]);

        return back()->with('success', 'Pengaturan sertifikat berhasil disimpan!');
    }";
        
    $newContent = substr($content, 0, $start) . $replacement . substr($content, $end2 + strlen($endToken2));
    file_put_contents($file, $newContent);
    echo "Patched successfully.\n";
} else {
    echo "Could not find tokens.\n";
}
