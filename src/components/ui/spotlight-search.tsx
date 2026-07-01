"use client";

import { useEffect, useState, useCallback} from"react";
import { motion, AnimatePresence} from"framer-motion";
import {
 Search,
 X,
 ArrowRight,
 Briefcase,
 User,
 FileText,
 Mail,
 Trophy,
} from"lucide-react";
import type { AppType} from"@/app/page";

interface SpotlightSearchProps {
 onNavigate: (app: AppType) => void;
 onContactOpen: () => void;
}

const searchItems = [
 {
 id:"projects",
 name:"Projects",
 icon: Briefcase,
 category:"Navigate",
 color:"",
},
 {
 id:"about",
 name:"About Me",
 icon: User,
 category:"Navigate",
 color:"",
},
 {
 id:"blog",
 name:"Blog",
 icon: FileText,
 category:"Navigate",
 color:"",
},
 {
 id: "achievements",
 name: "Achievements",
 icon: Trophy,
 category: "Navigate",
 color: "",
},
 {
 id:"contact",
 name:"Contact",
 icon: Mail,
 category:"Action",
 color:"",
},
];

export default function SpotlightSearch({
 onNavigate,
 onContactOpen,
}: SpotlightSearchProps) {
 const [isOpen, setIsOpen] = useState(false);
 const [query, setQuery] = useState("");
 const [selectedIndex, setSelectedIndex] = useState(0);

 const filteredItems = searchItems.filter((item) =>
 item.name.toLowerCase().includes(query.toLowerCase())
 );

 const handleSelect = useCallback(
 (id: string) => {
 if (id ==="contact") {
 onContactOpen();
} else {
 onNavigate(id as AppType);
}
 setIsOpen(false);
 setQuery("");
 setSelectedIndex(0);
},
 [onContactOpen, onNavigate]
 );

 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 // Cmd+K or Ctrl+K to open
 if ((e.metaKey || e.ctrlKey) && e.key ==="k") {
 e.preventDefault();
 setIsOpen(true);
}

 // ESC to close
 if (e.key ==="Escape") {
 setIsOpen(false);
 setQuery("");
 setSelectedIndex(0);
}

 if (isOpen) {
 // Arrow navigation
 if (e.key ==="ArrowDown") {
 e.preventDefault();
 setSelectedIndex((prev) =>
 prev < filteredItems.length - 1 ? prev + 1 : 0
 );
}
 if (e.key ==="ArrowUp") {
 e.preventDefault();
 setSelectedIndex((prev) =>
 prev > 0 ? prev - 1 : filteredItems.length - 1
 );
}

 // Enter to select
 if (e.key ==="Enter" && filteredItems[selectedIndex]) {
 handleSelect(filteredItems[selectedIndex].id);
}
}
};

 window.addEventListener("keydown", handleKeyDown);
 return () => window.removeEventListener("keydown", handleKeyDown);
}, [isOpen, filteredItems, selectedIndex, handleSelect]);

 return (
 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ opacity: 0}}
 animate={{ opacity: 1}}
 exit={{ opacity: 0}}
 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 px-4"
 onClick={() => setIsOpen(false)}
 >
 <motion.div
 initial={{ scale: 0.95, y: -20, opacity: 0}}
 animate={{ scale: 1, y: 0, opacity: 1}}
 exit={{ scale: 0.95, y: -20, opacity: 0}}
 transition={{ duration: 0.2}}
 onClick={(e) => e.stopPropagation()}
 className="w-full max-w-2xl"
 >
  {/* Search Box */}
  <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
  {/* Input */}
  <div className="flex items-center px-4 py-4 border-b border-zinc-100 dark:border-zinc-900">
  <Search className="w-5 h-5 text-zinc-400 mr-3" />
  <input
  type="text"
  value={query}
  onChange={(e) => {
  setQuery(e.target.value);
  setSelectedIndex(0);
 }}
  placeholder="Search for projects, pages, or actions..."
  className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none text-lg font-medium"
  autoFocus
  />
  <button
  onClick={() => setIsOpen(false)}
  className="ml-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
  >
  <X className="w-5 h-5" />
  </button>
  </div>

  {/* Results */}
  <div className="max-h-96 overflow-y-auto">
  {filteredItems.length > 0 ? (
  <div className="py-2 px-2">
  {filteredItems.map((item, index) => {
  const Icon = item.icon;
  return (
  <motion.button
  key={item.id}
  initial={{ opacity: 0, x: -10}}
  animate={{ opacity: 1, x: 0}}
  transition={{ delay: index * 0.05}}
  onClick={() => handleSelect(item.id)}
  onMouseEnter={() => setSelectedIndex(index)}
  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
  selectedIndex === index
  ?"bg-zinc-100 dark:bg-zinc-900"
  :"hover:bg-zinc-50 dark:hover:bg-zinc-900"
 }`}
  >
  <div className="flex items-center space-x-4">
  <div
  className={`w-10 h-10 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center`}
  >
  <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
  </div>
  <div className="text-left">
  <div className="text-zinc-900 dark:text-white font-bold text-sm">
  {item.name}
  </div>
  <div className="text-xs text-zinc-500 font-medium mt-0.5">
  {item.category}
  </div>
  </div>
  </div>
  <ArrowRight className={`w-4 h-4 transition-colors ${selectedIndex === index ? "text-zinc-900 dark:text-white" : "text-transparent"}`} />
  </motion.button>
  );
 })}
  </div>
  ) : (
  <div className="py-16 text-center flex flex-col items-center justify-center">
  <Search className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mb-4" />
  <p className="text-zinc-500 font-medium">No results found for "{query}"</p>
  </div>
  )}
  </div>

  {/* Footer */}
  <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 font-medium bg-zinc-50 dark:bg-zinc-950">
  <div className="flex items-center space-x-6">
  <span className="flex items-center gap-2">
  <span className="flex items-center gap-1">
    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">↑</kbd>
    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">↓</kbd>
  </span>
  Navigate
  </span>
  <span className="flex items-center gap-2">
  <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">↵</kbd> Select
  </span>
  <span className="flex items-center gap-2">
  <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">ESC</kbd> Close
  </span>
  </div>
  <div className="flex items-center space-x-2">
  <span>Quick Search</span>
  <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">
  ⌘K
  </kbd>
  </div>
  </div>
  </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}
