import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getMotivationalRoast } from '../utils/roasts';

const Navbar = ({ totalTasks, completedTasks, isMuted, onToggleMute }) => {
  const roast = getMotivationalRoast(totalTasks, completedTasks);
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className="w-full mb-8">
      {/* Top Paper Card with Logo & Paperclip */}
      <div className="paper-sheet-lg rounded-2xl p-4 sm:p-6 mb-5 flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Paper clip decoration */}
        <div className="absolute -top-3.5 left-8 text-2xl filter drop-shadow-sm select-none pointer-events-none">
          📎
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FEF08A] text-[#2D241E] rounded-xl border-2 border-[#2D241E] flex items-center justify-center text-2xl sm:text-3xl font-black shadow-[2px_3px_0px_#2D241E] rotate-[-3deg] hover:rotate-6 transition-transform">
            📝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D241E] flex items-center gap-2 font-hand">
                TASK CHAOS
              </h1>
              <span className="bg-[#FEF08A] text-[#854D0E] text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border-2 border-[#2D241E] rotate-2 font-hand">
                vPAPER.99 📌
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#6B5E51] font-hand text-base">
              The scribbled To-Do list that respects your procrastination rights.
            </p>
          </div>
        </div>

        {/* Sound Toggle as Stamped Paper Tag */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute funny 8-bit sound effects' : 'Mute sound effects'}
            className={`paper-btn px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-xs sm:text-sm font-hand ${
              isMuted
                ? 'bg-[#E5DFD5] text-[#786E64]'
                : 'bg-[#DCFCE7] text-[#166534]'
            }`}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-bounce" />}
            <span className="text-sm">{isMuted ? 'Muted 🔇' : 'SFX Active 🔊'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Sticky Note Roast Card with Washi Tape */}
      <div className={`paper-sheet rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 relative ${roast.color}`}>
        {/* Washi Tape strip across the top */}
        <div className="washi-tape w-28 sm:w-36" />

        <div className="flex items-center gap-3 w-full sm:w-auto mt-1 sm:mt-0">
          <div className="bg-[#FFFDF9] border-2 border-[#2D241E] p-2.5 rounded-xl text-xl sm:text-2xl shrink-0 shadow-[2px_2px_0px_#2D241E] rotate-2">
            {completedTasks === totalTasks && totalTasks > 0 ? '🏆' : totalTasks === 0 ? '☕' : '✍️'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase bg-[#2D241E] text-[#FFFDF9] px-2 py-0.5 rounded-md tracking-wider font-hand">
                STICKY: {roast.mood}
              </span>
              <span className="text-xs font-bold bg-[#FFFDF9] border border-[#2D241E] px-2 py-0.5 rounded-md font-hand">
                {progressPercent}% Cleared
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D241E] mt-0.5 font-hand">
              {roast.title}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-[#4A3E34]">
              {roast.subtitle}
            </p>
          </div>
        </div>

        {/* Ruler / Notebook Progress Meter */}
        <div className="w-full sm:w-64 bg-[#FFFDF9] border-2 border-[#2D241E] rounded-xl p-2.5 shrink-0 shadow-[2px_2px_0px_#2D241E]">
          <div className="flex justify-between text-xs font-bold mb-1 font-hand text-[#2D241E]">
            <span>📏 Pencil Progress</span>
            <span>{completedTasks} / {totalTasks} Checked</span>
          </div>
          <div className="w-full h-3.5 bg-[#EFE8DC] rounded-md border border-[#2D241E] overflow-hidden p-0.5 relative">
            <div
              className="h-full bg-[#EA580C] rounded-sm transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
