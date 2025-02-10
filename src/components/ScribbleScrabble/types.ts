// src/components/ScribbleScrabble/types.ts

export interface Point {
  x: number;
  y: number;
}

export interface DrawingState {
  points: Point[];
  color: string;
}

export interface Color {
  color: string;
  name: string;
}