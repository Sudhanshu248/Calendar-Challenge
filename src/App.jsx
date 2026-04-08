import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-2 sm:p-6 lg:p-10 transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 rounded-full bg-primary-200 dark:bg-primary-900 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-20 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-sky-200 dark:bg-sky-900 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Theme Toggle Button */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-white/70 dark:bg-slate-800/70 border border-white/20 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 text-slate-700 dark:text-slate-200 hover:scale-110 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
        aria-label="Toggle Theme"
      >
        {darkMode ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} className="text-primary-600" />}
      </button>

      <div className="w-full max-w-[1100px] z-10 relative perspective-1000">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
