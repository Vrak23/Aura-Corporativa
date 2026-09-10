<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Sanitizar los campos antes de la validación para prevenir XSS y caracteres maliciosos.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'nombre'   => strip_tags(trim((string) $this->nombre)),
            'email'    => filter_var(trim((string) $this->email), FILTER_SANITIZE_EMAIL),
            'telefono' => $this->telefono ? preg_replace('/[^0-9+\s-]/', '', (string) $this->telefono) : null,
            'mensaje'  => strip_tags(trim((string) $this->mensaje)),
        ]);
    }

    public function rules(): array
    {
        return [
            'nombre'   => 'required|string|min:2|max:100',
            'email'    => 'required|email:rfc,dns|max:150',
            'telefono' => 'nullable|string|max:20',
            'mensaje'  => 'required|string|min:10|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required'  => 'El nombre es obligatorio.',
            'nombre.min'       => 'El nombre debe tener al menos 2 caracteres.',
            'email.required'   => 'El correo electrónico es obligatorio.',
            'email.email'      => 'Debes ingresar un correo electrónico válido.',
            'mensaje.required' => 'El mensaje es obligatorio.',
            'mensaje.min'      => 'El mensaje debe tener al menos 10 caracteres.',
            'mensaje.max'      => 'El mensaje no puede exceder los 1000 caracteres.',
        ];
    }
}
