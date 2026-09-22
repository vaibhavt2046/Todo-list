import React from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Zap } from 'lucide-react';
import { getMotivationalRoast } from '../utils/roasts';

const Navbar = ({ totalTasks, completedTasks, isMuted, onToggleMute }) => {
  const roast = getMotivationalRoast(totalTasks, completedTasks);
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className="w-full mb-8">
      {/* Top Banner with Logo and Sound Toggle */}
      <div className="bg-[#FFFFFF] neo-border neo-shadow-lg rounded-2xl p-4 sm:p-6 mb-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF007A] text-white rounded-xl neo-border flex items-center justify-center text-2xl sm:text-3xl font-black shadow-[2px_2px_0px_#000] rotate-[-4deg] hover:rotate-6 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black flex items-center gap-2 font-funky">
                TASK CHAOS 
              </h1>
              <span className="hidden sm:inline-block bg-[#00F0FF] text-black text-xs font-black uppercase px-2 py-0.5 rounded-full neo-border rotate-3">
                vFUNKY.99
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-zinc-600">
              The only To-Do list that respects your procrastination rights.
            </p>
          </div>
        </div>

        {/* Audio Mute & Fun Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute funny 8-bit sound effects' : 'Mute sound effects'}
            className={`neo-btn px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm ${
              isMuted ? 'bg-zinc-200 text-zinc-700' : 'bg-[#00FF66] text-black'
            }`}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-bounce" />}
            <span>{isMuted ? 'Muted 🔇' : 'SFX Active 🔊'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Motivational Roast & Mood Card */}
      <div className={`${roast.color} neo-border neo-shadow rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300`}>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-white neo-border p-2.5 rounded-xl text-xl sm:text-2xl shrink-0 rotate-2">
            {completedTasks === totalTasks && totalTasks > 0 ? '🏆' : totalTasks === 0 ? '😎' : '🎯'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase bg-black text-white px-2 py-0.5 rounded-md tracking-wider">
                MOOD: {roast.mood}
              </span>
              <span className="text-xs font-black bg-white neo-border px-2 py-0.5 rounded-md">
                {progressPercent}% Complete
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-black mt-1 font-funky">
              {roast.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-black/80">
              {roast.subtitle}
            </p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full sm:w-64 bg-white neo-border rounded-xl p-2 shrink-0">
          <div className="flex justify-between text-xs font-black mb-1">
            <span>Progress Meter</span>
            <span>{completedTasks} / {totalTasks} Done</span>
          </div>
          <div className="w-full h-4 bg-zinc-200 rounded-lg neo-border overflow-hidden p-0.5 relative">
            <div
              className="h-full bg-[#FF007A] rounded-md transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
