// ============================================================
// 00-button-handlers.js — Manejadores de botones del UI
// ============================================================

(function() {
  'use strict';

  console.log('🔘 Inicializando manejadores de botones...');

  // Helper seguro para obtener elementos
  const $ = (id) => document.getElementById(id);

  // BOTÓN: Help
  const helpBtn = $('helpBtn');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      alert('MASTER Audio Studio v1.0\n\n1. ANÁLISIS: Carga archivos y analiza\n2. CONSOLA: Ajusta parámetros\n3. PREVIEW: Escucha resultados\n4. PRESETS: Guarda configuraciones');
    });
  }

  // BOTÓN: Logout
  const logoutBtn = $('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('¿Salir de la sesión?')) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  // BOTÓN: Theme switcher
  const themeSwitcher = $('theme-switcher-btn');
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('theme-mode', document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  }

  // FILE INPUT: Cargar archivo
  const fileInput = $('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        console.log('📁 Archivo cargado:', file.name, `(${sizeMB} MB)`);
        
        const event = new CustomEvent('file-loaded', { detail: { file } });
        document.dispatchEvent(event);
      }
    });
  }

  // DRAG & DROP: Drop zone para archivos
  const dropZone = $('dropZone');
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--accent, #00ff88)';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'var(--border-color, #333)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--border-color, #333)';

      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  console.log('✅ Manejadores de botones inicializados');
})();
