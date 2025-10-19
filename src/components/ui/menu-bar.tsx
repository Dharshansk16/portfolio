"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Battery, Wifi, Volume2, Clock } from "lucide-react";

export default function MenuBar() {
  const [currentTime, setCurrentTime] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

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

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="bg-slate-950/60 backdrop-blur-xl border-b border-indigo-500/20 shadow-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 h-10">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-3 pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer"
            >
              <span className="text-white text-xs font-bold">D</span>
            </motion.div>
            <span className="text-sm font-semibold text-white hidden sm:inline">
              DevSpace
            </span>
          </div>

          {/* Right Section - Status Icons */}
          <div className="flex items-center space-x-4 text-sm pointer-events-auto">
            {/* WiFi */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-1.5 text-indigo-300 cursor-pointer"
            >
              <Wifi className="w-4 h-4" />
            </motion.div>

            {/* Volume */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="hidden sm:flex items-center space-x-1.5 text-indigo-300 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </motion.div>

            {/* Battery */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-1.5 cursor-pointer"
            >
              <Battery
                className={`w-4 h-4 ${
                  isCharging
                    ? "text-green-400"
                    : batteryLevel > 20
                    ? "text-indigo-300"
                    : "text-red-400"
                }`}
              />
              <span
                className={`text-xs hidden md:inline ${
                  isCharging
                    ? "text-green-400"
                    : batteryLevel > 20
                    ? "text-indigo-300"
                    : "text-red-400"
                }`}
              >
                {batteryLevel}%
              </span>
            </motion.div>

            {/* Time */}
            <div className="flex items-center space-x-1.5 text-indigo-300">
              <Clock className="w-4 h-4 hidden sm:inline" />
              <span className="text-xs font-mono">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
