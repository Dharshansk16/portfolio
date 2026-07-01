"use client";
import { useEffect, useRef, useState } from "react";

export default function TorchLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if it's a touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(any-pointer: coarse)").matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

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
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full transition-colors duration-500 bg-background"
      style={
        {
          "--x": "50%",
          "--y": "-1000px",
        } as React.CSSProperties
      }
    >
      {/* 1. Base Dark Ambient Depth / Static Background in Light Mode */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 dark:opacity-20"
        style={{ backgroundImage: "var(--global-bg)" }}
      />

      {/* 2. Razor Sharp Spotlight Masked Reveal / Static Background on Mobile */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-out hidden dark:block ${isMobile || isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: "var(--global-bg)",
          ...(isMobile ? {} : {
            WebkitMaskImage: `radial-gradient(400px circle at var(--x) var(--y), black 0%, black 15%, rgba(0,0,0,0.6) 40%, transparent 80%)`,
            maskImage: `radial-gradient(400px circle at var(--x) var(--y), black 0%, black 15%, rgba(0,0,0,0.6) 40%, transparent 80%)`,
          }),
        }}
      />

      {/* 3. Intense Center Glow of the Torch */}
      {!isMobile && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 mix-blend-screen hidden dark:block ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: `radial-gradient(400px circle at var(--x) var(--y), rgba(180, 255, 255, 0.15) 0%, rgba(120, 200, 255, 0.05) 30%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
