<?php

namespace Database\Seeders;

use App\Models\Kegiatan;
use App\Models\Peserta;
use Illuminate\Database\Seeder;

class KegiatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kegiatans = Kegiatan::factory()->count(5)->create();

        foreach ($kegiatans as $kegiatan) {
            // Buat 5 materi untuk setiap kegiatan dengan urutan 1-5
            $materis = collect();
            $namaMateris = ['Ke-NU-an', 'Ke-IPNU-IPPNU-an', 'Aswaja', 'Ke-Indonesia-an', 'Amaliyah NU'];
            
            foreach ($namaMateris as $index => $nama) {
                $materis->push(\App\Models\Materi::factory()->create([
                    'kegiatan_id' => $kegiatan->id,
                    'nama' => $nama,
                    'urutan' => $index + 1
                ]));
            }
            
            // Buat 20 peserta untuk setiap kegiatan
            $pesertas = Peserta::factory()->count(20)->create([
                'kegiatan_id' => $kegiatan->id
            ]);
            
            // Berikan nilai secara acak untuk setiap peserta pada masing-masing materi
            foreach ($pesertas as $peserta) {
                foreach ($materis as $materi) {
                    \App\Models\Nilai::factory()->create([
                        'peserta_id' => $peserta->id,
                        'materi_id' => $materi->id
                    ]);
                }
            }
        }
    }
}