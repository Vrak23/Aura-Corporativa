import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  isHidden?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || siteConfig.contact.whatsapp.value,
  defaultMessage = siteConfig.contact.whatsapp.defaultMessage,
  isHidden = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  if (isHidden) {
    return null;
  }

  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
    >
      <div className="relative flex items-center justify-end">
        {/* Tooltip en hover exclusivo sobre el botón */}
        <span
          className={`hidden sm:inline-block mr-3 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white/95 backdrop-blur-xs rounded-full shadow-lg border border-slate-100 select-none whitespace-nowrap transition-all duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          ¿Conversamos por WhatsApp?
        </span>

        {/* Botón flotante */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir chat de WhatsApp con Aura Corporativa"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] hover:scale-105 active:scale-95 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          {/* SVG Oficial WhatsApp */}
          <svg
            viewBox="0 0 32 32"
            width="34"
            height="34"
            className="fill-white pointer-events-none"
          >
            <path d="M16.002 2C8.28 2 2.004 8.275 2.004 15.998c0 2.607.718 5.05 1.968 7.141L2 30l7.067-1.854a13.923 13.923 0 0 0 6.935 1.852h.006c7.721 0 13.996-6.275 13.996-13.998C30.004 8.277 23.725 2 16.002 2zm7.98 19.825c-.332.932-1.637 1.748-2.678 1.97-.714.153-1.645.275-4.786-.983-4.015-1.608-6.602-5.69-6.804-5.957-.196-.267-1.621-2.158-1.621-4.117 0-1.958 1.026-2.923 1.391-3.32.366-.396.797-.495 1.063-.495.267 0 .532.003.766.014.246.012.576-.093.9.686.333.803 1.13 2.766 1.23 2.969.098.203.164.44.032.706-.13.267-.196.435-.39.664-.196.23-.411.514-.588.69-.196.195-.4.407-.172.798.228.39 1.015 1.672 2.179 2.707 1.498 1.332 2.761 1.745 3.153 1.94.39.196.62.164.85-.1.23-.267.98-1.144 1.242-1.536.262-.392.525-.327.884-.196.36.13 2.277 1.074 2.67 1.27.393.196.655.294.753.458.098.163.098.948-.234 1.88z" />
          </svg>
        </a>
      </div>
    </aside>
  );
};

export default WhatsAppButton;
