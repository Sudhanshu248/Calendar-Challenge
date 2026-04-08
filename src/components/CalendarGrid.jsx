import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, isBefore, isAfter } from 'date-fns';
import { HOLIDAYS_BY_MONTH_INDEX, pageFlipVariants } from '../calendarData';

/**
 * Presentational Component: CalendarGrid
 * Generates the intricate grid of dates for the currently selected month.
 * Computes rendering logic for hover trails, range intervals, and holiday markers.
 */

export default function CalendarGrid({ 
  currentDate, 
  startDate, 
  endDate, 
  hoverDate, 
  direction, 
  currentMonthIndex,
  handleDateClick, 
  setHoverDate,
  isSelected,
  isBetween
}) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDateGrid = startOfWeek(monthStart);
  const endDateGrid = endOfWeek(monthEnd);

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
}
