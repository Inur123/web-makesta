import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useFlashToast(): void {
    useEffect(() => {
        const handleProps = (props: any) => {
            if (props.flash?.success) {
                toast.success(props.flash.success);
                props.flash.success = null; // Clear so it doesn't fire again on hot reload
            }
            if (props.flash?.error) {
                toast.error(props.flash.error);
                props.flash.error = null;
            }
        };

        // Handle initial load
        if (router.page?.props) {
            handleProps(router.page.props);
        }

        // Listen for navigation events
        const unsubscribe = router.on('navigate', (event) => {
            handleProps(event.detail.page.props);
        });

        return () => {
            unsubscribe();
        };
    }, []);
}
