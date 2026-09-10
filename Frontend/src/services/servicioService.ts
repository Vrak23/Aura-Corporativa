import { supabase } from './supabaseClient';
import type { ServicioDTO } from '../types';

export const servicioService = {
  async getServicios(): Promise<ServicioDTO[]> {
    try {
      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ServicioDTO[];
      }
      if (error) {
        console.warn('[servicioService] Supabase error:', error.message);
      }
    } catch (error) {
      console.warn('[servicioService] Supabase no disponible, usando fallback local.', error);
    }

    return [];
  },
};
