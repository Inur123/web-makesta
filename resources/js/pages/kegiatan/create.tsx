import { FormEventHandler, type ReactNode } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { Plus, Trash2, Loader2 } from 'lucide-react';

interface Props { org: 'ipnu' | 'ippnu'; }

function CreateLayout({ children }: { children: ReactNode }) {
    const { org } = usePage<{ org: string }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: `/${org}/kegiatan` },
            { title: 'Tambah Kegiatan', href: '#' }
        ]}>{children}</AppLayout>
    );
}

export default function Create({ org }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '', lokasi: '', tanggal_teks: '', catatan: '',
        pj: [] as string[], instruktur: [] as string[],
    });

    const submit: FormEventHandler = (e) => { e.preventDefault(); post(`/${org}/kegiatan`); };

    const addPj = () => setData('pj', [...data.pj, '']);
    const removePj = (idx: number) => setData('pj', data.pj.filter((_, i) => i !== idx));
    const updatePj = (idx: number, val: string) => { const n = [...data.pj]; n[idx] = val; setData('pj', n); };

    const addInstruktur = () => setData('instruktur', [...data.instruktur, '']);
    const removeInstruktur = (idx: number) => setData('instruktur', data.instruktur.filter((_, i) => i !== idx));
    const updateInstruktur = (idx: number, val: string) => { const n = [...data.instruktur]; n[idx] = val; setData('instruktur', n); };

    return (
        <>
            <Head title="Tambah Kegiatan" />
            <div className="p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Form Utama */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl border bg-card p-6 space-y-5">
                                <h2 className="text-lg font-semibold border-b pb-3">Data Kegiatan</h2>

                                <div className="space-y-2">
                                    <Label htmlFor="nama">Nama Kegiatan <span className="text-destructive">*</span></Label>
                                    <Input id="nama" value={data.nama} onChange={e => setData('nama', e.target.value)}
                                        placeholder="Contoh: Makesta PAC IPNU Magetan" required />
                                    <InputError message={errors.nama} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="lokasi">Lokasi <span className="text-destructive">*</span></Label>
                                        <Input id="lokasi" value={data.lokasi} onChange={e => setData('lokasi', e.target.value)}
                                            placeholder="Contoh: Aula Ranting..." required />
                                        <InputError message={errors.lokasi} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tanggal_teks">Tanggal <span className="text-destructive">*</span></Label>
                                        <Input id="tanggal_teks" value={data.tanggal_teks} onChange={e => setData('tanggal_teks', e.target.value)}
                                            placeholder="Contoh: 10 - 12 Agustus 2026" required />
                                        <InputError message={errors.tanggal_teks} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="catatan">Catatan <span className="text-muted-foreground text-xs font-normal">(opsional)</span></Label>
                                    <Textarea id="catatan" value={data.catatan} onChange={e => setData('catatan', e.target.value)}
                                        placeholder="Informasi tambahan tentang kegiatan..." rows={4} />
                                    <InputError message={errors.catatan} />
                                </div>
                            </div>
                        </div>

                        {/* Right: PJ & Instruktur */}
                        <div className="space-y-6">
                            <div className="rounded-xl border bg-card p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Penanggung Jawab</h3>
                                    <Button type="button" variant="outline" size="sm" onClick={addPj}>
                                        <Plus className="w-3.5 h-3.5 mr-1" />Tambah
                                    </Button>
                                </div>
                                {data.pj.length === 0 ? (
                                    <p className="text-sm text-muted-foreground italic py-2 text-center">Belum ada PJ ditambahkan</p>
                                ) : (
                                    <div className="space-y-2">
                                        {data.pj.map((pj, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input value={pj} onChange={e => updatePj(idx, e.target.value)} placeholder={`PJ ${idx + 1}`} required />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removePj(idx)}
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="rounded-xl border bg-card p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Instruktur</h3>
                                    <Button type="button" variant="outline" size="sm" onClick={addInstruktur}>
                                        <Plus className="w-3.5 h-3.5 mr-1" />Tambah
                                    </Button>
                                </div>
                                {data.instruktur.length === 0 ? (
                                    <p className="text-sm text-muted-foreground italic py-2 text-center">Belum ada instruktur ditambahkan</p>
                                ) : (
                                    <div className="space-y-2">
                                        {data.instruktur.map((inst, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input value={inst} onChange={e => updateInstruktur(idx, e.target.value)}
                                                    placeholder={`Instruktur ${idx + 1}`} required />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeInstruktur(idx)}
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom actions - right aligned */}
                    <div className="flex justify-end gap-3 pt-2 border-t">
                        <Button type="button" variant="secondary" size="default" asChild>
                            <Link href={`/${org}/kegiatan`}>Kembali</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="px-6">
                            {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {processing ? 'Menyimpan...' : 'Simpan Kegiatan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = (page: ReactNode) => <CreateLayout>{page}</CreateLayout>;
