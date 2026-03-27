"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export function EyeAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const gsapReady = useRef(false);
  const scriptsLoaded = useRef(0);

  function initAnimation() {
    if (!gsapReady.current || scriptsLoaded.current < 2) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap = (window as any).gsap;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const upperLid = document.getElementById("upper-lid");
    const lowerLid = document.getElementById("lower-lid");
    const eyeOutline = document.getElementById("eye-outline");
    const eyeSvg = document.getElementById("eye-svg");
    const eyePin = pinRef.current;
    if (!upperLid || !lowerLid || !eyeOutline || !eyeSvg || !eyePin) return;

    // Compute beam dash offsets
    document.querySelectorAll<SVGLineElement>(".eye-beam").forEach((beam) => {
      const length = beam.getTotalLength();
      beam.style.strokeDasharray = `${length}`;
      beam.style.strokeDashoffset = `${length}`;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: eyePin,
        scrub: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate: (self: any) => {
          eyePin.classList.toggle("glow-active", self.progress > 0.15);
        },
      },
    });

    // PHASE 1: Eyelids open
    tl.to(upperLid, {
      attr: { d: "M 50,160 C 90,110 130,95 160,95 C 190,95 230,110 270,160" },
      duration: 3, ease: "power2.inOut",
    }, 0);
    tl.to(lowerLid, {
      attr: { d: "M 50,160 C 90,210 130,225 160,225 C 190,225 230,210 270,160" },
      duration: 3, ease: "power2.inOut",
    }, 0);
    tl.to(eyeOutline, { opacity: 0.4, duration: 2, ease: "power1.in" }, 0.5);

    // PHASE 2: Iris + pupil
    tl.to(".eye-iris-outer", { opacity: 1, duration: 2, ease: "power1.inOut" }, 2);
    tl.to(".eye-iris-inner", { opacity: 0.7, duration: 2, ease: "power1.inOut" }, 2.5);
    tl.to(".eye-iris-detail", { opacity: 0.5, duration: 1.5, stagger: 0.1, ease: "power1.inOut" }, 2.5);
    tl.to(".eye-pupil", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 3);
    tl.to(".eye-pupil-highlight", { opacity: 1, duration: 1, ease: "power1.in" }, 3.5);

    // PHASE 3: Scale + lashes
    tl.to(eyeSvg, { scale: 1.4, duration: 4, ease: "power1.inOut" }, 3);
    tl.to(".eye-lash-upper", { opacity: 0.7, duration: 1.5, stagger: 0.08, ease: "power1.out" }, 4);
    tl.to(".eye-lash-lower", { opacity: 0.5, duration: 1.5, stagger: 0.08, ease: "power1.out" }, 4.5);

    // PHASE 4: Beams radiate
    tl.to(".eye-glow-ring", { opacity: 0.3, duration: 2, stagger: 0.3, ease: "power1.inOut" }, 5);
    tl.to(".eye-beam", {
      strokeDashoffset: 0, opacity: 0.5, duration: 3,
      stagger: { each: 0.1, from: "random" }, ease: "power2.out",
    }, 5.5);
    tl.to(eyeSvg, { scale: 1.6, duration: 3, ease: "power1.inOut" }, 6);

    // PHASE 5: Settle
    tl.to(".eye-glow-ring", { opacity: 0.15, duration: 2, ease: "power1.inOut" }, 8);
    tl.to(".eye-beam", { opacity: 0.25, duration: 2, ease: "power1.inOut" }, 8);
    tl.to(eyeOutline, { opacity: 0.6, duration: 2, ease: "power1.inOut" }, 8);
    tl.to(".eye-iris-outer", { attr: { r: 48 }, duration: 1.5, ease: "power1.inOut" }, 8.5);
    tl.to(".eye-iris-outer", { attr: { r: 45 }, duration: 1.5, ease: "power1.inOut" }, 9);

    gsapReady.current = true;
  }

  function onScriptLoad() {
    scriptsLoaded.current += 1;
    if (scriptsLoaded.current >= 2) initAnimation();
  }

  useEffect(() => {
    // If scripts loaded before mount (cached)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).gsap && (window as any).ScrollTrigger) {
      scriptsLoaded.current = 2;
      initAnimation();
    }
  }, []);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={onScriptLoad}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onLoad={onScriptLoad}
      />

      {/* 400vh tall container — ScrollTrigger scrubs through this height */}
      <div ref={sectionRef} className="eye-scroll-section" style={{ height: "400vh", position: "relative" }}>
        <div
          ref={pinRef}
          className="eye-pin-container"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--background, #faf8f5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Radial glow behind eye */}
          <div
            className="eye-radial-glow"
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,163,126,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              opacity: 0,
              transition: "opacity 0.4s",
            }}
          />

          <svg
            id="eye-svg"
            viewBox="0 0 320 320"
            style={{ width: 320, height: 320, overflow: "visible" }}
          >
            {/* Beams */}
            <g>
              {[
                [160,20],[230,38],[282,90],[300,160],[282,230],[230,282],
                [160,300],[90,282],[38,230],[20,160],[38,90],[90,38],
              ].map(([x, y], i) => (
                <line
                  key={i}
                  className="eye-beam"
                  x1={160} y1={160} x2={x} y2={y}
                  fill="none"
                  stroke="var(--sage-light, #b5c4a8)"
                  strokeWidth={1}
                  strokeLinecap="round"
                  opacity={0}
                />
              ))}
            </g>

            {/* Glow rings */}
            <circle className="eye-glow-ring" cx={160} cy={160} r={90} fill="none" stroke="var(--sage-light, #b5c4a8)" strokeWidth={0.5} opacity={0} />
            <circle className="eye-glow-ring" cx={160} cy={160} r={110} fill="none" stroke="var(--sage-light, #b5c4a8)" strokeWidth={0.5} opacity={0} />

            {/* Eye outline */}
            <path
              id="eye-outline"
              d="M 50,160 C 90,110 130,95 160,95 C 190,95 230,110 270,160 C 230,210 190,225 160,225 C 130,225 90,210 50,160 Z"
              fill="none"
              stroke="var(--sage, #8a9a7b)"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0}
            />

            {/* Iris */}
            <circle className="eye-iris-outer" cx={160} cy={160} r={45} fill="none" stroke="var(--sage-dark, #5e6d52)" strokeWidth={1.5} opacity={0} />
            <circle className="eye-iris-inner" cx={160} cy={160} r={32} fill="none" stroke="var(--sage, #8a9a7b)" strokeWidth={1} opacity={0} />

            {/* Iris detail lines */}
            {[
              [160,118,160,128],[160,192,160,202],[118,160,128,160],[192,160,202,160],
              [130,130,137,137],[190,130,183,137],[130,190,137,183],[190,190,183,183],
            ].map(([x1,y1,x2,y2], i) => (
              <line
                key={i}
                className="eye-iris-detail"
                x1={x1} y1={y1} x2={x2} y2={y2}
                fill="none"
                stroke="var(--sage-light, #b5c4a8)"
                strokeWidth={0.5}
                opacity={0}
              />
            ))}

            {/* Pupil */}
            <circle className="eye-pupil" cx={160} cy={160} r={16} fill="var(--charcoal, #2d2a26)" opacity={0} />
            <circle className="eye-pupil-highlight" cx={152} cy={152} r={4} fill="rgba(255,255,255,0.6)" opacity={0} />

            {/* Upper lid (starts closed — flat line) */}
            <path
              id="upper-lid"
              d="M 50,160 C 90,160 130,160 160,160 C 190,160 230,160 270,160"
              fill="none"
              stroke="var(--sage, #8a9a7b)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Lower lid (starts closed — flat line) */}
            <path
              id="lower-lid"
              d="M 50,160 C 90,160 130,160 160,160 C 190,160 230,160 270,160"
              fill="none"
              stroke="var(--sage, #8a9a7b)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Upper lashes */}
            {[
              [80,130,75,110],[110,112,105,90],[140,100,138,78],
              [160,95,160,72],[180,100,182,78],[210,112,215,90],[240,130,245,110],
            ].map(([x1,y1,x2,y2], i) => (
              <line
                key={i}
                className="eye-lash-upper"
                x1={x1} y1={y1} x2={x2} y2={y2}
                fill="none"
                stroke="var(--sage, #8a9a7b)"
                strokeWidth={1}
                strokeLinecap="round"
                opacity={0}
              />
            ))}

            {/* Lower lashes */}
            {[
              [100,200,95,218],[130,215,128,235],[160,225,160,245],
              [190,215,192,235],[220,200,225,218],
            ].map(([x1,y1,x2,y2], i) => (
              <line
                key={i}
                className="eye-lash-lower"
                x1={x1} y1={y1} x2={x2} y2={y2}
                fill="none"
                stroke="var(--sage, #8a9a7b)"
                strokeWidth={1}
                strokeLinecap="round"
                opacity={0}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Inline styles for glow toggle */}
      <style>{`
        .eye-pin-container.glow-active .eye-radial-glow { opacity: 1 !important; }
      `}</style>
    </>
  );
}
