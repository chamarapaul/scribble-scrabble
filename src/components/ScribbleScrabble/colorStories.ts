// src/components/ScribbleScrabble/colorStories.ts
import { COLOR_MAP, RAINBOW_GRADIENT } from './constants';

interface ColorStory {
  name: string;
  color: string;
  story: string;
  inspiration: string;
  pairsWith: string[];  // Names of colors that go well with this one
}

export const COLOR_STORIES: ColorStory[] = [
  {
    name: 'Bubble Gum',
    color: COLOR_MAP.bubbleGum,
    story: "This red is as sweet as your favorite bubble gum, bringing back memories of blowing the biggest bubbles ever.",
    inspiration: "That perfect shade of red bubble gum, just before you blow a giant bubble",
    pairsWith: ['Sky Blue', 'Mermaid Tail', 'Magic Purple']
  },
  {
    name: 'Berry Pink',
    color: COLOR_MAP.berryPink,
    story: "As bright as fresh raspberries on a summer morning, this pink adds a burst of energy to any drawing.",
    inspiration: "A basket full of fresh-picked berries glistening in the sun",
    pairsWith: ['Ocean Blue', 'Mango', 'Magic Purple']
  },
  {
    name: 'Orange Pop',
    color: COLOR_MAP.orangePop,
    story: "The fizzy excitement of an orange soda on a hot day, this color brings a splash of fun to everything it touches.",
    inspiration: "The sunset reflecting off an ice-cold orange soda",
    pairsWith: ['Sky Blue', 'Sunny Yellow', 'Chocolate']
  },
  {
    name: 'Mango',
    color: COLOR_MAP.mango,
    story: "Sweet and juicy like a perfectly ripe mango, this orange makes everything feel like a tropical vacation.",
    inspiration: "A slice of fresh mango catching the morning light",
    pairsWith: ['Ocean Blue', 'Grass Green', 'Berry Pink']
  },
  {
    name: 'Sunny Yellow',
    color: COLOR_MAP.sunnyYellow,
    story: "As bright as the morning sun, this yellow brings warmth and happiness to any drawing it touches.",
    inspiration: "Sunflowers turning their faces to follow the sun across the sky",
    pairsWith: ['Grass Green', 'Orange Pop', 'Sky Blue']
  },
  {
    name: 'Grass Green',
    color: COLOR_MAP.grassGreen,
    story: "Fresh like morning dew on spring grass, this green makes everything feel alive and growing.",
    inspiration: "A perfect summer lawn, just after the rain",
    pairsWith: ['Sunny Yellow', 'Sky Blue', 'Mango']
  },
  {
    name: 'Mermaid Tail',
    color: COLOR_MAP.mermaidTail,
    story: "Shimmering like a mermaid's tail in deep ocean waters, this turquoise adds magic to every stroke.",
    inspiration: "The sparkling scales of mermaids in storybooks",
    pairsWith: ['Ocean Blue', 'Magic Purple', 'Bubble Gum']
  },
  {
    name: 'Sky Blue',
    color: COLOR_MAP.skyBlue,
    story: "Light and breezy like a perfect summer sky, this blue makes you feel like you're floating on a cloud.",
    inspiration: "A cloudless sky on the perfect day for flying a kite",
    pairsWith: ['Grass Green', 'Sunny Yellow', 'Bubble Gum']
  },
  {
    name: 'Ocean Blue',
    color: COLOR_MAP.oceanBlue,
    story: "Deep and mysterious like the ocean's depths, this blue holds endless adventures in every stroke.",
    inspiration: "The deep blue ocean seen from the beach on a clear day",
    pairsWith: ['Mermaid Tail', 'Berry Pink', 'Mango']
  },
  {
    name: 'Magic Purple',
    color: COLOR_MAP.magicPurple,
    story: "Enchanted like a wizard's robe, this purple sprinkles a bit of magic into everything it touches.",
    inspiration: "The mysterious glow of twilight just as the stars begin to appear",
    pairsWith: ['Berry Pink', 'Mermaid Tail', 'Bubble Gum']
  },
  {
    name: 'Chocolate',
    color: COLOR_MAP.chocolate,
    story: "Rich and warm like melted chocolate, this brown brings coziness to any drawing. Perfect for tree trunks, teddy bears, or a cup of hot cocoa!",
    inspiration: "A chocolate bar melting into the perfect cup of hot chocolate",
    pairsWith: ['Orange Pop', 'Mango', 'Sky Blue']
  },
  {
    name: 'Midnight',
    color: COLOR_MAP.midnight,
    story: "Deep and bold like the night sky, this black helps all other colors shine brighter. Essential for outlines and making other colors pop!",
    inspiration: "The silhouette of trees against a starlit night sky",
    pairsWith: ['Ocean Blue', 'Magic Purple', 'Sunny Yellow']
  }
];

export const RAINBOW_STORY = {
    name: 'Rainbow',
    color: RAINBOW_GRADIENT, 
    story: "When one color just isn't enough! Rainbow brings all the colors together to dance across your drawing, creating magical trails of color with every stroke.",
    inspiration: "The way rainbows appear after the rain, promising adventure and spreading joy",
    pairsWith: [], // Rainbow mode works with everything!
  };

// Helper function to get random color combinations
export function getRandomColorPalette(size: number = 3): ColorStory[] {
  const randomIndex = Math.floor(Math.random() * COLOR_STORIES.length);
  const mainColor = COLOR_STORIES[randomIndex];
  const palette = [mainColor];
  
  // Add complementary colors from the pairsWith array
  for (const pairColor of mainColor.pairsWith) {
    if (palette.length < size) {
      const colorStory = COLOR_STORIES.find(story => story.name === pairColor);
      if (colorStory) {
        palette.push(colorStory);
      }
    }
  }
  
  return palette;
}