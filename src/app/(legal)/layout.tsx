// src/app/(legal)/page.tsx
export const metadata = {
    title: "Legal",
    description: "Legal information for It's Scribble Scrabble Time, a web-based drawing application.",
  };
  
  export default function LegalLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>{children}</div>
    );
  }