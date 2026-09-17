<?php
namespace App\Helpers;

class NilaiHelper
{
    public static function indeks(?int $nilai): ?string
    {
        if ($nilai === null) return null;

        return match (true) {
            $nilai >= 90 => 'A',
            $nilai >= 80 => 'B',
            $nilai >= 70 => 'C',
            $nilai >= 60 => 'D',
            default      => 'E',
        };
    }
}
