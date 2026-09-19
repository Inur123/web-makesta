import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return appUrl(typeof url === 'string' ? url : url.url);
}

function configuredBasePath(): string {
    if (typeof document === 'undefined') {
        return '';
    }

    const value =
        document
            .querySelector<HTMLMetaElement>('meta[name="app-base-path"]')
            ?.content.trim() ?? '';

    if (value === '' || value === '/') {
        return '';
    }

    return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

/**
 * Prefix an application-local URL with the configured deployment path.
 *
 * Local development uses an empty prefix, while production may use
 * `/makesta`. Absolute/external URLs and anchors are returned untouched.
 */
export function appUrl(path: string): string {
    if (
        path === '' ||
        path.startsWith('#') ||
        path.startsWith('//') ||
        /^[a-z][a-z\d+.-]*:/i.test(path)
    ) {
        return path;
    }

    const basePath = configuredBasePath();
    const suffixIndex = path.search(/[?#]/u);
    const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
    const suffix = suffixIndex === -1 ? '' : path.slice(suffixIndex);
    const normalizedPath = `/${pathname.replace(/^\/+/, '')}`;

    if (
        basePath === '' ||
        normalizedPath === basePath ||
        normalizedPath.startsWith(`${basePath}/`)
    ) {
        return `${normalizedPath}${suffix}`;
    }

    return `${basePath}${normalizedPath}${suffix}`;
}

export function asset(path: string): string {
    return appUrl(path);
}

export function appRoute<T extends { url: string }>(route: T): T {
    return { ...route, url: appUrl(route.url) };
}

export function appForm<T extends { action: string }>(form: T): T {
    return { ...form, action: appUrl(form.action) };
}
