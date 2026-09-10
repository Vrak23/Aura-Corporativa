<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\ContactoController;

/*
|--------------------------------------------------------------------------
| Rutas Públicas de la Landing Page
|--------------------------------------------------------------------------
*/
Route::get('/servicios', [ServicioController::class, 'index']);

Route::middleware('throttle:5,1')->group(function () {
    Route::post('/contacto', [ContactoController::class, 'store']);
});
