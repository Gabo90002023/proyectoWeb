<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'full_name' => 'Administrador Principal',
            'email' => 'admin@demo.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Profesor (User)
        User::create([
            'full_name' => 'Profesor Demo',
            'email' => 'profesor@demo.com',
            'password' => Hash::make('profesor123'),
            'role' => 'user',
        ]);
    }
}
