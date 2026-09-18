<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder {
    public function run(): void {
        User::factory()->create([
            'name' => 'Admin IPNU', 
            'email' => 'ipnu@makesta.test',
            // password sudah diset default ke 'password' di UserFactory
        ]);
        
        User::factory()->create([
            'name' => 'Admin IPPNU', 
            'email' => 'ippnu@makesta.test',
        ]);
    }
}