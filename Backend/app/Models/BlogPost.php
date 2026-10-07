<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    public const CATEGORIES = ['Laboral', 'Finanzas', 'Tributario', 'Contabilidad'];

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image_url',
        'category',
        'published',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
