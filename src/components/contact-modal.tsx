"use client";

import type React from"react";
import { useRef, useState, useCallback, memo} from"react";
import { motion, AnimatePresence} from"framer-motion";
import { X, Send, Mail, MapPin, Check} from"lucide-react";
import { Button} from"@/components/ui/button";
import { Input} from"@/components/ui/input";
import { Textarea} from"@/components/ui/textarea";
import emailjs from"@emailjs/browser"; // ✅ added

interface ContactModalProps {
 isOpen: boolean;
 onClose: () => void;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

function ContactModal({ isOpen, onClose}: ContactModalProps) {
 const [formData, setFormData] = useState({
 name:"",
 email:"",
 message:"",
});
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSubmitted, setIsSubmitted] = useState(false);

 const formRef = useRef<HTMLFormElement | null>(null);

 const handleSubmit = useCallback(
 async (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);

 try {
 await emailjs.sendForm(
 SERVICE_ID,
 TEMPLATE_ID,
 formRef.current!,
 PUBLIC_KEY
 );

 setIsSubmitting(false);
 setIsSubmitted(true);

 setTimeout(() => {
 setIsSubmitted(false);
 onClose();
 setFormData({ name:"", email:"", message:""});
}, 2000);
} catch (error) {
 console.error("Email send failed:", error);
 setIsSubmitting(false);
 alert("Something went wrong. Please try again.");
}
},
 [onClose]
 );

 const handleChange = useCallback(
 (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 setFormData((prev) => ({
 ...prev,
 [e.target.name]: e.target.value,
}));
},
 []
 );

 return (
 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ opacity: 0}}
 animate={{ opacity: 1}}
 exit={{ opacity: 0}}
 className="fixed inset-0 bg-zinc-950/20 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-colors duration-500"
 onClick={onClose}
 >
 <motion.div
 initial={{ opacity: 0, y: 10}}
 animate={{ opacity: 1, y: 0}}
 exit={{ opacity: 0, y: 10}}
 className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-xl sm:rounded-2xl max-w-md w-full overflow-hidden touch-manipulation shadow-2xl transition-colors duration-500"
 onClick={(e) => e.stopPropagation()}
 >
 <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-100 dark:border-white/10 transition-colors">
 <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
 <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
 Get In Touch
 </h2>
 </div>
 {/* Terminal Window Controls */}
 <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
 <div className="hidden sm:flex space-x-2">
 <div className="w-3 h-3 rounded-full bg-zinc-800 dark:bg-zinc-200 shadow-sm dark:shadow-lg dark:shadow-zinc-500/20"></div>
 <div className="w-3 h-3 rounded-full bg-zinc-800 dark:bg-zinc-200 shadow-sm dark:shadow-lg dark:shadow-zinc-500/20"></div>
 <div className="w-3 h-3 rounded-full bg-zinc-800 dark:bg-zinc-200 shadow-sm dark:shadow-lg dark:shadow-zinc-500/20"></div>
 </div>
 <Button
 variant="ghost"
 size="icon"
 onClick={onClose}
 className="text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 touch-manipulation transition-colors"
 >
 <X className="w-5 h-5" />
 </Button>
 </div>
 </div>

 <div className="p-5 sm:p-6">
 {!isSubmitted ? (
 <>
 <div className="mb-5 sm:mb-6 space-y-2 sm:space-y-3">
 <div className="flex items-center space-x-3 text-sm text-zinc-600 dark:text-gray-300 transition-colors">
 <Mail className="w-4 h-4 text-zinc-500 dark:text-zinc-500 flex-shrink-0" />
 <span className="break-all">dcodecraft@gmail.com</span>
 </div>
 <div className="flex items-center space-x-3 text-sm text-zinc-600 dark:text-gray-300 transition-colors">
 <MapPin className="w-4 h-4 text-zinc-500 dark:text-zinc-500 flex-shrink-0" />
 <span>India</span>
 </div>
 </div>

 <form
 ref={formRef}
 onSubmit={handleSubmit}
 className="space-y-4"
 >
 <div>
 <Input
 name="name"
 placeholder="Your Name"
 value={formData.name}
 onChange={handleChange}
 required
 className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-zinc-400 dark:focus:border-zinc-600 h-11 sm:h-10 touch-manipulation transition-colors shadow-sm"
 />
 </div>
 <div>
 <Input
 name="email"
 type="email"
 placeholder="Your Email"
 value={formData.email}
 onChange={handleChange}
 required
 className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-zinc-400 dark:focus:border-zinc-600 h-11 sm:h-10 touch-manipulation transition-colors shadow-sm"
 />
 </div>
 <div>
 <Textarea
 name="message"
 placeholder="Your Message"
 value={formData.message}
 onChange={handleChange}
 required
 rows={4}
 className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-zinc-400 dark:focus:border-zinc-600 resize-none touch-manipulation transition-colors shadow-sm"
 />
 </div>
 <Button
 type="submit"
 disabled={isSubmitting}
 className="w-full bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-black font-medium h-11 sm:h-10 touch-manipulation shadow-md transition-all"
 >
 {isSubmitting ? (
 <motion.div
 animate={{ rotate: 360}}
 transition={{
 duration: 1,
 repeat: Number.POSITIVE_INFINITY,
 ease:"linear",
}}
 className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full"
 />
 ) : (
 <>
 <Send className="w-4 h-4 mr-2" />
 Send Message
 </>
 )}
 </Button>
 </form>
 </>
 ) : (
 <motion.div
 initial={{ opacity: 0, scale: 0.8}}
 animate={{ opacity: 1, scale: 1}}
 className="text-center py-8"
 >
 <motion.div
 initial={{ scale: 0}}
 animate={{ scale: 1}}
 transition={{ delay: 0.2, type:"spring", stiffness: 200}}
 className="w-16 h-16 mx-auto mb-4 rounded-full bg-black dark:bg-white flex items-center justify-center text-2xl shadow-lg"
 >
 <Check className="w-8 h-8 text-white dark:text-black" />
 </motion.div>
 <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
 Message Sent!
 </h3>
 <p className="text-zinc-500 dark:text-gray-400 text-sm">
 Thanks for the feedback!
 </p>
 </motion.div>
 )}
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}

export default memo(ContactModal);
