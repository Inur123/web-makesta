import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CalendarCheck, Clock, Layers, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StatsProps {
    kegiatan: number;
    peserta: number;
    pending: number;
}

interface Props {
    stats: {
        ipnu: StatsProps;
        ippnu: StatsProps;
        total: StatsProps;
    };
    recentKegiatan: any[];
}

export default function Dashboard({ stats, recentKegiatan }: Props) {
    const StatCard = ({ title, value, icon: Icon, description }: { title: string, value: number | string, icon: any, description?: string }) => (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4 px-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground opacity-70" />
            </CardHeader>
            <CardContent className="pb-4 px-4">
                <div className="text-2xl font-bold">{value}</div>
                {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            </CardContent>
        </Card>
    );

    const ipnuSelesai = stats.ipnu.kegiatan - stats.ipnu.pending;
    const ippnuSelesai = stats.ippnu.kegiatan - stats.ippnu.pending;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                
                {/* Header Title */}
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Ringkasan data Masa Kesetiaan Anggota IPNU & IPPNU</p>
                </div>

                {/* Top Stats Grid - 4 Columns */}
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    <StatCard 
                        title="Total Kegiatan" 
                        value={stats.total.kegiatan} 
                        icon={Layers} 
                        description={`${stats.total.pending} sedang berjalan`} 
                    />
                    <StatCard 
                        title="Total Peserta" 
                        value={stats.total.peserta} 
                        icon={Users} 
                        description="Keseluruhan peserta terdaftar" 
                    />
                    <StatCard 
                        title="Kegiatan IPNU" 
                        value={stats.ipnu.kegiatan} 
                        icon={CalendarCheck} 
                        description={`${stats.ipnu.peserta} peserta`} 
                    />
                    <StatCard 
                        title="Kegiatan IPPNU" 
                        value={stats.ippnu.kegiatan} 
                        icon={CalendarCheck} 
                        description={`${stats.ippnu.peserta} peserta`} 
                    />
                </div>

                {/* Bottom Section - 2 Columns (Table takes more space) */}
                <div className="grid gap-6 md:grid-cols-3">
                    
                    {/* Left: Recent Activities Table */}
                    <Card className="md:col-span-2 shadow-sm">
                        <CardHeader className="px-6 py-4 border-b">
                            <CardTitle className="text-base flex items-center">
                                <Activity className="w-4 h-4 mr-2" /> Kegiatan Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead className="pl-6">Kegiatan</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead className="text-center">Peserta</TableHead>
                                        <TableHead className="pr-6 text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentKegiatan.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                                                Belum ada kegiatan terdaftar.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        recentKegiatan.map((k) => (
                                            <TableRow key={k.id} className="hover:bg-muted/10">
                                                <TableCell className="pl-6">
                                                    <div className="flex flex-col gap-1">
                                                        <Link href={`/${k.organisasi}/kegiatan/${k.id}`} className="font-medium hover:underline hover:text-green-600 transition-colors">
                                                            {k.nama}
                                                        </Link>
                                                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                                            {k.organisasi}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">{k.tanggal_teks}</TableCell>
                                                <TableCell className="text-center font-medium">{k.peserta_count}</TableCell>
                                                <TableCell className="pr-6 text-right">
                                                    {k.selesai ? (
                                                        <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">Selesai</Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-yellow-600 border-yellow-600 bg-yellow-50">Berjalan</Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Right: Breakdown & Progress */}
                    <div className="space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader className="px-5 py-4 border-b">
                                <CardTitle className="text-base">Detail IPNU</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Berjalan</span>
                                        <span className="font-medium">{stats.ipnu.pending}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: stats.ipnu.kegiatan ? `${(stats.ipnu.pending / stats.ipnu.kegiatan) * 100}%` : '0%' }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Selesai</span>
                                        <span className="font-medium">{ipnuSelesai}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: stats.ipnu.kegiatan ? `${(ipnuSelesai / stats.ipnu.kegiatan) * 100}%` : '0%' }} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader className="px-5 py-4 border-b">
                                <CardTitle className="text-base">Detail IPPNU</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Berjalan</span>
                                        <span className="font-medium">{stats.ippnu.pending}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: stats.ippnu.kegiatan ? `${(stats.ippnu.pending / stats.ippnu.kegiatan) * 100}%` : '0%' }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Selesai</span>
                                        <span className="font-medium">{ippnuSelesai}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: stats.ippnu.kegiatan ? `${(ippnuSelesai / stats.ippnu.kegiatan) * 100}%` : '0%' }} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
