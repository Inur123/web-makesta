<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KegiatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Kegiatan::factory()
            ->count(5)
            ->has(\App\Models\Peserta::factory()->count(20))
            ->create();
    }
}
