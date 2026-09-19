const fs = require('fs');
let file = 'app/Http/Controllers/KegiatanController.php';
let content = fs.readFileSync(file, 'utf8');

// We need to replace the logic inside simpanPengaturanSertifikat
// Look for `public function simpanPengaturanSertifikat`
let funcStart = content.indexOf('public function simpanPengaturanSertifikat');
let validationEnd = content.indexOf('$validated = $request->validate($rules);', funcStart);

if (funcStart !== -1 && validationEnd !== -1) {
    let newValidation = `public function simpanPengaturanSertifikat(Request $request, string $org, Kegiatan $kegiatan): RedirectResponse
    {
        $rules = [
            'no_surat_awal' => 'required|integer',
            'no_surat_akhir' => 'nullable|integer',
            'format_nomor' => 'required|string',
            'template_depan' => 'nullable|file|mimes:docx',
            'template_belakang' => 'nullable|file|mimes:docx',
        ];
        
        $validated = $request->validate($rules);`;
        
    let prefix = content.substring(0, funcStart);
    let suffix = content.substring(validationEnd + '$validated = $request->validate($rules);'.length);
    
    fs.writeFileSync(file, prefix + newValidation + suffix);
}
