import React from 'react';
import { DollarSign, ShieldCheck, Target, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const WhyAuraSection: React.FC = () => {
  const metrics = [
    { value: '100%', label: 'Cumplimiento Normativo', sub: 'Sunafil & Sunat' },
    { value: '+98%', label: 'Satisfacción', sub: 'En servicios contratados' },
    { value: '24-48h', label: 'Respuesta Operativa', sub: 'Atención ágil a solicitudes' },
    { value: '0%', label: 'Contingencias Laborales', sub: 'Tranquilidad garantizada' },
  ];

  const points = [
    {
      icon: DollarSign,
      title: 'Ahorro Operativo',
      desc: 'Optimización de recursos y reducción inmediata de costos fijos de contratación e infraestructura.',
      bullets: [
        'Disminución de costos fijos de nómina',
        'Presupuestos claros y sin sobrecostos',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Respaldo Legal & Tributario',
      desc: 'Supervisión rigurosa de contratos, aportes de ley y planillas con total blindaje jurídico.',
      bullets: [
        'Cero contingencias ante Sunafil y Sunat',
        'Contratos y legajos 100% auditables',
      ],
    },
    {
      icon: Target,
      title: 'Enfoque Estratégico',
      desc: 'Libera la carga operativa de tu directiva para que se enfoque 100% en hacer crecer el negocio.',
      bullets: [
        'Delegación segura de procesos operativos',
        'Mayor productividad de tus líderes',
      ],
    },
    {
      icon: Clock,
      title: 'Atención Ágil & Continua',
      desc: 'Ejecutivos asignados con monitoreo constante para resolver incidencias en tiempo récord.',
      bullets: [
        'Canal directo de comunicación',
        'Reemplazos y coberturas oportunas',
      ],
    },
  ];

  return (
    <section id="por-que-aura" className="relative overflow-hidden py-24 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="relative text-center mb-16">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#0D1B2A]" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Por qué elegir <span className="text-[#DC2626]">Aura Corporativa</span>?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Ventajas estratégicas comprobadas que protegen tu operación y multiplican la rentabilidad de tu organización.
          </p>
        </div>

        {/* 1. Metrics & Proof Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {metrics.map((m, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-100 text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#DC2626] tracking-tight">
                {m.value}
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1">
                {m.label}
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        {/* 2. Detailed 4 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-100 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center mb-5 border border-red-100 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {item.bullets.map((b, bi) => (
                    <div key={bi} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 size={14} className="text-[#DC2626] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Bottom Assurance Callout */}
        <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold mb-2">
              Transformamos la gestión de talento en una ventaja competitiva
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diseñamos propuestas a la medida de tu sector y volumen de colaboradores, garantizando continuidad y tranquilidad.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Solicitar Asesoría</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

