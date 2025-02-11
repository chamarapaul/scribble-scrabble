// src/components/ColorPalette.tsx
'use client';

import { useState, useEffect } from 'react';
import { COLORS, RAINBOW_GRADIENT } from '@/constants/colors';
import type { Color } from '@/types/drawing';

interface ColorPaletteProps {
  currentColor: string;
  rainbowMode: boolean;
  onColorSelect: (color: string) => void;
  onRainbowToggle: () => void;
}

export const ColorPalette = ({
  currentColor,
  rainbowMode,
  onColorSelect,
  onRainbowToggle,
}: ColorPaletteProps) => {
  const [randomizedColors, setRandomizedColors] = useState<Color[]>([]);

  useEffect(() => {
    const shuffleColors = (array: Color[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
  
    const shuffled = shuffleColors(COLORS);
    setRandomizedColors(shuffled);
    onColorSelect(shuffled[0].color);
  }, [onColorSelect]); // Add onColorSelect to dependencies

  return (
    <div className="bg-white border-t p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {randomizedColors.map(({ color, name }) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`w-10 h-10 rounded-full transition-transform ${
              currentColor === color && !rainbowMode ? 'scale-125 ring-2 ring-purple-500' : ''
            }`}
            style={{
              backgroundColor: color,
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            title={name}
          />
        ))}
        
        <button
          onClick={onRainbowToggle}
          className={`w-10 h-10 rounded-full transition-transform ${
            rainbowMode ? 'scale-125 ring-2 ring-purple-500' : ''
          }`}
          style={{
            background: RAINBOW_GRADIENT,
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          title="Rainbow Mode"
        />
      </div>
    </div>
  );
};