// src/components/ScribbleScrabble/Canvas.tsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { Point, DrawingState } from '@/types/drawing';
import { RAINBOW_COLORS } from '@/constants/colors';

interface CanvasProps {
  undoStack: DrawingState[];
  currentColor: string;
  rainbowMode: boolean;
  rainbowIndex: number;
  onDraw: (points: Point[]) => void;
  onRainbowIndexChange: () => void;
}

export const Canvas = ({
  undoStack,
  currentColor,
  rainbowMode,
  rainbowIndex,
  onDraw,
  onRainbowIndexChange,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const currentPath = useRef<Point[]>([]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw all states from the undo stack
    undoStack.forEach(state => {
      ctx.beginPath();
      ctx.strokeStyle = state.color;
      ctx.lineWidth = 8;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      state.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });
  }, [undoStack]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      
      // Apply device pixel ratio for sharp rendering
      const scale = window.devicePixelRatio;
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Scale the context
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(scale, scale);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 8;
      
      redrawCanvas();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [redrawCanvas]);

  const getPointFromEvent = (e: React.MouseEvent | React.TouchEvent, rect: DOMRect): Point => {
    const event = 'touches' in e ? e.touches[0] : e;
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = getPointFromEvent(e, rect);

    isDrawing.current = true;
    currentPath.current = [point];

    if (rainbowMode) {
      onRainbowIndexChange();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = getPointFromEvent(e, rect);

    currentPath.current.push(point);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.strokeStyle = rainbowMode ? RAINBOW_COLORS[rainbowIndex] : currentColor;
    ctx.lineWidth = 8;

    const points = currentPath.current;
    if (points.length > 1) {
      const lastPoint = points[points.length - 2];
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing.current && currentPath.current.length > 0) {
      onDraw(currentPath.current);
    }
    isDrawing.current = false;
    currentPath.current = [];
  };

  return (
    <div className="flex-grow relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
};