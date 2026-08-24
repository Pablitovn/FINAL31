// ============================================================
// 00-sanitizer.js — Utilidad de sanitización XSS
// ============================================================

(function (global) {
  'use strict';

  const LGMDM = global.LGMDM = global.LGMDM || {};
  
  // Sanitizador seguro para HTML
  const sanitizer = {
    /**
     * Escapa caracteres especiales en strings para prevenir XSS
     * @param {string} str - String a escapar
     * @returns {string} - String escapado
     */
    escapeHtml: function (str) {
      if (typeof str !== 'string') return String(str);
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return str.replace(/[&<>"']/g, (char) => map[char]);
    },

    /**
     * Establece textContent de forma segura
     * @param {Element} element - Elemento del DOM
     * @param {string} text - Texto a establecer
     */
    setText: function (element, text) {
      if (!element) return;
      if (typeof element.textContent !== 'undefined') {
        element.textContent = text; // Siempre seguro
      }
    },

    /**
     * Establece atributos de forma segura
     * @param {Element} element - Elemento del DOM
     * @param {string} attr - Nombre del atributo
     * @param {string} value - Valor del atributo
     */
    setAttribute: function (element, attr, value) {
      if (!element || !attr) return;
      
      // Whitelist de atributos seguros
      const safeAttrs = ['data-', 'class', 'id', 'style', 'title', 'alt', 'type', 'placeholder', 'disabled', 'checked'];
      const isSafe = safeAttrs.some(safe => attr.startsWith(safe) || attr === safe);
      
      if (isSafe) {
        element.setAttribute(attr, String(value));
      }
    },

    /**
     * Crea un elemento de forma segura
     * @param {string} tag - Tag HTML
     * @param {Object} attrs - Atributos (key-value)
     * @param {string} text - Contenido de texto
     * @returns {Element} - Elemento creado
     */
    createElement: function (tag, attrs = {}, text = '') {
      if (!tag || typeof tag !== 'string') return null;
      
      const el = document.createElement(tag);
      
      // Establecer atributos seguros
      Object.entries(attrs).forEach(([key, value]) => {
        this.setAttribute(el, key, value);
      });
      
      // Establecer texto (nunca HTML)
      if (text) {
        this.setText(el, text);
      }
      
      return el;
    },

    /**
     * Valida y sanitiza URLs
     * @param {string} url - URL a validar
     * @returns {string|null} - URL segura o null
     */
    sanitizeUrl: function (url) {
      if (typeof url !== 'string') return null;
      
      // Solo permitir URLs relativas o http/https
      const safe = /^(https?:\/\/|\/|\.\/)/i.test(url);
      return safe ? url : null;
    },

    /**
     * Valida y sanitiza atributos de estilo
     * @param {string} style - Atributo style
     * @returns {string} - Style sanitizado
     */
    sanitizeStyle: function (style) {
      if (typeof style !== 'string') return '';
      
      // Blacklist de propiedades peligrosas
      const dangerous = ['behavior', 'binding', '-moz-binding', 'expression', 'javascript:'];
      let sanitized = style;
      
      dangerous.forEach(dangerProp => {
        const regex = new RegExp(dangerProp, 'gi');
        sanitized = sanitized.replace(regex, '');
      });
      
      return sanitized;
    }
  };

  // Exportar al namespace global
  LGMDM.sanitizer = sanitizer;
  
  // Backward compatibility
  if (typeof global.LGMDM?.ui?.escapeHtml === 'undefined') {
    if (!global.LGMDM.ui) global.LGMDM.ui = {};
    global.LGMDM.ui.escapeHtml = sanitizer.escapeHtml.bind(sanitizer);
  }

})(window);
