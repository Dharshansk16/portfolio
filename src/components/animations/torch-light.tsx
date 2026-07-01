"use client";
import { useEffect, useRef, useState } from "react";

export default function TorchLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full transition-colors duration-500 bg-zinc-950"
      style={
        {
          "--x": "50%",
          "--y": "-1000px",
        } as React.CSSProperties
      }
    >
      {/* 1. Base Pitch Black Void */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-[0.01]"
        style={{ backgroundImage: "url('/global-bg.jpg')" }}
      />

      {/* 2. Razor Sharp Spotlight Masked Reveal */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-700 ease-out ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: "url('/global-bg.jpg')",
          WebkitMaskImage: `radial-gradient(400px circle at var(--x) var(--y), black 0%, black 15%, rgba(0,0,0,0.6) 40%, transparent 80%)`,
          maskImage: `radial-gradient(400px circle at var(--x) var(--y), black 0%, black 15%, rgba(0,0,0,0.6) 40%, transparent 80%)`,
        }}
      />

      {/* 3. Intense Center Glow of the Torch */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 mix-blend-screen dark:mix-blend-lighten ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: `radial-gradient(400px circle at var(--x) var(--y), rgba(180, 255, 255, 0.15) 0%, rgba(120, 200, 255, 0.05) 30%, transparent 70%)`,
        }}
      />
    </div>
  );
}
