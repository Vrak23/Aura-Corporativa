/**
 * Curva de aceleración y desaceleración suave (Ease-in-out cubic).
 */
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Desplaza la ventana hacia arriba con animación easing progresiva.
 * @param duration Duración en milisegundos (default: 800ms)
 */
export const scrollToTopAnimated = (duration: number = 800): void => {
  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  if (startPosition <= 0) return;

  let startTime: number | null = null;

  const step = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(startPosition * (1 - easedProgress)));

    if (timeElapsed < duration) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, 0);
    }
  };

  requestAnimationFrame(step);
};

/**
 * Desplaza la ventana suavemente hacia un elemento objetivo o posición con animación easing progresiva.
 * @param target Selector CSS (ej. "#servicios") o posición numérica en píxeles.
 * @param offset Compensación para navbar sticky (default: 80px)
 * @param duration Duración en milisegundos (default: 800ms)
 */
export const scrollToElementAnimated = (
  target: string | number,
  offset: number = 80,
  duration: number = 800
): void => {
  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  let targetPosition = 0;

  if (typeof target === 'number') {
    targetPosition = target;
  } else {
    const element = document.querySelector(target);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    targetPosition = rect.top + startPosition - offset;
  }

  // Asegurar que no sea menor a 0
  targetPosition = Math.max(0, targetPosition);
  const distance = targetPosition - startPosition;

  if (Math.abs(distance) < 5) return;

  let startTime: number | null = null;

  const step = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(startPosition + distance * easedProgress));

    if (timeElapsed < duration) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
    }
  };

  requestAnimationFrame(step);
};
