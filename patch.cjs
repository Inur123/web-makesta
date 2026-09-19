const fs = require('fs');
let file = 'app/Http/Controllers/KegiatanController.php';
let content = fs.readFileSync(file, 'utf8');

let startStr = 'public function simpanPengaturanSertifikat(Request $request, string $org, Kegiatan $kegiatan): RedirectResponse\n    {';
let endStr = 'return back()->with(\'success\', \'Pengaturan sertifikat berhasil disimpan!\');\n    }';

let start = content.indexOf('public function simpanPengaturanSertifikat');
let end = content.indexOf(endStr, start);

if (start !== -1 && end !== -1) {
    let replacement = `public function simpanPengaturanSertifikat(Request $request, string $org, Kegiatan $kegiatan): RedirectResponse
    {
        $rules = [
            'no_surat_awal' => 'required|integer',
            'no_surat_akhir' => 'nullable|integer',
            'format_nomor' => 'required|string',
            'template_depan' => 'nullable|file|mimes:docx',
            'template_belakang' => 'nullable|file|mimes:docx',
        ];
        
        $data = $request->validate($rules);
        $pengaturan = $kegiatan->pengaturan_sertifikat ?? [];

        if ($request->hasFile('template_depan')) {
            if (isset($pengaturan['template_depan']) && \\Storage::disk('local')->exists($pengaturan['template_depan'])) {
                \\Storage::disk('local')->delete($pengaturan['template_depan']);
            }
            $data['template_depan'] = $request->file('template_depan')->storeAs('templates/arsip_' . $org . '/' . $kegiatan->id, 'template_depan_' . time() . '.docx');
        } else {
            $data['template_depan'] = $pengaturan['template_depan'] ?? null;
        }

        if ($request->hasFile('template_belakang')) {
            if (isset($pengaturan['template_belakang']) && \\Storage::disk('local')->exists($pengaturan['template_belakang'])) {
                \\Storage::disk('local')->delete($pengaturan['template_belakang']);
            }
            $data['template_belakang'] = $request->file('template_belakang')->storeAs('templates/arsip_' . $org . '/' . $kegiatan->id, 'template_belakang_' . time() . '.docx');
        } else {
            $data['template_belakang'] = $pengaturan['template_belakang'] ?? null;
        }

        $kegiatan->update([
            'pengaturan_sertifikat' => $data
        ]);

        return back()->with('success', 'Pengaturan sertifikat berhasil disimpan!');
    }`;
    
    let newContent = content.substring(0, start) + replacement + content.substring(end + endStr.length);
    fs.writeFileSync(file, newContent);
    console.log("Success");
} else {
    console.log("Not found");
}
