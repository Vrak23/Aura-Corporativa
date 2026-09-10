<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $fillable = [
        'titulo',
        'slug',
        'descripcion',
        'descripcion_corta',
        'incluye',
        'icono',
        'orden',
        'activo',
    ];

    protected function casts(): array
    {
        return [
            'incluye' => 'array',
            'activo' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
