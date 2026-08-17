/* ═══════════════════════════════════════════════════════════
   PRESET 1 — SMOOTH REVEAL — UNLIMITED Premium Effects
   ═══════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  // ─── STYLE-BASED EFFECTS GATING ────────────────────────
  const _styleNum = (document.body.dataset.style || "").trim();
  const _BASELINE = new Set([
    "scroll-progress","lenis-smooth-scroll","smooth-anchor",
    "image-lightbox","animated-counters","footer-reveal","reveal-fade-up",
    "stagger-cards","section-headers-char","contact-list-stagger",
    "section-divider-lines","ripple-effect","gradient-border",
    "map-reveal","page-transitions","hero-cta-entrance","team-card-reveal"
  ]);
  const _STYLE_EXTRAS = {
    "02":["parallax-images","before-after-slider","text-morphing","parallax-hero-text","preloader","hero-stats-bounce"],
    "06":["3d-tilt-spotlight","magnetic-buttons","preloader","parallax-images","cta-particles","grain-overlay","glow-pulse","text-highlight","hero-stats-bounce","section-mouse-gradient"],
    "08":["text-scramble","typewriter","magnetic-buttons","3d-tilt-spotlight","curtain-wipe","marquee-ticker","horizontal-scroll","stacking-cards","grain-overlay","chromatic-aberration","broken-grid","scrollytelling","parallax-images","preloader","magnetic-repel","text-highlight","glow-pulse"],
    "10":["3d-tilt-spotlight","magnetic-buttons","cta-particles","preloader","parallax-images","chromatic-aberration","glow-pulse","section-mouse-gradient","text-highlight","hero-stats-bounce","grain-overlay","marquee-ticker"],
    "11":["parallax-images","preloader","3d-tilt-spotlight","cta-particles","text-morphing","hero-stats-bounce","glow-pulse","section-mouse-gradient"],
    "13":["reveal-left-right","parallax-images","preloader","text-morphing","3d-tilt-spotlight","magnetic-buttons","hero-stats-bounce","section-mouse-gradient","grain-overlay"],
    "15":["3d-tilt-spotlight","magnetic-buttons","cta-particles","glow-pulse","chromatic-aberration","section-mouse-gradient","preloader","parallax-images","text-highlight","marquee-ticker","grain-overlay","hero-stats-bounce","magnetic-repel"],
    "19":["3d-tilt-spotlight","magnetic-buttons","cta-particles","glow-pulse","chromatic-aberration","section-mouse-gradient","preloader","parallax-images","text-morphing","hero-stats-bounce","grain-overlay"],
    "21":["text-scramble","typewriter","3d-tilt-spotlight","cta-particles","grain-overlay","scrollytelling","text-highlight","parallax-images","preloader","curtain-wipe","section-mouse-gradient","magnetic-buttons","hero-stats-bounce","stacking-cards"],
    "23":["parallax-images","preloader","before-after-slider","3d-tilt-spotlight","cta-particles","hero-stats-bounce","text-morphing","section-mouse-gradient","grain-overlay"],
    "24":["parallax-images","preloader","glow-pulse","hero-stats-bounce","section-mouse-gradient"],
    "25":["preloader","curved-corner-cutouts"],
    "26":["parallax-images","preloader","stagger-cards","scrollytelling","hero-stats-bounce","split-text-chars","clip-path-reveal","button-fill-hover","spotlight-cursor","conic-progress-ring","page-transitions-bars"],
    "27":["preloader","twist-in","reveal-left-right"],
    "28":["preloader","glow-pulse","text-scramble","typewriter","hero-stats-bounce","section-mouse-gradient","neon-scanlines","terminal-cursor"]
  };
  const _extraSet = new Set(_STYLE_EXTRAS[_styleNum] || []);
  const _allActive = new Set([..._BASELINE, ..._extraSet]);
  const _fx = (name) => _allActive.has(name);

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ─── 1. SCROLL PROGRESS BAR ──────────────────────────────
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) progressBar.style.transform = `scaleX(${window.scrollY / h})`;
  }, { passive: true });

  // ─── 2. PRELOADER — dramatic clip-path reveal ────────────
  if (_fx("preloader")) {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    const onLoad = () => {
      setTimeout(() => {
        preloader.style.clipPath = "circle(0% at 50% 50%)";
        preloader.style.transition = "clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1)";
        setTimeout(() => {
          preloader.style.display = "none";
          document.body.classList.add("loaded");
        }, 1200);
      }, 400);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    setTimeout(onLoad, 4000);
  } else {
    document.body.classList.add("loaded");
  }
  } else {
    document.body.classList.add("loaded");
  } // end preloader gate

  // ─── 3. GRAIN / NOISE OVERLAY ────────────────────────────
  if (_fx("grain-overlay")) {
  const grain = document.createElement("div");
  grain.className = "grain-overlay";
  document.body.appendChild(grain);
  } // end grain-overlay gate

  // ─── 5. LENIS SMOOTH SCROLL (desktop only) ──────────────
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                   || ("ontouchstart" in window && window.innerWidth <= 1024);
  let lenis;
  if (typeof Lenis !== "undefined" && !isMobile) {
    // Убираем CSS scroll-behavior — конфликтует с Lenis
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";

    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ─── 6. GSAP SETUP ──────────────────────────────────────
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    // GSAP not loaded — show everything so content isn't hidden
    document.querySelectorAll("[data-reveal], [data-reveal-hero]").forEach(el => el.style.opacity = "1");
    document.body.classList.add("loaded");
    const pl = document.querySelector(".preloader");
    if (pl) pl.style.display = "none";
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Reduced motion: prefersReducedMotion flag used inline for shorter durations, no blur/rotation

  // ─── 7. HERO — text scramble + 3D char animation ────────
  if (_fx("text-scramble")) {
  const heroTitle = document.querySelector("[data-split]");
  if (heroTitle && typeof SplitType !== "undefined") {
    const split = new SplitType(heroTitle, { types: "chars, words" });
    const scrambleChars = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ01234!@#$%&";

    split.chars.forEach((char, i) => {
      const original = char.textContent;
      if (original.trim() === "") return;
      let count = 0;
      const max = 6 + Math.random() * 8;

      gsap.fromTo(char,
        { y: 120, opacity: 0, rotateX: -90, scale: 0.3, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1, filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          delay: 0.8 + i * 0.04,
          onUpdate: function() {
            if (count < max && this.progress() < 0.6) {
              char.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              count++;
            } else {
              char.textContent = original;
            }
          },
          onComplete: () => { char.textContent = original; },
        }
      );
    });
  }
  } // end text-scramble gate

  // Hero subtitle — typewriter effect
  if (_fx("typewriter")) {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = "";
    heroSubtitle.style.opacity = "1";
    heroSubtitle.style.borderRight = "2px solid rgba(255,255,255,0.7)";

    gsap.delayedCall(1.8, () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          heroSubtitle.textContent += text[i];
          i++;
          setTimeout(type, 20 + Math.random() * 20);
        } else {
          // Remove cursor after typing
          setTimeout(() => { heroSubtitle.style.borderRight = "none"; }, 1000);
        }
      };
      type();
    });
  }
  } // end typewriter gate

  // Hero CTA — dramatic scale entrance with blur
  gsap.fromTo("[data-reveal-hero]:not(.hero-subtitle)",
    { y: prefersReducedMotion ? 15 : 60, opacity: 0, scale: prefersReducedMotion ? 0.95 : 0.7, filter: prefersReducedMotion ? "none" : "blur(15px)" },
    { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: prefersReducedMotion ? 0.4 : 1, stagger: 0.15, ease: "power3.out", delay: prefersReducedMotion ? 0.5 : 2.5 }
  );

  // Hero stats — elastic bounce
  if (_fx("hero-stats-bounce")) {
  gsap.fromTo(".hero-stat",
    { scale: 0, opacity: 0, rotation: -15 },
    { scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.12, ease: "elastic.out(1, 0.5)", delay: 2.8 }
  );
  } // end hero-stats-bounce gate

  // ─── 8. MARQUEE TICKER ──────────────────────────────────
  if (_fx("marquee-ticker")) {
  document.querySelectorAll(".marquee").forEach((marquee) => {
    const content = marquee.querySelector(".marquee-content");
    if (!content) return;
    // Clone for infinite loop
    for (let c = 0; c < 3; c++) {
      marquee.appendChild(content.cloneNode(true));
    }
    gsap.to(marquee.querySelectorAll(".marquee-content"), {
      xPercent: -100,
      repeat: -1,
      duration: 25,
      ease: "linear",
    });
  });
  } // end marquee-ticker gate

  // ─── 9. PARALLAX — multi-layer depth ────────────────────
  if (_fx("parallax-images")) {
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    const img = el.querySelector("img");
    if (img) {
      gsap.to(img, {
        yPercent: -25 * speed,
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }
  });
  } // end parallax-images gate

  // ─── 10. REVEAL ANIMATIONS — dramatic reveals ───────────
  // Slide from left with 3D rotation
  if (_fx("reveal-left-right")) {
  document.querySelectorAll("[data-reveal='left']").forEach((el) => {
    gsap.fromTo(el,
      { x: -150, opacity: 0, clipPath: "inset(0 100% 0 0)", rotateY: 8 },
      {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", rotateY: 0,
        duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  });

  // Slide from right with 3D rotation
  document.querySelectorAll("[data-reveal='right']").forEach((el) => {
    gsap.fromTo(el,
      { x: 150, opacity: 0, clipPath: "inset(0 0 0 100%)", rotateY: -8 },
      {
        x: 0, opacity: 1, clipPath: "inset(0 0 0 0%)", rotateY: 0,
        duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  });
  } // end reveal-left-right gate

  // Scale up with blur dissolve
  document.querySelectorAll("[data-reveal='scale']").forEach((el) => {
    gsap.fromTo(el,
      { scale: 0.5, opacity: 0, filter: "blur(20px)", rotateZ: -3 },
      {
        scale: 1, opacity: 1, filter: "blur(0px)", rotateZ: 0,
        duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  });

  // Default fade-up with rotation and blur
  document.querySelectorAll("[data-reveal]:not([data-reveal='left']):not([data-reveal='right']):not([data-reveal='scale'])").forEach((el) => {
    gsap.fromTo(el,
      { y: prefersReducedMotion ? 20 : 100, opacity: 0, rotateX: prefersReducedMotion ? 0 : -10, filter: prefersReducedMotion ? "none" : "blur(8px)" },
      {
        y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)",
        duration: prefersReducedMotion ? 0.4 : 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onComplete: () => el.classList.add("revealed"),
      }
    );
  });

  // ─── 11. STAGGER CARDS — cascading 3D reveal ────────────
  document.querySelectorAll(".services-grid, .team-grid, .gallery-grid").forEach((grid) => {
    const cards = grid.children;
    if (cards.length === 0) return;
    gsap.fromTo(cards,
      { y: prefersReducedMotion ? 20 : 120, opacity: 0, scale: prefersReducedMotion ? 0.95 : 0.75, rotateY: prefersReducedMotion ? 0 : 25, rotateX: prefersReducedMotion ? 0 : 8, filter: prefersReducedMotion ? "none" : "blur(10px)" },
      {
        y: 0, opacity: 1, scale: 1, rotateY: 0, rotateX: 0, filter: "blur(0px)",
        duration: prefersReducedMotion ? 0.4 : 1,
        stagger: { amount: prefersReducedMotion ? 0.3 : 0.8, from: "start" },
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      }
    );
  });

  // ─── 12. SECTION HEADERS — per-char reveal ──────────────
  document.querySelectorAll(".section-header h2").forEach((h2) => {
    if (typeof SplitType !== "undefined") {
      const splitH2 = new SplitType(h2, { types: "chars" });
      gsap.fromTo(splitH2.chars,
        { y: 50, opacity: 0, rotateX: -90, scale: 0.5 },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 0.8, stagger: 0.025, ease: "power4.out",
          scrollTrigger: { trigger: h2, start: "top 85%", once: true },
        }
      );
    } else {
      gsap.fromTo(h2,
        { clipPath: "inset(0 100% 0 0)", x: -30 },
        {
          clipPath: "inset(0 0% 0 0)", x: 0,
          duration: 1, ease: "power4.inOut",
          scrollTrigger: { trigger: h2, start: "top 85%", once: true },
        }
      );
    }
  });

  document.querySelectorAll(".section-header p").forEach((p) => {
    gsap.fromTo(p,
      { y: 30, opacity: 0, filter: "blur(10px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: 0.8, ease: "power3.out", delay: 0.3,
        scrollTrigger: { trigger: p, start: "top 90%", once: true },
      }
    );
  });

  // ─── 13. HORIZONTAL SCROLL SHOWCASE ─────────────────────
  if (_fx("horizontal-scroll")) {
  const hScrollSection = document.querySelector(".horizontal-scroll");
  if (hScrollSection) {
    const hTrack = hScrollSection.querySelector(".horizontal-track");
    if (hTrack && hTrack.children.length > 0) {
      const totalScroll = hTrack.scrollWidth - window.innerWidth;
      if (totalScroll > 0) {
        gsap.to(hTrack, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: hScrollSection,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Reveal each item as it enters viewport
        Array.from(hTrack.children).forEach((item, i) => {
          gsap.fromTo(item,
            { scale: 0.8, opacity: 0.3, rotateY: 15 },
            {
              scale: 1, opacity: 1, rotateY: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                containerAnimation: gsap.getById?.("hscroll"),
                start: "left 80%",
                end: "left 20%",
                scrub: true,
              },
            }
          );
        });
      }
    }
  }
  } // end horizontal-scroll gate

  // ─── 14. ANIMATED COUNTERS ──────────────────────────────
  document.querySelectorAll("[data-count]").forEach((el) => {
    const raw = el.getAttribute("data-count");
    const numStr = raw.replace(/\s/g, "").replace(/[^\d.]/g, "");
    const target = parseFloat(numStr) || 0;
    const suffix = raw.replace(/[\d\s.,]/g, "").trim();

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString("ru-RU") + suffix;
          },
        });
      },
    });
  });

  // ─── 15. SWIPER — reviews carousel ─────────────────────
  if (typeof Swiper !== "undefined") {
    document.querySelectorAll(".reviews-swiper").forEach((el) => {
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 800,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    });
  }

  // ─── 16. 3D TILT + SPOTLIGHT on cards ───────────────────
  if (_fx("3d-tilt-spotlight")) {
  document.querySelectorAll(".service-card, .team-card, .review-card").forEach((card) => {
    card.style.transformStyle = "preserve-3d";
    card.style.perspective = "1000px";

    // Create spotlight layer
    const spotlight = document.createElement("div");
    spotlight.className = "card-spotlight";
    card.style.position = "relative";
    card.appendChild(spotlight);

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.05) translateZ(20px)`;
      spotlight.style.background = `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(255,255,255,0.15), transparent 60%)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      card.style.transform = "rotateY(0) rotateX(0) scale(1) translateZ(0)";
      spotlight.style.background = "transparent";
      setTimeout(() => card.style.transition = "", 600);
    });
  });
  } // end 3d-tilt-spotlight gate

  // ─── 17. MAGNETIC BUTTONS ───────────────────────────────
  if (_fx("magnetic-buttons")) {
  document.querySelectorAll(".btn-primary, .btn-large, .btn-outline, .btn-white").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.08)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      btn.style.transform = "translate(0, 0) scale(1)";
      setTimeout(() => btn.style.transition = "", 500);
    });
  });
  } // end magnetic-buttons gate

  // ─── 18. RIPPLE EFFECT on buttons ───────────────────────
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.5;
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    });
  });

  // ─── 20. CTA — gradient + particles ────────────────────
  if (_fx("cta-particles")) {
  const ctaSection = document.querySelector(".cta-section");
  if (ctaSection) {
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = "cta-particle";
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${8 + Math.random() * 50}px;
        height: ${8 + Math.random() * 50}px;
        animation-delay: ${Math.random() * 6}s;
        animation-duration: ${6 + Math.random() * 12}s;
      `;
      ctaSection.appendChild(particle);
    }
  }
  } // end cta-particles gate

  // ─── 21. SMOOTH ANCHOR SCROLLING ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        lenis ? lenis.scrollTo(target, { offset: -80 }) : target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ─── 22. IMAGE REVEAL — curtain wipe ───────────────────
  if (_fx("curtain-wipe")) {
  document.querySelectorAll(".gallery-item").forEach((el) => {
    const img = el.querySelector("img");
    if (!img) return;

    // Curtain overlay
    const curtain = document.createElement("div");
    curtain.className = "img-curtain";
    el.style.position = "relative";
    el.appendChild(curtain);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    tl.fromTo(curtain,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.5, ease: "power4.inOut" }
    );
    tl.fromTo(img,
      { scale: 1.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.01 },
      0.3
    );
    tl.to(curtain,
      { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power4.inOut" },
      0.5
    );
  });

  // Team card images — scale reveal
  document.querySelectorAll(".team-card img").forEach((img) => {
    gsap.fromTo(img,
      { scale: 1.4, opacity: 0, filter: "blur(5px)" },
      {
        scale: 1, opacity: 1, filter: "blur(0px)",
        duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: img, start: "top 85%", once: true },
      }
    );
  });
  } // end curtain-wipe gate

  // ─── 23. NAV — hide/show + burger ──────────────────────
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (nav) {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 50);
      // Auto-hide on scroll down, show on scroll up
      if (y > lastScroll && y > 200) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }
      lastScroll = y;
    }, { passive: true });
  }

  if (burger && mobileMenu) {
    // Clone burger to strip any inline JS handlers that would conflict
    const cleanBurger = burger.cloneNode(true);
    burger.parentNode.replaceChild(cleanBurger, burger);

    cleanBurger.addEventListener("click", () => {
      cleanBurger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      const isOpen = mobileMenu.classList.contains("active") || mobileMenu.classList.contains("open");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        burger.classList.remove("active");
        mobileMenu.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ─── 24. PAGE EXIT TRANSITION ───────────────────────────
  document.querySelectorAll('a:not([href^="#"]):not([href^="tel"]):not([href^="http"]):not([href^="mailto"]):not([href^="javascript"])').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();

      const overlay = document.createElement("div");
      overlay.className = "page-transition";
      document.body.appendChild(overlay);

      gsap.fromTo(overlay,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => { window.location.href = href; },
        }
      );
    });
  });

  // ─── 25. TEXT HIGHLIGHT on scroll ───────────────────────
  if (_fx("text-highlight")) {
  document.querySelectorAll("[data-highlight]").forEach((el) => {
    if (typeof SplitType === "undefined") return;
    const split = new SplitType(el, { types: "words" });
    gsap.fromTo(split.words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );
  });
  } // end text-highlight gate

  // ─── 26. GRADIENT BORDER ANIMATION on cards ─────────────
  document.querySelectorAll(".service-card, .team-card").forEach((card) => {
    card.classList.add("gradient-border");
  });

  // ─── 28. CONTACT LIST STAGGER ──────────────────────────
  const contactList = document.querySelector(".contact-list");
  if (contactList) {
    gsap.fromTo(contactList.children,
      { x: -80, opacity: 0, clipPath: "inset(0 100% 0 0)" },
      {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)",
        duration: 0.8, stagger: 0.12, ease: "power4.out",
        scrollTrigger: { trigger: contactList, start: "top 85%", once: true },
      }
    );
  }

  // ─── 29. FOOTER REVEAL ─────────────────────────────────
  const footer = document.querySelector(".footer");
  if (footer) {
    gsap.fromTo(footer,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "top 95%", once: true },
      }
    );
  }

  // ─── 30. SECTION DIVIDER LINES ─────────────────────────
  document.querySelectorAll(".section, .cta-section").forEach((section) => {
    const divider = document.createElement("div");
    divider.className = "section-divider";
    section.prepend(divider);

    gsap.fromTo(divider,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2, ease: "power4.inOut",
        scrollTrigger: { trigger: section, start: "top 90%", once: true },
      }
    );
  });

  // ─── 31. PARALLAX TEXT on hero ─────────────────────────
  if (_fx("parallax-hero-text")) {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    gsap.to(heroContent, {
      y: -60,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
  } // end parallax-hero-text gate

  // ─── 32. MAP IFRAME REVEAL ─────────────────────────────
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    gsap.fromTo(mapContainer,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      {
        clipPath: "inset(0 0% 0 0)", opacity: 1,
        duration: 1.2, ease: "power4.inOut",
        scrollTrigger: { trigger: mapContainer, start: "top 85%", once: true },
      }
    );
  }

  // ─── 33. PAGE ENTER TRANSITION ──────────────────────────
  // Reveal page with clip-path circle expanding from center
  const enterOverlay = document.querySelector(".page-enter-transition");
  if (enterOverlay) {
    gsap.fromTo(enterOverlay,
      { clipPath: "circle(100% at 50% 50%)" },
      {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.1,
        onComplete: () => enterOverlay.remove(),
      }
    );
  }

  // ─── 34. SCROLLYTELLING — about section pinned reveal ───
  if (_fx("scrollytelling")) {
  const aboutSection = document.querySelector(".about-section");
  if (aboutSection) {
    const aboutText = aboutSection.querySelector(".about-text");
    if (aboutText && typeof SplitType !== "undefined") {
      const splitAbout = new SplitType(aboutText, { types: "words" });
      gsap.fromTo(splitAbout.words,
        { opacity: 0.08 },
        {
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }
  }
  } // end scrollytelling gate

  // ─── 35. TEXT MORPHING — scale & skew headers on scroll ─
  if (_fx("text-morphing")) {
  document.querySelectorAll(".section-header h2, .horizontal-title, .page-hero-title").forEach((h) => {
    if (h.classList.contains("hero-title")) return; // skip main hero
    gsap.to(h, {
      letterSpacing: "0.02em",
      scale: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: h,
        start: "top 70%",
        end: "top 10%",
        scrub: true,
      },
    });
  });
  } // end text-morphing gate

  // ─── 36. STACKING CARDS — scale down as they stack ──────
  if (_fx("stacking-cards")) {
  document.querySelectorAll(".stack-card").forEach((card, i) => {
    gsap.to(card, {
      scale: 1 - (i * 0.02),
      filter: `brightness(${1 - i * 0.05})`,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top 20%",
        end: "bottom top",
        scrub: true,
      },
    });
  });
  } // end stacking-cards gate

  // ─── 37. BENTO GRID — stagger with glow pulse ──────────
  const bentoGrid = document.querySelector(".bento-grid");
  if (bentoGrid) {
    const bentoCards = bentoGrid.querySelectorAll(".bento-card");
    gsap.fromTo(bentoCards,
      { y: prefersReducedMotion ? 15 : 80, opacity: 0, scale: prefersReducedMotion ? 0.95 : 0.85, filter: prefersReducedMotion ? "none" : "blur(8px)" },
      {
        y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
        duration: prefersReducedMotion ? 0.3 : 0.8,
        stagger: { amount: prefersReducedMotion ? 0.2 : 0.6, from: "start" },
        ease: "power3.out",
        scrollTrigger: { trigger: bentoGrid, start: "top 80%", once: true },
      }
    );
  }

  // ─── 38. IMAGE LIGHTBOX ─────────────────────────────────
  const lightboxOverlay = document.createElement("div");
  lightboxOverlay.className = "lightbox-overlay";
  lightboxOverlay.innerHTML = '<img src="" alt=""><button class="lightbox-close">✕</button>';
  document.body.appendChild(lightboxOverlay);
  const lightboxImg = lightboxOverlay.querySelector("img");

  document.querySelectorAll(".gallery-item img, .horizontal-item img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      lightboxImg.src = img.src;
      lightboxOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  lightboxOverlay.addEventListener("click", () => {
    lightboxOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
      lightboxOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ─── 39. BEFORE-AFTER SLIDER ────────────────────────────
  if (_fx("before-after-slider")) {
  document.querySelectorAll(".ba-slider").forEach((slider) => {
    const afterImg = slider.querySelector(".ba-after");
    const handle = slider.querySelector(".ba-handle");
    if (!afterImg || !handle) return;

    let isDragging = false;
    const updatePosition = (x) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      afterImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + "%";
    };

    slider.addEventListener("mousedown", () => isDragging = true);
    slider.addEventListener("touchstart", () => isDragging = true, { passive: true });
    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("touchend", () => isDragging = false);

    slider.addEventListener("mousemove", (e) => { if (isDragging) updatePosition(e.clientX); });
    slider.addEventListener("touchmove", (e) => { if (isDragging) updatePosition(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener("click", (e) => updatePosition(e.clientX));
  });
  } // end before-after-slider gate

  // ─── 40. GLOW PULSE on accent elements ──────────────────
  if (_fx("glow-pulse")) {
  document.querySelectorAll(".bento-card-icon, .process-step-number, .stat-number").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { textShadow: "0 0 30px rgba(var(--accent-rgb, 99,102,241), 0.5)", duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { textShadow: "none", duration: 0.5 });
    });
  });
  } // end glow-pulse gate

  // ─── 41. CHROMATIC ABERRATION on gallery hover ──────────
  if (_fx("chromatic-aberration")) {
  document.querySelectorAll(".gallery-item, .horizontal-item").forEach((item) => {
    item.classList.add("chromatic-hover");
  });
  } // end chromatic-aberration gate

  // ─── 42. BROKEN GRID — overlapping reveal ──────────────
  if (_fx("broken-grid")) {
  document.querySelectorAll(".overlap-up").forEach((el) => {
    gsap.fromTo(el,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  });
  } // end broken-grid gate


  // ─── 44. INTERACTIVE TYPOGRAPHY — magnetic repel ──────
  if (_fx("magnetic-repel")) {
  const magneticChars = document.querySelectorAll(".hero-title .char, .page-hero-title .char");
  if (magneticChars.length > 0 && window.innerWidth > 768) {
    // Wait for hero entrance animation to finish
    gsap.delayedCall(3.5, () => {
      let magMouseX = 0, magMouseY = 0;
      let magRAF = null;

      document.addEventListener("mousemove", (e) => {
        magMouseX = e.clientX;
        magMouseY = e.clientY;
        if (!magRAF) {
          magRAF = requestAnimationFrame(updateMagnetic);
        }
      });

      function updateMagnetic() {
        magneticChars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const charX = rect.left + rect.width / 2;
          const charY = rect.top + rect.height / 2;
          const distX = magMouseX - charX;
          const distY = magMouseY - charY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const maxDist = 150;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 20;
            const moveX = -(distX / dist) * force;
            const moveY = -(distY / dist) * force;
            gsap.to(char, { x: moveX, y: moveY, duration: 0.2, ease: "power2.out", overwrite: "auto" });
          } else {
            gsap.to(char, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
          }
        });
        magRAF = null;
      }
    });
  }
  } // end magnetic-repel gate

  // ─── 45. SECTION MOUSE GRADIENT — hover spotlight ─────
  if (_fx("section-mouse-gradient")) {
  document.querySelectorAll(".bento-card, .stack-card, .process-step, .service-card, .review-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", x + "%");
      card.style.setProperty("--mouse-y", y + "%");
    });
  });
  } // end section-mouse-gradient gate

  // ─── CURVED CORNER CUTOUTS (style 25) ──────────────────────────────
  // Creates rounded cutout decorations between sections using pseudo-elements.
  // Only injects CSS — no runtime JS. Scoped to data-style="25" via selector.
  if (_fx("curved-corner-cutouts")) {
    const cutoutCSS = document.createElement("style");
    cutoutCSS.textContent = `
      [data-style="25"] .section-cutout {
        position: relative;
        overflow: visible;
      }
      [data-style="25"] .section-cutout::before,
      [data-style="25"] .section-cutout::after {
        content: "";
        position: absolute;
        bottom: -48px;
        width: 48px;
        height: 48px;
        z-index: 2;
        pointer-events: none;
      }
      [data-style="25"] .section-cutout::before {
        left: 0;
        border-radius: 50px 0 0 0;
        box-shadow: -24px -24px 0 0 var(--bg, #fff);
      }
      [data-style="25"] .section-cutout::after {
        right: 0;
        border-radius: 0 50px 0 0;
        box-shadow: 24px -24px 0 0 var(--bg, #fff);
      }
      [data-style="25"] .section-cutout-inverse::before {
        border-radius: 0 0 0 50px;
        box-shadow: -24px 24px 0 0 var(--bg, #fff);
        bottom: auto;
        top: -48px;
      }
      [data-style="25"] .section-cutout-inverse::after {
        border-radius: 0 0 50px 0;
        box-shadow: 24px 24px 0 0 var(--bg, #fff);
        bottom: auto;
        top: -48px;
      }
    `;
    document.head.appendChild(cutoutCSS);
  } // end curved-corner-cutouts gate

  // ─── SPLIT TEXT CHARS (style 26) ────────────────────────────────────
  // Animates each character with clip-path + translateY, staggered by line.
  // HTML: <h1 class="split-chars" data-reveal>Text here</h1>
  if (_fx("split-text-chars")) {
    document.querySelectorAll(".split-chars").forEach(el => {
      const text = el.textContent;
      const lines = text.split("\n").filter(l => l.trim());
      el.innerHTML = "";
      el.setAttribute("aria-label", text);
      lines.forEach((line, lineIdx) => {
        const lineSpan = document.createElement("span");
        lineSpan.style.display = "block";
        lineSpan.style.overflow = "hidden";
        line.split("").forEach(char => {
          const s = document.createElement("span");
          s.textContent = char === " " ? "\u00A0" : char;
          s.style.display = "inline-block";
          s.style.clipPath = "inset(0 0 100% 0)";
          s.style.transform = "translateY(3em)";
          s.style.transition = `clip-path 0.9s cubic-bezier(0.35,0.35,0,1) ${lineIdx * 0.075}s, transform 0.9s cubic-bezier(0.35,0.35,0,1) ${lineIdx * 0.075}s`;
          lineSpan.appendChild(s);
        });
        el.appendChild(lineSpan);
      });

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            el.querySelectorAll("span > span").forEach((s, i) => {
              setTimeout(() => {
                s.style.clipPath = "inset(-10% 0 -10% 0)";
                s.style.transform = "translateY(0)";
              }, i * 15);
            });
          },
          once: true
        });
      }
    });
  } // end split-text-chars gate

  // ─── CLIP-PATH REVEAL (style 26) ───────────────────────────────────
  // Image carousel where images transition via clip-path inset.
  // HTML: <div class="clip-reveal-carousel"><img class="clip-slide active">...</div>
  if (_fx("clip-path-reveal")) {
    document.querySelectorAll(".clip-reveal-carousel").forEach(carousel => {
      const slides = carousel.querySelectorAll(".clip-slide");
      let current = 0;

      slides.forEach((s, i) => {
        s.style.position = "absolute";
        s.style.inset = "0";
        s.style.width = "100%";
        s.style.height = "100%";
        s.style.objectFit = "cover";
        s.style.clipPath = i === 0 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)";
        s.style.transition = "clip-path 0.9s cubic-bezier(0.35,0.35,0,1)";
        s.style.zIndex = i === 0 ? "1" : "0";
      });
      carousel.style.position = "relative";
      carousel.style.overflow = "hidden";

      carousel._goTo = function(idx) {
        if (idx === current || !slides[idx]) return;
        slides[idx].style.clipPath = "inset(0 100% 0 0)";
        slides[idx].style.zIndex = "2";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            slides[idx].style.clipPath = "inset(0 0 0 0)";
          });
        });
        setTimeout(() => {
          slides[current].style.zIndex = "0";
          slides[idx].style.zIndex = "1";
          current = idx;
        }, 900);
      };

      // Nav buttons: <button class="clip-prev">, <button class="clip-next">
      const prev = carousel.parentElement.querySelector(".clip-prev");
      const next = carousel.parentElement.querySelector(".clip-next");
      if (prev) prev.addEventListener("click", () => carousel._goTo((current - 1 + slides.length) % slides.length));
      if (next) next.addEventListener("click", () => carousel._goTo((current + 1) % slides.length));
    });
  } // end clip-path-reveal gate

  // ─── BUTTON FILL HOVER (style 26) ──────────────────────────────────
  // Button with pseudo-element fill from bottom on hover + SVG icon rotation.
  // HTML: <button class="btn-fill"><span>Text</span><svg>...</svg></button>
  // CSS-only — inject styles scoped to data-style.
  if (_fx("button-fill-hover")) {
    const fillCSS = document.createElement("style");
    fillCSS.textContent = `
      .btn-fill {
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        background-color: var(--bg, #151415);
        color: var(--text, #f1eade);
        padding: 1rem;
        border: none;
        cursor: pointer;
        isolation: isolate;
      }
      .btn-fill::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--text, #f1eade);
        transform: scaleY(0);
        transform-origin: 50% 100%;
        transition: transform 1.2s cubic-bezier(0.35, 0.35, 0, 1);
        z-index: -1;
      }
      .btn-fill:hover::before {
        transform: scaleY(1);
      }
      .btn-fill:hover {
        color: var(--bg, #151415);
      }
      .btn-fill svg {
        transition: rotate 1.2s cubic-bezier(0.35, 0.35, 0, 1);
        display: block;
      }
      .btn-fill:hover svg {
        rotate: 90deg;
      }
    `;
    document.head.appendChild(fillCSS);
  } // end button-fill-hover gate

  // ─── SPOTLIGHT CURSOR (style 26) ───────────────────────────────────
  // Radial gradient spotlight follows cursor on a specific element.
  // HTML: <div class="spotlight-target">...</div>
  if (_fx("spotlight-cursor") && !isMobile) {
    document.querySelectorAll(".spotlight-target").forEach(el => {
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 0.5s;z-index:2;border-radius:inherit;";
      el.style.position = el.style.position || "relative";
      el.style.overflow = "hidden";
      el.appendChild(overlay);

      el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        overlay.style.background = `radial-gradient(circle 200px at ${x}% ${y}%, rgba(255,255,255,0.15), transparent 70%)`;
        overlay.style.opacity = "1";
      });
      el.addEventListener("mouseleave", () => {
        overlay.style.opacity = "0";
      });
    });
  } // end spotlight-cursor gate

  // ─── CONIC PROGRESS RING (style 26) ────────────────────────────────
  // Circular progress indicator using conic-gradient + mask donut.
  // HTML: <div class="conic-ring" data-progress="0.75"></div>
  if (_fx("conic-progress-ring")) {
    document.querySelectorAll(".conic-ring").forEach(ring => {
      const size = ring.offsetWidth || 60;
      const thickness = parseInt(ring.dataset.thickness) || 2;
      ring.style.cssText += `width:${size}px;height:${size}px;border-radius:50%;position:relative;`;

      const updateRing = (progress) => {
        const deg = (progress * 360).toFixed(1);
        ring.style.background = `conic-gradient(from 0deg, var(--text,#f1eade) ${deg}deg, transparent ${deg}deg)`;
        ring.style.mask = `radial-gradient(circle, transparent ${size/2 - thickness}px, #000 ${size/2 - thickness}px)`;
        ring.style.webkitMask = ring.style.mask;
      };

      const target = parseFloat(ring.dataset.progress) || 0;

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.create({
          trigger: ring,
          start: "top 80%",
          onEnter: () => {
            let current = 0;
            const step = () => {
              current += 0.01;
              if (current > target) current = target;
              updateRing(current);
              if (current < target) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          },
          once: true
        });
      } else {
        updateRing(target);
      }
    });
  } // end conic-progress-ring gate

  // ─── PAGE TRANSITIONS BARS (style 26) ──────────────────────────────
  // 4 horizontal bars that animate on page load/navigation.
  // Auto-creates overlay, plays once on load. For SPA transitions, call
  // window.__pageTransitionEnter() / window.__pageTransitionLeave()
  if (_fx("page-transitions-bars")) {
    const overlay = document.createElement("div");
    overlay.className = "page-transition-bars";
    overlay.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none;display:flex;flex-direction:column;";

    const barColor = getComputedStyle(document.body).getPropertyValue("--text").trim() || "#f1eade";
    for (let i = 0; i < 4; i++) {
      const bar = document.createElement("div");
      bar.style.cssText = `flex:1;background:${barColor};transform:scaleX(1);transform-origin:${i % 2 === 0 ? "100%" : "0%"} 50%;transition:transform ${0.6 + i * 0.15}s cubic-bezier(0.35,0.35,0,1);`;
      overlay.appendChild(bar);
    }
    document.body.appendChild(overlay);

    // Enter: bars shrink away (reveal page)
    const enter = () => {
      requestAnimationFrame(() => {
        overlay.querySelectorAll("div").forEach(bar => { bar.style.transform = "scaleX(0)"; });
        setTimeout(() => { overlay.style.display = "none"; }, 1500);
      });
    };

    // Leave: bars grow (cover page)
    const leave = (callback) => {
      overlay.style.display = "flex";
      overlay.querySelectorAll("div").forEach(bar => { bar.style.transform = "scaleX(1)"; });
      setTimeout(() => { if (callback) callback(); }, 1200);
    };

    window.__pageTransitionEnter = enter;
    window.__pageTransitionLeave = leave;

    // Auto-play enter on load
    setTimeout(enter, 100);
  } // end page-transitions-bars gate

  // ─── TWIST-IN (style 27) ─────────────────────────────────────────────
  // Reveals elements with a combined translateY + scale + rotateY + rotate.
  // HTML: <div class="twist-in" data-reveal>...</div>
  if (_fx("twist-in")) {
    document.querySelectorAll(".twist-in").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px) scale(0.8) rotateY(30deg) rotate(-12deg)";
      el.style.transition = "opacity 1s cubic-bezier(0.4,1,0.65,1), transform 1s cubic-bezier(0.4,1,0.65,1)";

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1) rotateY(0) rotate(0)";
          },
          once: true
        });
      }
    });
  } // end twist-in gate

  // ─── NEON SCANLINES ──────────────────────────────────────────────────
  // Adds glow animation to .scanline-divider elements on scroll-enter.
  // HTML: <div class="scanline-divider"></div>
  // CSS for static styling (grid bg, divider gradient) belongs in the site CSS, not here.
  // This effect only handles the ANIMATED glow pulse on enter.
  if (_fx("neon-scanlines")) {
    document.querySelectorAll(".scanline-divider").forEach(line => {
      line.style.opacity = "0";
      line.style.transform = "scaleX(0)";
      line.style.transformOrigin = "center";
      line.style.transition = "opacity 0.6s ease, transform 0.8s cubic-bezier(0.35,0.35,0,1)";

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.create({
          trigger: line,
          start: "top 90%",
          onEnter: () => {
            line.style.opacity = "1";
            line.style.transform = "scaleX(1)";
          },
          once: true
        });
      }
    });
  } // end neon-scanlines gate

  // ─── TERMINAL CURSOR ───────────────────────────────────────────────
  // Adds blinking cursor + typewriter-like reveal to terminal blocks.
  // HTML: <span class="terminal-cursor"></span>
  //        <div class="terminal-block" data-reveal>text</div>
  if (_fx("terminal-cursor")) {
    // Inject keyframes
    const tcCSS = document.createElement("style");
    tcCSS.textContent = `
      @keyframes fx-terminal-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .terminal-cursor {
        display: inline-block;
        width: 8px;
        height: 1.1em;
        background: var(--accent, #39ff14);
        margin-left: 4px;
        vertical-align: text-bottom;
        box-shadow: 0 0 6px var(--accent, #39ff14);
        animation: fx-terminal-blink 1s step-end infinite;
      }
      .terminal-prompt::before {
        content: "> ";
        color: var(--accent, #39ff14);
        font-family: var(--font-mono, monospace);
      }
    `;
    document.head.appendChild(tcCSS);

    // Animate terminal blocks on scroll-enter: lines appear one by one
    document.querySelectorAll(".terminal-block[data-reveal]").forEach(block => {
      const lines = block.querySelectorAll(".terminal-line");
      lines.forEach(l => { l.style.opacity = "0"; l.style.transform = "translateX(-8px)"; });

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.create({
          trigger: block,
          start: "top 85%",
          onEnter: () => {
            lines.forEach((l, i) => {
              setTimeout(() => {
                l.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                l.style.opacity = "1";
                l.style.transform = "translateX(0)";
              }, i * 150);
            });
          },
          once: true
        });
      }
    });
  } // end terminal-cursor gate

  // ─── MOBILE: refresh ScrollTrigger after all animations registered ──
  if (isMobile) {
    ScrollTrigger.config({ ignoreMobileResize: true });
    // Recalculate positions after images/fonts load
    window.addEventListener("load", () => {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });
  }

});
