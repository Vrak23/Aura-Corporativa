import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const cases = [
    {
      title: 'Tercerización de Personal',
      text: 'Gestión eficiente en reclutamiento y cobertura inmediata de posiciones operativas, garantizando continuidad en el servicio.',
    },
    {
      title: 'Resultado en Planillas',
      text: 'Cálculo exacto de remuneraciones, liquidaciones y beneficios sociales con cero contingencias laborales.',
    },
    {
      title: 'Soporte Administrativo',
      text: 'Organización documentaria y optimización de legajos laborales para un control integral de procesos.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching mockup */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Casos <span className="text-[#DC2626]">de Éxito</span>
          </h2>
        </div>

        {/* 3 Dark Blue Cards matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <div
              key={index}
              className="bg-[#111C33] rounded-xl p-6 sm:p-7 text-white shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Red Quote icon */}
                <div className="mb-4 text-[#DC2626]">
                  <Quote size={28} className="fill-[#DC2626]" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>

                {/* Text */}
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {item.text}
                </p>
              </div>

              {/* Leer Más link in red */}
              <div>
                <span className="text-xs font-bold text-[#DC2626] hover:text-red-400 transition-colors cursor-pointer">
                  Leer Más
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
