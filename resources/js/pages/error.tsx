import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    status: number;
}

export default function ErrorPage({ status }: Props) {
    const title = {
        503: 'Layanan Tidak Tersedia',
        500: 'Terjadi Kesalahan Server',
        404: 'Halaman Tidak Ditemukan',
        403: 'Akses Ditolak',
    }[status] || 'Terjadi Kesalahan';

    const description = {
        503: 'Maaf, layanan kami sedang dalam pemeliharaan. Silakan periksa kembali beberapa saat lagi.',
        500: 'Ups, sepertinya ada masalah pada server kami. Tim kami akan segera memperbaikinya.',
        404: 'Halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali ke halaman utama.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
    }[status] || 'Terjadi kesalahan sistem. Silakan hubungi administrator.';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 relative overflow-hidden">
            <Head title={title} />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
                <span className="text-[10rem] sm:text-[15rem] md:text-[25rem] font-bold text-muted/30 leading-none tracking-tighter">
                    {status}
                </span>
            </div>

            {/* Content */}
            <div className="text-center z-10 max-w-lg mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                    {status === 404 ? 'Ups! Halaman Tidak Ditemukan' : title}
                </h1>
                
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {description}
                </p>

                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/">
                        Kembali ke Halaman Utama
                    </Link>
                </Button>
            </div>
        </div>
    );
}
