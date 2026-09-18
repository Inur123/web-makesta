<?php

namespace Database\Factories;

use App\Models\Peserta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Peserta>
 */
class PesertaFactory extends Factory
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
            'nama' => $this->faker->name(),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->dateTimeBetween('-25 years', '-15 years')->format('Y-m-d'),
            'alamat' => $this->faker->address(),
            'no_hp' => $this->faker->phoneNumber(),
            'sekolah' => 'SMA ' . $this->faker->company(),
        ];
    }
}
