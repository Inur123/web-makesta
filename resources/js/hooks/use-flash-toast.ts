import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useFlashToast(): void {
    useEffect(() => {
        const handleProps = (props: any) => {
            if (props.flash?.success) {
                toast.success(props.flash.success);
                props.flash.success = null;
            }
            if (props.flash?.error) {
                toast.error(props.flash.error);
                props.flash.error = null;
            }
        };

        if (router.page?.props) {
            handleProps(router.page.props);
        }

        const unsubscribe = router.on('success', (event) => {
            handleProps(event.detail.page.props);
        });
        
        // Also listen on finish just in case success is bypassed
        const unsubscribeFinish = router.on('finish', () => {
             if (router.page?.props) {
                 handleProps(router.page.props);
             }
        });

        return () => {
            unsubscribe();
            unsubscribeFinish();
        };
    }, []);
}
