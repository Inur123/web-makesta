<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder {
    public function run(): void {
        User::create(['name' => 'Admin IPNU', 'email' => 'ipnu@makesta.test', 'password' => Hash::make('password')]);
        User::create(['name' => 'Admin IPPNU', 'email' => 'ippnu@makesta.test', 'password' => Hash::make('password')]);
    }
}