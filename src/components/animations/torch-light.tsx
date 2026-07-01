import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function TorchLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      if (foregroundRef.current) {
        foregroundRef.current.style.setProperty("--x", `${e.clientX}px`);
        foregroundRef.current.style.setProperty("--y", `${e.clientY}px`);
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
    <>
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 dark:opacity-[0.04] dark:max-md:opacity-0"
          style={{ backgroundImage: "var(--global-bg)" }}
        />

        {/* 2. Scattered Ambient Reveal / Increased intensity */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-out hidden dark:block dark:max-md:hidden filter dark:brightness-110 ${isMobile || isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: "var(--global-bg)",
            ...(isMobile ? {} : {
              WebkitMaskImage: `radial-gradient(600px circle at var(--x) var(--y), rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
              maskImage: `radial-gradient(600px circle at var(--x) var(--y), rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
            }),
          }}
        />
      </div>

      {/* 3. Ultra-realistic Foreground Illumination (Portal) */}
      {mounted && createPortal(
        <div
          ref={foregroundRef}
          className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-700 hidden dark:block [.no-bg-image_&]:hidden ${isHovered && !isMobile ? "opacity-100" : "opacity-0"}`}
          style={
            {
              "--x": "50%",
              "--y": "-1000px",
              background: `radial-gradient(400px circle at var(--x) var(--y), rgba(255, 180, 100, 0.08) 0%, rgba(255, 200, 150, 0.04) 60%, transparent 100%)`,
              mixBlendMode: "color-dodge",
            } as React.CSSProperties
          }
        />,
        document.body
      )}
    </>
  );
}
