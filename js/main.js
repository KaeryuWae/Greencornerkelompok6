/**
 * GreenCorner - main.js
 * Fitur: Mode Gelap/Terang, Menu Hamburger, Tab Tanaman, Lightbox Galeri, Akordeon FAQ, Tombol Kembali ke Atas
 */

(function () {
  'use strict';

  // === 1. MANAJEMEN TEMA GELAP / TERANG ===
  const THEME_KEY = 'greencorner_theme';

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      if (theme) {
        localStorage.setItem(THEME_KEY, theme);
      } else {
        localStorage.removeItem(THEME_KEY);
      }
    } catch (e) {}
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    toggleBtns.forEach((btn) => {
      btn.setAttribute('aria-label', isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap');
      btn.innerHTML = isDark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  }

  function initTheme() {
    const saved = getSavedTheme();
    if (saved) {
      applyTheme(saved);
    } else {
      updateThemeToggleIcons(null);
    }

    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentSaved = getSavedTheme();
        let nextTheme;
        if (currentSaved === 'dark') {
          nextTheme = 'light';
        } else if (currentSaved === 'light') {
          nextTheme = 'dark';
        } else {
          const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          nextTheme = sysDark ? 'light' : 'dark';
        }
        saveTheme(nextTheme);
        applyTheme(nextTheme);
      });
    });

    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!getSavedTheme()) {
          updateThemeToggleIcons(null);
        }
      });
    } catch (e) {}
  }

  // === 2. MENU HAMBURGER (RESPONSIF MOBILE) ===
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileDialog = document.querySelector('.mobile-nav-dialog');
    if (!menuToggle || !mobileDialog) return;

    function openMenu() {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Tutup menu navigasi');
      mobileDialog.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      const firstLink = mobileDialog.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
      mobileDialog.classList.remove('is-open');
      document.body.style.overflow = '';
      menuToggle.focus();
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileDialog.addEventListener('click', (e) => {
      if (e.target === mobileDialog) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  }

  // === 3. TAB TANAMAN (ARIA TABLIST DENGAN KEYBOARD ARROW) ===
  function initPlantTabs() {
    const tablists = document.querySelectorAll('[role="tablist"]');
    tablists.forEach((tablist) => {
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      const container = tablist.closest('.plant-tabs') || tablist.parentElement;

      function switchTab(newTab) {
        tabs.forEach((tab) => {
          const isSelected = tab === newTab;
          tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          tab.setAttribute('tabindex', isSelected ? '0' : '-1');
          const panelId = tab.getAttribute('aria-controls');
          const panel = container.querySelector('#' + panelId);
          if (panel) {
            if (isSelected) {
              panel.removeAttribute('hidden');
            } else {
              panel.setAttribute('hidden', '');
            }
          }
        });
        newTab.focus();
      }

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          switchTab(tab);
        });

        tab.addEventListener('keydown', (e) => {
          let targetIndex = -1;
          if (e.key === 'ArrowRight') {
            targetIndex = (index + 1) % tabs.length;
          } else if (e.key === 'ArrowLeft') {
            targetIndex = (index - 1 + tabs.length) % tabs.length;
          } else if (e.key === 'Home') {
            targetIndex = 0;
          } else if (e.key === 'End') {
            targetIndex = tabs.length - 1;
          }

          if (targetIndex !== -1) {
            e.preventDefault();
            switchTab(tabs[targetIndex]);
          }
        });
      });
    });
  }

  // === 4. AKORDEON FAQ ===
  function initAccordion() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const contentId = trigger.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (!content) return;

        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          content.classList.remove('is-open');
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          content.classList.add('is-open');
        }
      });
    });
  }

  // === 5. LIGHTBOX DOKUMENTASI ===
  function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.querySelector('.lightbox-modal');
    if (!galleryItems.length || !lightboxModal) return;

    const lightboxImg = lightboxModal.querySelector('.lightbox-media img');
    const lightboxCaption = lightboxModal.querySelector('.lightbox-caption-bar');
    const btnClose = lightboxModal.querySelector('.lightbox-close');
    const btnPrev = lightboxModal.querySelector('.lightbox-prev');
    const btnNext = lightboxModal.querySelector('.lightbox-next');

    let currentIndex = 0;
    let lastActiveTrigger = null;

    const photosData = Array.from(galleryItems).map((item, idx) => {
      const img = item.querySelector('img');
      const captionEl = item.querySelector('.gallery-caption');
      return {
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') : '',
        caption: captionEl ? captionEl.textContent.trim() : (img ? img.getAttribute('alt') : ''),
        trigger: item
      };
    });

    function showPhoto(index) {
      if (index < 0) index = photosData.length - 1;
      if (index >= photosData.length) index = 0;
      currentIndex = index;

      const data = photosData[currentIndex];
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
      lightboxCaption.textContent = `${currentIndex + 1} dari ${photosData.length}: ${data.caption}`;
    }

    function openLightbox(index, triggerElement) {
      lastActiveTrigger = triggerElement;
      showPhoto(index);
      lightboxModal.classList.add('is-active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (btnClose) btnClose.focus();
    }

    function closeLightbox() {
      lightboxModal.classList.remove('is-active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveTrigger) {
        lastActiveTrigger.focus();
      }
    }

    galleryItems.forEach((item, idx) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `Lihat foto: ${photosData[idx].caption}`);

      item.addEventListener('click', () => openLightbox(idx, item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx, item);
        }
      });
    });

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnPrev) btnPrev.addEventListener('click', () => showPhoto(currentIndex - 1));
    if (btnNext) btnNext.addEventListener('click', () => showPhoto(currentIndex + 1));

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('is-active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPhoto(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showPhoto(currentIndex + 1);
      } else if (e.key === 'Tab') {
        // Focus trap
        const focusables = lightboxModal.querySelectorAll('button:not([disabled])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // === 6. TOMBOL KEMBALI KE ATAS ===
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === 7. RESILIENSI GAMBAR OTOMATIS (.jpg <-> .jpeg & variasi nama) ===
  function initImageFallbacks() {
    document.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', function () {
        const src = this.getAttribute('src');
        if (!src) return;

        if (src.endsWith('.jpg') && !this.dataset.extFallback) {
          this.dataset.extFallback = 'true';
          this.src = src.replace(/\.jpg$/, '.jpeg');
        } else if (src.endsWith('.jpeg') && !this.dataset.extFallback) {
          this.dataset.extFallback = 'true';
          this.src = src.replace(/\.jpeg$/, '.jpg');
        } else if (src.includes('ukur-lahan') && !this.dataset.nameFallback) {
          this.dataset.nameFallback = 'true';
          this.src = src.replace('ukur-lahan', 'ukuran-lahan');
        } else if (src.includes('ukuran-lahan') && !this.dataset.nameFallback) {
          this.dataset.nameFallback = 'true';
          this.src = src.replace('ukuran-lahan', 'ukur-lahan');
        }
      });
    });
  }

  // Inisialisasi saat DOM siap
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initPlantTabs();
    initAccordion();
    initLightbox();
    initBackToTop();
    initImageFallbacks();
  });
})();
