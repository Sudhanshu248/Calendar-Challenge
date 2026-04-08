// Arrays of specific Unsplash image URLs mapping 0-11 to Jan-Dec
export const MONTH_IMAGES = [
  "/Jan.png", // Jan
  "/Feb.png", // Feb
  "/March.png", // Mar
  "/April.png", // Apr (Spring/Flowers)
  "/May.png", // May
  "/June.png", // Jun
  "/July.png", // Jul
  "/August.png", // Aug (Beach/Summer)
  "/Sept.png", // Sep
  "/Oct.png", // Oct (Autumn/Leaves)
  "/Nov.png", // Nov
  "/Dec.png"  // Dec (Snow/Winter)
];

// Distinct color palettes mapping 0-11 for dynamic Tailwind variable injection
export const MONTH_THEMES = [
  { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 800: '#1e40af', 900: '#1e3a8a' }, // Jan Blue
  { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 800: '#9d174d', 900: '#831843' }, // Feb Pink
  { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 800: '#065f46', 900: '#064e3b' }, // Mar Emerald
  { 50: '#fef3c7', 100: '#fde68a', 200: '#fcd34d', 300: '#fbbf24', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 800: '#92400e', 900: '#78350f' }, // Apr Amber
  { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 800: '#5b21b6', 900: '#4c1d95' }, // May Violet
  { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 800: '#991b1b', 900: '#7f1d1d' }, // Jun Red
  { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 800: '#075985', 900: '#0c4a6e' }, // Jul Sky
  { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 800: '#9a3412', 900: '#7c2d12' }, // Aug Orange
  { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 800: '#3730a3', 900: '#312e81' }, // Sep Indigo
  { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 800: '#115e59', 900: '#134e4a' }, // Oct Teal
  { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 800: '#854d0e', 900: '#713f12' }, // Nov Yellow
  { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 800: '#155e75', 900: '#164e63' }  // Dec Cyan
];

// Map associating Month Index (0-11) -> Objects mapped by Day Number (1-31) containing holiday data
export const HOLIDAYS_BY_MONTH_INDEX = {
  0: { 1: { title: "New Year's Day", icon: "✨" }, 15: { title: "Makar Sankranti", icon: "🪁" }, 26: { title: "Republic Day", icon: "🇮🇳" } },
  1: { 14: { title: "Vasant Panchami", icon: "🌼" } },
  2: { 8: { title: "Maha Shivaratri", icon: "🕉️" }, 25: { title: "Holi", icon: "🎨" } },
  3: { 14: { title: "Ambedkar Jayanti", icon: "⚖️" }, 17: { title: "Ram Navami", icon: "🏹" } },
  4: { 1: { title: "Labour Day", icon: "🛠️" }, 23: { title: "Buddha Purnima", icon: "🌕" } },
  5: { 17: { title: "Eid al-Adha", icon: "🌙" } },
  6: { 17: { title: "Muharram", icon: "🕌" } },
  7: { 15: { title: "Independence Day", icon: "🇮🇳" }, 19: { title: "Raksha Bandhan", icon: "🧵" }, 26: { title: "Janmashtami", icon: "🦚" } },
  8: { 7: { title: "Ganesh Chaturthi", icon: "🐘" } },
  9: { 2: { title: "Gandhi Jayanti", icon: "🕊️" }, 12: { title: "Dussehra", icon: "🏹" }, 31: { title: "Diwali", icon: "🪔" } },
  10: { 1: { title: "Haryana Day", icon: "🌾" }, 15: { title: "Guru Nanak Jayanti", icon: "ੴ" } },
  11: { 25: { title: "Christmas Day", icon: "🎄" } }
};

// Framer Motion variant for sliding the Hero image horizontally
export const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    rotateY: direction > 0 ? 45 : -45,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.6, type: 'spring', bounce: 0.25 }
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    rotateY: direction < 0 ? -45 : 45,
    scale: 0.9,
    transition: { duration: 0.4 }
  })
};

// Framer Motion variant for flipping the UI calendar grid in 3D
export const pageFlipVariants = {
  enter: (direction) => ({
    rotateX: direction > 0 ? -45 : 45,
    opacity: 0.5,
    transformOrigin: "top"
  }),
  center: {
    rotateX: 0,
    opacity: 1,
    transformOrigin: "top",
    transition: { duration: 0.5, type: 'spring', bounce: 0.1 }
  },
  exit: (direction) => ({
    rotateX: direction < 0 ? -45 : 45,
    opacity: 0.5,
    transformOrigin: "top",
    transition: { duration: 0.3 }
  })
};
