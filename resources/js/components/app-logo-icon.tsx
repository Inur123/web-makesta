import { ImgHTMLAttributes } from 'react';
import { asset } from '@/lib/utils';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img {...props} 
            src={asset('images/logo-makesta.png')} 
            alt="Logo Makesta" 
        />
    );
}
