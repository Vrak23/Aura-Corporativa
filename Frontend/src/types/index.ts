export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  iconName: 'users' | 'calculator' | 'briefcase' | 'folderCheck';
  description: string;
  includes: string[];
  keyBenefits: string[];
}

export interface ServicioDTO {
  id: number | string;
  titulo: string;
  slug: string;
  descripcion: string;
  descripcion_corta?: string | null;
  incluye: string[];
  icono?: string | null;
  orden?: number;
  activo?: boolean;
}

export interface LeadPayload {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  tipo?: 'contacto' | 'cotizacion';
  mensaje: string;
}

export interface ContactoResponse {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  empresa: string | null;
  tipo: 'contacto' | 'cotizacion';
  mensaje: string;
  leido: boolean;
  created_at: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
