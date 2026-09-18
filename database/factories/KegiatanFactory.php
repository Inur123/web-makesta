<?php

namespace Database\Factories;

use App\Models\Kegiatan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Kegiatan>
 */
class KegiatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organisasi' => $this->faker->randomElement(['ipnu', 'ippnu']),
            'nama' => 'Makesta ' . $this->faker->city(),
            'lokasi' => 'Gedung ' . $this->faker->company(),
            'tanggal_teks' => $this->faker->date('d M Y') . ' - ' . $this->faker->date('d M Y'),
            'catatan' => $this->faker->optional()->sentence(),
            'selesai' => $this->faker->boolean(30), // 30% chance selesai
        ];
    }
}
