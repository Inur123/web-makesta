import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            src="/images/logo-makesta.png" 
            alt="Logo Makesta" 
            {...props} 
        />
    );
}
