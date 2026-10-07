<?php

namespace Tests\Feature;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_database_seeder_creates_the_blog_administrator(): void
    {
        config([
            'blog.admin_email' => 'admin@example.com',
            'blog.admin_password' => 'secure-password',
        ]);

        $this->seed(\Database\Seeders\DatabaseSeeder::class);

        $this->assertDatabaseHas('users', [
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);

        $this->postJson('/api/admin/login', [
            'password' => 'secure-password',
        ])->assertOk();
    }

    public function test_only_administrators_can_sign_in_and_manage_blog_posts(): void
    {
        $administrator = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => 'secure-password',
            'is_admin' => true,
        ]);
        User::factory()->create([
            'email' => 'staff@example.com',
            'password' => 'secure-password',
        ]);
        config([
            'blog.admin_email' => $administrator->email,
            'blog.admin_password' => 'secure-password',
        ]);

        $this->postJson('/api/admin/login', [
            'password' => 'wrong-password',
        ])->assertUnprocessable();

        $login = $this->postJson('/api/admin/login', [
            'password' => 'secure-password',
        ])->assertOk();

        $token = $login->json('token');

        $this->postJson('/api/admin/blog/posts', $this->postPayload())
            ->assertUnauthorized();

        $created = $this->withToken($token)
            ->postJson('/api/admin/blog/posts', $this->postPayload())
            ->assertCreated()
            ->assertJsonPath('published', true);

        $postId = $created->json('id');

        $this->getJson('/api/blog')
            ->assertOk()
            ->assertJsonCount(1);

        $this->withToken($token)
            ->putJson("/api/admin/blog/posts/{$postId}", [
                ...$this->postPayload(),
                'title' => 'Noticia actualizada',
                'published' => false,
                'published_at' => null,
            ])
            ->assertOk()
            ->assertJsonPath('title', 'Noticia actualizada')
            ->assertJsonPath('published', false);

        $this->getJson('/api/blog/actualizacion-tributaria')
            ->assertNotFound();

        $this->withToken($token)
            ->deleteJson("/api/admin/blog/posts/{$postId}")
            ->assertOk();

        $this->assertDatabaseMissing('blog_posts', ['id' => $postId]);
    }

    public function test_public_blog_returns_only_published_posts(): void
    {
        BlogPost::create($this->postPayload());
        BlogPost::create([
            ...$this->postPayload(),
            'title' => 'Noticia en borrador',
            'slug' => 'noticia-en-borrador',
            'published' => false,
            'published_at' => null,
        ]);

        $this->getJson('/api/blog')
            ->assertOk()
            ->assertJsonCount(1);

        $this->getJson('/api/blog/noticia-en-borrador')
            ->assertNotFound();
    }

    /**
     * @return array<string, mixed>
     */
    private function postPayload(): array
    {
        return [
            'title' => 'Actualización tributaria',
            'slug' => 'actualizacion-tributaria',
            'excerpt' => 'Resumen de la actualización tributaria para empresas.',
            'content' => 'Información completa sobre las obligaciones tributarias vigentes.',
            'image_url' => null,
            'category' => 'Tributario',
            'published' => true,
            'published_at' => '2026-10-07',
        ];
    }
}
