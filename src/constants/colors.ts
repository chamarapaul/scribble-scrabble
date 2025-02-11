// src/constants/colors.ts
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

  interface ColorStory {
    name: string;
    color: string;
    story: string;
    inspiration: string;
    pairsWith: string[]; 
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
      story: "Can't pick just one? Rainbow mode cycles through our favorite colors in a cheerful rainbow pattern!",
      inspiration: "The playful way colors dance together in the sky",
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
  