import { Form, Head, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { store } from '@/routes/login';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useAppearance } from '@/hooks/use-appearance';
import { appForm } from '@/lib/utils';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status }: Props) {
    const { errors } = usePage().props;
    const { resolvedAppearance } = useAppearance();
    const turnstileRef = useRef<TurnstileInstance>(undefined);
    const [turnstileToken, setTurnstileToken] = useState('');

    const resetTurnstile = () => {
        setTurnstileToken('');
        turnstileRef.current?.reset();
    };

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
                {...appForm(store.form())}
                resetOnSuccess={['password']}
                onError={resetTurnstile}
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

                            <div className="mt-2 flex justify-start">
                                <div className="relative h-[65px] w-[300px]">
                                    {/* Skeleton placeholder behind the widget */}
                                    <div className="bg-card absolute inset-0 z-0 flex h-[65px] w-[300px] items-center space-x-3 rounded-[3px] border p-3">
                                        <Skeleton className="h-7 w-7 shrink-0 rounded-sm" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-2 w-3/4" />
                                            <Skeleton className="h-2 w-1/2" />
                                        </div>
                                        <Skeleton className="h-8 w-10 shrink-0 rounded-sm" />
                                    </div>

                                    <div className="relative z-10">
                                        <Turnstile
                                            ref={turnstileRef}
                                            siteKey={
                                                import.meta.env
                                                    .VITE_TURNSTILE_SITE_KEY
                                            }
                                            onSuccess={setTurnstileToken}
                                            onExpire={() =>
                                                setTurnstileToken('')
                                            }
                                            onError={() =>
                                                setTurnstileToken('')
                                            }
                                            options={{
                                                theme: resolvedAppearance,
                                                size: 'normal',
                                                responseField: false,
                                            }}
                                        />
                                        <input
                                            type="hidden"
                                            name="cf-turnstile-response"
                                            value={turnstileToken}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full cursor-pointer"
                                tabIndex={4}
                                disabled={processing || turnstileToken === ''}
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
