import type { Metadata, Viewport} from"next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights} from"@vercel/speed-insights/next";
import { ThemeProvider} from"@/components/theme-provider";

const sansFont = Inter({
 variable:"--font-sans",
 subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
 variable:"--font-mono",
 subsets: ["latin"],
});

export const viewport: Viewport = {
 width:"device-width",
 initialScale: 1,
 maximumScale: 5,
 userScalable: true,
 viewportFit:"cover",
 themeColor: [
 { media:"(prefers-color-scheme: dark)", color:"#0f172a"},
 { media:"(prefers-color-scheme: light)", color:"#f8fafc"},
 ],
};

export const metadata: Metadata = {
 title:"Dharshan's DevSpace - Portfolio",
 description:"A futuristic OS-style portfolio of Dharshan S Kotian.",
 applicationName:"Dharshan's DevSpace",
 keywords: [
"Dharshan S Kotian",
"Portfolio",
"Web Developer",
"Full Stack Developer",
"Next.js",
"Frontend",
"Backend",
"Full-stack",
"TailwindCSS",
"React",
"Developer Portfolio",
 ],
 authors: [
 { name:"Dharshan S Kotian", url:"https://dharshanskotian.vercel.app"},
 ],
 creator:"Dharshan S Kotian",
 publisher:"Dharshan S Kotian",
 metadataBase: new URL("https://dharshanskotian.vercel.app"),
 openGraph: {
 title:"Dharshan's DevSpace - Portfolio",
 description:"A futuristic OS-style portfolio of Dharshan S Kotian.",
 url:"https://dharshanskotian.vercel.app",
 siteName:"Dharshan's DevSpace",
 locale:"en_US",
 type:"website",
 images: [
 {
 url:"/og-image.png",
 width: 1200,
 height: 630,
 alt:"Dharshan's DevSpace Portfolio",
},
 ],
},
 other: {
"google-site-verification":"QVZ9atOgrKIfJtpSKz1V8IUADFcT91IwwMYJ5rQdT3Q",
},
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" className="scroll-smooth" suppressHydrationWarning>
 <head>
 {/* Additional mobile optimizations */}
 <meta name="mobile-web-app-capable" content="yes" />
 <meta name="apple-mobile-web-app-capable" content="yes" />
 <meta
 name="apple-mobile-web-app-status-bar-style"
 content="black-translucent"
 />
 <meta name="format-detection" content="telephone=no" />
 </head>
 <body
 className={`${sansFont.variable} ${monoFont.variable} antialiased touch-manipulation`}
 >
 <ThemeProvider
 attribute="class"
 defaultTheme="dark"
 enableSystem
 disableTransitionOnChange
 >
 {children}
 <SpeedInsights />
 </ThemeProvider>
 </body>
 </html>
 );
}
