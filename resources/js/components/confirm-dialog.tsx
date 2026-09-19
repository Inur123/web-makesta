import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogDescription, ResponsiveDialogFooter, ResponsiveDialogHeader, ResponsiveDialogTitle } from '@/components/ui/responsive-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: ReactNode;
    actionText?: string;
    isDestructive?: boolean;
    onConfirm: () => void;
    processing?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    title,
    description,
    actionText = 'Ya, Lanjutkan',
    isDestructive = false,
    onConfirm,
    processing = false
}: ConfirmDialogProps) {
    return (
        <ResponsiveDialog open={isOpen} onOpenChange={(open) => {
            if (!open && !processing) onClose();
        }}>
            <ResponsiveDialogContent className="sm:max-w-md">
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>{title}</ResponsiveDialogTitle>
                    <ResponsiveDialogDescription>{description}</ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogFooter className="mt-4">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onClose} 
                        disabled={processing} 
                        className="cursor-pointer"
                    >
                        Batal
                    </Button>
                    <Button 
                        type="button"
                        variant={isDestructive ? 'destructive' : 'default'}
                        onClick={(e) => { e.preventDefault(); onConfirm(); }}
                        disabled={processing}
                        className="cursor-pointer min-w-[100px]"
                    >
                        {processing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        {processing ? 'Memproses...' : actionText}
                    </Button>
                </ResponsiveDialogFooter>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
}
