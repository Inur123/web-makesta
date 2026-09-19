import { type ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PesertaForm from './PesertaForm';
import { Kegiatan } from '@/types';

function CreateLayout({ children }: { children: ReactNode }) {
    const { org, kegiatan } = usePage<{ org: string; kegiatan: { id: string; nama: string } }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: `/${org}/kegiatan` },
            { title: kegiatan?.nama || 'Detail', href: `/${org}/kegiatan/${kegiatan?.id}` },
            { title: 'Tambah Peserta', href: '#' }
        ]}>{children}</AppLayout>
    );
}

export default function Create({ org, kegiatan }: { org: 'ipnu' | 'ippnu'; kegiatan: Kegiatan }) {
    return (
        <>
            <Head title="Tambah Peserta" />
            <div className="p-4 sm:p-6">
                <PesertaForm org={org} kegiatan={kegiatan} />
            </div>
        </>
    );
}

Create.layout = (page: ReactNode) => <CreateLayout>{page}</CreateLayout>;
