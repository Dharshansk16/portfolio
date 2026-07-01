"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Structured, geometric pipeline (perfect 45-degree and 90-degree angles)
const nodes = [
  { id: "ORIGIN_SERVER", ip: "104.21.43.19", log: "HTTP 200 OK: Payload generated", action: "SENDING_PAYLOAD", x: 30, y: 85, t: 0.05 },
  { id: "EDGE_CDN", ip: "172.64.147.22", log: "CACHE: Edge node routing payload", action: "CACHING_ASSETS", x: 15, y: 70, t: 0.2 },
  { id: "BGP_BACKBONE", ip: "173.24.5.99", log: "BGP: Transmitting via backbone", action: "TRANSOCEANIC_LINK", x: 15, y: 45, t: 0.37 },
  { id: "LOCAL_ISP", ip: "10.14.22.1", log: "ISP: Routing to local network", action: "FIBER_TO_HOME", x: 30, y: 30, t: 0.52 },
  { id: "WIFI_ROUTER", ip: "192.168.1.1", log: "WLAN: Delivering to client device", action: "WPA3_DECRYPTION", x: 50, y: 30, t: 0.66 },
  { id: "CLIENT_DEVICE", ip: "localhost", log: "DOM: Rendering interface...", action: "MOUNTING_REACT", x: 50, y: 50, t: 0.8 }
];

export default function BootScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-[200] bg-zinc-950 overflow-hidden flex items-center justify-center font-mono selection:bg-transparent"
    >
      {/* Schematic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" />

      {/* Static Circuit Traces (The Stage) */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Main Route */}
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const nextNode = nodes[i + 1];
          return (
            <line
              key={`trace-${i}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="rgba(249,115,22,0.3)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Decorative / Dead-end Branches */}
        <line x1="30%" y1="85%" x2="50%" y2="85%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
        <line x1="50%" y1="85%" x2="50%" y2="95%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
        <line x1="15%" y1="45%" x2="5%" y2="45%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
        <line x1="5%" y1="45%" x2="5%" y2="20%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
        <line x1="50%" y1="30%" x2="80%" y2="30%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
        <line x1="80%" y1="30%" x2="80%" y2="15%" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
      </svg>

      {/* HUD: Connection Lifecycle Stream */}
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 text-orange-500/80 text-[7px] sm:text-[10px] flex flex-col gap-1 sm:gap-2 tracking-widest z-20 font-mono bg-black/60 p-2.5 sm:p-4 border border-orange-500/20 rounded-lg backdrop-blur-md shadow-2xl shadow-orange-500/10 w-[200px] sm:w-auto sm:min-w-[280px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="border-b border-orange-500/30 pb-1 sm:pb-2 mb-0.5 sm:mb-1">
          <span className="text-white">user@device:~$</span> fetch https://dharshanskotian.me
        </motion.div>
        {nodes.map((node, i) => (
          <motion.div
            key={`log-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: node.t * 2.8 }}
            className={i === 5 ? "text-white font-bold mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-orange-500/30" : ""}
          >
            {i === 5 
              ? `[OK] ${node.log}`
              : `> ${node.log} ... ${i === 0 ? "0" : Math.floor(Math.random() * 15 + 2)}ms`
            }
          </motion.div>
        ))}
      </div>

      {/* HUD: System Status */}
      <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 text-orange-500/70 text-[7px] sm:text-[10px] flex flex-col gap-1 sm:gap-2 tracking-widest text-right z-20 font-mono bg-black/60 p-2.5 sm:p-4 border border-orange-500/20 rounded-lg backdrop-blur-md">
        <div className="border-b border-orange-500/30 pb-1 sm:pb-2 mb-0.5 sm:mb-1">SYS.ENV // SECURE</div>
        <div className="flex justify-end gap-3 sm:gap-6 text-orange-500/50">
          <span>UPLINK: ACTIVE</span>
          <span>SEC: WPA3</span>
        </div>
        <div className="flex justify-end gap-3 sm:gap-6 text-orange-500/50">
          <span>PORT: 443</span>
          <span>PROT: TCP/IP</span>
        </div>
        <motion.div 
          animate={{ opacity: [1, 0.3, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="text-orange-400 mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-orange-500/30"
        >
          MAINTAINING SIGNAL INTEGRITY...
        </motion.div>
      </div>

      {/* Network Nodes on the Map (Server Chassis) */}
      {nodes.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute flex flex-col items-center justify-center z-10"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: [0.3, 1, 0.5], scale: [1, 1.3, 1] }}
          transition={{ delay: node.t * 2.8, duration: 0.4 }}
        >
          {i !== 5 && (
            <>
              {/* Sci-Fi Hardware Node */}
              <div className="absolute w-5 h-5 sm:w-6 sm:h-6 border border-orange-500/40 bg-zinc-950/90 transform rotate-45 flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 border border-orange-500/30" />
              </div>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-orange-400 z-10 relative" />
              
              {/* Node Labels */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[6px] sm:text-[8px] text-orange-500/80 font-mono tracking-widest whitespace-nowrap bg-black/70 px-1 sm:px-1.5 py-0.5 border-l-2 border-orange-500/50 backdrop-blur-sm shadow-md">
                <span className="text-white font-bold">{node.id}</span>
                <br />
                <span className="text-orange-400">{node.action}</span>
                <br />
                <span className="text-orange-500/40">{node.ip}</span>
              </div>
            </>
          )}
        </motion.div>
      ))}

      {/* Central Destination Core (The Client Device) */}
      <div
        className="absolute z-10 flex items-center justify-center pointer-events-none"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 sm:w-24 sm:h-24 border border-orange-500/20 border-dashed rounded-full flex items-center justify-center"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 border border-orange-500/30 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-orange-500/50 rounded-full bg-orange-500/5 backdrop-blur-sm" />
          </div>
        </motion.div>
      </div>

      {/* Central "PAYLOAD RECEIVED" Flash */}
      <motion.div
        className="absolute z-40 text-white font-black tracking-[0.5em] text-lg sm:text-3xl text-center flex flex-col items-center justify-center inset-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] }}
        transition={{ delay: 0.8 * 2.8, duration: 0.56 }}
      >
        PAYLOAD RECEIVED
      </motion.div>

      {/* The Packet (Traveling Laser Pulse) */}
      <motion.div
        className="absolute z-30 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full shadow-[0_0_20px_10px_rgba(249,115,22,1)]"
        style={{ transform: 'translate(-50%, -50%)' }}
        initial={{ left: "30%", top: "85%", scale: 0 }}
        animate={{
          left: ["30%", "30%", "15%", "15%", "30%", "50%", "50%", "50%"],
          top: ["85%", "85%", "70%", "45%", "30%", "30%", "50%", "50%"],
          scale: [0, 1, 1, 1, 1, 1, 2.5, 250],
          opacity: [0, 1, 1, 1, 1, 1, 1, 1],
        }}
        transition={{
          times: [0, 0.05, 0.2, 0.37, 0.52, 0.66, 0.8, 1],
          duration: 2.8,
          ease: "linear",
        }}
      />
      
      {/* Final Flash Overlay to blend into the dashboard */}
      <motion.div
        className="absolute inset-0 bg-white z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ times: [0, 0.9, 1], duration: 2.8 }}
      />
    </motion.div>
  );
}
