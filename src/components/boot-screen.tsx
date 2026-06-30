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
 { text:"Initializing DevSpace OS..."},
 { text:"Loading environment variables..."},
 { text:"Connecting to dev server..."},
 { text:"Fetching configurations..."},
 { text:"Mounting dashboard modules..."},
 { text:"Boot complete. Welcome to DevSpace."},
 ];

 let i = 0;
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
}, 400);
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
 {/* Simplified Ambient Gradient Orbs - Static for better performance */}
 {!isLowEnd && (
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-300/20 dark:bg-slate-700/10 rounded-full blur-[100px]" />
 <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-300/20 dark:bg-slate-700/10 rounded-full blur-[100px]" />
 </div>
 )}

 <motion.div
 initial={{ scale: 0.9, opacity: 0}}
 animate={{ scale: 1, opacity: 1}}
 transition={{ duration: 0.4}}
 className="max-w-2xl w-full relative text-left font-mono text-sm"
 >
 {/* Simplified Glow Effect - Single layer for performance */}
 <div className="absolute -inset-[1px] bg-slate-300/30 dark:bg-zinc-900/30 rounded-3xl blur-lg" />

 {/* Main Content Container */}
 <div className="relative bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
 <div className="relative z-10">
 {/* Professional Header */}
 <div className="flex items-center mb-8">
 <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shadow-lg border border-zinc-300 dark:border-zinc-700">
 <span className="text-2xl font-bold">OS</span>
 </div>
 <div className="ml-4">
 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 DevSpace OS
 </h2>
 <p className="text-zinc-500 text-xs">Boot Console v2.0</p>
 </div>
 </div>

 {/* Professional Boot Messages */}
 <div className="space-y-3 h-64 overflow-hidden mb-6">
 {bootMessages.map((msg, idx) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, x: -10}}
 animate={{ opacity: 1, x: 0}}
 transition={{ duration: 0.2}}
 className="flex items-start space-x-3"
 >
 <span className="text-zinc-400 dark:text-zinc-500 mr-2">&gt;</span>
 <span
 className={`${
 idx === bootMessages.length - 1
 ?"text-zinc-900 dark:text-white font-semibold"
 :"text-zinc-600 dark:text-zinc-400"
}`}
 >
 {msg}
 </span>
 </motion.div>
 ))}
 </div>

 {/* Professional Progress Bar */}
 <div className="space-y-2">
 <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
 <span>Loading system modules...</span>
 <span>{Math.round(progress)}%</span>
 </div>
 <div className="h-2 bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
 <motion.div
 className="h-full bg-zinc-900 dark:bg-zinc-200 rounded-full shadow-lg"
 initial={{ width: 0}}
 animate={{ width:`${progress}%`}}
 transition={{ duration: 0.3}}
 />
 </div>
 </div>

 {/* Professional Footer */}
 <div className="mt-4 text-xs text-zinc-500 flex justify-between items-center">
 <span>system@devspace:~$</span>
 <span className="text-zinc-600 dark:text-zinc-400">Initializing...</span>
 </div>
 </div>
 </div>
 </motion.div>
 </motion.div>
 );
}
