// src/components/ScribbleScrabble/constants.ts

export const COLORS = [
  { color: '#E91E63', name: 'Bubble Gum' },
  { color: '#FF4081', name: 'Berry Pink' },
  { color: '#FF5722', name: 'Orange Pop' },
  { color: '#FF9800', name: 'Mango' },
  { color: '#FFC107', name: 'Sunny Yellow' },
  { color: '#4CAF50', name: 'Grass Green' },
  { color: '#009688', name: 'Mermaid Tail' },
  { color: '#2196F3', name: 'Sky Blue' },
  { color: '#3F51B5', name: 'Ocean Blue' },
  { color: '#9C27B0', name: 'Magic Purple' },
  { color: '#795548', name: 'Chocolate' },
  { color: '#000000', name: 'Midnight' },
];

export const COLOR_MAP = {
  bubbleGum: COLORS.find(c => c.name === 'Bubble Gum')?.color as string,
  berryPink: COLORS.find(c => c.name === 'Berry Pink')?.color as string,
  orangePop: COLORS.find(c => c.name === 'Orange Pop')?.color as string,
  mango: COLORS.find(c => c.name === 'Mango')?.color as string,
  sunnyYellow: COLORS.find(c => c.name === 'Sunny Yellow')?.color as string,
  grassGreen: COLORS.find(c => c.name === 'Grass Green')?.color as string,
  mermaidTail: COLORS.find(c => c.name === 'Mermaid Tail')?.color as string,
  skyBlue: COLORS.find(c => c.name === 'Sky Blue')?.color as string,
  oceanBlue: COLORS.find(c => c.name === 'Ocean Blue')?.color as string,
  magicPurple: COLORS.find(c => c.name === 'Magic Purple')?.color as string,
  chocolate: COLORS.find(c => c.name === 'Chocolate')?.color as string,
  midnight: COLORS.find(c => c.name === 'Midnight')?.color as string,
} as const;

export const RAINBOW_COLORS = [
  COLOR_MAP.bubbleGum, // Red
  COLOR_MAP.mango, // Orange
  COLOR_MAP.sunnyYellow, // Yellow
  COLOR_MAP.grassGreen, // Green
  COLOR_MAP.skyBlue, // Blue
  COLOR_MAP.oceanBlue, // Indigo
  COLOR_MAP.magicPurple  // Violet
];

// Calculate the degree segments
const SEGMENT_SIZE = 360 / RAINBOW_COLORS.length; // 51.43 degrees per segment

export const RAINBOW_GRADIENT = `conic-gradient(
  ${COLOR_MAP.bubbleGum} 0deg ${SEGMENT_SIZE}deg,
  ${COLOR_MAP.mango} ${SEGMENT_SIZE}deg ${SEGMENT_SIZE * 2}deg,
  ${COLOR_MAP.sunnyYellow} ${SEGMENT_SIZE * 2}deg ${SEGMENT_SIZE * 3}deg,
  ${COLOR_MAP.grassGreen} ${SEGMENT_SIZE * 3}deg ${SEGMENT_SIZE * 4}deg,
  ${COLOR_MAP.skyBlue} ${SEGMENT_SIZE * 4}deg ${SEGMENT_SIZE * 5}deg,
  ${COLOR_MAP.oceanBlue} ${SEGMENT_SIZE * 5}deg ${SEGMENT_SIZE * 6}deg,
  ${COLOR_MAP.magicPurple} ${SEGMENT_SIZE * 6}deg 360deg
)`;

export interface SavedDrawing {
  id: string;
  dataUrl: string;
  timestamp: number;
  title: string;
}