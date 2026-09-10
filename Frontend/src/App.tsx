import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { LegalModal } from './components/LegalModal';
import type { LegalModalType } from './components/LegalModal';

export function App() {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
        {/* Encabezado con Enrutamiento */}
        <Navbar isMenuOpen={isMobileMenuOpen} onMenuToggle={setIsMobileMenuOpen} />

        {/* Rutas de la Aplicación */}
        <Routes>
          <Route path="/" element={<LandingPage onOpenPrivacy={() => setLegalModal('privacy')} />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
        </Routes>

        {/* Pie de Página */}
        <Footer 
          onOpenTerms={() => setLegalModal('terms')} 
          onOpenPrivacy={() => setLegalModal('privacy')} 
        />

        {/* Botón Flotante para Volver Arriba */}
        <ScrollToTopButton isHidden={isMobileMenuOpen} />

        {/* Botón Flotante de WhatsApp */}
        <WhatsAppButton isHidden={isMobileMenuOpen} />

        {/* Modal Legal */}
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
