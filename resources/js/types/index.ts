export type * from './auth';
export type * from './navigation';
export type * from './ui';

export interface Materi {
    id: string;
    nama: string;
    kegiatan_id: string;
    urutan: number;
}

export interface Nilai {
    id: string;
    peserta_id: string;
    materi_id: string;
    nilai: number;
}

export interface Petugas {
    id: string;
    kegiatan_id: string;
    nama: string;
    peran: string;
}

export interface Peserta {
    id: string;
    kegiatan_id: string;
    nama: string;
    tempat_lahir: string | null;
    tanggal_lahir: string | null;
    alamat: string | null;
    no_hp: string | null;
    sekolah: string | null;
    created_at: string;
    updated_at: string;
    nilai?: Nilai[];
}

export interface Kegiatan {
    id: string;
    organisasi: string;
    nama: string;
    lokasi: string;
    tanggal_mulai: string | null;
    tanggal_selesai: string | null;
    tanggal_teks: string;
    catatan: string | null;
    selesai: boolean;
    penanggung_jawab: string | null;
    instruktur: string | null;
    created_at: string;
    updated_at: string;
    materi?: Materi[];
    peserta?: Peserta[];
    petugas?: Petugas[];
    peserta_count?: number;
}

export interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    meta?: any;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
}

export interface DashboardStats {
    kegiatan: number;
    peserta: number;
    pending: number;
}
