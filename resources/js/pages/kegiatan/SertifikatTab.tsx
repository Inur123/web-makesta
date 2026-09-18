import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Download, Eye } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Kegiatan } from '@/types';

export default function SertifikatTab({ org, kegiatan }: { org: string; kegiatan: Kegiatan }) {
    const { data, setData, post, processing, errors, setError } = useForm({
        no_surat_awal: '',
        no_surat_akhir: '',
        format_nomor: '/13.10/MKA/7354/XIX/IX/2026',
        tempat: 'Magetan',
        tgl_m_hari: '27',
        tgl_m_bulan: 'Mei',
        tgl_m_tahun: '2026 M',
        tgl_h_hari: '10',
        tgl_h_bulan: 'Dzulhijjah',
        tgl_h_tahun: '1447 H',
        nama_ketua: 'IRRANDY ANDHANA NURIZA',
        nia_ketua: '13.10.03.00002',
        nama_sekretaris: 'M. ZAINUR ROZIQIN',
        nia_sekretaris: '13.1.02.01000',
        header_depan: 'PIMPINAN CABANG\nIKATAN PELAJAR NAHDLATUL ULAMA\nKABUPATEN MAGETAN',
        header_belakang: 'PIMPINAN KOMISARIAT IKATAN PELAJAR NAHDLATUL ULAMA SMK ROUDLOTUL HUDA\nSMK ROUDLOTUL HUDA, DS. KEDUNGPANJI, KEC. LEMBEYAN, 19-20 JULI 2025',
    });

    const [isPreviewing, setIsPreviewing] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const submit = async (e: React.FormEvent, isPreview: boolean = false) => {
        e.preventDefault();
        
        if (isPreview) {
            setIsPreviewing(true);
        } else {
            setIsGenerating(true);
        }
        
        try {
            const payload = { ...data };
            if (isPreview) {
                (payload as any).is_preview = 1;
            }

            const response = await axios.post(`/${org}/kegiatan/${kegiatan.id}/sertifikat`, payload, {
                responseType: 'blob'
            });

            // Create a blob URL
            const blob = new Blob([response.data], { type: isPreview ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/zip' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            let filename = isPreview ? 'Preview.docx' : 'Sertifikat.zip';
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } catch (error: any) {
            console.error("Download failed:", error);
            if (error.response && error.response.status === 422) {
                try {
                    // Try to read blob error
                    const textData = await error.response.data.text();
                    const errorObj = JSON.parse(textData);
                    if (errorObj.errors) {
                        const validationErrors = errorObj.errors;
                        let firstErrorMsg = "Ada isian form yang belum lengkap.";
                        for (const field in validationErrors) {
                            setError(field as any, validationErrors[field][0]);
                            firstErrorMsg = validationErrors[field][0];
                        }
                        toast.error(firstErrorMsg);
                        return;
                    }
                } catch(e) {}
            }
            toast.error("Gagal men-generate sertifikat. Terjadi kesalahan sistem.");
        } finally {
            if (isPreview) setIsPreviewing(false);
            else setIsGenerating(false);
        }
    };

    const isProcessing = isPreviewing || isGenerating || processing;

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Kolom Kiri */}
                <div className="flex-1 flex flex-col gap-8">
                    
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">1. Format Nomor Surat</h3>
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
                        <h3 className="font-semibold text-lg border-b pb-2">3. Tanda Tangan</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nama_ketua">Nama Ketua</Label>
                                <Input id="nama_ketua" required value={data.nama_ketua} onChange={e => setData('nama_ketua', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nia_ketua">NIA Ketua</Label>
                                <Input id="nia_ketua" required value={data.nia_ketua} onChange={e => setData('nia_ketua', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nama_sekretaris">Nama Sekretaris</Label>
                                <Input id="nama_sekretaris" required value={data.nama_sekretaris} onChange={e => setData('nama_sekretaris', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nia_sekretaris">NIA Sekretaris</Label>
                                <Input id="nia_sekretaris" required value={data.nia_sekretaris} onChange={e => setData('nia_sekretaris', e.target.value)} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Kolom Kanan */}
                <div className="flex-1 flex flex-col gap-8">
                    
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">2. Tempat & Tanggal</h3>
                        <div className="space-y-2">
                            <Label htmlFor="tempat">Tempat Dicetak</Label>
                            <Input id="tempat" required value={data.tempat} onChange={e => setData('tempat', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Tanggal Masehi</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <Input id="tgl_m_hari" required value={data.tgl_m_hari} onChange={e => setData('tgl_m_hari', e.target.value)} placeholder="Tgl" />
                                    <Input id="tgl_m_bulan" required value={data.tgl_m_bulan} onChange={e => setData('tgl_m_bulan', e.target.value)} placeholder="Bulan" />
                                    <Input id="tgl_m_tahun" required value={data.tgl_m_tahun} onChange={e => setData('tgl_m_tahun', e.target.value)} placeholder="Tahun" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Hijriah</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <Input id="tgl_h_hari" required value={data.tgl_h_hari} onChange={e => setData('tgl_h_hari', e.target.value)} placeholder="Tgl" />
                                    <Input id="tgl_h_bulan" required value={data.tgl_h_bulan} onChange={e => setData('tgl_h_bulan', e.target.value)} placeholder="Bulan" />
                                    <Input id="tgl_h_tahun" required value={data.tgl_h_tahun} onChange={e => setData('tgl_h_tahun', e.target.value)} placeholder="Tahun" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">4. Teks Kop / Header</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="header_depan">Teks Kop Depan (Bisa di-enter)</Label>
                                <Textarea 
                                    id="header_depan"
                                    required
                                    className="min-h-[100px]"
                                    value={data.header_depan}
                                    onChange={e => setData('header_depan', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="header_belakang">Teks Kop Belakang (Bisa di-enter)</Label>
                                <Textarea 
                                    id="header_belakang"
                                    required
                                    className="min-h-[100px]"
                                    value={data.header_belakang}
                                    onChange={e => setData('header_belakang', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={(e) => submit(e, true)} disabled={isProcessing} className="w-full sm:w-auto cursor-pointer">
                    {isPreviewing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                    Preview 1 Peserta (.docx)
                </Button>
                <Button type="button" onClick={(e) => submit(e, false)} disabled={isProcessing} className="w-full sm:w-auto cursor-pointer">
                    {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    Generate Sertifikat (ZIP)
                </Button>
            </div>
        </form>
    );
}
