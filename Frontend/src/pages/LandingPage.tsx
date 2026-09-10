import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { WhyAuraSection } from '../components/WhyAuraSection';
import { FaqSection } from '../components/FaqSection';
import { ContactInfoSection } from '../components/ContactInfoSection';

interface LandingPageProps {
  onOpenPrivacy?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenPrivacy }) => {
  return (
    <main className="grow">
      {/* Hero Principal */}
      <Hero />

      {/* Catálogo de Servicios */}
      <ServicesSection />

      {/* ¿Por qué elegirnos? */}
      <WhyAuraSection />

      {/* Preguntas Frecuentes */}
      <FaqSection />

      {/* Contacto & Solicitud */}
      <ContactInfoSection onOpenPrivacy={onOpenPrivacy} />
    </main>
  );
};

export default LandingPage;
