"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRef } from "react";

let gsapScriptsLoaded = 0;

export function ScrollRevealInit() {
  const initialized = useRef(false);

  function init() {
    if (initialized.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap = (window as any).gsap;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;
    gsapScriptsLoaded = 2;
    initialized.current = true;
    gsap.registerPlugin(ScrollTrigger);

    // ─── HERO PARALLAX: content moves up faster, shapes drift ───
    const heroContent = document.querySelector("[data-hero-content]");
    if (heroContent) {
      gsap.to(heroContent, {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: heroContent, start: "top top", end: "bottom top", scrub: true },
      });
    }

    document.querySelectorAll("[data-hero-shape]").forEach((el, i) => {
      gsap.to(el, {
        y: -50 - i * 30,
        x: (i % 2 === 0 ? 1 : -1) * 20,
        ease: "none",
        scrollTrigger: { trigger: el.closest("section"), start: "top top", end: "bottom top", scrub: true },
      });
    });

    // ─── REVEAL ANIMATIONS (richer than CSS-only) ───
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const direction = (el as HTMLElement).dataset.reveal || "up";
      const delay = parseFloat((el as HTMLElement).dataset.revealDelay || "0");
      const from: Record<string, number | string> = { opacity: 0, duration: 1, ease: "power3.out" };
      if (direction === "up") { from.y = 60; }
      else if (direction === "down") { from.y = -60; }
      else if (direction === "left") { from.x = 80; }
      else if (direction === "right") { from.x = -80; }
      else if (direction === "scale") { from.scale = 0.85; from.y = 30; }
      else if (direction === "rotate") { from.rotation = 5; from.y = 40; }
      gsap.from(el, {
        ...from,
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", end: "top 50%", toggleActions: "play none none none" },
      });
    });

    // ─── STAGGER GROUPS: children animate in sequence ───
    document.querySelectorAll("[data-stagger]").forEach((container) => {
      const children = container.children;
      if (!children.length) return;
      const direction = (container as HTMLElement).dataset.stagger || "up";
      const from: Record<string, number | string> = { opacity: 0, duration: 0.8, ease: "power3.out" };
      if (direction === "up") from.y = 50;
      else if (direction === "left") from.x = 60;
      else if (direction === "scale") { from.scale = 0.9; from.y = 20; }
      gsap.from(children, {
        ...from,
        stagger: 0.12,
        scrollTrigger: { trigger: container, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    // ─── PARALLAX SECTIONS: backgrounds move at different rates ───
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const speed = parseFloat((el as HTMLElement).dataset.parallax || "0.3");
      gsap.to(el, {
        y: () => -ScrollTrigger.maxScroll(window) * speed * 0.1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // ─── TEXT SHIMMER: letters reveal with a sweeping glow ───
    document.querySelectorAll("[data-text-reveal]").forEach((el) => {
      const text = el.textContent || "";
      el.textContent = "";
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00a0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        wrapper.appendChild(span);
      });
      el.appendChild(wrapper);
      gsap.to(wrapper.children, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
        stagger: 0.02,
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    // ─── HORIZONTAL LINE DRAW ───
    document.querySelectorAll("[data-line-draw]").forEach((el) => {
      gsap.from(el, {
        scaleX: 0, transformOrigin: "center",
        duration: 1.2, ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
      });
    });

    // ─── COUNTER ANIMATION ───
    document.querySelectorAll("[data-count-to]").forEach((el) => {
      const target = parseInt((el as HTMLElement).dataset.countTo || "0");
      const suffix = (el as HTMLElement).dataset.countSuffix || "";
      gsap.from(el, {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: function () {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (el as HTMLElement).textContent = Math.round(parseFloat((el as any).textContent || "0")) + suffix;
        },
        onComplete: () => { (el as HTMLElement).textContent = target + suffix; },
      });
    });

    // ─── MAGNETIC CURSOR on hoverable cards ───
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const card = el as HTMLElement;
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
        gsap.to(card, { x, y, rotation: x * 0.15, duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
      });
    });

    // ─── SECTION BACKGROUND COLOR SHIFT ───
    document.querySelectorAll("[data-bg-shift]").forEach((el) => {
      const targetColor = (el as HTMLElement).dataset.bgShift || "#faf8f5";
      gsap.to(el, {
        backgroundColor: targetColor,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "top 20%", scrub: true },
      });
    });

    // ─── SCROLL PROGRESS BAR ───
    const progressBar = document.querySelector("[data-scroll-progress]") as HTMLElement;
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    }

    // Recalculate all trigger positions after setup
    ScrollTrigger.refresh();
  }

  function onScriptLoad() {
    gsapScriptsLoaded += 1;
    if (gsapScriptsLoaded >= 2) init();
  }

  useEffect(() => {
    // Poll until GSAP is available (loaded by EyeAnimation or our own Script tags)
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).gsap && (window as any).ScrollTrigger) {
        gsapScriptsLoaded = 2;
        init();
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" onLoad={onScriptLoad} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" onLoad={onScriptLoad} />
      {/* Scroll progress bar */}
      <div data-scroll-progress="" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 100,
        background: "linear-gradient(90deg, #002394, #85ff9f)",
        transformOrigin: "left", transform: "scaleX(0)",
      }} />
    </>
  );
}
