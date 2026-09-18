<?php

namespace Database\Factories;

use App\Models\Materi;
use App\Models\Nilai;
use App\Models\Peserta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Nilai>
 */
class NilaiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'peserta_id' => Peserta::factory(),
            'materi_id' => Materi::factory(),
            'nilai' => $this->faker->numberBetween(60, 100),
        ];
    }
}