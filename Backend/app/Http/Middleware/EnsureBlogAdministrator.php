<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBlogAdministrator
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->is_admin) {
            return response()->json([
                'message' => 'No tienes permisos para administrar el blog.',
            ], 403);
        }

        return $next($request);
    }
}
