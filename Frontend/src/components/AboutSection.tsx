import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, ShieldCheck } from 'lucide-react';
import aboutImage from '../assets/about_handshake.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="relative overflow-hidden py-24 bg-white">
      <div className="absolute -left-20 top-16 h-40 w-40 rounded-full border border-[#0D1B2A]/[0.06] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="mb-4 h-1.5 w-12 rounded-full bg-[#0D1B2A]" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sobre <span className="text-[#DC2626]">Nosotros</span>
            </h2>
            <h3 className="text-xl font-bold text-slate-800 mt-2.5 mb-4">
              Socios estratégicos en gestión y desarrollo del talento humano
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              En <strong className="text-slate-900 font-semibold">Aura Corporativa</strong> nos especializamos en la tercerización integral de personal, administración de planillas y soporte estratégico empresarial a nivel nacional.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Acompañamos a las empresas a optimizar sus tiempos y costos operativos mediante soluciones ágiles, transparentes y 100% apegadas al marco normativo vigente.
            </p>

            {/* Misión, Visión, Valores Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center mb-2">
                  <Target size={18} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Misión</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Impulsar la productividad de nuestros clientes con talento calificado y gestión impecable.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center mb-2">
                  <Eye size={18} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Visión</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ser el referente líder en soluciones integrales de capital humano en el Perú.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center mb-2">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Valores</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparencia, rigor legal, agilidad y compromiso ético con las personas.
                </p>
              </div>
            </div>

            <Link
              to="/nosotros"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              className="inline-flex items-center text-sm font-bold text-[#DC2626] hover:text-red-700 transition-colors"
            >
              Conocer más sobre Aura Corporativa
            </Link>
          </div>

          {/* Right Column: Photo with subtle frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src={aboutImage}
                alt="Sobre Nosotros - Aura Corporativa"
                className="w-full h-full object-cover min-h-[320px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

