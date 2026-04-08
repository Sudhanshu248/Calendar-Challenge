import React from 'react';
import { StickyNote, Save, Trash2 } from 'lucide-react';

/**
 * Presentational Component: CalendarSidebar
 * Renders the Quick Notes sidebar and the mobile notes layout.
 * Controlled form tying into the local storage mechanism.
 * 
 * @param {boolean} isMobile - Re-renders the layout conditionally based on Tailwind breakpoints
 */

export default function CalendarSidebar({ 
  activeNoteTitle, 
  activeNoteText, 
  setActiveNoteText, 
  handleSaveNote, 
  handleDeleteNote, 
  notes, 
  activeNoteKey, 
  isMobile 
}) {
  if (isMobile) {
    return (
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
          <button 
            onClick={handleDeleteNote} 
            disabled={!activeNoteText && !notes[activeNoteKey]}
            className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Trash2 size={16} />
          </button>
          
          <button onClick={handleSaveNote} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors duration-500">
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
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
  );
}
