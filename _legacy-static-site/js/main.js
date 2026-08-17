/* ==========================================================================
   MAHMOUD IMMOBILIER — Script principal
   Intro cinématique, navigation sticky, reveal au scroll, menu mobile,
   lien actif, parallax léger, respect de prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initIntro();
    initHeader();
    initMobileNav();
    initSmoothAnchors();
    initScrollReveal();
    initActiveSection();
    initHeroParallax();
    initYear();
  });

  /* ------------------------------------------------------------------ */
  /* Intro cinématique                                                  */
  /* ------------------------------------------------------------------ */
  function initIntro() {
    var intro = document.querySelector("[data-intro]");
    if (!intro) return;

    if (reduceMotion) {
      intro.classList.add("is-hidden");
      return;
    }

    document.body.classList.add("intro-active");

    var hidden = false;
    function hide() {
      if (hidden) return;
      hidden = true;
      intro.classList.add("is-hidden");
      document.body.classList.remove("intro-active");
      intro.setAttribute("aria-hidden", "true");
    }

    // Séquence d'apparition
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        intro.classList.add("is-ready");
      });
    });

    var autoTimer = setTimeout(hide, 2400);

    var skipBtn = intro.querySelector("[data-intro-skip]");
    if (skipBtn) {
      skipBtn.addEventListener("click", function () {
        clearTimeout(autoTimer);
        hide();
      });
    }

    intro.addEventListener("click", function (event) {
      if (event.target === intro) {
        clearTimeout(autoTimer);
        hide();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Header : sticky + masquage au scroll vers le bas                   */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector("[data-header]");
    if (!header) return;

    var lastY = window.scrollY;

    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 24);

      if (y > lastY && y > 200) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }
      lastY = y;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* Menu mobile plein écran                                            */
  /* ------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav-mobile]");
    if (!toggle || !nav) return;

    var links = nav.querySelectorAll("a");

    function closeNav() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }

    function openNav() {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.body.classList.add("nav-open");
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });

    links.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Défilement doux vers les ancres (fermeture menu incluse)           */
  /* ------------------------------------------------------------------ */
  function initSmoothAnchors() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var id = link.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        history.pushState(null, "", id);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Animations d'apparition au scroll                                  */
  /* ------------------------------------------------------------------ */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (item) { observer.observe(item); });
  }

  /* ------------------------------------------------------------------ */
  /* Lien de navigation actif selon la section visible                  */
  /* ------------------------------------------------------------------ */
  function initActiveSection() {
    var sections = document.querySelectorAll("main section[id]");
    var navLinks = document.querySelectorAll("[data-nav-link]");
    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

    var map = {};
    navLinks.forEach(function (link) {
      map[link.getAttribute("href")] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = "#" + entry.target.id;
          var link = map[id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ------------------------------------------------------------------ */
  /* Parallax léger sur le halo du hero (desktop, souris uniquement)    */
  /* ------------------------------------------------------------------ */
  function initHeroParallax() {
    if (reduceMotion) return;
    var glow = document.querySelector("[data-hero-glow]");
    if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

    var ticking = false;
    var targetX = 0;
    var targetY = 0;

    document.addEventListener("mousemove", function (event) {
      targetX = (event.clientX / window.innerWidth - 0.5) * 40;
      targetY = (event.clientY / window.innerHeight - 0.5) * 40;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          glow.style.transform = "translate(calc(-50% + " + targetX + "px), calc(-50% + " + targetY + "px))";
          ticking = false;
        });
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Année courante dans le footer                                      */
  /* ------------------------------------------------------------------ */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
