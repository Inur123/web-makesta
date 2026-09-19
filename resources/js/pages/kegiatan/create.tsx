import { type ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import KegiatanForm from './KegiatanForm';

interface Props { org: 'ipnu' | 'ippnu'; }

function CreateLayout({ children }: { children: ReactNode }) {
    const { org } = usePage<{ org: string }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: `/${org}/kegiatan` },
            { title: 'Tambah Kegiatan', href: '#' }
        ]}>{children}</AppLayout>
    );
}

export default function Create({ org }: Props) {
    return (
        <>
            <Head title="Tambah Kegiatan" />
            <div className="p-4 sm:p-6">
                <KegiatanForm org={org} />
            </div>
        </>
    );
}

Create.layout = (page: ReactNode) => <CreateLayout>{page}</CreateLayout>;
