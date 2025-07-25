import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dharshan's DevSpace - Portfolio",
  description: "A futuristic OS-style portfolio of Dharshan S Kotian.",
  applicationName: "Dharshan's DevSpace",
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
    { name: "Dharshan S Kotian", url: "https://dharshanskotian.vercel.app" },
  ],
  creator: "Dharshan S Kotian",
  publisher: "Dharshan S Kotian",
  metadataBase: new URL("https://dharshanskotian.vercel.app"),
  openGraph: {
    title: "Dharshan's DevSpace - Portfolio",
    description: "A futuristic OS-style portfolio of Dharshan S Kotian.",
    url: "https://dharshanskotian.vercel.app",
    siteName: "Dharshan's DevSpace",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dharshan's DevSpace Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
