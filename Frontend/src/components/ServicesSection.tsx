import React from 'react';
import { servicesData } from '../data/servicesData';

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Title matching Aura brand */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#0D1B2A]" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Nuestros <span className="text-[#DC2626]">Servicios</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Soluciones integrales de tercerización, planillas y gestión humana adaptadas a las necesidades de tu empresa.
          </p>
        </div>

        {/* Stack of services: Full-bleed image left, padded content right */}
        <div className="space-y-12 sm:space-y-16">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Left Column: Full-bleed Large Image filling entire left container */}
              <div className="lg:col-span-6 xl:col-span-6 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full bg-slate-100">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center absolute inset-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <span>{service.title}</span>
                  </div>
                )}
              </div>

              {/* Right Column: Service Content with internal padding */}
              <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center text-left">
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-base sm:text-lg lg:text-lg leading-relaxed mb-8 font-normal">
                  {service.description}
                </p>

                {/* Bullet Points List */}
                <ul className="space-y-3.5 sm:space-y-4 text-slate-700 text-base sm:text-lg">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#DC2626] shrink-0" />
                      <span className="font-medium text-slate-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
