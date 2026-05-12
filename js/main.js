/* ====================================================
   GRANITAS KG — main.js
   Burger + scroll-reveal + accordion (native) + smooth scroll
   No deps. No GSAP.
   ==================================================== */

(function () {
  'use strict';

  // ---- Burger toggle ----
  var nav = document.querySelector('.nav');
  var burger = document.getElementById('nav-burger');
  var menu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Закрыть бургер при клике по ссылке
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // Закрыть при resize >720
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) closeMenu();
  });

  // ---- Smooth scroll (offset by sticky nav) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ---- Scroll reveal (IntersectionObserver) ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- Accordion: закрывать другие при открытии (single-open) ----
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

})();
