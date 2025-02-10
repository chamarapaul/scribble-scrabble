// src/components/ScribbleScrabble/index.tsx
'use client';

import { useState, useCallback } from 'react';
import { Header } from './Header';
import { Canvas } from './Canvas';
import { ColorPalette } from './ColorPalette';
import { SaveDialog } from './SaveDialog';
import { ColorDialog } from './ColorDialog';
import { InfoDialog } from './InfoDialog';
import { RAINBOW_COLORS, SavedDrawing } from './constants';
import type { DrawingState, Point } from './types';

const ScribbleScrabble = () => {
  const [currentColor, setCurrentColor] = useState('');
  const [rainbowMode, setRainbowMode] = useState(false);
  const [rainbowIndex, setRainbowIndex] = useState(0);
  const [undoStack, setUndoStack] = useState<DrawingState[]>([]);
  const [redoStack, setRedoStack] = useState<DrawingState[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showColorInfo, setShowColorInfo] = useState(false);
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

  const handleSave = async () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    try {
      // Create a temporary canvas with white background
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Match the original canvas size
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with white background
      tempCtx.fillStyle = '#FFFFFF';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the original canvas content on top
      tempCtx.drawImage(canvas, 0, 0);

      // Get the data URL with white background
      const dataUrl = tempCanvas.toDataURL('image/png');

      const newDrawing: SavedDrawing = {
        id: Date.now().toString(),
        dataUrl,
        timestamp: Date.now(),
        title: `Drawing ${new Date().toLocaleDateString()}`,
      };

      const existingDrawingsStr = localStorage.getItem('scribble-drawings');
      const existingDrawings: SavedDrawing[] = existingDrawingsStr
        ? JSON.parse(existingDrawingsStr)
        : [];

      const updatedDrawings = [newDrawing, ...existingDrawings];
      const trimmedDrawings = updatedDrawings.slice(0, 30);

      localStorage.setItem('scribble-drawings', JSON.stringify(trimmedDrawings));
      setShowSaveDialog(true);
    } catch (error) {
      console.error('Error saving drawing:', error);
      alert('Unable to save drawing. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      <Header
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onSave={handleSave}
        onColorInfo={() => setShowColorInfo(true)}
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

      <SaveDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
      />

      <ColorDialog
        open={showColorInfo}
        onOpenChange={setShowColorInfo}
        onColorSelect={handleColorSelect}
        onRainbowToggle={handleRainbowToggle}
        rainbowMode={rainbowMode}
      />

      <InfoDialog
        open={showInfo}
        onOpenChange={setShowInfo}
      />
    </div>
  );
};

export default ScribbleScrabble;