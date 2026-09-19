import * as React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';

interface ResponsiveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

function ResponsiveDialog({ open, onOpenChange, children }: ResponsiveDialogProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                {children}
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog>
    );
}

function ResponsiveDialogContent({ className, children, ...props }: React.ComponentProps<'div'> & { className?: string }) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <DrawerContent>
                <div className="overflow-y-auto max-h-[80vh] px-4 pb-4">
                    {children}
                </div>
            </DrawerContent>
        );
    }

    return (
        <DialogContent className={className} {...(props as any)}>
            {children}
        </DialogContent>
    );
}

function ResponsiveDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
    const isMobile = useIsMobile();
    if (isMobile) return <DrawerHeader className={className} {...props} />;
    return <DialogHeader className={className} {...props} />;
}

function ResponsiveDialogTitle({ className, ...props }: React.ComponentProps<'h2'>) {
    const isMobile = useIsMobile();
    if (isMobile) return <DrawerTitle className={className} {...(props as any)} />;
    return <DialogTitle className={className} {...(props as any)} />;
}

function ResponsiveDialogDescription({ className, ...props }: React.ComponentProps<'p'>) {
    const isMobile = useIsMobile();
    if (isMobile) return <DrawerDescription className={className} {...(props as any)} />;
    return <DialogDescription className={className} {...(props as any)} />;
}

function ResponsiveDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
    const isMobile = useIsMobile();
    if (isMobile) return <DrawerFooter className={className} {...props} />;
    return <DialogFooter className={className} {...props} />;
}

export {
    ResponsiveDialog,
    ResponsiveDialogContent,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogDescription,
    ResponsiveDialogFooter,
};
