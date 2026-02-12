/* ============================================
   Decision Design Lab — Shared Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Nav: transparent → solid on scroll (landing page only) ---
  const nav = document.querySelector('.site-nav');
  const hero = document.querySelector('.hero');

  if (nav && hero) {
    function updateNav() {
      if (window.scrollY > 80) {
        nav.classList.add('nav-solid');
      } else {
        nav.classList.remove('nav-solid');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  } else if (nav) {
    // Non-landing pages: nav is always solid
    nav.classList.add('nav-solid');
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Lightbox ---
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.querySelector('.lightbox .close-btn');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.clickable-image').forEach(function (img) {
      img.addEventListener('click', function () {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.getAttribute('data-src');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        lightbox.style.display = 'none';
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
      }
    });
  }
});
