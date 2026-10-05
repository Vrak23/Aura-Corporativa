import React from 'react';
import { servicesData } from '../data/servicesData';
import { ScrollReveal } from './ScrollReveal';

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Title matching Aura brand */}
        <ScrollReveal direction="up" delay={0} duration={600}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#0D1B2A]" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nuestros <span className="text-[#DC2626]">Servicios</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Soluciones integrales de tercerización, planillas y gestión humana adaptadas a las necesidades de tu empresa.
            </p>
          </div>
        </ScrollReveal>

        {/* Stack of services: Full-bleed image left, padded content right */}
        <div className="space-y-10 sm:space-y-12">
          {servicesData.map((service, index) => (
            <ScrollReveal 
              key={service.id} 
              direction="up" 
              delay={index % 2 === 0 ? 50 : 100} 
              duration={700}
              distance={35}
            >
              <div className="bg-white shadow-xs hover:shadow-md transition-all duration-300 rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch group border border-slate-100/80">
                {/* Left Column: Full-bleed Large Image filling entire left container */}
                <div className="lg:col-span-6 xl:col-span-6 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-slate-100 overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <span>{service.title}</span>
                    </div>
                  )}
                </div>

                {/* Right Column: Service Content with internal padding */}
                <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center text-left">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight group-hover:text-[#DC2626] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Bullet Points List */}
                  <ul className="space-y-2.5 sm:space-y-3 text-slate-700 text-sm sm:text-base">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#DC2626] shrink-0" />
                        <span className="font-medium text-slate-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
