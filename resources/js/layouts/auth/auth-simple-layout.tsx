import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import { toUrl } from '@/lib/utils';
import { asset } from '@/lib/utils';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={toUrl(home())}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <img src={asset('images/logo-makesta-2.png')} alt="Logo Makesta" className="h-16 md:h-20 w-auto mb-4 block dark:hidden" /><img src={asset('images/logo-putih.png')} alt="Logo Makesta" className="h-16 md:h-20 w-auto mb-4 hidden dark:block" />
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
