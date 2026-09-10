import React, { useState, useEffect } from 'react';
import { User, Wrench, Settings, FileSpreadsheet, ChevronRight, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { servicioService } from '../services/servicioService';
import type { ServicioDTO, ServiceItem } from '../types';

const serviceIconNames: ServiceItem['iconName'][] = ['users', 'calculator', 'briefcase', 'folderCheck'];

const mapServicioToServiceItem = (service: ServicioDTO, index: number): ServiceItem => ({
  id: String(service.id),
  title: service.titulo,
  tagline: service.descripcion_corta || service.descripcion,
  badge: 'Servicio',
  iconName: serviceIconNames[index % serviceIconNames.length],
  description: service.descripcion,
  includes: Array.isArray(service.incluye) ? service.incluye : (typeof service.incluye === "string" ? JSON.parse(service.incluye) : []),
  keyBenefits: [],
});

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(servicesData);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const apiServices = await servicioService.getServicios();
        if (isMounted && apiServices && apiServices.length > 0) {
          setServices(apiServices.map((service, index) => mapServicioToServiceItem(service, index)));
        }
      } catch (error) {
        // Silently preserve local static services without interrupting UI
        console.warn('Usando servicios locales:', error);
      }
    };

    void loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenService = (service: ServiceItem) => {
    setIsClosing(false);
    setSelectedService(service);
  };

  const handleCloseService = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedService(null);
      setIsClosing(false);
    }, 200); // matches animation duration
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedService) {
        handleCloseService();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  useEffect(() => {
    if (!selectedService) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedService]);

  const getServiceIcon = (iconName: ServiceItem['iconName']) => {
    switch (iconName) {
      case 'users':
        return User;
      case 'calculator':
        return FileSpreadsheet;
      case 'briefcase':
        return Wrench;
      case 'folderCheck':
      default:
        return Settings;
    }
  };

  return (
    <section id="servicios" className="py-20 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching mockup */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nuestros <span className="text-[#DC2626]">Servicios</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenService(service)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenService(service);
                  }
                }}
                className="group relative overflow-hidden bg-white rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-xl border border-slate-100 hover:border-[#0D1B2A]/30 flex flex-col items-center text-center justify-between cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 active:scale-[0.98] select-none"
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 inset-x-8 h-0.5 bg-gradient-to-r from-transparent via-[#0D1B2A]/30 to-transparent group-hover:via-[#DC2626] transition-all duration-300 rounded-full" />
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[#0D1B2A]/10 transition-transform duration-500 group-hover:scale-125" />
                <span className="absolute right-4 top-4 text-xs font-bold tracking-widest text-[#0D1B2A]/25 group-hover:text-[#DC2626]/50 transition-colors">
                  {String(services.indexOf(service) + 1).padStart(2, '0')}
                </span>

                <div>
                  {/* Red circular icon with smooth pulse and scale on card hover/click */}
                  <div className="w-14 h-14 rounded-full bg-[#DC2626] text-white flex items-center justify-center mb-5 shadow-xs ring-4 ring-[#0D1B2A]/[0.06] mx-auto transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-md group-hover:ring-[#DC2626]/10 group-active:scale-95">
                    <Icon size={26} className="transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#DC2626] transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 mb-4">
                    {service.description}
                  </p>
                </div>

                {/* "Ver Más" link in red with animated arrow */}
                <div className="text-sm font-bold text-[#DC2626] group-hover:text-red-700 transition-colors inline-flex items-center gap-1.5 mt-2">
                  <span>Ver Más</span>
                  <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal with entrance and exit animations */}
      {selectedService && (
        <div 
          className={`fixed inset-0 z-[60] bg-gradient-to-br from-[#0D1B2A]/75 via-slate-900/60 to-[#DC2626]/20 backdrop-blur-xs flex items-center justify-center p-4 ${
            isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop-in'
          }`}
          onClick={handleCloseService}
        >
          <div 
            className={`relative overflow-hidden bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-[0_24px_70px_-20px_rgba(13,27,42,0.55)] border border-[#0D1B2A]/15 ring-1 ring-white/40 ${
              isClosing ? 'animate-modal-card-out' : 'animate-modal-card-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#0D1B2A] via-[#DC2626] to-[#0D1B2A]" />
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[#0D1B2A]/10" />
            <div className="absolute -right-5 top-5 h-16 w-16 rounded-full border border-[#DC2626]/10" />
            <div className="absolute -left-20 bottom-8 h-32 w-32 rounded-full bg-[#0D1B2A]/[0.025] blur-2xl" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#0D1B2A]/[0.06]">
                {React.createElement(getServiceIcon(selectedService.iconName), { size: 24 })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedService.title}
                </h3>
                <span className="inline-flex items-center rounded-full bg-[#0D1B2A]/[0.06] px-2.5 py-1 text-xs font-bold text-[#0D1B2A]">
                  {selectedService.badge}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 mb-5 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="bg-slate-50 p-3.5 sm:p-4 rounded-lg sm:rounded-xl border border-slate-100 mb-4 sm:mb-5">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                <span className="h-4 w-1 rounded-full bg-[#DC2626]" />
                Incluye:
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {selectedService.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#DC2626] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseService}
                className="px-5 py-2.5 rounded-lg bg-[#0D1B2A]/[0.06] text-[#0D1B2A] text-sm font-bold hover:bg-[#0D1B2A]/[0.1] border border-[#0D1B2A]/10 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
