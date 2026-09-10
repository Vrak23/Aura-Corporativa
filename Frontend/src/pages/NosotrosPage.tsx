import logoAura from '../assets/logo_aura.jpg';
import React from 'react';
import { 
  Video, 
  Share2, 
  ShieldCheck,
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Play,
  TrendingUp
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const NosotrosPage: React.FC = () => {
  return (
    <main className="grow bg-[#FAFBFD] font-sans overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* =========================================================================
          1. HERO CENTRALIZADO EN LA MARCA (FONDO AZUL MARINO SECUNDARIO #0B192C)
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-[#081526] via-[#0B192C] to-[#162D45] text-white border-b border-slate-800/80 overflow-hidden">
        {/* Capas decorativas del fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,38,0.18),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.12),transparent_35%)] pointer-events-none" />
        <div className="absolute -top-32 right-[12%] h-[430px] w-[430px] rounded-full border border-white/[0.06] shadow-[0_0_100px_rgba(220,38,38,0.12)] pointer-events-none" />
        <div className="absolute -bottom-48 -left-24 h-[430px] w-[430px] rounded-full border border-[#DC2626]/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,transparent_48%,rgba(255,255,255,0.035)_48.2%,transparent_48.5%),linear-gradient(to_right,#94a3b814_1px,transparent_1px),linear-gradient(to_bottom,#94a3b814_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Contenedor Principal del Logo con Alto Impacto */}
          <div className="relative inline-block mx-auto mb-10 group">
            {/* Halo de resplandor interactivo en hover */}
            <div className="absolute -inset-3 bg-gradient-to-r from-red-600/30 via-red-500/10 to-red-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Tarjeta del Logo en fondo blanco brillante de máximo contraste */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#0D1B2A]/15 px-10 sm:px-16 py-10 sm:py-12 rounded-3xl shadow-2xl shadow-black/40 border-2 border-[#DC2626]/70 group-hover:border-[#DC2626] group-hover:shadow-red-950/20 group-hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#DC2626]/10 pointer-events-none" />
              <img 
                src={logoAura} 
                alt="Aura Corporativa" 
                className="relative h-28 sm:h-[10.5rem] md:h-[13.5rem] w-auto object-contain mx-auto drop-shadow-sm select-none"
              />
            </div>

          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            En <strong className="text-white font-bold">Aura Corporativa</strong> conectamos el talento idóneo con empresas que buscan eficiencia, respaldo normativo y excelencia operativa continua en todo el territorio peruano.
          </p>

          {/* Quick Metrics Bar en Dark Surfaces */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 max-w-4xl mx-auto">
            <div className="bg-slate-900/70 backdrop-blur-xs p-5 rounded-2xl border border-slate-800 shadow-lg text-center group hover:border-red-500/50 hover:bg-slate-900 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#DC2626] transition-colors">100%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Cumplimiento Legal</div>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-xs p-5 rounded-2xl border border-slate-800 shadow-lg text-center group hover:border-red-500/50 hover:bg-slate-900 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#DC2626] transition-colors">Nacional</div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Cobertura en Perú</div>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-xs p-5 rounded-2xl border border-slate-800 shadow-lg text-center group hover:border-red-500/50 hover:bg-slate-900 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#DC2626] transition-colors">24/7</div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Soporte Operativo</div>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-xs p-5 rounded-2xl border border-slate-800 shadow-lg text-center group hover:border-red-500/50 hover:bg-slate-900 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#DC2626] transition-colors">B2B</div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Soluciones a Medida</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PILARES & VALORES CORPORATIVOS (CULTURA AURA)
         ========================================================================= */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Los Pilares que Guían <span className="text-[#DC2626]">Nuestra Labor</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Fundamentos éticos y operativos que aseguran relaciones comerciales duraderas y exitosas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pilar 1 */}
          <div className="bg-[#0B192C] p-8 rounded-2xl border-2 border-[#0B192C] shadow-xs hover:border-[#DC2626] hover:shadow-[0_0_0_3px_rgba(220,38,38,0.16)] transition-all duration-500 flex flex-col justify-between">
            <div className="flex w-full flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#DC2626] flex items-center justify-center mb-6 shadow-xs">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Transparencia & Rigor Legal
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Gestión estricta bajo el marco legal laboral de Sunafil y Sunat. Cero contingencias y total tranquilidad para nuestros socios.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 size={16} className="text-[#DC2626]" />
              <span>Garantía de cumplimiento</span>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-[#0B192C] p-8 rounded-2xl border-2 border-[#0B192C] shadow-xs hover:border-[#DC2626] hover:shadow-[0_0_0_3px_rgba(220,38,38,0.16)] transition-all duration-500 flex flex-col justify-between">
            <div className="flex w-full flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#DC2626] flex items-center justify-center mb-6 shadow-xs">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Enfoque en el Factor Humano
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Valoramos y cuidamos al colaborador. Un equipo motivado y respaldado brinda el más alto rendimiento en las operaciones de su empresa.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 size={16} className="text-[#DC2626]" />
              <span>Gestión humana integral</span>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-[#0B192C] p-8 rounded-2xl border-2 border-[#0B192C] shadow-xs hover:border-[#DC2626] hover:shadow-[0_0_0_3px_rgba(220,38,38,0.16)] transition-all duration-500 flex flex-col justify-between">
            <div className="flex w-full flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#DC2626] flex items-center justify-center mb-6 shadow-xs">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Agilidad & Respuesta Inmediata
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Reclutamiento ágil, reemplazos oportunos y resolución ejecutiva para que las operaciones de su negocio nunca se detengan.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 size={16} className="text-[#DC2626]" />
              <span>Continuidad operativa asegurada</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECCIÓN DE VIDEO CORPORATIVO (PREMIUM CONTAINER)
         ========================================================================= */}
      <section className="py-20 bg-[#0B192C] text-white relative overflow-hidden">
        {/* Glow azul marino y acentos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Video size={14} />
              <span>Experiencia Audiovisual</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Aura Corporativa en <span className="text-[#DC2626]">Movimiento</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Conoce nuestras instalaciones, testimonios de clientes y metodología de trabajo en terreno.
            </p>
          </div>

          {/* Video Container Frame */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl aspect-video max-w-4xl mx-auto flex flex-col items-center justify-center p-8 text-center group cursor-pointer">
            {/* Background Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Play Button Icon */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-[#DC2626] hover:bg-red-700 text-white flex items-center justify-center mb-6 shadow-2xl shadow-red-600/40 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
              <Play size={40} className="ml-1 fill-white" />
            </div>

            <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-white mb-2">
              Espacio para Video Institucional Oficial
            </h3>
            <p className="relative z-10 text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              Listo para integrar la presentación oficial en video (YouTube, Vimeo o archivo MP4 directo) en cuanto sea suministrado.
            </p>

            {/* Bottom Status Tag */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Contenedor listo para inserción</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HUB DE REDES SOCIALES OFICIALES (HIGH IMPACT)
         ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
            <Share2 size={14} className="text-[#DC2626]" />
            <span>Comunidad & Canales Oficiales</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
            Conéctate con <span className="text-[#DC2626]">Aura Corporativa</span>
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Publicamos convocatorias de empleo, guías laborales y contenido sobre gestión empresarial en nuestras redes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 items-stretch">
            {/* Facebook Card */}
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#1877f2] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-[#1877f2] mb-5 group-hover:bg-[#1877f2] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#1877f2] transition-colors">Facebook</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Convocatorias masivas, eventos y comunidad</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#1877f2] group-hover:translate-x-1 transition-transform">
                <span>Ir a Facebook</span>
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#e4405f] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-[#e4405f] mb-5 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-pink-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#e4405f] transition-colors">Instagram</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Cultura interna, reconocimientos y día a día en Aura</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#e4405f] group-hover:translate-x-1 transition-transform">
                <span>Ver fotos & reels</span>
                <ArrowRight size={14} />
              </div>
            </a>

            {/* TikTok Card */}
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-black hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-center justify-between text-center"
            >
              <div className="flex w-full flex-col items-center text-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 mb-5 group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-black transition-colors">TikTok</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Videos cortos, dinámicas de equipo y tips laborales</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                <span>Ver videos</span>
                <ArrowRight size={14} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BANNER DE CIERRE CTA
         ========================================================================= */}
      <section className="py-16 bg-gradient-to-r from-[#0B192C] to-[#142842] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            ¿Listo para llevar la gestión de su empresa al siguiente nivel?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Contáctenos hoy mismo para recibir una asesoría corporativa sin compromiso.
          </p>
          <a
            href="/#contacto"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-base rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            <span>Solicitar Cotización Corporativa</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default NosotrosPage;
