import React from 'react';
import { DollarSign, ShieldCheck, Target, Clock } from 'lucide-react';

export const WhyAuraSection: React.FC = () => {
  const points = [
    {
      icon: DollarSign,
      title: 'Ahorro Operativo',
      desc: 'Optimización de recursos y reducción de costos fijos.',
    },
    {
      icon: ShieldCheck,
      title: 'Respaldo Legal',
      desc: 'Cumplimiento normativo y seguridad laboral garantizada.',
    },
    {
      icon: Target,
      title: 'Enfoque Estratégico',
      desc: 'Dedica tu tiempo al crecimiento de tu negocio.',
    },
    {
      icon: Clock,
      title: 'Atención Ágil',
      desc: 'Respuestas rápidas y seguimiento continuo.',
    },
  ];

  return (
    <section id="por-que-aura" className="relative overflow-hidden py-20 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="relative text-center mb-14">
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#0D1B2A]" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Por qué <span className="text-[#DC2626]">Aura</span>?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Tu socio estratégico en tercerización y gestión de personal.
          </p>
        </div>

        {/* 4 Clean Minimalist White Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/90 shadow-sm rounded-xl p-6 text-center flex flex-col items-center justify-center hover:border-[#0D1B2A]/40 hover:shadow-md transition-all"
              >
                <div className="w-13 h-13 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center mb-4 border border-red-100">
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
