import { siteConfig } from '../config/siteConfig';

export interface ContactoPayload {
  nombre: string;
  email: string;
  telefono?: string;
  servicio?: string;
  mensaje: string;
}

export const contactoService = {
  async enviarContacto(payload: ContactoPayload): Promise<{ success: boolean; message: string }> {
    // FormSubmit endpoint: Envía el mensaje directamente a ventas@zwecorporativa.com
    const destinationEmail = siteConfig.contact.email.primary;
    const formSubmitUrl = `https://formsubmit.co/ajax/${destinationEmail}`;

    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        Nombre: payload.nombre,
        Email: payload.email,
        Telefono: payload.telefono || 'No especificado',
        Servicio: payload.servicio || 'Consulta General',
        Mensaje: payload.mensaje,
        _subject: `🚀 Nuevo Lead Web - Aura Corporativa: ${payload.nombre}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el formulario por FormSubmit');
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || '¡Gracias por contactarnos! Tu solicitud ha sido enviada con éxito.',
    };
  },
};

export default contactoService;
