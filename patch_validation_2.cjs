const fs = require('fs');
let file = 'app/Http/Controllers/KegiatanController.php';
let content = fs.readFileSync(file, 'utf8');

// Use regex to replace the entire method body of simpanPengaturanSertifikat up to $validated
content = content.replace(/public function simpanPengaturanSertifikat[\s\S]*?\$validated = \$request->validate\(\$rules\);/, `public function simpanPengaturanSertifikat(Request $request, string $org, Kegiatan $kegiatan): RedirectResponse
    {
        $rules = [
            'no_surat_awal' => 'required|integer',
            'no_surat_akhir' => 'nullable|integer',
            'format_nomor' => 'required|string',
            'template_depan' => 'nullable|file|mimes:docx',
            'template_belakang' => 'nullable|file|mimes:docx',
        ];
        
        $validated = $request->validate($rules);`);
        
fs.writeFileSync(file, content);
