// ============================================================
// 02-sliders-ui.js — Sliders y actualización de valores en vivo
// ============================================================

(function() {
  'use strict';

  console.log('🎚️ Inicializando sliders...');

  // Formatear valores dB
  function formatDbValue(v) {
    return (parseFloat(v) >= 0 ? '+' : '') + parseFloat(v).toFixed(1) + ' dB';
  }

  // Lista de sliders [id-slider, id-valor, función-formato]
  const sliders = [
    ['s-ingain', 'v-ingain', (v) => (v >= 0 ? '+' : '') + v.toFixed(1) + ' dB'],
    ['s-thresh', 'v-thresh', (v) => formatDbValue(v)],
    ['s-ratio', 'v-ratio', (v) => v.toFixed(1) + ':1'],
    ['s-cattack', 'v-cattack', (v) => v.toFixed(1) + ' ms'],
    ['s-crelease', 'v-crelease', (v) => Math.round(v) + ' ms'],
    ['s-cmakeup', 'v-cmakeup', (v) => (v >= 0 ? '+' : '') + v.toFixed(1) + ' dB'],
    ['s-hp', 'v-hp', (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' kHz' : v + ' Hz')],
    ['s-eq1freq', 'v-eq1freq-disp', (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' kHz' : Math.round(v) + ' Hz')],
    ['s-eq1gain', 'v-eq1gain', (v) => (v >= 0 ? '+' : '') + v.toFixed(1) + ' dB'],
    ['s-eq1q', 'v-eq1q', (v) => v.toFixed(1)],
    ['s-eq2freq', 'v-eq2freq-disp', (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' kHz' : Math.round(v) + ' Hz')],
    ['s-eq2gain', 'v-eq2gain', (v) => (v >= 0 ? '+' : '') + v.toFixed(1) + ' dB'],
    ['s-eq2q', 'v-eq2q', (v) => v.toFixed(1)],
    ['s-eq3freq', 'v-eq3freq-disp', (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' kHz' : Math.round(v) + ' Hz')],
    ['s-eq3gain', 'v-eq3gain', (v) => (v >= 0 ? '+' : '') + v.toFixed(1) + ' dB'],
    ['s-eq3q', 'v-eq3q', (v) => v.toFixed(1)],
    ['s-air', 'v-air', (v) => (v >= 0 ? '+' : '') + parseFloat(v).toFixed(1) + ' dB'],
    ['s-lp-cutoff', 'v-lp-cutoff', (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' kHz' : Math.round(v) + ' Hz')],
    ['s-nr-strength', 'v-nr-strength', (v) => parseFloat(v).toFixed(2)],
    ['s-reso-freq', 'v-reso-freq', (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' kHz' : Math.round(v) + ' Hz')],
    ['s-reso-q', 'v-reso-q', (v) => parseFloat(v).toFixed(1)],
  ];

  // Sincronizar sliders con sus valores mostrados
  sliders.forEach(([sliderId, valueId, formatter]) => {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (slider && valueDisplay) {
      slider.addEventListener('input', () => {
        try {
          valueDisplay.textContent = formatter(parseFloat(slider.value));
        } catch (error) {
          console.error(`Error formateando slider ${sliderId}:`, error);
        }
      });
    }
  });

  console.log('✅ Sliders inicializados');
})();
