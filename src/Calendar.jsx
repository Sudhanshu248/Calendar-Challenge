import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, isSameDay, isWithinInterval, isBefore, startOfDay } from 'date-fns';
import { MONTH_THEMES } from './calendarData';
import CalendarHeader from './components/CalendarHeader';
import CalendarHero from './components/CalendarHero';
import CalendarGrid from './components/CalendarGrid';
import CalendarSidebar from './components/CalendarSidebar';

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

  // Prepare props dynamically for sidebar variants
  const sidebarProps = {
    activeNoteTitle,
    activeNoteText,
    setActiveNoteText,
    handleSaveNote,
    handleDeleteNote,
    notes,
    activeNoteKey
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-transparent rounded-2xl overflow-visible drop-shadow-2xl font-sans relative perspective-1000">

      {/* Decorative metal binders simulating physical calendar */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-800 dark:to-slate-700 z-50 flex justify-evenly items-center drop-shadow-sm border-b border-slate-300 dark:border-slate-900">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-6 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 dark:from-slate-600 dark:via-slate-400 dark:to-slate-700 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4)] -mt-2"></div>
        ))}
      </div>

      <CalendarSidebar {...sidebarProps} isMobile={false} />

      <div className="flex-1 flex flex-col relative bg-white dark:bg-slate-900 overflow-hidden md:rounded-r-2xl pt-4 shadow-xl z-10 transition-colors duration-500">
        
        <CalendarHero 
          currentDate={currentDate} 
          direction={direction} 
          currentMonthIndex={currentMonthIndex} 
        />

        <div className="flex-1 flex flex-col relative z-20">
          <CalendarHeader 
            currentDate={currentDate} 
            changeMonth={changeMonth} 
            changeYear={changeYear} 
          />
        
          <CalendarGrid 
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            direction={direction}
            currentMonthIndex={currentMonthIndex}
            handleDateClick={handleDateClick}
            setHoverDate={setHoverDate}
            isSelected={isSelected}
            isBetween={isBetween}
          />
        </div>
      </div>

      <CalendarSidebar {...sidebarProps} isMobile={true} />

    </div>
  );
}
