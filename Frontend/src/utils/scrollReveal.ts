/**
 * Sistema de animaciones de aparición al hacer scroll (Scroll Reveal)
 * Idéntico al sistema de ZWE Corporativa.
 */

let globalObserver: IntersectionObserver | null = null;

export function initScrollReveal(): () => void {
  if (typeof window === 'undefined') return () => {};

  if (!('IntersectionObserver' in window)) {
    // Fallback para navegadores antiguos: revelar todo inmediatamente
    document
      .querySelectorAll(
        '.reveal-on-scroll, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade, [data-reveal]'
      )
      .forEach((el) => el.classList.add('is-revealed'));
    return () => {};
  }

  // Desconectar observer previo si existía
  if (globalObserver) {
    globalObserver.disconnect();
  }

  globalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          globalObserver?.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    }
  );

  const scanAndObserve = () => {
    const elements = document.querySelectorAll(
      '.reveal-on-scroll:not(.is-revealed), .reveal-up:not(.is-revealed), .reveal-down:not(.is-revealed), .reveal-left:not(.is-revealed), .reveal-right:not(.is-revealed), .reveal-zoom:not(.is-revealed), .reveal-fade:not(.is-revealed), [data-reveal]:not(.is-revealed)'
    );

    elements.forEach((el) => {
      globalObserver?.observe(el);
    });
  };

  // Escaneo inicial y tras microtask para asegurar montaje del DOM
  scanAndObserve();
  const timer1 = setTimeout(scanAndObserve, 60);
  const timer2 = setTimeout(scanAndObserve, 250);

  return () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    if (globalObserver) {
      globalObserver.disconnect();
      globalObserver = null;
    }
  };
}

export function refreshScrollReveal() {
  if (!globalObserver || typeof window === 'undefined') {
    initScrollReveal();
    return;
  }

  const elements = document.querySelectorAll(
    '.reveal-on-scroll:not(.is-revealed), .reveal-up:not(.is-revealed), .reveal-down:not(.is-revealed), .reveal-left:not(.is-revealed), .reveal-right:not(.is-revealed), .reveal-zoom:not(.is-revealed), .reveal-fade:not(.is-revealed), [data-reveal]:not(.is-revealed)'
  );

  elements.forEach((el) => {
    globalObserver?.observe(el);
  });
}
