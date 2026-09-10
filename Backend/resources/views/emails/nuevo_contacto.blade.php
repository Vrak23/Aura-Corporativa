<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Lead - Aura Corporativa</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: #0B192C; padding: 28px; text-align: center; border-bottom: 4px solid #DC2626; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
        .header span { color: #DC2626; }
        .badge { display: inline-block; background: rgba(220, 38, 38, 0.15); color: #f87171; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 10px; rounded-full; border-radius: 20px; margin-top: 8px; }
        .content { padding: 30px 28px; }
        .intro { font-size: 15px; color: #475569; margin-bottom: 24px; line-height: 1.5; }
        .card { background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
        .field { margin-bottom: 14px; }
        .field:last-child { margin-bottom: 0; }
        .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 3px; }
        .value { font-size: 15px; font-weight: 600; color: #0f172a; }
        .message-box { background: #ffffff; border-left: 4px solid #DC2626; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; border-left-width: 4px; margin-top: 16px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-line; }
        .actions { display: flex; gap: 12px; margin-top: 24px; text-align: center; }
        .btn-reply { display: inline-block; background: #DC2626; color: #ffffff !important; font-weight: bold; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-right: 8px; }
        .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; font-weight: bold; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AURA <span>CORPORATIVA</span></h1>
            <div class="badge">Nuevo Lead Web</div>
        </div>

        <div class="content">
            <p class="intro">
                Has recibido una nueva solicitud de contacto a través de la landing page oficial de Aura Corporativa.
            </p>

            <div class="card">
                <div class="field">
                    <div class="label">Nombre del Contacto</div>
                    <div class="value">{{ $contacto->nombre }}</div>
                </div>

                <div class="field">
                    <div class="label">Correo Electrónico</div>
                    <div class="value"><a href="mailto:{{ $contacto->email }}" style="color: #DC2626; text-decoration: none;">{{ $contacto->email }}</a></div>
                </div>

                @if($contacto->telefono)
                <div class="field">
                    <div class="label">Teléfono / WhatsApp</div>
                    <div class="value"><a href="tel:{{ $contacto->telefono }}" style="color: #0B192C; text-decoration: none;">{{ $contacto->telefono }}</a></div>
                </div>
                @endif

                @if(!empty($contacto->servicio))
                <div class="field">
                    <div class="label">Servicio de Interés</div>
                    <div class="value">{{ $contacto->servicio }}</div>
                </div>
                @endif

                <div class="field" style="margin-top: 16px;">
                    <div class="label">Mensaje / Requerimiento</div>
                    <div class="message-box">
                        {{ $contacto->mensaje }}
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:{{ $contacto->email }}?subject=Respuesta%20de%20Aura%20Corporativa%20-%20Cotizaci%C3%B3n" class="btn-reply">
                    ✉ Responder por Correo
                </a>
                @if($contacto->telefono)
                <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $contacto->telefono) }}?text=Hola%20{{ urlencode($contacto->nombre) }}%2C%20te%20escribimos%20de%20Aura%20Corporativa." class="btn-wa">
                    💬 Abrir WhatsApp
                </a>
                @endif
            </div>
        </div>

        <div class="footer">
            &copy; {{ date('Y') }} Aura Corporativa S.A.C. &bull; Notificación enviada a Auracorporativa1@gmail.com
        </div>
    </div>
</body>
</html>
