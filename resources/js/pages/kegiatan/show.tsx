import { useState, type ReactNode } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Pencil, CheckCircle, ArrowUp, ArrowDown, MapPin, CalendarDays, FileText, Plus, Loader2, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye } from 'lucide-react';
import SertifikatTab from './SertifikatTab';
import { Kegiatan, Peserta, PaginatedData, Petugas, Materi } from '@/types';

interface Props { org: 'ipnu' | 'ippnu'; kegiatan: Kegiatan; pesertaPaginated: PaginatedData<Peserta>; }

function ShowLayout({ children }: { children: ReactNode }) {
    const { org, kegiatan } = usePage<{ org: string; kegiatan: { id: string; nama: string } }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: `/${org}/kegiatan` },
            { title: kegiatan?.nama || 'Detail', href: `/${org}/kegiatan/${kegiatan?.id}` }
        ]}>{children}</AppLayout>
    );
}

export default function Show({ org, kegiatan, pesertaPaginated }: Props) {
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1] || '');
    const defaultTab = searchParams.get('tab') || 'peserta';

    const handleTabChange = (value: string) => {
        if (typeof window !== 'undefined') {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('tab', value);
            window.history.replaceState({}, '', newUrl);
        }
    };
    const pj = kegiatan.petugas?.filter((p: Petugas) => p.peran === 'pj') || [];
    const instruktur = kegiatan.petugas?.filter((p: Petugas) => p.peran === 'instruktur') || [];
    const materiList = [...(kegiatan.materi || [])].sort((a: Materi, b: Materi) => a.urutan - b.urutan);
    const pesertaList = pesertaPaginated?.data || [];

    const [isMateriDialogOpen, setIsMateriDialogOpen] = useState(false);
    const [editingMateri, setEditingMateri] = useState<Materi | null>(null);

    const { data: materiData, setData: setMateriData, post: postMateri, put: putMateri,
        processing: processingMateri, errors: errorsMateri, reset: resetMateri } = useForm({ nama: '' });

    const [processingStatus, setProcessingStatus] = useState(false);
    const [processingDelete, setProcessingDelete] = useState(false);
    const [deletingMateriId, setDeletingMateriId] = useState<string | null>(null);
    const [deletingPesertaId, setDeletingPesertaId] = useState<string | null>(null);

    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        actionText?: string;
        isDestructive?: boolean;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        description: '',
        onConfirm: () => {},
    });

    const closeConfirm = () => setConfirmDialog(prev => ({ ...prev, isOpen: false }));

    const isDialogProcessing = processingStatus || processingDelete || deletingMateriId !== null || deletingPesertaId !== null;

    const toggleStatus = () => {
        setConfirmDialog({
            isOpen: true,
            title: 'Ubah Status Pendataan',
            description: 'Yakin ingin mengubah status pendataan ini?',
            onConfirm: () => {
                router.patch(`/${org}/kegiatan/${kegiatan.id}/status`, {}, {
                    onStart: () => setProcessingStatus(true),
                    onFinish: () => { setProcessingStatus(false); closeConfirm(); },
                });
            }
        });
    };

    const deleteKegiatan = () => {
        setConfirmDialog({
            isOpen: true,
            title: 'Hapus Kegiatan',
            description: `Yakin ingin menghapus kegiatan ini? Semua data peserta akan ikut terhapus!`,
            actionText: 'Hapus',
            isDestructive: true,
            onConfirm: () => {
                router.delete(`/${org}/kegiatan/${kegiatan.id}`, {
                    onStart: () => setProcessingDelete(true),
                    onFinish: () => { setProcessingDelete(false); closeConfirm(); },
                });
            }
        });
    };

    const openAddMateri = () => { setEditingMateri(null); resetMateri(); setIsMateriDialogOpen(true); };
    const openEditMateri = (m: Materi) => { setEditingMateri(m); setMateriData('nama', m.nama); setIsMateriDialogOpen(true); };

    const submitMateri = (e: React.FormEvent) => {
        e.preventDefault();
        const opts = { onSuccess: () => { setIsMateriDialogOpen(false); resetMateri(); } };
        if (editingMateri) putMateri(`/${org}/materi/${editingMateri.id}`, opts);
        else postMateri(`/${org}/kegiatan/${kegiatan.id}/materi`, opts);
    };

    const deleteMateri = (id: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Hapus Materi',
            description: 'Yakin ingin menghapus materi ini? Nilai peserta untuk materi ini akan hilang.',
            actionText: 'Hapus',
            isDestructive: true,
            onConfirm: () => {
                router.delete(`/${org}/materi/${id}`, {
                    onStart: () => setDeletingMateriId(id),
                    onFinish: () => { setDeletingMateriId(null); closeConfirm(); },
                });
            }
        });
    };

    const deletePeserta = (id: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Hapus Peserta',
            description: 'Yakin ingin menghapus peserta ini?',
            actionText: 'Hapus',
            isDestructive: true,
            onConfirm: () => {
                router.delete(`/${org}/peserta/${id}`, {
                    onStart: () => setDeletingPesertaId(id),
                    onFinish: () => { setDeletingPesertaId(null); closeConfirm(); },
                });
            }
        });
    };

    return (
        <>
            <Head title={kegiatan.nama} />
            <div className="p-6 space-y-5">
                {/* Info Card */}
                <div className="rounded-xl border bg-card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-xl font-bold">{kegiatan.nama}</h1>
                                <Badge className={kegiatan.selesai
                                    ? 'bg-green-100 text-green-700 border-green-200'
                                    : 'bg-amber-100 text-amber-700 border-amber-200'} variant="outline">
                                    {kegiatan.selesai ? '✓ Pendataan Selesai' : '● Proses Pendataan'}
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />{kegiatan.lokasi}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays className="w-3.5 h-3.5" />{kegiatan.tanggal_teks}
                                </span>
                                {kegiatan.catatan && (
                                    <span className="flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5" />{kegiatan.catatan}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-1">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Penanggung Jawab</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {pj.length > 0 ? pj.map((p: Petugas) => (
                                            <Badge key={p.id} variant="secondary">{p.nama}</Badge>
                                        )) : <span className="text-sm text-muted-foreground">-</span>}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Instruktur</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {instruktur.length > 0 ? instruktur.map((p: Petugas) => (
                                            <Badge key={p.id} variant="secondary">{p.nama}</Badge>
                                        )) : <span className="text-sm text-muted-foreground">-</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                            <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                                <Link href={`/${org}/kegiatan`}>Kembali</Link>
                            </Button>
                            <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                                <Link href={`/${org}/kegiatan/${kegiatan.id}/edit`}>
                                    <Pencil className="w-3.5 h-3.5 mr-1.5" />Edit
                                </Link>
                            </Button>
                            <Button size="sm" variant={kegiatan.selesai ? 'secondary' : 'default'} 
                                onClick={toggleStatus} disabled={processingStatus} className="cursor-pointer">
                                {processingStatus ? (
                                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                                ) : (
                                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                )}
                                {kegiatan.selesai ? 'Buka Pendataan' : 'Tutup Pendataan'}
                            </Button>
                            <Button size="sm" variant="destructive" onClick={deleteKegiatan} disabled={processingDelete} className="cursor-pointer">
                                {processingDelete ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue={defaultTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList>
                        <TabsTrigger value="peserta" className="cursor-pointer">Peserta & Nilai ({pesertaPaginated?.total || 0})</TabsTrigger>
                        <TabsTrigger value="materi" className="cursor-pointer">Materi ({materiList.length})</TabsTrigger>
                        <TabsTrigger value="sertifikat" className="cursor-pointer">Sertifikat</TabsTrigger>
                    </TabsList>

                    <TabsContent value="peserta" className="mt-4 space-y-4">
                        <div className="flex justify-end items-center">
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" className="cursor-pointer border-green-600/30 text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30" asChild>
                                    <a href={`/${org}/kegiatan/${kegiatan.id}/export`} >
                                        <Download className="w-3.5 h-3.5 mr-1.5" />Export Excel
                                    </a>
                                </Button>
                                <Button size="sm" className="cursor-pointer" asChild>
                                    <Link href={`/${org}/kegiatan/${kegiatan.id}/peserta/create`}>
                                        <Plus className="w-3.5 h-3.5 mr-1.5" />Tambah Peserta
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                                        <TableHead className="w-12 text-center font-semibold">No</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap">Nama Peserta</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap">Tempat, Tanggal Lahir</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap">Alamat</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap">No HP</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap">Asal Sekolah</TableHead>
                                        <TableHead className="text-center w-24 font-semibold">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pesertaList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                                                Belum ada data peserta.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        pesertaList.map((p: Peserta, idx: number) => {
                                            const itemNumber = (pesertaPaginated.from || 1) + idx;
                                            return (
                                                <TableRow key={p.id} className="hover:bg-muted/20 cursor-pointer" onClick={() => router.visit(`/${org}/kegiatan/${kegiatan.id}/peserta/${p.id}`)}>
                                                    <TableCell className="text-center text-muted-foreground">{itemNumber}</TableCell>
                                                    <TableCell className="font-semibold whitespace-nowrap">{p.nama}</TableCell>
                                                    <TableCell className="max-w-[180px] truncate" title={p.tempat_lahir && p.tanggal_lahir ? `${p.tempat_lahir}, ${new Date(p.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : p.tempat_lahir || '-'}>
                                                        {p.tempat_lahir && p.tanggal_lahir ? `${p.tempat_lahir}, ${new Date(p.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : p.tempat_lahir || '-'}
                                                    </TableCell>
                                                    <TableCell className="max-w-[160px] truncate" title={p.alamat || '-'}>{p.alamat || '-'}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{p.no_hp || '-'}</TableCell>
                                                    <TableCell className="max-w-[160px] truncate" title={p.sekolah || '-'}>{p.sekolah || '-'}</TableCell>
                                                    <TableCell className="text-center p-1" onClick={(e) => e.stopPropagation()}>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/${org}/kegiatan/${kegiatan.id}/peserta/${p.id}`} className="cursor-pointer w-full flex items-center">
                                                                        <Eye className="w-4 h-4 mr-2" /> Detail
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/${org}/kegiatan/${kegiatan.id}/peserta/${p.id}/edit`} className="cursor-pointer w-full flex items-center">
                                                                        <Pencil className="w-4 h-4 mr-2" /> Edit Data & Nilai
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem 
                                                                    className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                                                                    onClick={() => deletePeserta(p.id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4 mr-2" /> Hapus
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        
                        {/* Pagination Peserta */}
                        {pesertaPaginated && pesertaPaginated.last_page > 1 && (
                            <div className="flex justify-end py-2">
                                <Pagination className="justify-end w-auto mx-0">
                                    <PaginationContent>
                                        {pesertaPaginated.links.map((link, i: number) => {
                                            const isFirst = i === 0;
                                            const isLast = i === pesertaPaginated.links.length - 1;
                                            
                                            if (isFirst) {
                                                return (
                                                    <PaginationItem key={i}>
                                                        <PaginationPrevious href={link.url || '#'} className={!link.url ? 'pointer-events-none opacity-50' : ''} />
                                                    </PaginationItem>
                                                );
                                            }
                                            if (isLast) {
                                                return (
                                                    <PaginationItem key={i}>
                                                        <PaginationNext href={link.url || '#'} className={!link.url ? 'pointer-events-none opacity-50' : ''} />
                                                    </PaginationItem>
                                                );
                                            }
                                            if (link.label.includes('...')) {
                                                return (
                                                    <PaginationItem key={i}>
                                                        <PaginationEllipsis />
                                                    </PaginationItem>
                                                );
                                            }
                                            return (
                                                <PaginationItem key={i}>
                                                    <PaginationLink href={link.url || '#'} isActive={link.active}>
                                                        {link.label}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        })}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="materi" className="mt-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">{materiList.length} materi terdaftar</p>
                            <Button size="sm" onClick={openAddMateri} className="cursor-pointer">
                                <Plus className="w-3.5 h-3.5 mr-1.5" />Tambah Materi
                            </Button>
                        </div>
                        <div className="rounded-xl border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                                        <TableHead className="w-16 font-semibold">No</TableHead>
                                        <TableHead className="font-semibold">Nama Materi</TableHead>
                                        <TableHead className="text-right font-semibold w-36">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {materiList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                                                Belum ada materi. Klik "Tambah Materi" untuk memulai.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        materiList.map((m: Materi, index: number) => (
                                            <TableRow key={m.id} className="hover:bg-muted/20">
                                                <TableCell className="text-muted-foreground font-medium">{m.urutan}</TableCell>
                                                <TableCell className="font-medium">{m.nama}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer" title="Naik"
                                                            disabled={index === 0}
                                                            onClick={() => router.patch(`/${org}/materi/${m.id}/up`)}>
                                                            <ArrowUp className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer" title="Turun"
                                                            disabled={index === materiList.length - 1}
                                                            onClick={() => router.patch(`/${org}/materi/${m.id}/down`)}>
                                                            <ArrowDown className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer" onClick={() => openEditMateri(m)}>
                                                            <Pencil className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            onClick={() => deleteMateri(m.id)}
                                                            disabled={deletingMateriId === m.id}>
                                                            {deletingMateriId === m.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="sertifikat" className="mt-4">
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            {org === 'ippnu' ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                                    <h3 className="text-lg font-medium text-foreground">Modul Sertifikat Belum Tersedia</h3>
                                    <p className="mt-1">Template dan aturan untuk cetak sertifikat IPPNU saat ini masih kosong / belum ada.</p>
                                </div>
                            ) : (
                                <SertifikatTab org={org} kegiatan={kegiatan} />
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Dialog Form Materi */}
            <Dialog open={isMateriDialogOpen} onOpenChange={setIsMateriDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingMateri ? 'Edit Materi' : 'Tambah Materi Baru'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitMateri} className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="nama_materi">Nama Materi</Label>
                            <Input id="nama_materi" value={materiData.nama} onChange={e => setMateriData('nama', e.target.value)}
                                placeholder="Contoh: Ke-NU-an, Ke-IPNU-an..." required autoFocus />
                            <InputError message={errorsMateri.nama} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setIsMateriDialogOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={processingMateri} className="cursor-pointer">
                                {processingMateri && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {processingMateri ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Global Confirm Dialog Component */}
            <ConfirmDialog 
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                description={confirmDialog.description}
                actionText={confirmDialog.actionText}
                isDestructive={confirmDialog.isDestructive}
                onConfirm={confirmDialog.onConfirm}
                onClose={closeConfirm}
                processing={isDialogProcessing}
            />
        </>
    );
}

Show.layout = (page: ReactNode) => <ShowLayout>{page}</ShowLayout>;
