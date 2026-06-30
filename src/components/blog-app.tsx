"use client";

import { memo, useState, useEffect} from"react";
import { motion} from"framer-motion";
import { FileText, Calendar, Clock, ArrowRight, Terminal, ChevronLeft} from"lucide-react";

interface BlogAppProps {
 onBack: () => void;
}

const isMobileDevice = () => {
 if (typeof window ==="undefined") return false;
 return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

const blogPosts = [
 {
 id: 1,
 title:"Getting Started with Next.js 14",
 excerpt:
"Exploring the latest features and improvements in Next.js 14, including the new App Router and Server Components.",
 date:"2024-01-15",
 readTime:"5 min read",
 tags: ["Next.js","React","Web Development"],
},
 {
 id: 2,
 title:"Mastering Tailwind CSS",
 excerpt:
"A comprehensive guide to creating beautiful, responsive user interfaces using Tailwind CSS utility classes.",
 date:"2024-01-10",
 readTime:"7 min read",
 tags: ["CSS","Tailwind","UI/UX"],
},
 {
 id: 3,
 title:"State Management in React Applications",
 excerpt:
"Comparing different state management solutions for React apps, from useState to Redux and Zustand.",
 date:"2024-01-05",
 readTime:"8 min read",
 tags: ["React","State Management","JavaScript"],
},
];

function BlogApp({ onBack}: BlogAppProps) {
 const [terminalText, setTerminalText] = useState("");
 const [comingSoon, setComingSoon] = useState(false);
 const [isMobile, setIsMobile] = useState(false);
 const fullText ="> fetching latest blogs...";

 useEffect(() => {
 setIsMobile(isMobileDevice());
}, []);

 useEffect(() => {
 const speed = isMobile ? 20 : 10;
 let index = 0;
 const timer = setInterval(() => {
 if (index < fullText.length) {
 setTerminalText(fullText.slice(0, index + 1));
 index++;
} else {
 clearInterval(timer);
 setTimeout(() => setComingSoon(true), 500);
}
}, speed);

 return () => clearInterval(timer);
}, [isMobile, fullText]);

 return (
  <div className="min-h-screen w-full bg-white dark:bg-black overflow-y-auto px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto py-12 sm:py-20">
  {/* Minimalist Back Button */}
  <div className="mb-12">
  <button
  onClick={onBack}
  className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm text-sm font-medium"
  aria-label="Back to Dashboard"
  >
  <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
  </button>
  </div>
  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6}}
  className="mb-16"
  >
  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
  Writing & Insights
  </h1>
  <p className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-medium">
  Thoughts on software engineering, design patterns, and building products.
  </p>
  </motion.div>

  {/* Terminal Animation */}
  <div className="mb-12">
  <div className="font-mono text-zinc-500 text-sm">
  <span className="text-zinc-400">guest@portfolio:~/blog$ </span>
  {terminalText}
  <span className="animate-pulse font-bold ml-1">_</span>
  </div>
  </div>

  {/* Coming Soon State */}
  {comingSoon && (
  <motion.div
  initial={{ opacity: 0, y: 10}}
  animate={{ opacity: 1, y: 0}}
  transition={{ delay: 0.1, duration: 0.4}}
  className="py-12 border-t border-zinc-200 dark:border-zinc-800"
  >
  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
  Writing in Progress
  </h3>
  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
  Stay tuned for insightful articles on web development, design patterns, and my tech journey.
  </p>
  </motion.div>
  )}

  {/* Hidden Blog Posts List for Future */}
  {false && (
  <div className="space-y-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
  {blogPosts.map((post, index) => (
  <motion.article
  key={post.id}
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ delay: index * 0.1, duration: 0.6}}
  className="group cursor-pointer"
  >
  <div className="flex items-center space-x-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
  <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</span>
  <span>•</span>
  <span>{post.readTime}</span>
  </div>
  
  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-zinc-500 transition-colors">
  {post.title}
  </h2>
  
  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-4">
  {post.excerpt}
  </p>
  
  <div className="flex flex-wrap gap-2">
  {post.tags.map((tag) => (
  <span
  key={tag}
  className="text-sm font-medium text-zinc-900 dark:text-white underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4"
  >
  {tag}
  </span>
  ))}
  </div>
  </motion.article>
  ))}
  </div>
  )}
  </div>
  </div>
 );
}

export default memo(BlogApp);
