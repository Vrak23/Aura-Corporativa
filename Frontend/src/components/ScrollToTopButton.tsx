import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { scrollToTopAnimated } from '../utils/scrollUtils';

interface ScrollToTopButtonProps {
  isHidden?: boolean;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isHidden = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar cuando el usuario haya scrolleado más de 300px o cerca del final
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    scrollToTopAnimated(800);
    setTimeout(() => setIsAnimating(false), 850);
  };

  if (isHidden || !isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isAnimating}
      aria-label="Volver al inicio con animación"
      className={`fixed bottom-6 left-6 sm:bottom-22 sm:right-6 sm:left-auto z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#0B192C]/90 hover:bg-[#0B192C] text-white shadow-lg hover:shadow-2xl border border-slate-700/60 backdrop-blur-xs transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-modal-card-in ${
        isAnimating ? 'scale-95 bg-[#DC2626] border-red-500 shadow-red-500/30' : ''
      }`}
    >
      <ChevronUp
        size={24}
        className={`stroke-[2.5] transition-transform duration-300 ${
          isAnimating ? '-translate-y-1 scale-110' : ''
        }`}
      />
    </button>
  );
};

export default ScrollToTopButton;
