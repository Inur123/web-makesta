const fs = require('fs');

let file = 'app/Http/Controllers/KegiatanController.php';
let content = fs.readFileSync(file, 'utf8');

// Replace the if ($org === 'ippnu') block with just doing it unconditionally
// We need to carefully replace the logic inside try {}
let tryBlockStart = content.indexOf('try {');
let catchBlockStart = content.indexOf('} catch (\\Exception $e) {');

let newTryBlock = `try {
            if (empty($pengaturan['template_depan']) || empty($pengaturan['template_belakang'])) {
                return back()->with('error', 'Template Depan dan Belakang belum diupload. Silakan upload dan simpan pengaturan terlebih dahulu.');
            }
            
            $pathDepan = \\Storage::disk('local')->path($pengaturan['template_depan']);
            $pathBelakang = \\Storage::disk('local')->path($pengaturan['template_belakang']);

            if (!\\Storage::disk('local')->exists($pengaturan['template_depan']) || !\\Storage::disk('local')->exists($pengaturan['template_belakang'])) {
                return back()->with('error', 'File template hilang dari server. Silakan upload ulang.');
            }

            return $service->generateBulkIppnu($pengaturan, $kegiatan, $pathDepan, $pathBelakang, $isPreview);
        `;

let prefix = content.substring(0, tryBlockStart);
let suffix = content.substring(catchBlockStart);

fs.writeFileSync(file, prefix + newTryBlock + suffix);
