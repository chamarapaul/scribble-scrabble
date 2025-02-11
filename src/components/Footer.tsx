// src/components/Footer.tsx
'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t bg-white mt-16">
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} It&apos;s Scribble Scrabble Time
          <div className="w-px h-4 bg-gray-200 mx-2 inline-block align-middle" />
          <Link 
            href="/terms" 
            className="text-gray-600 hover:text-gray-800 transition-colors underline"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};