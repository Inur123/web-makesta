import { Form, Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { store } from '@/routes/login';
import { Turnstile } from '@marsidev/react-turnstile';
import { useAppearance } from '@/hooks/use-appearance';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { errors } = usePage().props;
    const { resolvedAppearance } = useAppearance();

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0] as string;
            toast.error(firstError);
        }
    }, [errors]);

    return (
        <>
            <Head title="Masuk" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="flex justify-start mt-2">
                                <div className="relative w-[300px] h-[65px]">
                                    {/* Skeleton placeholder behind the widget */}
                                    <div className="absolute inset-0 z-0 flex items-center space-x-3 border bg-card rounded-[3px] p-3 w-[300px] h-[65px]">
                                        <Skeleton className="h-7 w-7 rounded-sm shrink-0" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-2 w-3/4" />
                                            <Skeleton className="h-2 w-1/2" />
                                        </div>
                                        <Skeleton className="h-8 w-10 rounded-sm shrink-0" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <Turnstile
                                            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                                            options={{
                                                theme: resolvedAppearance,
                                                size: 'normal'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full cursor-pointer"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Masuk
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk ke akun Anda',
    description: 'Masukkan email dan password Anda di bawah ini untuk masuk',
};
