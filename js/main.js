/* ==========================================================================
   NOIR & OR — Script principal
   Menu mobile, header sticky, animations au scroll, formulaire, témoignages,
   accordéon FAQ, filtres galerie, bouton retour en haut.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initLoader();
    initHeader();
    initMobileNav();
    initActiveNavLink();
    initScrollReveal();
    initTestimonialSlider();
    initAccordion();
    initGalleryFilters();
    initContactForm();
    initNewsletterForm();
    initBackToTop();
    initYear();
  });

  /* ------------------------------------------------------------------ */
  /* Loader d'introduction                                              */
  /* ------------------------------------------------------------------ */
  function initLoader() {
    var loader = document.querySelector("[data-loader]");
    if (!loader) return;
    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("is-hidden");
      }, 250);
    });
    // Filet de sécurité si l'évènement load est déjà passé
    setTimeout(function () {
      loader.classList.add("is-hidden");
    }, 1800);
  }

  /* ------------------------------------------------------------------ */
  /* Header : effet au scroll                                           */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector("[data-header]");
    if (!header) return;

    function toggleHeader() {
      if (window.scrollY > 24) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    toggleHeader();
    window.addEventListener("scroll", toggleHeader, { passive: true });
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
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    links.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Lien de navigation actif selon la page courante                    */
  /* ------------------------------------------------------------------ */
  function initActiveNavLink() {
    var current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === current || (current === "" && href === "index.html")) {
        link.classList.add("is-active");
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Animations d'apparition au scroll (IntersectionObserver)           */
  /* ------------------------------------------------------------------ */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
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

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Carrousel de témoignages                                           */
  /* ------------------------------------------------------------------ */
  function initTestimonialSlider() {
    var track = document.querySelector("[data-testimonial-track]");
    if (!track) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll(".testimonial-slide"));
    var dotsWrap = document.querySelector("[data-testimonial-dots]");
    if (!slides.length) return;

    var current = 0;
    var timer = null;

    var dots = slides.map(function (_, index) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Voir le témoignage " + (index + 1));
      dot.addEventListener("click", function () {
        goTo(index);
        restart();
      });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function render() {
      slides.forEach(function (slide, index) {
        slide.classList.toggle("is-active", index === current);
      });
      dots.forEach(function (dot, index) {
        dot.classList.toggle("is-active", index === current);
      });
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      render();
    }

    function next() {
      goTo(current + 1);
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    render();
    restart();
  }

  /* ------------------------------------------------------------------ */
  /* Accordéon FAQ                                                      */
  /* ------------------------------------------------------------------ */
  function initAccordion() {
    var items = document.querySelectorAll("[data-accordion-item]");
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector("[data-accordion-trigger]");
      var panel = item.querySelector("[data-accordion-panel]");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        items.forEach(function (other) {
          other.classList.remove("is-open");
          var otherPanel = other.querySelector("[data-accordion-panel]");
          if (otherPanel) otherPanel.style.maxHeight = null;
          var otherTrigger = other.querySelector("[data-accordion-trigger]");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("is-open");
          panel.style.maxHeight = panel.scrollHeight + "px";
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Filtres de la galerie / portfolio                                  */
  /* ------------------------------------------------------------------ */
  function initGalleryFilters() {
    var filterButtons = document.querySelectorAll("[data-filter]");
    var items = document.querySelectorAll("[data-category]");
    if (!filterButtons.length || !items.length) return;

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var value = button.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
          btn.classList.remove("is-active");
        });
        button.classList.add("is-active");

        items.forEach(function (item) {
          var category = item.getAttribute("data-category");
          var show = value === "all" || value === category;
          item.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Validation du formulaire de contact                                */
  /* ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var successPanel = document.querySelector("[data-form-success]");

    var validators = {
      name: function (value) {
        return value.trim().length >= 2 ? "" : "Veuillez indiquer votre nom complet.";
      },
      email: function (value) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim()) ? "" : "Veuillez indiquer une adresse e-mail valide.";
      },
      phone: function (value) {
        if (!value.trim()) return "";
        var pattern = /^[0-9+()\s.-]{6,}$/;
        return pattern.test(value.trim()) ? "" : "Numéro de téléphone invalide.";
      },
      subject: function (value) {
        return value ? "" : "Veuillez sélectionner un sujet.";
      },
      message: function (value) {
        return value.trim().length >= 10 ? "" : "Votre message doit contenir au moins 10 caractères.";
      }
    };

    function showError(field, message) {
      var wrapper = field.closest(".field");
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".error-msg");
      wrapper.classList.toggle("has-error", Boolean(message));
      if (errorEl) errorEl.textContent = message;
    }

    function validateField(field) {
      var validator = validators[field.name];
      if (!validator) return true;
      var message = validator(field.value);
      showError(field, message);
      return !message;
    }

    Object.keys(validators).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        if (field.closest(".field").classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var isValid = true;
      Object.keys(validators).forEach(function (name) {
        var field = form.elements[name];
        if (!field) return;
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      var submitBtn = form.querySelector("[type=submit]");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours…";
      }

      // Simulation d'envoi (à remplacer par un appel API / service d'emails)
      setTimeout(function () {
        form.reset();
        form.hidden = true;
        if (successPanel) successPanel.classList.add("is-visible");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Envoyer le message";
        }
      }, 900);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Formulaire newsletter (footer)                                     */
  /* ------------------------------------------------------------------ */
  function initNewsletterForm() {
    var form = document.querySelector("[data-newsletter-form]");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("input[type=email]");
      var note = form.parentElement.querySelector(".note");
      if (!input || !input.value.trim()) return;

      if (note) {
        note.textContent = "Merci ! Vous êtes bien inscrit(e) à notre newsletter.";
        note.style.color = "var(--color-gold)";
      }
      form.reset();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Bouton retour en haut de page                                      */
  /* ------------------------------------------------------------------ */
  function initBackToTop() {
    var button = document.querySelector("[data-back-to-top]");
    if (!button) return;

    function toggle() {
      button.classList.toggle("is-visible", window.scrollY > 480);
    }

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* Année courante dans le footer                                      */
  /* ------------------------------------------------------------------ */
  function initYear() {
    var els = document.querySelectorAll("[data-year]");
    els.forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
