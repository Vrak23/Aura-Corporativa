import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logoAura from '../assets/logo_aura.jpg';
import { siteConfig } from '../config/siteConfig';

import { scrollToTopAnimated, scrollToElementAnimated } from '../utils/scrollUtils';

interface NavbarProps {
  isMenuOpen?: boolean;
  onMenuToggle?: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, onMenuToggle }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isMenuOpen !== undefined ? isMenuOpen : internalOpen;
  const location = useLocation();
  const navigate = useNavigate();

  const isNosotros = location.pathname === '/nosotros';

  const handleToggle = (open: boolean) => {
    setInternalOpen(open);
    onMenuToggle?.(open);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleToggle(false);

    if (isNosotros) {
      navigate('/');
      window.scrollTo(0, 0);
    } else {
      // Si ya está en inicio, animar el regreso hacia arriba
      scrollToTopAnimated(800);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNosotrosClick = () => {
    handleToggle(false);
    window.scrollTo(0, 0);
  };

  const handleAnchorClick = (href: string) => {
    handleToggle(false);
    if (isNosotros) {
      navigate('/' + href);
    } else {
      scrollToElementAnimated(href, 80, 800);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo oficial */}
        <Link
          to="/"
          onClick={handleHomeClick}
          className="flex items-center select-none py-1 z-50 cursor-pointer"
        >
          <img 
            src={logoAura} 
            alt="Aura Corporativa" 
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-base font-medium text-slate-700">
          <Link
            to="/"
            onClick={handleHomeClick}
            className={!isNosotros ? 'text-[#DC2626] font-semibold border-b-2 border-[#DC2626] pb-0.5 cursor-pointer' : 'hover:text-[#DC2626] transition-colors cursor-pointer'}
          >
            Inicio
          </Link>

          <button
            type="button"
            onClick={() => handleAnchorClick('#servicios')}
            className="hover:text-[#DC2626] transition-colors cursor-pointer"
          >
            Servicios
          </button>

          <button
            type="button"
            onClick={() => handleAnchorClick('#por-que-aura')}
            className="hover:text-[#DC2626] transition-colors cursor-pointer"
          >
            ¿Por qué Aura?
          </button>

          <button
            type="button"
            onClick={() => handleAnchorClick('#faq')}
            className="hover:text-[#DC2626] transition-colors cursor-pointer"
          >
            FAQ
          </button>

          <Link
            to="/nosotros"
            onClick={handleNosotrosClick}
            className={isNosotros ? 'text-[#DC2626] font-semibold border-b-2 border-[#DC2626] pb-0.5' : 'hover:text-[#DC2626] transition-colors'}
          >
            Nosotros
          </Link>
        </nav>

        {/* Right Desktop CTA + Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleAnchorClick('#contacto')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-[#DC2626] hover:bg-red-700 active:scale-95 rounded-md transition-all shadow-xs cursor-pointer"
          >
            Solicitar Contacto
          </button>

          {/* Botón de Hamburguesa */}
          <button
            type="button"
            onClick={() => handleToggle(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-[#DC2626] hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-red-500 z-50 cursor-pointer"
          >
            {isOpen ? <X size={26} className="text-slate-900" /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden animate-modal-backdrop-in"
          onClick={() => handleToggle(false)}
        >
          <div
            className="bg-white border-b border-slate-200 px-6 py-8 shadow-2xl flex flex-col space-y-5 animate-modal-card-in"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-2.5">
              <Link
                to="/"
                onClick={handleHomeClick}
                className={'text-lg font-semibold py-2 px-3 rounded-lg flex items-center transition-colors cursor-pointer ' + (!isNosotros ? 'bg-red-50 text-[#DC2626]' : 'text-slate-800 hover:bg-slate-50')}
              >
                <span>Inicio</span>
              </Link>

              <button
                type="button"
                onClick={() => handleAnchorClick('#servicios')}
                className="text-lg font-semibold py-2 px-3 rounded-lg flex items-center text-slate-800 hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <span>Servicios</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnchorClick('#por-que-aura')}
                className="text-lg font-semibold py-2 px-3 rounded-lg flex items-center text-slate-800 hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <span>¿Por qué Aura?</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnchorClick('#faq')}
                className="text-lg font-semibold py-2 px-3 rounded-lg flex items-center text-slate-800 hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <span>FAQ</span>
              </button>

              <Link
                to="/nosotros"
                onClick={handleNosotrosClick}
                className={'text-lg font-semibold py-2 px-3 rounded-lg flex items-center transition-colors ' + (isNosotros ? 'bg-red-50 text-[#DC2626]' : 'text-slate-800 hover:bg-slate-50')}
              >
                <span>Nosotros</span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                type="button"
                onClick={() => handleAnchorClick('#contacto')}
                className="w-full py-3.5 px-4 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-base rounded-lg transition-colors text-center shadow-xs flex items-center justify-center cursor-pointer"
              >
                Solicitar Contacto
              </button>

              <a
                href={'tel:' + siteConfig.contact.phone.value}
                className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={16} className="text-[#DC2626]" />
                <span>Llamar: {siteConfig.contact.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
