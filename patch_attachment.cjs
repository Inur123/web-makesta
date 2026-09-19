const fs = require('fs');
let file = 'resources/js/pages/kegiatan/SertifikatTab.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add useRef
content = content.replace(`import { useState } from 'react';`, `import { useState, useRef } from 'react';`);

// 2. Add Icons and Attachment imports
content = content.replace(
  `import { Loader2, Download, Eye, FileText, CheckCircle2, Save } from 'lucide-react';`,
  `import { Loader2, Download, Eye, FileText, CheckCircle2, Save, Upload, X } from 'lucide-react';\nimport { Attachment, AttachmentContent, AttachmentMedia, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction } from '@/components/ui/attachment';`
);

// 3. Add refs inside component
content = content.replace(
  `const { data, setData, post, processing, errors } = useForm(`,
  `const fileDepanRef = useRef<HTMLInputElement>(null);\n    const fileBelakangRef = useRef<HTMLInputElement>(null);\n\n    const { data, setData, post, processing, errors } = useForm(`
);

// 4. Replace the Upload Template Sertifikat section
let oldUploadSection = `<div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="template_depan">Template Depan {hasTemplateDepan && <span className="text-green-600 font-normal ml-2 flex inline-flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Tersimpan</span>}</Label>
                                <Input id="template_depan" type="file" accept=".docx" onChange={e => setData('template_depan', e.target.files?.[0] || null)} />
                                {errors.template_depan && <p className="text-sm text-red-500">{errors.template_depan}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="template_belakang">Template Belakang / Penilaian {hasTemplateBelakang && <span className="text-green-600 font-normal ml-2 flex inline-flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Tersimpan</span>}</Label>
                                <Input id="template_belakang" type="file" accept=".docx" onChange={e => setData('template_belakang', e.target.files?.[0] || null)} />
                                {errors.template_belakang && <p className="text-sm text-red-500">{errors.template_belakang}</p>}
                            </div>
                            <p className="text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah template yang sudah tersimpan sebelumnya.</p>
                        </div>`;

let newUploadSection = `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label>Template Depan {hasTemplateDepan && <span className="text-green-600 font-normal ml-2 flex inline-flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Tersimpan</span>}</Label>
                                <Input type="file" accept=".docx" className="hidden" ref={fileDepanRef} onChange={e => setData('template_depan', e.target.files?.[0] || null)} />
                                
                                {data.template_depan ? (
                                    <Attachment state="done">
                                        <AttachmentMedia variant="icon"><FileText className="text-blue-500" /></AttachmentMedia>
                                        <AttachmentContent>
                                            <AttachmentTitle>{data.template_depan.name}</AttachmentTitle>
                                            <AttachmentDescription>Siap disimpan</AttachmentDescription>
                                        </AttachmentContent>
                                        <AttachmentActions>
                                            <AttachmentAction variant="ghost" type="button" onClick={() => setData('template_depan', null)}><X className="w-4 h-4" /></AttachmentAction>
                                        </AttachmentActions>
                                    </Attachment>
                                ) : hasTemplateDepan ? (
                                    <Attachment state="idle">
                                        <AttachmentMedia variant="icon"><CheckCircle2 className="text-green-500" /></AttachmentMedia>
                                        <AttachmentContent>
                                            <AttachmentTitle>template_depan.docx</AttachmentTitle>
                                            <AttachmentDescription>Tersimpan di server</AttachmentDescription>
                                        </AttachmentContent>
                                        <AttachmentActions>
                                            <AttachmentAction variant="outline" type="button" onClick={() => fileDepanRef.current?.click()}>
                                                <Upload className="w-4 h-4 mr-1" /> Ganti
                                            </AttachmentAction>
                                        </AttachmentActions>
                                    </Attachment>
                                ) : (
                                    <Button variant="outline" type="button" className="w-full h-14 border-dashed bg-gray-50 hover:bg-gray-100" onClick={() => fileDepanRef.current?.click()}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Pilih File Template Depan (.docx)
                                    </Button>
                                )}
                                {errors.template_depan && <p className="text-sm text-red-500">{errors.template_depan}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label>Template Belakang {hasTemplateBelakang && <span className="text-green-600 font-normal ml-2 flex inline-flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Tersimpan</span>}</Label>
                                <Input type="file" accept=".docx" className="hidden" ref={fileBelakangRef} onChange={e => setData('template_belakang', e.target.files?.[0] || null)} />
                                
                                {data.template_belakang ? (
                                    <Attachment state="done">
                                        <AttachmentMedia variant="icon"><FileText className="text-blue-500" /></AttachmentMedia>
                                        <AttachmentContent>
                                            <AttachmentTitle>{data.template_belakang.name}</AttachmentTitle>
                                            <AttachmentDescription>Siap disimpan</AttachmentDescription>
                                        </AttachmentContent>
                                        <AttachmentActions>
                                            <AttachmentAction variant="ghost" type="button" onClick={() => setData('template_belakang', null)}><X className="w-4 h-4" /></AttachmentAction>
                                        </AttachmentActions>
                                    </Attachment>
                                ) : hasTemplateBelakang ? (
                                    <Attachment state="idle">
                                        <AttachmentMedia variant="icon"><CheckCircle2 className="text-green-500" /></AttachmentMedia>
                                        <AttachmentContent>
                                            <AttachmentTitle>template_belakang.docx</AttachmentTitle>
                                            <AttachmentDescription>Tersimpan di server</AttachmentDescription>
                                        </AttachmentContent>
                                        <AttachmentActions>
                                            <AttachmentAction variant="outline" type="button" onClick={() => fileBelakangRef.current?.click()}>
                                                <Upload className="w-4 h-4 mr-1" /> Ganti
                                            </AttachmentAction>
                                        </AttachmentActions>
                                    </Attachment>
                                ) : (
                                    <Button variant="outline" type="button" className="w-full h-14 border-dashed bg-gray-50 hover:bg-gray-100" onClick={() => fileBelakangRef.current?.click()}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Pilih File Template Belakang (.docx)
                                    </Button>
                                )}
                                {errors.template_belakang && <p className="text-sm text-red-500">{errors.template_belakang}</p>}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Biarkan seperti semula jika tidak ingin mengubah template yang sudah tersimpan sebelumnya.</p>`;

content = content.replace(oldUploadSection, newUploadSection);
fs.writeFileSync(file, content);
