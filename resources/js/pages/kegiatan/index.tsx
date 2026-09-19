import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState, type ReactNode } from 'react';
import { Search, Plus, CalendarDays, MapPin, Users, Eye } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Kegiatan, PaginatedData } from '@/types';

interface Props {
    org: 'ipnu' | 'ippnu';
    kegiatans: PaginatedData<Kegiatan>;
    filters: { search: string | null; status: string | null };
}

function KegiatanIndexLayout({ children }: { children: ReactNode }) {
    const { org } = usePage<{ org: string }>().props;
    return (
        <AppLayout breadcrumbs={[{ title: 'Daftar Kegiatan', href: `/${org}/kegiatan` }]}>
            {children}
        </AppLayout>
    );
}

export default function Index({ org, kegiatans, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'semua');

    const updateFilter = (newSearch: string, newStatus: string) => {
        router.get(`/${org}/kegiatan`, { search: newSearch, status: newStatus }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title={`Kegiatan ${org.toUpperCase()}`} />
            <div className="flex flex-col gap-5 p-4 sm:p-6 h-full overflow-y-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Daftar Kegiatan</h1>
                        <p className="text-muted-foreground text-sm mt-0.5">Kelola kegiatan MAKESTA {org.toUpperCase()}</p>
                    </div>
                    <Button asChild>
                        <Link href={`/${org}/kegiatan/create`}>
                            <Plus className="w-4 h-4 mr-2" />Tambah Kegiatan
                        </Link>
                    </Button>
                </div>

                {/* Filter bar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="text" placeholder="Cari nama / lokasi kegiatan..."
                            className="pl-9" value={search}
                            onChange={(e) => { setSearch(e.target.value); updateFilter(e.target.value, status); }} />
                    </div>
                    <Select value={status} onValueChange={(val) => { setStatus(val); updateFilter(search, val); }}>
                        <SelectTrigger className="w-full sm:w-[170px] shrink-0">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="semua">Semua Status</SelectItem>
                            <SelectItem value="belum">Proses Pendataan</SelectItem>
                            <SelectItem value="selesai">Pendataan Selesai</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead className="w-12 text-center font-semibold">No</TableHead>
                                <TableHead className="font-semibold">Nama Kegiatan</TableHead>
                                <TableHead className="font-semibold">Lokasi</TableHead>
                                <TableHead className="font-semibold">Tanggal</TableHead>
                                <TableHead className="font-semibold text-center w-24">Peserta</TableHead>
                                <TableHead className="font-semibold w-36">Status Pendataan</TableHead>
                                <TableHead className="w-20 text-center font-semibold">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kegiatans.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-16 text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <CalendarDays className="w-10 h-10 text-muted-foreground/40" />
                                            <p className="font-medium">Belum ada kegiatan</p>
                                            <p className="text-sm">Klik "Tambah Kegiatan" untuk memulai</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                kegiatans.data.map((k, index) => (
                                    <TableRow key={k.id} className="hover:bg-muted/20 cursor-pointer"
                                        onClick={() => router.visit(`/${org}/kegiatan/${k.id}`)}>
                                        <TableCell className="text-center text-muted-foreground">
                                            {(kegiatans.from || 1) + index}
                                        </TableCell>
                                        <TableCell className="font-semibold">{k.nama}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                                <MapPin className="w-3.5 h-3.5 shrink-0" />{k.lokasi}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                                <CalendarDays className="w-3.5 h-3.5 shrink-0" />{k.tanggal_teks}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Users className="w-3.5 h-3.5 text-muted-foreground" />
                                                <span className="font-medium">{k.peserta_count}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={k.selesai
                                                ? 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200'
                                                : 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200'} variant="outline">
                                                {k.selesai ? '✓ Pendataan Selesai' : '● Proses Pendataan'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="ghost" size="icon" asChild
                                                className="text-muted-foreground hover:text-foreground"
                                                onClick={e => e.stopPropagation()}>
                                                <Link href={`/${org}/kegiatan/${k.id}`}>
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer / Pagination */}
                <div className="flex justify-end mt-2 py-2 overflow-x-auto">
                    {kegiatans.last_page > 1 && (
                        <Pagination className="justify-end w-auto mx-0">
                            <PaginationContent>
                                {kegiatans.links.map((link, i) => {
                                    const isFirst = i === 0;
                                    const isLast = i === kegiatans.links.length - 1;
                                    
                                    if (isFirst) {
                                        return (
                                            <PaginationItem key={i}>
                                                <PaginationPrevious 
                                                    href={link.url || '#'} 
                                                    className={!link.url ? 'pointer-events-none opacity-50' : ''} 
                                                />
                                            </PaginationItem>
                                        );
                                    }
                                    if (isLast) {
                                        return (
                                            <PaginationItem key={i}>
                                                <PaginationNext 
                                                    href={link.url || '#'} 
                                                    className={!link.url ? 'pointer-events-none opacity-50' : ''} 
                                                />
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
                                            <PaginationLink 
                                                href={link.url || '#'} 
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => <KegiatanIndexLayout>{page}</KegiatanIndexLayout>;
