<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactoRequest;
use App\Models\Contacto;
use App\Mail\NuevoContactoRecibido;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactoController extends Controller
{
    public function store(ContactoRequest $request): JsonResponse
    {
        $contacto = Contacto::create($request->validated());

        try {
            $adminEmail = env('MAIL_TO_ADMIN', config('mail.from.address', 'Auracorporativa1@gmail.com'));
            Mail::to($adminEmail)->send(new NuevoContactoRecibido($contacto));
        } catch (\Exception $e) {
            Log::error('Error enviando correo de contacto a ' . $adminEmail . ': ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => '¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos pronto.',
            'data'    => $contacto
        ], 201);
    }
}
