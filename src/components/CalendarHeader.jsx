import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * Presentational Component: CalendarHeader
 * Renders the top navigation bar of the calendar grid.
 * Displays the current Month and Year and provides 4 button controls 
 * for jumping forwards and backwards by months or entire years.
 */

export default function CalendarHeader({ currentDate, changeMonth, changeYear }) {
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
}
