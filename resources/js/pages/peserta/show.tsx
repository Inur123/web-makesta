import { type ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { getIndeks } from '@/lib/helpers';
import { Kegiatan, Peserta, Materi } from '@/types';
import { appUrl } from '@/lib/utils';

interface Props {
    org: 'ipnu' | 'ippnu';
    kegiatan: Kegiatan;
    peserta: Peserta;
    nilaiMap: Record<string, number>;
}

function ShowLayout({ children }: { children: ReactNode }) {
    const { org, kegiatan, peserta } = usePage<{ org: string; kegiatan: Kegiatan; peserta: Peserta }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: appUrl(`/${org}/kegiatan`) },
            { title: kegiatan?.nama || 'Kegiatan', href: appUrl(`/${org}/kegiatan/${kegiatan?.id}`) },
            { title: peserta?.nama || 'Detail Peserta', href: appUrl(`/${org}/kegiatan/${kegiatan?.id}/peserta/${peserta?.id}`) }
        ]}>{children}</AppLayout>
    );
}

export default function Show({ org, kegiatan, peserta, nilaiMap }: Props) {
    const materiList = kegiatan.materi || [];

    return (
        <>
            <Head title={`Detail ${peserta.nama}`} />

            <div className="p-4 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-xl font-bold tracking-tight">Detail Peserta</h2>
                    <div className="grid grid-cols-2 sm:flex gap-2">
                        <Button variant="outline" className="w-full sm:w-auto cursor-pointer" asChild>
                            <Link href={appUrl(`/${org}/kegiatan/${kegiatan.id}`)}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                            </Link>
                        </Button>
                        <Button className="w-full sm:w-auto cursor-pointer" asChild>
                            <Link href={appUrl(`/${org}/kegiatan/${kegiatan.id}/peserta/${peserta.id}/edit`)}>
                                <Edit className="w-4 h-4 mr-2" /> Edit Data & Nilai
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card Data Diri */}
                    <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Data Diri Peserta</h3>
                        <dl className="space-y-4 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                                <dt className="text-muted-foreground font-medium">Nama Lengkap</dt>
                                <dd className="sm:col-span-2 font-semibold">{peserta.nama}</dd>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                                <dt className="text-muted-foreground font-medium">TTL</dt>
                                <dd className="sm:col-span-2">
                                    {[
                                        peserta.tempat_lahir, 
                                        peserta.tanggal_lahir ? new Date(peserta.tanggal_lahir).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : null
                                    ].filter(Boolean).join(', ') || '-'}
                                </dd>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                                <dt className="text-muted-foreground font-medium">Alamat</dt>
                                <dd className="sm:col-span-2">{peserta.alamat || '-'}</dd>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                                <dt className="text-muted-foreground font-medium">No. HP / WA</dt>
                                <dd className="sm:col-span-2">{peserta.no_hp || '-'}</dd>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                                <dt className="text-muted-foreground font-medium">Asal Sekolah</dt>
                                <dd className="sm:col-span-2">{peserta.sekolah || '-'}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Card Nilai Materi */}
                    <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Penilaian Materi</h3>
                        
                        {materiList.length === 0 ? (
                            <p className="text-muted-foreground text-sm">Belum ada materi pada kegiatan ini.</p>
                        ) : (
                            <div className="space-y-3">
                                {materiList.map((m: Materi) => {
                                    const nilai = nilaiMap[m.id];
                                    const indeks = getIndeks(nilai);
                                    
                                    return (
                                        <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                                            <span className="font-medium text-sm min-w-0 truncate">{m.nama}</span>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-xs text-muted-foreground">Nilai</div>
                                                    <div className="font-bold">{nilai !== undefined && nilai !== null ? nilai : '-'}</div>
                                                </div>
                                                <div className="text-right w-12">
                                                    <div className="text-xs text-muted-foreground">Indeks</div>
                                                    <div className="font-bold">{indeks}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page: ReactNode) => <ShowLayout>{page}</ShowLayout>;
