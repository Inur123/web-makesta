import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Download, Eye, FileText, CheckCircle2, Save } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Kegiatan } from '@/types';

export default function SertifikatTab({ org, kegiatan }: { org: string; kegiatan: Kegiatan }) {
    const pengaturan = kegiatan.pengaturan_sertifikat || {};

    const { data, setData, post, processing, errors } = useForm({
        no_surat_awal: pengaturan.no_surat_awal || '',
        no_surat_akhir: pengaturan.no_surat_akhir || '',
        format_nomor: pengaturan.format_nomor || '/13.10/MKA/7354/XIX/IX/2026',
        
        // IPNU specific (ignored by backend if IPPNU)
        tempat: pengaturan.tempat || 'Magetan',
        tgl_m_hari: pengaturan.tgl_m_hari || '27',
        tgl_m_bulan: pengaturan.tgl_m_bulan || 'Mei',
        tgl_m_tahun: pengaturan.tgl_m_tahun || '2026 M',
        tgl_h_hari: pengaturan.tgl_h_hari || '10',
        tgl_h_bulan: pengaturan.tgl_h_bulan || 'Dzulhijjah',
        tgl_h_tahun: pengaturan.tgl_h_tahun || '1447 H',
        nama_ketua: pengaturan.nama_ketua || 'IRRANDY ANDHANA NURIZA',
        nia_ketua: pengaturan.nia_ketua || '13.10.03.00002',
        nama_sekretaris: pengaturan.nama_sekretaris || 'M. ZAINUR ROZIQIN',
        nia_sekretaris: pengaturan.nia_sekretaris || '13.1.02.01000',
        header_depan: pengaturan.header_depan || 'PIMPINAN CABANG\nIKATAN PELAJAR NAHDLATUL ULAMA\nKABUPATEN MAGETAN',
        header_belakang: pengaturan.header_belakang || 'PIMPINAN KOMISARIAT IKATAN PELAJAR NAHDLATUL ULAMA SMK ROUDLOTUL HUDA\nSMK ROUDLOTUL HUDA, DS. KEDUNGPANJI, KEC. LEMBEYAN, 19-20 JULI 2025',

        // IPPNU Specific
        template_depan: null as File | null,
        template_belakang: null as File | null,
    });

    const [isGenerating, setIsGenerating] = useState(false);

    const simpanPengaturan = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/${org}/kegiatan/${kegiatan.id}/sertifikat/simpan`, {
            preserveScroll: true,
            // Flash message ditangani otomatis oleh use-flash-toast
        });
    };

    const generateSertifikat = async () => {
        setIsGenerating(true);
        try {
            const response = await axios.post(`/${org}/kegiatan/${kegiatan.id}/sertifikat`, {}, {
                responseType: 'blob'
            });

            if (response.data.type === 'text/html' || response.data.type === 'application/json') {
                const reader = new FileReader();
                reader.onload = () => {
                    toast.error('Gagal men-generate sertifikat. Pastikan pengaturan sudah disimpan dan template valid.');
                };
                reader.readAsText(response.data);
                return;
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Sertifikat.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Sertifikat berhasil di-generate!');
        } catch (error: any) {
            toast.error('Gagal mengunduh sertifikat.');
        } finally {
            setIsGenerating(false);
        }
    };

    const hasTemplateDepan = !!pengaturan.template_depan;
    const hasTemplateBelakang = !!pengaturan.template_belakang;

    if (true) {
        return (
            <div className="space-y-8">
                {/* Bagian 1: Pengaturan CRUD */}
                <form onSubmit={simpanPengaturan} className="space-y-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Save className="w-5 h-5 text-green-600" />
                            1. Simpan Pengaturan Sertifikat
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Simpan pengaturan nomor dan template Word di bawah ini agar bisa digunakan berkali-kali untuk kegiatan ini.</p>
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 space-y-3 mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                                <p className="font-semibold text-blue-900">Panduan Template {org.toUpperCase()}</p>
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                    <li>Gunakan <strong>2 file Word terpisah</strong> (Depan dan Belakang).</li>
                                    <li>Paling atas dokumen WAJIB ketik <strong>{"${sertifikat}"}</strong> dan paling bawah WAJIB ketik <strong>{"${/sertifikat}"}</strong>.</li>
                                    <li>Gunakan Page Break (Ctrl+Enter) sebelum {"${/sertifikat}"} agar tiap peserta ganti halaman.</li>
                                </ul>
                            </div>
                            <a 
                                href={`/templates/template_${org}.zip`} 
                                download 
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors shrink-0"
                            >
                                <Download className="w-4 h-4" />
                                Download Template {org.toUpperCase()}
                            </a>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Format Nomor Surat</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="no_surat_awal">Mulai dari No. Urut Berapa?</Label>
                                <Input id="no_surat_awal" type="text" required value={data.no_surat_awal} onChange={e => setData('no_surat_awal', e.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="Contoh: 1" />
                                {errors.no_surat_awal && <p className="text-sm text-red-500">{errors.no_surat_awal}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="format_nomor">Format Akhiran Nomor Surat</Label>
                                <Input id="format_nomor" required value={data.format_nomor} onChange={e => setData('format_nomor', e.target.value)} />
                                {errors.format_nomor && <p className="text-sm text-red-500">{errors.format_nomor}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Upload Template Sertifikat (.docx)</h3>
                        <div className="space-y-4">
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
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button type="submit" disabled={processing} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                            {processing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Simpan Pengaturan
                        </Button>
                    </div>
                </form>

                {/* Bagian 2: Tombol Generate */}
                <div className="border border-blue-200 rounded-lg p-6 bg-blue-50/30 shadow-sm text-center space-y-4">
                    <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-blue-900">
                        <Download className="w-5 h-5" />
                        2. Cetak Sertifikat
                    </h2>
                    <p className="text-gray-600 text-sm max-w-lg mx-auto">
                        Jika pengaturan di atas sudah disimpan, Anda bisa langsung mencetak sertifikat kapan saja.
                    </p>
                    <Button 
                        type="button" 
                        size="lg"
                        onClick={generateSertifikat} 
                        disabled={isGenerating || !hasTemplateDepan || !hasTemplateBelakang} 
                        className="w-full sm:w-auto cursor-pointer"
                    >
                        {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
                        Generate Sertifikat (ZIP)
                    </Button>
                    {(!hasTemplateDepan || !hasTemplateBelakang) && (
                        <p className="text-red-500 text-sm">Silakan upload template dan klik Simpan terlebih dahulu.</p>
                    )}
                </div>
            </div>
        );
    
}}
