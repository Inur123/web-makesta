import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    status: number;
}

export default function ErrorPage({ status }: Props) {
    const title: Record<number, string> = {
        503: 'Layanan Tidak Tersedia',
        500: 'Terjadi Kesalahan Server',
        429: 'Terlalu Banyak Permintaan',
        419: 'Sesi Kedaluwarsa',
        404: 'Halaman Tidak Ditemukan',
        403: 'Akses Ditolak',
        401: 'Tidak Diizinkan',
    };

    const description: Record<number, string> = {
        503: 'Maaf, layanan kami sedang dalam pemeliharaan. Silakan periksa kembali beberapa saat lagi.',
        500: 'Ups, sepertinya ada masalah pada server kami. Tim kami akan segera memperbaikinya.',
        429: 'Anda telah melakukan terlalu banyak permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.',
        419: 'Sesi halaman Anda telah kedaluwarsa. Silakan muat ulang (refresh) dan coba lagi.',
        404: 'Halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali ke halaman utama.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
        401: 'Anda harus masuk (login) terlebih dahulu untuk mengakses halaman ini.',
    };

    const displayTitle = title[status] || 'Terjadi Kesalahan';
    const displayDescription = description[status] || 'Terjadi kesalahan sistem. Silakan hubungi administrator.';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 relative overflow-hidden">
            <Head title={displayTitle} />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <span className="text-[10rem] sm:text-[15rem] md:text-[25rem] font-bold text-muted/20 leading-none tracking-tighter">
                    {status}
                </span>
            </div>

            {/* Content */}
            <div className="text-center z-10 relative max-w-lg mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                    {status === 404 ? 'Ups! Halaman Tidak Ditemukan' : displayTitle}
                </h1>
                
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {displayDescription}
                </p>

                <Button asChild size="lg" className="h-14 px-10 text-base font-semibold cursor-pointer bg-[#03783e] hover:bg-[#025c2f] text-white rounded-full shadow-lg hover:shadow-[#03783e]/25 hover:-translate-y-1 transition-all duration-300">
                    <Link href="/">
                        Kembali ke Halaman Utama
                    </Link>
                </Button>
            </div>
        </div>
    );
}
