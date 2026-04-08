import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { MONTH_IMAGES, slideVariants } from '../calendarData';

/**
 * Presentational Component: CalendarHero
 * Renders the top image banner of the calendar depending on the current month.
 * Handing Framer Motion transitions whenever the month slides perfectly.
 */

export default function CalendarHero({ currentDate, direction, currentMonthIndex }) {
  return (
    <div className="h-48 sm:h-64 md:h-72 w-full relative overflow-hidden bg-slate-200 dark:bg-slate-800 z-10">
      {/* The slant dividers */}
      <div className="absolute bottom-0 left-0 right-0 h-16 dark:bg-primary-500 bg-primary-500 z-20 transition-colors duration-500" style={{ clipPath: 'polygon(0 100%, 70% 100%, 0 0px, 0px 100%)' }}></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 z-10 transition-colors duration-500" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }}></div>

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
  );
}
