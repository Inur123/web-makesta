const fs = require('fs');
let file = 'resources/js/pages/kegiatan/SertifikatTab.tsx';
let content = fs.readFileSync(file, 'utf8');

let oldStr = `post(\`/\${org}/kegiatan/\${kegiatan.id}/sertifikat/simpan\`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pengaturan sertifikat berhasil disimpan!');
            }
        });`;

let newStr = `post(\`/\${org}/kegiatan/\${kegiatan.id}/sertifikat/simpan\`, {
            preserveScroll: true,
            // Flash message ditangani otomatis oleh use-flash-toast
        });`;

content = content.replace(oldStr, newStr);
fs.writeFileSync(file, content);
