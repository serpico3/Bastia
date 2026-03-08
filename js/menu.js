/* ═══════════════════════════════════════════════════════════════
   menu.js — Gestione tab del menu (menu.html)
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  if (!tabs.length) return;

  function activateTab(tab, scrollToMenu) {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const target = document.getElementById('panel-' + tab.dataset.panel);
    if (target) target.classList.add('active');

    if (scrollToMenu) {
      const menuEl = document.getElementById('menu-page');
      if (menuEl) {
        const y = menuEl.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
      }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab, true));
  });

  /* ── Apertura tab da URL hash (#pizza, #pesce …) ─────────── */
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchingTab = document.querySelector(`.menu-tab[data-panel="${hash}"]`);
    if (matchingTab) activateTab(matchingTab, false);
  }

});
