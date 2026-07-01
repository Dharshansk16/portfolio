"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BootScreen() {
  const [mounted, setMounted] = useState(false);
  const [randomIP, setRandomIP] = useState("192.168.1.1");

  useEffect(() => {
    setMounted(true);
    setRandomIP(
      `${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    );
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex items-center justify-center font-mono selection:bg-transparent"
    >
      {/* HUD: Top Left */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-orange-500/70 text-xs sm:text-sm flex flex-col gap-1 tracking-widest z-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          [SYS] INIT_SEQUENCE
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          [NET] LOCATING_CLIENT...
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          [NET] TARGET_IP: {randomIP}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
          [SEC] SSL_HANDSHAKE_OK
        </motion.div>
      </div>

      {/* HUD: Bottom Right */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-orange-500/70 text-xs sm:text-sm flex flex-col gap-1 tracking-widest text-right z-20">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          LATENCY: 12ms
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
          PACKET_LOSS: 0.00%
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}>
          ROUTING_TO_DASHBOARD
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}>
          <span className="text-white font-bold animate-pulse">ESTABLISHING_LINK</span>
        </motion.div>
      </div>

      {/* The Tunnel (Concentric expanding rings simulating warp speed) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-orange-500/30"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: ["0vw", "150vw"],
              height: ["0vw", "150vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeIn",
            }}
          />
        ))}
      </div>

      {/* Central "Connection Reached" Flash */}
      <motion.div
        className="absolute z-30 text-white font-black tracking-[0.5em] text-lg sm:text-3xl text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        ACCESS GRANTED
      </motion.div>

      {/* The Packet (Glowing Orb) */}
      <motion.div
        className="relative z-10 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-[0_0_40px_20px_rgba(249,115,22,1)]"
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1, 0.8, 1.2, 1, 200],
          opacity: [0, 1, 1, 1, 1, 1],
        }}
        transition={{
          times: [0, 0.1, 0.4, 0.7, 0.8, 1],
          duration: 2.8,
          ease: "easeInOut",
        }}
      />
      
      {/* Final Flash Overlay to blend into the dashboard */}
      <motion.div
        className="absolute inset-0 bg-white z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ times: [0, 0.9, 1], duration: 2.8 }}
      />
    </motion.div>
  );
}
