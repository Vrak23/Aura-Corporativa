import React from 'react';
import aboutImage from '../assets/about_handshake.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="relative overflow-hidden py-20 bg-white">
      <div className="absolute -left-20 top-16 h-40 w-40 rounded-full border border-[#0D1B2A]/[0.06]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column matching mockup */}
          <div>
            <div className="mb-4 h-1 w-12 rounded-full bg-[#0D1B2A]" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sobre <span className="text-[#DC2626]">Nosotros</span>
            </h2>
            <h3 className="text-xl font-bold text-slate-800 mt-2.5 mb-4">
              Nuestra Misión, Visión y Valores
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              En <strong className="text-slate-900 font-semibold">Aura Corporativa</strong> nos especializamos en la tercerización integral de personal y la administración estratégica de procesos empresariales.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Nuestra misión es acompañar a las empresas a optimizar sus tiempos y recursos mediante soluciones eficientes, transparentes y 100% apegadas al marco normativo vigente.
            </p>


          </div>

          {/* Right Column: Photo matching mockup */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-md border border-[#0D1B2A]/15 ring-1 ring-[#0D1B2A]/[0.03]">
              <img
                src={aboutImage}
                alt="Sobre Nosotros - Aura Corporativa"
                className="w-full h-auto object-cover max-h-[340px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
