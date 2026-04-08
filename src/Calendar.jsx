import React, { useState, useEffect } from 'react';
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays,
  isWithinInterval, isBefore, isAfter, startOfDay
} from 'date-fns';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Save, StickyNote, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Jan
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Feb
  "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Mar
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Apr (Spring/Flowers)
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // May
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Jun
  "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Jul
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Aug (Beach/Summer)
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Sep
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Oct (Autumn/Leaves)
  "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Nov
  "https://images.unsplash.com/photo-1544273677-c433136021d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"  // Dec (Snow/Winter)
];

const MONTH_THEMES = [
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

const HOLIDAYS_BY_MONTH_INDEX = {
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

const slideVariants = {
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

const pageFlipVariants = {
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

export default function Calendar() {
  // Core date state
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [direction, setDirection] = useState(1);

  const [notes, setNotes] = useState({});
  const [activeNoteText, setActiveNoteText] = useState('');

  const currentMonthIndex = currentDate.getMonth();

  // Dynamic Theme Switching based on Image!
  useEffect(() => {
    const root = document.documentElement;
    const themeParams = MONTH_THEMES[currentMonthIndex];
    Object.keys(themeParams).forEach(weight => {
      root.style.setProperty(`--color-primary-${weight}`, themeParams[weight]);
    });
  }, [currentMonthIndex]);

  // Determine if we show general note or range note
  const activeNoteKey = (startDate && endDate)
    ? `${format(startDate, 'yyyy-MM-dd')}_${format(endDate, 'yyyy-MM-dd')}`
    : (startDate ? format(startDate, 'yyyy-MM-dd') : 'general');

  const activeNoteTitle = (startDate && endDate)
    ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
    : (startDate ? format(startDate, 'MMMM d, yyyy') : 'General Month Memo');

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem('calendar_notes_db');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Keep note text input in sync with selected range
  useEffect(() => {
    setActiveNoteText(notes[activeNoteKey] || '');
  }, [activeNoteKey, notes]);

  // Save notes handler - merges current note draft with the persisted dictionary
  const handleSaveNote = () => {
    const newNotes = { ...notes, [activeNoteKey]: activeNoteText };
    setNotes(newNotes);
    localStorage.setItem('calendar_notes_db', JSON.stringify(newNotes));
  };

  const handleDeleteNote = () => {
    const newNotes = { ...notes };
    delete newNotes[activeNoteKey];
    setNotes(newNotes);
    setActiveNoteText('');
    localStorage.setItem('calendar_notes_db', JSON.stringify(newNotes));
  }

  const changeMonth = (dir) => {
    setDirection(dir);
    setCurrentDate(dir > 0 ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };

  const changeYear = (dir) => {
    setDirection(dir);
    setCurrentDate(dir > 0 ? addMonths(currentDate, 12) : subMonths(currentDate, 12));
  };

  // Complex logic for robust range selection (handles clicks for start, end, and resets)
  const handleDateClick = (day) => {
    const clickedDate = startOfDay(day);
    
    // Scenario 1: First click (no start date) OR third click (resetting an existing range)
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else {
      // Scenario 2: Clicking a date BEFORE the existing start date (swap them)
      if (isBefore(clickedDate, startDate)) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else if (isSameDay(clickedDate, startDate)) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  // Helper to visually flag the absolute start/end caps of a selection
  const isSelected = (day) => (startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate));

  // Checks if a cell falls within an established range, OR within a temporary hover preview range
  const isBetween = (day) => {
    if (startDate && endDate) {
      return isWithinInterval(day, { start: startDate, end: endDate });
    }
    // Live hover trail preview computation while moving the mouse
    if (startDate && hoverDate && !endDate) {
      const start = isBefore(hoverDate, startDate) ? hoverDate : startDate;
      const end = isBefore(hoverDate, startDate) ? startDate : hoverDate;
      return isWithinInterval(day, { start, end });
    }
    return false;
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDateGrid = startOfWeek(monthStart);
  const endDateGrid = endOfWeek(monthEnd);

  const formatHeader = () => {
    return (
      <div className="flex justify-between items-center px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur border-b border-slate-200 dark:border-slate-800 relative z-30">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-baseline gap-2 transition-colors duration-500">
          {format(currentDate, 'MMMM')} <span className="text-primary-500 text-lg font-medium">{format(currentDate, 'yyyy')}</span>
        </h2>
        <div className="flex gap-1 md:gap-2">
          <button onClick={() => changeYear(-1)} className="p-1 md:p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300" title="Previous Year">
            <ChevronsLeft size={20} />
          </button>
          <button onClick={() => changeMonth(-1)} className="p-1 md:p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300" title="Previous Month">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => changeMonth(1)} className="p-1 md:p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300" title="Next Month">
            <ChevronRight size={20} />
          </button>
          <button onClick={() => changeYear(1)} className="p-1 md:p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300" title="Next Year">
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderCells = () => {
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDateGrid;

    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
      <div key={i} className="text-xs font-bold text-slate-400 dark:text-slate-500 py-3 text-center tracking-widest">
        {d}
      </div>
    ));

    const todayHolildayMap = HOLIDAYS_BY_MONTH_INDEX[currentMonthIndex];

    while (day <= endDateGrid) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;

        const isCurrentMonth = isSameMonth(day, monthStart);
        const selected = isSelected(day);
        const inBetween = isBetween(day) && !selected;

        const isRangeStart = startDate && startDate.getTime() === day.getTime();
        const isRangeEnd = endDate && endDate.getTime() === day.getTime();

        const holiday = isCurrentMonth && todayHolildayMap ? todayHolildayMap[parseInt(formattedDate)] : null;

        days.push(
          <div
            key={day}
            className={`relative flex items-center justify-center p-1 cursor-pointer group`}
            onClick={() => handleDateClick(cloneDay)}
            onMouseEnter={() => setHoverDate(cloneDay)}
            onMouseLeave={() => setHoverDate(null)}
          >
            {(selected || inBetween) && (
              <div
                className={`absolute inset-y-1 bg-primary-100 dark:bg-primary-900/40 
                ${isRangeStart && endDate ? 'left-1/2 right-0 rounded-l-full' : ''} 
                ${isRangeEnd ? 'right-1/2 left-0 rounded-r-full' : ''} 
                ${inBetween ? 'inset-x-0' : ''}
                ${isRangeStart && hoverDate && !endDate && isBefore(cloneDay, hoverDate) ? 'left-1/2 right-0' : ''}
                ${isRangeStart && hoverDate && !endDate && isAfter(cloneDay, hoverDate) ? 'right-1/2 left-0' : ''}
                ${!endDate && typeof hoverDate !== 'undefined' && hoverDate && hoverDate.getTime() === day.getTime() && isAfter(cloneDay, startDate) ? 'right-1/2 left-0 rounded-r-full' : ''}
                ${!endDate && typeof hoverDate !== 'undefined' && hoverDate && hoverDate.getTime() === day.getTime() && isBefore(cloneDay, startDate) ? 'left-1/2 right-0 rounded-l-full' : ''}
                transition-all duration-200 z-0`}
              />
            )}

            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all duration-300 font-medium text-sm
                ${selected
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40 scale-110'
                  : inBetween
                    ? 'text-primary-800 dark:text-primary-200'
                    : isCurrentMonth
                      ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      : 'text-slate-300 dark:text-slate-600'}
              `}
            >
              <span className={isSameDay(day, new Date()) && !selected ? "text-primary-500 font-bold underline underline-offset-4" : ""}>
                {formattedDate}
              </span>
            </div>

            {startDate && !endDate && hoverDate && isSameDay(day, hoverDate) && day.getTime() !== startDate.getTime() && (
              <div className="absolute w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-800/60 z-0 animate-pulse"></div>
            )}

            {/* Awesome Holiday Marker Tooltip */}
            {holiday && (
              <div className="absolute top-0 right-0 p-1 group/holiday z-20 hover:scale-125 transition-transform cursor-help">
                <span className="text-[14px] drop-shadow-md">{holiday.icon}</span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/holiday:block bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 dark:border-slate-200 pointer-events-none origin-bottom animate-in zoom-in-75 duration-200">
                  {holiday.title}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800 dark:border-t-white"></div>
                </div>
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-y-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="p-4 flex-1 flex flex-col bg-white dark:bg-slate-900 border-x border-b border-slate-200 dark:border-slate-800 rounded-b-xl md:rounded-bl-none md:rounded-br-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] z-20">
        <div className="grid grid-cols-7 mb-2 border-b border-slate-100 dark:border-slate-800/50 pb-2">
          {weekDays}
        </div>
        <div className="flex-1 flex flex-col justify-around relative perspective-1000">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentDate.toISOString()}
              custom={direction}
              variants={pageFlipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex-1 flex flex-col justify-around bg-white dark:bg-slate-900"
            >
              {rows}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-transparent rounded-2xl overflow-visible drop-shadow-2xl font-sans relative perspective-1000">

      {/* Decorative metal binders simulating physical calendar */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-800 dark:to-slate-700 z-50 flex justify-evenly items-center drop-shadow-sm border-b border-slate-300 dark:border-slate-900">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-6 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 dark:from-slate-600 dark:via-slate-400 dark:to-slate-700 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4)] -mt-2"></div>
        ))}
      </div>

      <div className="w-full md:w-[35%] flex flex-col bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-l-2xl z-20 hidden md:flex pt-4 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.4)]">
        <div className="p-6 md:p-8 flex flex-col h-full mt-4">
          <div className="flex items-center gap-3 text-primary-500 mb-6 transition-colors duration-500">
            <StickyNote size={24} />
            <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Quick Notes</h3>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex-1 flex flex-col relative overflow-hidden group">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs font-semibold rounded-full mb-4 w-max border border-primary-100 dark:border-primary-800/50 transition-colors duration-500">
              {activeNoteTitle}
            </div>

            <textarea
              value={activeNoteText}
              onChange={(e) => setActiveNoteText(e.target.value)}
              placeholder="Jot down notes, meetings, or holidays for this period..."
              className="flex-1 w-full resize-none bg-transparent focus:outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 leading-relaxed custom-scrollbar"
            ></textarea>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleDeleteNote}
                disabled={!activeNoteText && !notes[activeNoteKey]}
                className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Clear Note"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={handleSaveNote}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-md shadow-primary-500/20 transition-all font-medium text-sm active:scale-95 duration-500"
              >
                <Save size={16} /> Save Memo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-white dark:bg-slate-900 overflow-hidden md:rounded-r-2xl pt-4 shadow-xl z-10 transition-colors duration-500">

        <div className="h-48 sm:h-64 md:h-72 w-full relative overflow-hidden bg-slate-200 dark:bg-slate-800 z-10">
          {/* The slant divider with correctly properly formatted camelCase clipPath */}
          <div className="absolute bottom-0 left-0 right-0 h-16  dark:bg-primary-500 bg-primary-500 z-20 transition-colors duration-500" style={{ clipPath: 'polygon(0 100%, 70% 100%, 0 0px, 0px 100%)' }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-16  z-10 transition-colors duration-500" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }}></div>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentDate.toISOString()}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 z-0 origin-center"
            >
              <img
                src={MONTH_IMAGES[currentMonthIndex]}
                alt={`${format(currentDate, 'MMMM')} background`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              <div className="absolute bottom-6 right-8 text-right text-white z-30 drop-shadow-md transition-colors duration-500">
                <div className="text-xl md:text-2xl font-light opacity-90">{format(currentDate, 'yyyy')}</div>
                <div className="text-3xl md:text-5xl font-black uppercase tracking-wider">{format(currentDate, 'MMMM')}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col relative z-20">
          {formatHeader()}
          {renderCells()}
        </div>
      </div>

      <div className="md:hidden w-full bg-slate-50 dark:bg-slate-950 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-2xl p-5 shadow-xl transition-colors duration-500 z-10">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <StickyNote size={18} className="text-primary-500 transition-colors duration-500" />
            Notes
          </h3>
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-full transition-colors duration-500">{activeNoteTitle}</span>
        </div>
        <textarea
          value={activeNoteText}
          onChange={(e) => setActiveNoteText(e.target.value)}
          placeholder="Jot down notes..."
          className="w-full h-24 resize-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 text-slate-700 dark:text-slate-300"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={handleDeleteNote} className="p-2 text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-slate-800 rounded-lg"><Trash2 size={16} /></button>
          <button onClick={handleSaveNote} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors duration-500">Save</button>
        </div>
      </div>

    </div>
  );
}
