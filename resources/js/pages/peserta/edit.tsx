import { type ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PesertaForm from './PesertaForm';
import { Kegiatan, Peserta } from '@/types';

function EditLayout({ children }: { children: ReactNode }) {
    const { org, kegiatan } = usePage<{ org: string; kegiatan: { id: string; nama: string } }>().props;
    return (
        <AppLayout breadcrumbs={[
            { title: 'Daftar Kegiatan', href: `/${org}/kegiatan` },
            { title: kegiatan?.nama || 'Detail', href: `/${org}/kegiatan/${kegiatan?.id}` },
            { title: 'Edit Peserta', href: '#' }
        ]}>{children}</AppLayout>
    );
}

interface Props { org: 'ipnu' | 'ippnu'; kegiatan: Kegiatan; peserta: Peserta; nilaiMap: Record<string, number>; }

export default function Edit({ org, kegiatan, peserta, nilaiMap }: Props) {
    return (
        <>
            <Head title="Edit Peserta" />
            <div className="p-6">
                <PesertaForm org={org} kegiatan={kegiatan} peserta={peserta} nilaiMap={nilaiMap} />
            </div>
        </>
    );
}

Edit.layout = (page: ReactNode) => <EditLayout>{page}</EditLayout>;
