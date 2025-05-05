// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { VersionChecker } from "@/components/VersionChecker";
import Script from "next/script";

const isDev = process.env.NODE_ENV === 'development';
const siteUrl = 'https://itsscribblescrabbletime.com';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFFFFF",
  colorScheme: "light"
};

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: isDev ? "[Dev] It's Scribble Scrabble Time!" : "It's Scribble Scrabble Time!",
    template: isDev ? `[Dev] %s | It's Scribble Scrabble Time!` : `%s | It's Scribble Scrabble Time!`,
  },
  description: "A delightful drawing app for kids and the young at heart! Express your creativity with rainbow colors on a simple touch-friendly canvas. It's time to scribble scrabble, and let your imagination soar!",

  // Basic metadata
  applicationName: "It's Scribble Scrabble Time!",
  keywords: [
    "kids drawing app", 
    "drawing online", 
    "children's art app", 
    "digital drawing", 
    "creative app for kids", 
    "scribble", 
    "doodle", 
    "art app", 
    "touch drawing", 
    "rainbow colors"
  ],
  category: "Education",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  
  // Open Graph
  openGraph: {
    title: "It's Scribble Scrabble Time!",
    description: "Unleash your creativity with this playful drawing app! Perfect for kids and anyone who loves to doodle.",
    url: siteUrl,
    siteName: "It's Scribble Scrabble Time!",
    locale: "en_US",
    type: "website",
    // images: [
    //   {
    //     url: `${siteUrl}/og-image.png`,
    //     width: 1200,
    //     height: 630,
    //     alt: "It's Scribble Scrabble Time! - A colorful drawing app for kids",
    //   }
    // ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "It's Scribble Scrabble Time!",
    description: "A delightful drawing app for kids and the young at heart!",
    // creator: "@scribblescrabble",
    // images: [`${siteUrl}/twitter-image.png`],
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

  // Verification - uncomment and add your code when ready for Google Search Console
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE", 
  // },

  // PWA
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: isDev ? "[Dev] Scribble Scrabble" : "Scribble Scrabble",
  },
  
  // Alternate representations
  alternates: {
    canonical: siteUrl,
  },
};

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fredoka.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta 
          name="apple-mobile-web-app-title" 
          content={isDev ? "[Dev] Scribble Scrabble" : "Scribble Scrabble"} 
        />
      </head>
      <body>
        {children}
        <VersionChecker />
        <Analytics />
        {/* JSON-LD structured data */}
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "It's Scribble Scrabble Time!",
              "url": siteUrl,
              "description": "A delightful drawing app for kids and the young at heart! Express your creativity with rainbow colors on a simple touch-friendly canvas.",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web",
              "audience": {
                "@type": "PeopleAudience",
                "suggestedMinAge": "3",
                "description": "Children and adults who enjoy creative drawing"
              }
            })
          }}
        />
      </body>
    </html>
  );
}