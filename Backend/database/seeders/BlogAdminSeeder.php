<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class BlogAdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('blog.admin_email');
        $password = config('blog.admin_password');

        if (! is_string($email) || $email === '' || ! is_string($password) || strlen($password) < 8) {
            throw new RuntimeException(
                'Configura BLOG_ADMIN_EMAIL y BLOG_ADMIN_PASSWORD (mínimo 8 caracteres) antes de crear el administrador.'
            );
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Administrador del blog',
                'password' => Hash::make($password),
                'is_admin' => true,
            ]
        );
    }
}
