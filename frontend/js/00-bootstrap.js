// ============================================================
// 00-bootstrap.js — Helpers globales mínimos
// Movidos de index.html por CSP (Content-Security-Policy)
// ============================================================

// API URL — delega en el cliente API canónico.
const API = () => {
  if (typeof window.LGMDM?.api?.apiBase === 'function') {
    return window.LGMDM.api.apiBase();
  }
  return 'https://masteringstudio-api.duckdns.org';
};

// Prevenir zoom por doble-tap en mobile
(function () {
  'use strict';
  
  let lastTouchEnd = 0;
  
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Reajustar viewport al rotar dispositivo
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  });
})();
