const fs = require('fs');
let file = 'resources/js/pages/kegiatan/SertifikatTab.tsx';
let content = fs.readFileSync(file, 'utf8');

let oldBox = `<div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 space-y-2 mb-6">
                        <p className="font-semibold text-blue-900">Panduan Template IPPNU</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Gunakan <strong>2 file Word terpisah</strong> (Depan dan Belakang).</li>
                            <li>Paling atas dokumen WAJIB ketik <strong>{"\${sertifikat}"}</strong> dan paling bawah WAJIB ketik <strong>{"\${/sertifikat}"}</strong>.</li>
                            <li>Gunakan Page Break (Ctrl+Enter) sebelum {"\${/sertifikat}"} agar tiap peserta ganti halaman.</li>
                        </ul>
                    </div>`;

let newBox = `<div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 space-y-3 mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                                <p className="font-semibold text-blue-900">Panduan Template {org.toUpperCase()}</p>
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                    <li>Gunakan <strong>2 file Word terpisah</strong> (Depan dan Belakang).</li>
                                    <li>Paling atas dokumen WAJIB ketik <strong>{"\${sertifikat}"}</strong> dan paling bawah WAJIB ketik <strong>{"\${/sertifikat}"}</strong>.</li>
                                    <li>Gunakan Page Break (Ctrl+Enter) sebelum {"\${/sertifikat}"} agar tiap peserta ganti halaman.</li>
                                </ul>
                            </div>
                            <a 
                                href={\`/templates/template_\${org}.zip\`} 
                                download 
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors shrink-0"
                            >
                                <Download className="w-4 h-4" />
                                Download Template {org.toUpperCase()}
                            </a>
                        </div>
                    </div>`;

content = content.replace(oldBox, newBox);
fs.writeFileSync(file, content);
