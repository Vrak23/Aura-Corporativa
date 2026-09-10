<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    public function index(): JsonResponse
    {
        $servicios = Servicio::query()
            ->where('activo', true)
            ->orderBy('orden')
            ->get();

        return response()->json($servicios);
    }

    public function show(Servicio $servicio): JsonResponse
    {
        if (! $servicio->activo) {
            abort(404);
        }

        return response()->json($servicio);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:servicios,slug',
            'descripcion' => 'required|string',
            'descripcion_corta' => 'nullable|string',
            'incluye' => 'nullable|array',
            'incluye.*' => 'string',
            'icono' => 'nullable|string|max:255',
            'orden' => 'nullable|integer|min:0',
            'activo' => 'nullable|boolean',
        ]);

        $servicio = Servicio::create($validated);

        return response()->json($servicio, 201);
    }

    public function update(Request $request, Servicio $servicio): JsonResponse
    {
        $validated = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:servicios,slug,'.$servicio->id,
            'descripcion' => 'sometimes|required|string',
            'descripcion_corta' => 'nullable|string',
            'incluye' => 'nullable|array',
            'incluye.*' => 'string',
            'icono' => 'nullable|string|max:255',
            'orden' => 'nullable|integer|min:0',
            'activo' => 'nullable|boolean',
        ]);

        $servicio->update($validated);

        return response()->json($servicio);
    }

    public function destroy(Servicio $servicio): JsonResponse
    {
        $servicio->delete();

        return response()->json([
            'message' => 'Servicio eliminado correctamente.',
        ]);
    }
}