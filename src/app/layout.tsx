// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { VersionChecker } from "@/components/VersionChecker";

const isDev = process.env.NODE_ENV === 'development';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFFFFF",
};

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
});

export const metadata: Metadata = {
  title: {
    default: isDev ? "[Dev] It's Scribble Scrabble Time!" : "It's Scribble Scrabble Time!",
    template: `%s | ${isDev ? "[Dev] It's Scribble Scrabble Time!" : "It's Scribble Scrabble Time!"}`,
  },
  description: "A delightful drawing app for kids and the young at heart! Express your creativity with rainbow colors on a simple touch-friendly canvas. It's time to scribble scrabble, and let your imagination soar!",

  // Open Graph
  openGraph: {
    title: "It's Scribble Scrabble Time!",
    description: "Unleash your creativity with this playful drawing app! Perfect for kids and anyone who loves to doodle.",
    url: "https://itsscribblescrabbletime.com",
    siteName: "It's Scribble Scrabble Time!",
    locale: "en_US",
    type: "website",
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // PWA
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: isDev ? "[Dev] Scribble Scrabble" : "Scribble Scrabble",
    // startupImage: [
    //   {
    //     url: "/splash/apple-splash-2048-2732.jpg",
    //     media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta 
          name="apple-mobile-web-app-title" 
          content={isDev ? "[Dev] Scribble Scrabble" : "Scribble Scrabble"} 
        />
        {/* <link rel="apple-touch-startup-image" href="/splash/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" /> */}
      </head>
      <body className={fredoka.variable}>
        {children}
        <VersionChecker />
      </body>
    </html>
  );
}