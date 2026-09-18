<?php

namespace Database\Factories;

use App\Models\Materi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Materi>
 */
class MateriFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kegiatan_id' => \App\Models\Kegiatan::factory(),
            'nama' => $this->faker->randomElement([
                'Ke-NU-an', 
                'Ke-IPNU-IPPNU-an', 
                'Aswaja (Ahlussunnah wal Jamaah)', 
                'Tradisi Amaliyah NU', 
                'Ke-Indonesia-an dan Kebangsaan',
                'Kepemimpinan',
                'Organisasi dan Administrasi'
            ]),
            'urutan' => $this->faker->numberBetween(1, 10),
        ];
    }
}
