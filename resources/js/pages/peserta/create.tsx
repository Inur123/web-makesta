import { FormEventHandler, type ReactNode } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import InputError from '@/components/input-error';
import { Loader2 } from 'lucide-react';
import { getIndeks } from '@/lib/helpers';

function CreateLayout({ children }: { children: ReactNode }) {
    const { org, kegiatan } = usePage<{ org: string; kegiatan: { id: string; nama: string } }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: `/${org}/kegiatan` },
            { title: kegiatan?.nama || 'Detail', href: `/${org}/kegiatan/${kegiatan?.id}` },
            { title: 'Tambah Peserta', href: '#' }
        ]}>{children}</AppLayout>
    );
}

export default function Create({ org, kegiatan }: any) {
    const materiList = kegiatan.materi || [];

    const { data, setData, post, processing, errors } = useForm({
        nama: '', tempat_lahir: '',
        tanggal_lahir: '', alamat: '', no_hp: '', sekolah: '',
        nilai: {} as Record<string, string>,
        simpan_lagi: false
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault(); 
        post(`/${org}/kegiatan/${kegiatan.id}/peserta`, {
            onSuccess: (page) => {
                if (data.simpan_lagi) {
                    setData({ nama: '', tempat_lahir: '',
        tanggal_lahir: '', alamat: '', no_hp: '', sekolah: '', nilai: {}, simpan_lagi: false });
                    document.getElementById('nama')?.focus();
                }
            }
        }); 
    };

    const handleNilaiChange = (materiId: string, val: string) => {
        setData('nilai', { ...data.nilai, [materiId]: val });
    };

    return (
        <>
            <Head title="Tambah Peserta" />
            <div className="p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className="rounded-xl border bg-card p-6 space-y-5">
                        <h2 className="text-lg font-semibold border-b pb-3">Data Diri Peserta</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama Lengkap <span className="text-destructive">*</span></Label>
                                <Input id="nama" value={data.nama} onChange={e => setData('nama', e.target.value)} required autoFocus />
                                <InputError message={errors.nama} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="no_hp">No. HP / WA</Label>
                                <Input id="no_hp" value={data.no_hp} onChange={e => setData('no_hp', e.target.value)} placeholder="Contoh: 08123456789" />
                                <InputError message={errors.no_hp} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                <Input id="tempat_lahir" value={data.tempat_lahir} onChange={e => setData('tempat_lahir', e.target.value)} placeholder="Contoh: Magetan" />
                                <InputError message={errors.tempat_lahir} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !data.tanggal_lahir && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.tanggal_lahir ? format(new Date(data.tanggal_lahir), "d MMMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            captionLayout="dropdown"
                                            startMonth={new Date(1950, 0)} endMonth={new Date()}
                                            selected={data.tanggal_lahir ? new Date(data.tanggal_lahir) : undefined}
                                            onSelect={(date) => setData('tanggal_lahir', date ? format(date, "yyyy-MM-dd") : '')}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.tanggal_lahir} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="alamat">Alamat Lengkap</Label>
                                <Input id="alamat" value={data.alamat} onChange={e => setData('alamat', e.target.value)} placeholder="Contoh: Ds. Banjarejo RT 01/02..." />
                                <InputError message={errors.alamat} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sekolah">Asal Sekolah / Instansi</Label>
                                <Input id="sekolah" value={data.sekolah} onChange={e => setData('sekolah', e.target.value)} placeholder="Contoh: SMK Yosonegoro" />
                                <InputError message={errors.sekolah} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6 space-y-5">
                        <div className="flex justify-between items-end border-b pb-3">
                            <h2 className="text-lg font-semibold">Penilaian Materi</h2>
                            <p className="text-sm text-muted-foreground">{materiList.length} materi terdaftar</p>
                        </div>
                        
                        {materiList.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground bg-muted/20 rounded-lg">
                                <p>Belum ada materi di kegiatan ini.</p>
                                <p className="text-sm mt-1">Anda tetap bisa menyimpan peserta, namun form penilaian tidak akan muncul.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {materiList.map((m: any) => {
                                    const val = data.nilai[m.id] || '';
                                    const idx = getIndeks(val);
                                    return (
                                        <div key={m.id} className="space-y-2 border p-4 rounded-lg bg-muted/10 relative">
                                            <Label className="text-sm font-medium line-clamp-1 pr-10" title={m.nama}>{m.nama}</Label>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex-1">
                                                    <Input type="number" min="0" max="100" placeholder="0-100" 
                                                        value={val} onChange={e => handleNilaiChange(m.id, e.target.value)} />
                                                </div>
                                                <div className="shrink-0 text-center w-12">
                                                    <Badge variant={idx === '-' ? 'outline' : idx === 'E' ? 'destructive' : 'default'} 
                                                        className="h-9 w-9 flex items-center justify-center text-base rounded-md">
                                                        {idx}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <InputError message={errors[`nilai.${m.id}`]} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button type="button" variant="secondary" className="cursor-pointer" asChild>
                            <Link href={`/${org}/kegiatan/${kegiatan.id}`}>Kembali</Link>
                        </Button>
                        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => { setData('simpan_lagi', true); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 100); }} disabled={processing}>
                            {processing && data.simpan_lagi ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Simpan & Tambah Lagi
                        </Button>
                        <Button type="submit" onClick={() => setData('simpan_lagi', false)} disabled={processing} className="px-6 cursor-pointer">
                            {processing && !data.simpan_lagi ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            {processing && !data.simpan_lagi ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = (page: ReactNode) => <CreateLayout>{page}</CreateLayout>;
