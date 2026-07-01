"use client";

import { useEffect, useState} from"react";
import { motion} from"framer-motion";

// Detect if device is low-end
const isLowEndDevice = () => {
 if (typeof window ==="undefined") return false;
 return (
 navigator.hardwareConcurrency <= 4 ||
 /Mobile|Android|iPhone/i.test(navigator.userAgent)
 );
};

export default function BootScreen() {
 const [bootMessages, setBootMessages] = useState<string[]>([]);
 const [progress, setProgress] = useState(0);
 const [isLowEnd, setIsLowEnd] = useState(false);

 useEffect(() => {
 setIsLowEnd(isLowEndDevice());
 }, []);

 useEffect(() => {
 const messages = [
 { text: "[INFO] Resolving DNS for dharshanskotian.dev..."},
 { text: "[INFO] DNS resolved to 104.21.43.19"},
 { text: "[INFO] Initiating TCP handshake..."},
 { text: "[OK] TCP connection established"},
 { text: "[INFO] Negotiating TLS encryption..."},
 { text: "[OK] TLS 1.3 secured"},
 { text: "[INFO] Sending HTTP GET / ..."},
 { text: "[OK] HTTP/2 200 OK"},
 { text: "[INFO] Fetching assets..."},
 { text: "[OK] Stylesheets & JS bundles parsed"},
 { text: "[INFO] Initializing React DOM..."},
 { text: "[OK] DOM mounted"},
 { text: "[OK] System Ready. Welcome to DevSpace."},
 ];

 let i = 0;
 // Fast interval to fit within the 2.8s boot time set in page.tsx
 const interval = setInterval(() => {
 if (i < messages.length) {
 const currentMessage = messages[i];
 if (currentMessage) {
 setBootMessages((prev) => [...prev, currentMessage.text]);
 setProgress(((i + 1) / messages.length) * 100);
 }
 i++;
 } else {
 clearInterval(interval);
 }
 }, 150);
 return () => clearInterval(interval);
 }, []);

 return (
 <motion.div
 initial={{ opacity: 0}}
 animate={{ opacity: 1}}
 exit={{ opacity: 0}}
 transition={{ duration: 0.3}}
 className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-black px-4 relative overflow-hidden transition-colors duration-500"
 >
 <motion.div
 initial={{ opacity: 0}}
 animate={{ opacity: 1}}
 transition={{ duration: 0.4}}
 className="w-full max-w-3xl relative text-left font-mono text-sm"
 >
 {/* Main Terminal Container */}
 <div className="relative bg-white dark:bg-zinc-950 p-6 sm:p-10 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-colors duration-500">
 <div className="relative z-10">
 {/* Minimalist Terminal Header */}
 <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
 <div className="flex items-center space-x-3">
 <div className="flex space-x-1.5">
 <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
 <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
 <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
 </div>
 <span className="text-zinc-400 font-bold ml-4 text-xs tracking-widest uppercase">
 Server.Log
 </span>
 </div>
 <span className="text-zinc-400 text-xs tracking-widest uppercase">Port 443</span>
 </div>

 {/* Terminal Output Stream */}
 <div className="space-y-2 h-72 overflow-hidden mb-6 flex flex-col justify-end">
 {bootMessages.map((msg, idx) => {
 const isOk = msg.startsWith("[OK]");
 return (
 <motion.div
 key={idx}
 initial={{ opacity: 0, x: -10}}
 animate={{ opacity: 1, x: 0}}
 transition={{ duration: 0.15}}
 className="flex items-start"
 >
 <span
 className={`${
 isOk
 ?"text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-bold"
 :"text-zinc-500 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
 } tracking-tight`}
 >
 {msg}
 </span>
 </motion.div>
 );
 })}
 {/* Blinking Cursor */}
 <motion.div
 animate={{ opacity: [1, 0, 1]}}
 transition={{ duration: 0.8, repeat: Infinity}}
 className="w-2.5 h-4 bg-zinc-900 dark:bg-white mt-2"
 />
 </div>

 {/* Network Progress Bar */}
 <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
 <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 uppercase tracking-widest font-bold">
 <span>Tracing Route...</span>
 <span>{Math.round(progress)}%</span>
 </div>
 <div className="h-1 bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
 <motion.div
 className="h-full bg-zinc-900 dark:bg-white"
 initial={{ width: 0}}
 animate={{ width:`${progress}%`}}
 transition={{ duration: 0.2}}
 />
 </div>
 </div>

 </div>
 </div>
 </motion.div>
 </motion.div>
 );
}
