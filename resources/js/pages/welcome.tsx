import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogoIcon from '@/components/app-logo-icon';
import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { asset } from '@/lib/utils';

export default function Welcome() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="Makesta - IPNU IPPNU" />
            <div className="flex flex-col min-h-[100dvh] bg-background text-foreground transition-colors duration-300 font-sans selection:bg-green-200 selection:text-green-900 relative">
                
                {/* Subtle Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[800px] md:h-[600px] opacity-25 pointer-events-none">
                    <div className="absolute inset-0 bg-[#03783e]/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
                </div>
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Navbar */}
                <header className="w-full flex items-center justify-between px-6 md:px-12 py-6 relative z-10">
                    <div className="flex items-center">
                        <img src={asset('images/logo-makesta-2.png')} alt="Logo Makesta" className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity block dark:hidden" /><img src={asset('images/logo-putih.png')} alt="Logo Makesta" className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity hidden dark:block" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer rounded-full text-muted-foreground hover:bg-muted"
                            onClick={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
                        >
                            {appearance === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </div>
                </header>

                {/* Main Content (Perfectly Centered) */}
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10 w-full max-w-4xl mx-auto">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full border border-[#03783e]/30 bg-green-50/50 dark:bg-green-900/30 px-4 py-1.5 text-xs font-semibold text-[#03783e] dark:text-green-400 backdrop-blur-md mb-8 uppercase tracking-widest shadow-sm">
                        Sistem Terpadu IPNU & IPPNU
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
                        Administrasi Makesta <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03783e] to-green-500">
                            Dalam Satu Platform
                        </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Input data peserta, catat nilai dari pemateri, dan pantau kelulusan secara otomatis, cepat, dan tanpa ribet.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-10">
                        <Button asChild size="lg" className="h-14 px-10 text-base font-semibold cursor-pointer bg-[#03783e] hover:bg-[#025c2f] text-white rounded-full shadow-lg hover:shadow-[#03783e]/25 hover:-translate-y-1 transition-all duration-300">
                            <Link href="/login">Masuk ke Sistem</Link>
                        </Button>
                    </div>

                </main>

                {/* Footer */}
                <footer className="w-full py-6 text-center text-sm text-muted-foreground/60 relative z-10">
                    &copy; {new Date().getFullYear()} IPNU & IPPNU. All rights reserved.
                </footer>
            </div>
        </>
    );
}
