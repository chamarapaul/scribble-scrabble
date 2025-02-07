// src/components/ScribbleScrabble/index.tsx
'use client';

import { useState, useCallback } from 'react';
import { Header } from './Header';
import { Canvas } from './Canvas';
import { ColorPalette } from './ColorPalette';
import { InfoDialog } from './InfoDialog';
import { RAINBOW_COLORS } from './constants';
import type { DrawingState, Point } from './types';

const ScribbleScrabble = () => {
  const [currentColor, setCurrentColor] = useState('');
  const [rainbowMode, setRainbowMode] = useState(false);
  const [rainbowIndex, setRainbowIndex] = useState(0);
  const [undoStack, setUndoStack] = useState<DrawingState[]>([]);
  const [redoStack, setRedoStack] = useState<DrawingState[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  const handleDraw = (points: Point[]) => {
    const newState: DrawingState = {
      points,
      color: rainbowMode ? RAINBOW_COLORS[rainbowIndex] : currentColor,
    };

    setUndoStack([...undoStack, newState]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const currentState = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);

    setUndoStack(newUndoStack);
    setRedoStack([...redoStack, currentState]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const currentState = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);

    setUndoStack([...undoStack, currentState]);
    setRedoStack(newRedoStack);
  };

  const handleClear = () => {
    setUndoStack([]);
    setRedoStack([]);
  };

  const handleColorSelect = useCallback((color: string) => {
    setCurrentColor(color);
    setRainbowMode(false);
  }, []); 

  const handleRainbowToggle = () => {
    setRainbowMode(!rainbowMode);
    if (!rainbowMode) {
      setCurrentColor(RAINBOW_COLORS[0]);
    }
  };

  const handleRainbowIndexChange = () => {
    setRainbowIndex((prev) => (prev + 1) % RAINBOW_COLORS.length);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      <Header
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onInfo={() => setShowInfo(true)}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
      />

      <Canvas
        undoStack={undoStack}
        currentColor={currentColor}
        rainbowMode={rainbowMode}
        rainbowIndex={rainbowIndex}
        onDraw={handleDraw}
        onRainbowIndexChange={handleRainbowIndexChange}
      />

      <ColorPalette
        currentColor={currentColor}
        rainbowMode={rainbowMode}
        onColorSelect={handleColorSelect}
        onRainbowToggle={handleRainbowToggle}
      />

      <InfoDialog
        open={showInfo}
        onOpenChange={setShowInfo}
      />
    </div>
  );
};

export default ScribbleScrabble;