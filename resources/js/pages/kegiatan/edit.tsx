import { type ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import KegiatanForm from './KegiatanForm';
import { Kegiatan } from '@/types';

interface Props { org: 'ipnu' | 'ippnu'; kegiatan: Kegiatan; }

function EditLayout({ children }: { children: ReactNode }) {
    const { org, kegiatan } = usePage<{ org: string; kegiatan: { id: string; nama: string } }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: `/${org}/kegiatan` },
            { title: kegiatan?.nama || 'Detail', href: `/${org}/kegiatan/${kegiatan?.id}` },
            { title: 'Edit', href: '#' }
        ]}>{children}</AppLayout>
    );
}

export default function Edit({ org, kegiatan }: Props) {
    return (
        <>
            <Head title="Edit Kegiatan" />
            <div className="p-4 sm:p-6">
                <KegiatanForm org={org} kegiatan={kegiatan} />
            </div>
        </>
    );
}

Edit.layout = (page: ReactNode) => <EditLayout>{page}</EditLayout>;
