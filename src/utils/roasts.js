// Funky Roasts, Funny Quotes, and Humorous Task Helpers

export const PRIORITIES = {
  high: {
    id: 'high',
    label: 'HOLY GUACAMOLE! 🔥',
    shortLabel: 'EMERGENCY',
    emoji: '🌶️',
    bg: 'bg-[#FF3366]',
    text: 'text-white',
    border: 'border-black',
    badgeClass: 'bg-[#FF3366] text-white border-2 border-black animate-pulse',
    description: 'Do it now or the sky falls down',
  },
  medium: {
    id: 'medium',
    label: 'WHENEVER, JUST DO IT ⚡',
    shortLabel: 'IMPORTANT',
    emoji: '⚡',
    bg: 'bg-[#FFE600]',
    text: 'text-black',
    border: 'border-black',
    badgeClass: 'bg-[#FFE600] text-black border-2 border-black',
    description: 'Definitely today... probably',
  },
  low: {
    id: 'low',
    label: 'TOMORROW... MAYBE 🦥',
    shortLabel: 'CHILL',
    emoji: '🦥',
    bg: 'bg-[#A688FA]',
    text: 'text-black',
    border: 'border-black',
    badgeClass: 'bg-[#A688FA] text-black border-2 border-black',
    description: 'Future You can handle this burden',
  },
};

export const CATEGORIES = [
  { id: 'all', name: 'Everything Chaos', emoji: '🌀' },
  { id: 'adulting', name: 'Adulting Pain', emoji: '💼' },
  { id: 'survival', name: 'Snacks & Water', emoji: '🍕' },
  { id: 'panic', name: 'Panic Mode', emoji: '💀' },
  { id: 'chores', name: 'Dust & Dishes', emoji: '🧹' },
  { id: 'fun', name: 'Guilt-Free Fun', emoji: '🎮' },
];

export const FUNNY_PLACEHOLDERS = [
  'Pretend to work while typing aggressively...',
  'Drink water before you turn into a dried raisin...',
  'Stare at screen, pondering your life choices...',
  'Explain why this bug is actually a cool feature...',
  'Organize desktop icons instead of actual work...',
  'Do 1 productive thing to earn 4 hours of YouTube...',
  'Send that email you drafted 3 weeks ago...',
  'Feed the cat before it plots your demise...',
];

export const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Drink a glass of water before you turn into beef jerky',
    priority: 'high',
    category: 'survival',
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'task-2',
    title: 'Pretend to understand how taxes actually work',
    priority: 'low',
    category: 'adulting',
    completed: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: 'task-3',
    title: 'Celebrate finding this magnificent funky To-Do list 🎉',
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
      title: "ZERO RESPONSIBILITIES! 🎉",
      subtitle: "Either you're a zen master or in deep, deep denial.",
      mood: "Zen Sloth 🦥",
      color: "bg-[#00F0FF]"
    };
  }

  const ratio = completed / total;

  if (ratio === 1) {
    return {
      title: "WAIT, YOU ACTUALLY FINISHED?! 🏆",
      subtitle: "Who are you and what have you done with the procrastinator?!",
      mood: "Absolute God Mode ⚡",
      color: "bg-[#00FF66]"
    };
  }

  if (ratio >= 0.75) {
    return {
      title: "ALMOST AT THE FINISH LINE! 🏁",
      subtitle: "Don't stop now, the victory nap is waiting for you.",
      mood: "Sprint Champion 🏃💨",
      color: "bg-[#FFE600]"
    };
  }

  if (ratio >= 0.4) {
    return {
      title: "HALFWAY THROUGH THE CHAOS! ⚖️",
      subtitle: "Legitimate excuse to reward yourself with a snack.",
      mood: "Mildly Functional ☕",
      color: "bg-[#FF9900]"
    };
  }

  if (completed > 0) {
    return {
      title: "MOMENTUM DETECTED! 🐢",
      subtitle: "You did at least one thing. That counts as an Olympic triumph.",
      mood: "Baby Steps Hustler 🐣",
      color: "bg-[#FF007A]"
    };
  }

  return {
    title: "PROCRASTINATION LEVEL: MAXIMUM 🥔",
    subtitle: "Tasks are currently winning the war against your free will.",
    mood: "Couch Potato King 👑",
    color: "bg-[#FF3366]"
  };
};
