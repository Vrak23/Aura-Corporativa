import { supabase } from './supabaseClient';
import { api } from './api';
import type { ApiResponse } from './api';

export interface ContactoPayload {
  nombre: string;
  email: string;
  telefono?: string;
  servicio?: string;
  mensaje: string;
}

export const contactoService = {
  async enviarContacto(payload: ContactoPayload): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.from('contactos').insert([
        {
          nombre: payload.nombre,
          email: payload.email,
          telefono: payload.telefono || null,
          servicio: payload.servicio || null,
          mensaje: payload.mensaje,
        },
      ]);

      if (!error) {
        // Notificar en segundo plano al backend si estuviera activo
        try {
          void api.post('/contacto', payload).catch(() => {});
        } catch (_) {}

        return {
          success: true,
          message: '¡Gracias por contactarnos! Tu solicitud ha sido registrada correctamente.',
        };
      }
      console.warn('[Supabase Contactos Error]:', error.message);
    } catch (err) {
      console.warn('[Supabase Network]:', err);
    }

    // Fallback a API Laravel local
    return await api.post<ApiResponse<void>>('/contacto', payload);
  },
};
