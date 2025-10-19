import { useState, useEffect } from "react";

export interface PerformanceConfig {
  isLowEnd: boolean;
  reducedParticles: boolean;
  disableComplexAnimations: boolean;
  reducedBlur: boolean;
}

// Extend Navigator type for experimental APIs
interface ExtendedNavigator extends Navigator {
  connection?: {
    effectiveType?: string;
  };
  mozConnection?: {
    effectiveType?: string;
  };
  webkitConnection?: {
    effectiveType?: string;
  };
  deviceMemory?: number;
}

/**
 * Hook to detect device performance capabilities and optimize accordingly
 */
export function usePerformance(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>({
    isLowEnd: false,
    reducedParticles: false,
    disableComplexAnimations: false,
    reducedBlur: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check hardware concurrency (CPU cores)
    const cpuCores = navigator.hardwareConcurrency || 2;

    // Check if mobile device
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

    // Check connection speed (if available)
    const nav = navigator as ExtendedNavigator;
    const connection =
      nav.connection || nav.mozConnection || nav.webkitConnection;
    const slowConnection = connection
      ? connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g" ||
        connection.effectiveType === "3g"
      : false;

    // Check device memory (if available)
    const deviceMemory = nav.deviceMemory;
    const lowMemory = deviceMemory ? deviceMemory < 4 : false;

    // Determine if device is low-end
    const isLowEnd = cpuCores <= 4 || isMobile || slowConnection || lowMemory;

    setConfig({
      isLowEnd,
      reducedParticles: isLowEnd || cpuCores <= 4,
      disableComplexAnimations: isLowEnd || slowConnection,
      reducedBlur: isMobile || slowConnection,
    });
  }, []);

  return config;
}

/**
 * Simple hook to detect if device is low-end
 */
export function useIsLowEnd(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cpuCores = navigator.hardwareConcurrency || 2;
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

    setIsLowEnd(cpuCores <= 4 || isMobile);
  }, []);

  return isLowEnd;
}
