<?php
$file = 'app/Http/Controllers/KegiatanController.php';
$content = file_get_contents($file);

$startToken = 'public function simpanPengaturanSertifikat(Request $request, string $org, Kegiatan $kegiatan): RedirectResponse';
$endToken = '$validated = $request->validate($rules);';

$start = strpos($content, $startToken);
$end = strpos($content, $endToken, $start);

if ($start !== false && $end !== false) {
    $end += strlen($endToken);
    
    $replacement = "public function simpanPengaturanSertifikat(Request \$request, string \$org, Kegiatan \$kegiatan): RedirectResponse
    {
        \$rules = [
            'no_surat_awal' => 'required|integer',
            'no_surat_akhir' => 'nullable|integer',
            'format_nomor' => 'required|string',
            'template_depan' => 'nullable|file|mimes:docx',
            'template_belakang' => 'nullable|file|mimes:docx',
        ];
        
        \$validated = \$request->validate(\$rules);";
        
    $newContent = substr($content, 0, $start) . $replacement . substr($content, $end);
    file_put_contents($file, $newContent);
    echo "Patched successfully.\n";
} else {
    echo "Could not find tokens.\n";
}
