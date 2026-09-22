import React, { useState } from 'react';
import { Dices, Trash2, Flame, RefreshCw, X } from 'lucide-react';
import { playClick, playYeet, playSuccess } from '../utils/audio';

const TaskStats = ({
  tasks,
  onClearCompleted,
  onResetPresets,
  onHighlightTask,
}) => {
  const [randomTask, setRandomTask] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const emergencyTasks = activeTasks.filter((t) => t.priority === 'high');

  const handlePickRandom = () => {
    if (activeTasks.length === 0) return;
    playClick();
    setIsSpinning(true);

    let count = 0;
    const interval = setInterval(() => {
      const tempPick = activeTasks[Math.floor(Math.random() * activeTasks.length)];
      setRandomTask(tempPick);
      count++;
      if (count > 8) {
        clearInterval(interval);
        const finalPick = activeTasks[Math.floor(Math.random() * activeTasks.length)];
        setRandomTask(finalPick);
        setIsSpinning(false);
        playSuccess();
        if (onHighlightTask) onHighlightTask(finalPick.id);
      }
    }, 100);
  };

  return (
    <aside className="space-y-6">
      {/* Quick Stats Sheet */}
      <div className="paper-sheet rounded-2xl p-5 bg-[#FFFDF9] relative">
        {/* Pushpin at top */}
        <div className="absolute -top-3.5 right-6 text-xl pointer-events-none select-none filter drop-shadow-sm">
          📌
        </div>

        <h3 className="text-xl font-bold uppercase tracking-wide text-[#2D241E] mb-4 flex items-center justify-between font-hand">
          <span>📊 Desk Ledger</span>
          <span className="text-xs bg-[#FEF08A] text-[#854D0E] px-2.5 py-0.5 rounded-md border border-[#2D241E] font-hand">
            LIVE TALLY
          </span>
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#E0F2FE] p-3 rounded-xl border-2 border-[#2D241E] text-center shadow-[2px_2px_0px_#2D241E]">
            <span className="block text-2xl font-bold font-hand text-[#0369A1]">{activeTasks.length}</span>
            <span className="text-xs font-bold uppercase text-[#0C4A6E] font-hand">Still Due ⏳</span>
          </div>

          <div className="bg-[#DCFCE7] p-3 rounded-xl border-2 border-[#2D241E] text-center shadow-[2px_2px_0px_#2D241E]">
            <span className="block text-2xl font-bold font-hand text-[#15803D]">{completedTasks.length}</span>
            <span className="text-xs font-bold uppercase text-[#14532D] font-hand">Crossed Off 🏆</span>
          </div>
        </div>

        {emergencyTasks.length > 0 && (
          <div className="bg-[#FFEDD5] text-[#9A3412] p-3 rounded-xl border-2 border-[#EA580C] mb-4 flex items-center justify-between text-xs font-bold shadow-[2px_2px_0px_#EA580C]">
            <div className="flex items-center gap-1.5 font-hand text-sm">
              <Flame size={16} className="text-[#EA580C]" />
              <span>{emergencyTasks.length} HOLY GUACAMOLE ALERTS!</span>
            </div>
            <span className="bg-[#EA580C] text-white px-2 py-0.5 rounded text-[11px] font-hand">
              DO FIRST
            </span>
          </div>
        )}

        {/* Paper Fate Wheel / Randomizer Button */}
        <div className="pt-2 border-t-2 border-dashed border-[#E5DFD5] space-y-3">
          <button
            type="button"
            onClick={handlePickRandom}
            disabled={activeTasks.length === 0 || isSpinning}
            className={`w-full paper-btn py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 uppercase tracking-wide font-hand ${
              activeTasks.length > 0
                ? 'bg-[#FEF08A] text-[#2D241E] hover:bg-[#fef9c3]'
                : 'bg-[#EAE4D9] text-[#A89D91] cursor-not-allowed border-[#C8BEB2] shadow-none'
            }`}
          >
            <Dices size={18} className={isSpinning ? 'animate-spin' : ''} />
            <span className="text-base">{isSpinning ? 'Rolling Paper Dice... 🎲' : 'Fate Picker (Can\'t Decide?) 🎲'}</span>
          </button>

          {/* Random Choice Callout Sticky Note */}
          {randomTask && (
            <div className="bg-[#FEF08A] border-2 border-[#2D241E] rounded-xl p-3.5 relative paper-shadow animate-pop">
              <button
                onClick={() => setRandomTask(null)}
                className="absolute top-2 right-2 p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X size={14} />
              </button>
              <div className="text-[11px] font-bold uppercase text-[#854D0E] mb-1 font-hand">
                ⭐ DESTINY HAS CHOSEN THIS STICKY:
              </div>
              <p className="font-bold text-base text-[#2D241E] leading-tight font-cursive">
                "{randomTask.title}"
              </p>
              <div className="mt-2 text-[11px] font-bold text-[#713F12] font-hand">
                Grab your pen and conquer it! 🫡
              </div>
            </div>
          )}

          {/* Action Buttons: Sweep Completed & Reset Presets */}
          <div className="flex flex-col gap-2 pt-2">
            {completedTasks.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playYeet();
                  onClearCompleted();
                }}
                className="w-full py-2 px-3 rounded-lg border-2 border-[#2D241E] bg-[#FBF7EE] hover:bg-[#FEE2E2] text-xs font-bold text-[#2D241E] flex items-center justify-center gap-2 cursor-pointer transition-colors font-hand text-sm"
              >
                <Trash2 size={14} />
                <span>Sweep {completedTasks.length} Checked Stickies 🧹</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playClick();
                onResetPresets();
              }}
              className="w-full py-1.5 px-3 rounded-lg border border-[#D5CBBF] hover:border-[#2D241E] bg-[#FFFDF9] text-xs font-bold text-[#6B5E51] hover:text-[#2D241E] flex items-center justify-center gap-1.5 cursor-pointer transition-colors font-hand"
            >
              <RefreshCw size={12} />
              <span>Load Funny Starter Stickies 🎪</span>
            </button>
          </div>
        </div>
      </div>

      {/* Procrastination Wisdom Yellow Post-it Note */}
      <div className="bg-[#FEF9C3] border-2 border-[#2D241E] paper-shadow rounded-2xl p-4 text-[#2D241E] relative">
        <div className="washi-tape washi-tape-pink w-20" />
        <h4 className="font-bold text-sm uppercase tracking-wide mb-1 flex items-center gap-1.5 font-hand text-[#854D0E]">
          <span>🧠 Sticky Note Wisdom</span>
        </h4>
        <p className="text-base font-semibold leading-snug font-cursive text-[#422006]">
          "If you wait until the last minute, it only takes a minute to do."
        </p>
        <div className="mt-1 text-[11px] font-bold uppercase text-[#713F12] font-hand">
          — Anonymous Doodle Artist (Procrastinating right now)
        </div>
      </div>
    </aside>
  );
};

export default TaskStats;
