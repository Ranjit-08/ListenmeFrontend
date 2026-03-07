/**
 * ListenMe Theme Engine
 * Include in <head> of every page — applies saved theme before paint (no flicker).
 */
(function () {
  var THEMES = {
    green:  { primary: '#1db954', accent: '#1ed760', glow: 'rgba(29,185,84,0.20)',   dark: '#169943', soft: '#a7f3c4', btn: '#000' },
    red:    { primary: '#ef4444', accent: '#f87171', glow: 'rgba(239,68,68,0.20)',    dark: '#dc2626', soft: '#fecaca', btn: '#fff' },
    pink:   { primary: '#ec4899', accent: '#f472b6', glow: 'rgba(236,72,153,0.20)',   dark: '#db2777', soft: '#fbcfe8', btn: '#fff' },
    blue:   { primary: '#3b82f6', accent: '#60a5fa', glow: 'rgba(59,130,246,0.20)',   dark: '#2563eb', soft: '#bfdbfe', btn: '#fff' },
    violet: { primary: '#8b5cf6', accent: '#a78bfa', glow: 'rgba(139,92,246,0.20)',   dark: '#7c3aed', soft: '#ddd6fe', btn: '#fff' },
    amber:  { primary: '#f59e0b', accent: '#fbbf24', glow: 'rgba(245,158,11,0.20)',   dark: '#d97706', soft: '#fde68a', btn: '#000' },
    cyan:   { primary: '#06b6d4', accent: '#22d3ee', glow: 'rgba(6,182,212,0.20)',    dark: '#0891b2', soft: '#a5f3fc', btn: '#000' },
    white:  { primary: '#e5e5e5', accent: '#ffffff', glow: 'rgba(255,255,255,0.12)',   dark: '#a3a3a3', soft: '#f5f5f5', btn: '#000' },
  };

  function applyTheme(key) {
    var t = THEMES[key] || THEMES['green'];
    var r = document.documentElement;
    r.style.setProperty('--primary',      t.primary);
    r.style.setProperty('--primary-dark', t.dark);
    r.style.setProperty('--primary-glow', t.glow);
    r.style.setProperty('--accent',       t.accent);
    r.style.setProperty('--accent-soft',  t.soft);
    r.style.setProperty('--success',      t.primary);
    // store for other scripts to read
    window.__themeKey  = key;
    window.__themeBtnColor = t.btn;
  }

  try {
    var saved = localStorage.getItem('lm_theme') || 'green';
    applyTheme(saved);
  } catch (e) {
    applyTheme('green');
  }

  // expose globally so profile page can call it
  window.LMTheme = {
    themes: THEMES,
    apply: function (key) {
      try { localStorage.setItem('lm_theme', key); } catch (e) {}
      applyTheme(key);
    },
    current: function () {
      try { return localStorage.getItem('lm_theme') || 'green'; } catch (e) { return 'green'; }
    }
  };
})();