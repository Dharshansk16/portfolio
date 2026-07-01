"use client";

import { useEffect, useState} from"react";
import { motion} from"framer-motion";
import { Battery, Wifi, Volume2, Clock, Moon, Sun, Image as ImageIcon} from"lucide-react";
import { useTheme} from"next-themes";

export default function MenuBar({ onLogoClick }: { onLogoClick?: () => void }) {
 const [currentTime, setCurrentTime] = useState("");
 const [batteryLevel, setBatteryLevel] = useState(100);
 const [isCharging, setIsCharging] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showBgImage, setShowBgImage] = useState(true);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.href = "/";
    }
  };

  // Sync background image with theme
  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    const storageKey = `showBgImage_${resolvedTheme}`;
    const storedVal = localStorage.getItem(storageKey);

    // Default: light mode = true, dark mode = false
    let shouldShow = resolvedTheme === "light";
    if (storedVal !== null) {
      shouldShow = storedVal === "true";
    }

    setShowBgImage(shouldShow);
    if (shouldShow) {
      document.documentElement.classList.remove("no-bg-image");
    } else {
      document.documentElement.classList.add("no-bg-image");
    }
  }, [resolvedTheme, mounted]);

  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Get battery info
    if ("getBattery" in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
        battery.addEventListener("chargingchange", () => {
          setIsCharging(battery.charging);
        });
      });
    }

    setMounted(true);
    return () => clearInterval(interval);
  }, []);

  const toggleBgImage = () => {
    const newVal = !showBgImage;
    setShowBgImage(newVal);
    if (resolvedTheme) {
      localStorage.setItem(`showBgImage_${resolvedTheme}`, newVal.toString());
    }
    if (newVal) {
      document.documentElement.classList.remove("no-bg-image");
    } else {
      document.documentElement.classList.add("no-bg-image");
    }
  };

 return (
 <motion.div
 initial={{ y: -100, opacity: 0}}
 animate={{ y: 0, opacity: 1}}
 transition={{ duration: 0.5, delay: 0.2}}
 className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
 >
 <div className="bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-300 dark:border-zinc-700 shadow-sm dark:shadow-lg transition-colors">
 <div className="flex items-center justify-between px-4 sm:px-6 h-10">
 {/* Left Section - Logo */}
 <div 
 className="flex items-center space-x-3 pointer-events-auto cursor-pointer group"
 onClick={handleLogoClick}
 >
 <motion.div
 whileHover={{ scale: 1.1, rotate: 180}}
 transition={{ duration: 0.3}}
 className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center shadow-md group-hover:shadow-lg"
 >
 <span className="text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 text-xs font-bold">D</span>
 </motion.div>
 <span className="text-sm font-semibold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 hidden sm:inline group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
 DevSpace
 </span>
 </div>

 {/* Right Section - Status Icons */}
 <div className="flex items-center space-x-4 text-sm pointer-events-auto">
 {/* Background Toggle */}
 {mounted && (
 <motion.div
 whileHover={{ scale: 1.1}}
 whileTap={{ scale: 0.9}}
 onClick={toggleBgImage}
 className={`flex items-center space-x-1.5 transition-colors cursor-pointer ${showBgImage ? 'text-zinc-900 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-600'}`}
 title="Toggle Background Image"
 >
 <ImageIcon className="w-4 h-4" />
 </motion.div>
 )}

 {/* Theme Toggle */}
 {mounted && (
 <motion.div
 whileHover={{ scale: 1.1}}
 whileTap={{ scale: 0.9}}
 onClick={() => setTheme(theme ==="dark" ?"light" :"dark")}
 className="flex items-center space-x-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 dark:hover:text-zinc-500 transition-colors cursor-pointer"
 title="Toggle theme"
 >
 {theme ==="dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
 </motion.div>
 )}

 {/* WiFi */}
 <motion.div
 whileHover={{ scale: 1.1}}
 className="flex items-center space-x-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 dark:hover:text-zinc-500 transition-colors cursor-pointer"
 >
 <Wifi className="w-4 h-4" />
 </motion.div>

 {/* Volume */}
 <motion.div
 whileHover={{ scale: 1.1}}
 className="hidden sm:flex items-center space-x-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 dark:hover:text-zinc-500 transition-colors cursor-pointer"
 >
 <Volume2 className="w-4 h-4" />
 </motion.div>

 {/* Battery */}
 <motion.div
 whileHover={{ scale: 1.1}}
 className="flex items-center space-x-1.5 cursor-pointer"
 >
 <Battery
 className={`w-4 h-4 ${
 isCharging
 ?"text-zinc-500 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
 : batteryLevel > 20
 ?"text-zinc-600 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 dark:hover:text-zinc-500"
 :"text-zinc-500 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
} transition-colors`}
 />
 <span
 className={`text-xs hidden md:inline ${
 isCharging
 ?"text-zinc-500 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
 : batteryLevel > 20
 ?"text-zinc-600 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
 :"text-zinc-500 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
} font-medium transition-colors`}
 >
 {batteryLevel}%
 </span>
 </motion.div>

 {/* Time */}
 <div className="flex items-center space-x-1.5 text-zinc-700 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 font-medium transition-colors">
 <Clock className="w-4 h-4 hidden sm:inline text-zinc-600 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500" />
 <span className="text-xs font-mono">{currentTime}</span>
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 );
}
