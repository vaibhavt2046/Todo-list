// Funky Paper Roasts, Funny Quotes, and Sticky Note Helpers

export const PRIORITIES = {
  high: {
    id: 'high',
    label: 'HOLY GUACAMOLE! 🔥',
    shortLabel: 'URGENT',
    emoji: '🌶️',
    bg: 'bg-[#FED7AA]',
    text: 'text-[#9A3412]',
    border: 'border-[#EA580C]',
    paperColor: '#FFEDD5',
    tapeClass: 'washi-tape-pink',
    description: 'Do it now or the notebook burns down',
  },
  medium: {
    id: 'medium',
    label: 'WHENEVER, JUST DO IT ⚡',
    shortLabel: 'TODAY-ISH',
    emoji: '⚡',
    bg: 'bg-[#FEF08A]',
    text: 'text-[#854D0E]',
    border: 'border-[#CA8A04]',
    paperColor: '#FEF08A',
    tapeClass: 'washi-tape',
    description: 'Definitely on the to-do list for today... maybe',
  },
  low: {
    id: 'low',
    label: 'TOMORROW... MAYBE 🦥',
    shortLabel: 'CHILL',
    emoji: '🦥',
    bg: 'bg-[#E0E7FF]',
    text: 'text-[#3730A3]',
    border: 'border-[#6366F1]',
    paperColor: '#E0E7FF',
    tapeClass: 'washi-tape-blue',
    description: 'Future You can worry about this note',
  },
};

export const CATEGORIES = [
  { id: 'all', name: 'All Doodles', emoji: '🌀' },
  { id: 'adulting', name: 'Adulting Pain', emoji: '💼' },
  { id: 'survival', name: 'Snacks & Water', emoji: '🍕' },
  { id: 'panic', name: 'Panic Mode', emoji: '💀' },
  { id: 'chores', name: 'Dust & Dishes', emoji: '🧹' },
  { id: 'fun', name: 'Guilt-Free Fun', emoji: '🎮' },
];

export const FUNNY_PLACEHOLDERS = [
  'Doodle a task before you forget it...',
  'Pretend to work while typing aggressively...',
  'Drink water before you turn into dried papyrus...',
  'Stare at paper, pondering your life choices...',
  'Organize sticky notes instead of actual work...',
  'Do 1 productive thing to earn 4 hours of doomscrolling...',
  'Send that email currently fermenting in drafts...',
  'Feed the cat before it shreds your paperwork...',
];

export const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Drink water before you turn into dry parchment paper',
    priority: 'high',
    category: 'survival',
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'task-2',
    title: 'Pretend to understand taxes and 401(k) paperwork',
    priority: 'low',
    category: 'adulting',
    completed: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: 'task-3',
    title: 'Find this lovely handwritten paper to-do list 📌',
    priority: 'medium',
    category: 'fun',
    completed: true,
    createdAt: Date.now() - 10800000,
  },
];

// Returns a funny roast/quote based on completion progress
export const getMotivationalRoast = (total, completed) => {
  if (total === 0) {
    return {
      title: "CLEAN DESK, EMPTY SLATE! 📜",
      subtitle: "No sticky notes in sight. Zen master or profound denial?",
      mood: "Blank Paper 🕊️",
      color: "bg-[#E0F2FE]",
      accentBorder: "border-[#38BDF8]"
    };
  }

  const ratio = completed / total;

  if (ratio === 1) {
    return {
      title: "ALL STICKIES CHECKED OFF! 💮",
      subtitle: "Who gave you permission to be this outrageously productive?!",
      mood: "Gold Star Hero ⭐",
      color: "bg-[#DCFCE7]",
      accentBorder: "border-[#22C55E]"
    };
  }

  if (ratio >= 0.75) {
    return {
      title: "ALMOST CLEARED OFF THE DESK! 🏁",
      subtitle: "Just a few scribbles left. The victory nap awaits!",
      mood: "Speed Pen ✍️",
      color: "bg-[#FEF08A]",
      accentBorder: "border-[#EAB308]"
    };
  }

  if (ratio >= 0.4) {
    return {
      title: "HALFWAY THROUGH THE CHAOS! ☕",
      subtitle: "Solid proof of effort. Time to leave a coffee cup ring on the desk.",
      mood: "Coffee Powered ☕",
      color: "bg-[#FFEDD5]",
      accentBorder: "border-[#F97316]"
    };
  }

  if (completed > 0) {
    return {
      title: "INK ON PAPER: MOMENTUM DETECTED! 🐢",
      subtitle: "At least one sticky note conquered. Put a gold sticker on yourself.",
      mood: "Slow & Steady 🐌",
      color: "bg-[#FCE7F3]",
      accentBorder: "border-[#EC4899]"
    };
  }

  return {
    title: "DESK CHAOS: PROCRASTINATION PEAK 🥔",
    subtitle: "The sticky notes are multiplying while you stare blankly.",
    mood: "Paperweight Mode 🪨",
    color: "bg-[#FEE2E2]",
    accentBorder: "border-[#EF4444]"
  };
};
