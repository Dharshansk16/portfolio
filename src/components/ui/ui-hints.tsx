"use client";

import { useState} from"react";
import { motion, AnimatePresence} from"framer-motion";

export default function UIHints() {
 const [showShortcutsPanel, setShowShortcutsPanel] = useState(false);

 const shortcuts = [
 { key:"⌘K / Ctrl+K", description:"Quick Search"},
 { key:"Ctrl + `", description:"Developer Console"},
 { key:"Esc", description:"Close Menus"},
 { key:"Tab", description:"Navigate Interface"},
 ];

 return (
 <>
 {/* Minimalist Trigger Button */}
 <motion.button
 initial={{ opacity: 0, scale: 0.8}}
 animate={{ opacity: 1, scale: 1}}
 whileHover={{ scale: 1.05}}
 onClick={() => setShowShortcutsPanel(!showShortcutsPanel)}
 className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[60] w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 hidden md:flex items-center justify-center shadow-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-mono text-lg font-bold"
 title="Quick Actions"
 >
 ⌘
 </motion.button>

 {/* Clean Shortcuts Panel */}
 <AnimatePresence>
 {showShortcutsPanel && (
 <motion.div
 initial={{ opacity: 0, y: 20}}
 animate={{ opacity: 1, y: 0}}
 exit={{ opacity: 0, y: 20}}
 transition={{ type:"spring", damping: 25, stiffness: 300}}
 className="fixed bottom-24 left-6 md:bottom-24 md:left-8 z-[60] w-72 max-w-[calc(100vw-2rem)]"
 >
 <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl">
 <div className="flex items-center justify-between mb-8">
 <h3 className="text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-bold text-xs uppercase tracking-widest">
 Quick Actions
 </h3>
 <button
 onClick={() => setShowShortcutsPanel(false)}
 className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
 >
 Close
 </button>
 </div>

 <div className="space-y-5">
 {shortcuts.map((shortcut, index) => (
 <div
 key={index}
 className="flex items-center justify-between group"
 >
 <span className="text-zinc-600 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 text-sm font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
 {shortcut.description}
 </span>
 <kbd className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-md font-mono text-xs font-semibold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 border border-zinc-200 dark:border-zinc-800">
 {shortcut.key}
 </kbd>
 </div>
 ))}
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}
