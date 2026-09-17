import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open && !processing) onClose();
        }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
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
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
