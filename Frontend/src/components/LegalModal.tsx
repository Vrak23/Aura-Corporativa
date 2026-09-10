import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export type LegalModalType = 'terms' | 'privacy' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-modal-backdrop-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl max-w-lg sm:max-w-xl w-full max-h-[78vh] sm:max-h-[82vh] flex flex-col shadow-2xl relative border border-slate-100 animate-modal-card-in mx-2 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0">
              {isTerms ? <FileText size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div>
              <h3 id="legal-modal-title" className="text-xl font-bold text-slate-900">
                {isTerms ? 'Términos y Condiciones de Servicio' : 'Política de Privacidad y Protección de Datos'}
              </h3>
              <p className="text-xs text-slate-500">
                {siteConfig.company.legalName} • RUC: {siteConfig.company.ruc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          {isTerms ? (
            <>
              <h4 className="text-base font-bold text-slate-900">1. Objeto y Alcance</h4>
              <p>
                Los presentes Términos y Condiciones regulan el uso de la plataforma web de <strong>{siteConfig.company.legalName}</strong> y la solicitud de información sobre nuestros servicios de tercerización de personal, gestión de planillas y soporte corporativo en el territorio peruano.
              </p>

              <h4 className="text-base font-bold text-slate-900">2. Solicitudes y Cotizaciones</h4>
              <p>
                El envío de formularios a través de este sitio no constituye un contrato vinculante de prestación de servicios, sino una solicitud formal de cotización y contacto comercial. Toda propuesta económica será formalizada mediante contratos de servicios conforme a ley.
              </p>

              <h4 className="text-base font-bold text-slate-900">3. Propiedad Intelectual</h4>
              <p>
                Todo el contenido, isotipos, marcas y diseño de este sitio web son propiedad exclusiva de {siteConfig.company.legalName}. Queda prohibida su reproducción sin autorización previa.
              </p>

              <h4 className="text-base font-bold text-slate-900">4. Legislación Aplicable</h4>
              <p>
                Cualquier controversia derivada del uso del sitio web se regirá bajo las leyes de la República del Perú, sometiéndose a la jurisdicción de los jueces y tribunales de Lima.
              </p>
            </>
          ) : (
            <>
              <h4 className="text-base font-bold text-slate-900">1. Cumplimiento de la Ley N° 29733</h4>
              <p>
                En cumplimiento de la <strong>Ley de Protección de Datos Personales (Ley N° 29733)</strong> y su Reglamento, <strong>{siteConfig.company.legalName}</strong> garantiza la seguridad, confidencialidad y adecuado tratamiento de los datos personales proporcionados por los usuarios.
              </p>

              <h4 className="text-base font-bold text-slate-900">2. Finalidad del Tratamiento</h4>
              <p>
                Los datos solicitados en nuestros formularios (nombre, correo electrónico, teléfono y mensaje) serán utilizados exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Atender consultas y solicitudes de información sobre nuestros servicios.</li>
                <li>Elaborar y remitir propuestas comerciales y cotizaciones corporativas.</li>
                <li>Establecer contacto directo a través de llamadas, correo o WhatsApp institucional.</li>
              </ul>

              <h4 className="text-base font-bold text-slate-900">3. Confidencialidad y Terceros</h4>
              <p>
                Nos comprometemos a no vender, ceder ni compartir su información personal con terceras partes no autorizadas bajo ninguna circunstancia.
              </p>

              <h4 className="text-base font-bold text-slate-900">4. Ejercicio de Derechos ARCO</h4>
              <p>
                Usted podrá ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) enviando una solicitud formal a nuestro correo oficial: <strong>{siteConfig.contact.email.primary}</strong>.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-3 sm:p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl sm:rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
