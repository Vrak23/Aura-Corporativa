<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\ContactoController;
use App\Http\Middleware\EnsureBlogAdministrator;

/*
|--------------------------------------------------------------------------
| Rutas Públicas de la Landing Page
|--------------------------------------------------------------------------
*/
Route::get('/servicios', [ServicioController::class, 'index']);
Route::get('/blog', [BlogPostController::class, 'index']);
Route::get('/blog/{blogPost:slug}', [BlogPostController::class, 'show']);

Route::middleware('throttle:5,1')->post('/admin/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', EnsureBlogAdministrator::class])->group(function () {
    Route::get('/admin/me', [AuthController::class, 'me']);
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::get('/admin/blog/posts', [BlogPostController::class, 'adminIndex']);
    Route::post('/admin/blog/posts', [BlogPostController::class, 'store']);
    Route::put('/admin/blog/posts/{blogPost:id}', [BlogPostController::class, 'update']);
    Route::delete('/admin/blog/posts/{blogPost:id}', [BlogPostController::class, 'destroy']);
});

Route::middleware('throttle:5,1')->group(function () {
    Route::post('/contacto', [ContactoController::class, 'store']);
});
