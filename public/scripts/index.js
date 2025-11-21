 
document.getElementById('menu-toggle').addEventListener('click', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});
 const openBtn = document.getElementById('info');
    const modal = document.getElementById('about-modal');
    const panel = modal.querySelector('[data-panel]');
    const backdrop = modal.querySelector('[data-backdrop]');
    const closeBtns = modal.querySelectorAll('[data-close]');
    let lastFocused = null;

    const showModal = () => {
      lastFocused = document.activeElement;
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('overflow-hidden');


      requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('opacity-0', 'scale-95');
        backdrop.classList.add('opacity-100');
        panel.classList.add('opacity-100', 'scale-100');
      });


      panel.focus({ preventScroll: true });
    };

    const hideModal = () => {

      backdrop.classList.remove('opacity-100');
      panel.classList.remove('opacity-100', 'scale-100');
      backdrop.classList.add('opacity-0');
      panel.classList.add('opacity-0', 'scale-95');


      const cleanup = () => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('overflow-hidden');
        panel.removeEventListener('transitionend', cleanup);

        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus({ preventScroll: true });
      };
      panel.addEventListener('transitionend', cleanup, { once: true });
    };

    openBtn?.addEventListener('click', showModal);


    backdrop.addEventListener('click', hideModal);
    closeBtns.forEach(btn => btn.addEventListener('click', hideModal));

    
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('hidden') && e.key === 'Escape') {
        hideModal();
      }
    });


    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter(el => el.offsetParent !== null);
      if (!list.length) return;

      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

