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
      {/* Quick Stats Box */}
      <div className="bg-white neo-border neo-shadow-lg rounded-2xl p-5">
        <h3 className="text-base font-black uppercase tracking-wider text-black mb-4 flex items-center justify-between font-funky">
          <span>📊 Chaos Metrics</span>
          <span className="text-xs bg-[#FFE600] px-2 py-0.5 rounded-md neo-border">
            LIVE STATS
          </span>
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#00F0FF] p-3 rounded-xl neo-border text-center">
            <span className="block text-2xl font-black">{activeTasks.length}</span>
            <span className="text-xs font-bold uppercase text-black/85">Still Suffering ⏳</span>
          </div>

          <div className="bg-[#00FF66] p-3 rounded-xl neo-border text-center">
            <span className="block text-2xl font-black">{completedTasks.length}</span>
            <span className="text-xs font-bold uppercase text-black/85">Conquered 🏆</span>
          </div>
        </div>

        {emergencyTasks.length > 0 && (
          <div className="bg-[#FF3366] text-white p-3 rounded-xl neo-border mb-4 flex items-center justify-between text-xs font-black animate-pulse">
            <div className="flex items-center gap-1.5">
              <Flame size={18} className="fill-yellow-300 stroke-black text-yellow-300" />
              <span>{emergencyTasks.length} HOLY GUACAMOLE ALERTS!</span>
            </div>
            <span className="bg-black text-[#FFE600] px-1.5 py-0.5 rounded">DO IT NOW</span>
          </div>
        )}

        {/* Funky Fate Wheel / Randomizer Button */}
        <div className="pt-2 border-t-2 border-dashed border-zinc-300 space-y-3">
          <button
            type="button"
            onClick={handlePickRandom}
            disabled={activeTasks.length === 0 || isSpinning}
            className={`w-full neo-btn py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 uppercase tracking-wider ${
              activeTasks.length > 0
                ? 'bg-[#FFE600] text-black hover:bg-yellow-300'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed border-zinc-400 shadow-none'
            }`}
          >
            <Dices size={20} className={isSpinning ? 'animate-spin' : ''} />
            <span>{isSpinning ? 'Consulting The Stars... 🔮' : 'Pick For Me (Fate Wheel) 🎲'}</span>
          </button>

          {/* Random Choice Callout Modal */}
          {randomTask && (
            <div className="bg-[#FFE600] neo-border rounded-xl p-3.5 relative animate-pop">
              <button
                onClick={() => setRandomTask(null)}
                className="absolute top-2 right-2 p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X size={14} />
              </button>
              <div className="text-[11px] font-black uppercase text-black/70 mb-1">
                ⭐ DESTINY HAS SPOKEN:
              </div>
              <p className="font-black text-sm text-black leading-tight">
                "{randomTask.title}"
              </p>
              <div className="mt-2 text-[10px] font-bold text-black/80">
                Stop scrolling and get on it! 🫡
              </div>
            </div>
          )}

          {/* Action Buttons: Clear Completed & Reset Presets */}
          <div className="flex flex-col gap-2 pt-2">
            {completedTasks.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playYeet();
                  onClearCompleted();
                }}
                className="w-full py-2 px-3 rounded-lg border-2 border-black bg-zinc-100 hover:bg-red-100 text-xs font-bold text-zinc-800 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Trash2 size={14} />
                <span>Sweep {completedTasks.length} Completed Tasks 🧹</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playClick();
                onResetPresets();
              }}
              className="w-full py-1.5 px-3 rounded-lg border border-zinc-300 hover:border-black bg-white text-[11px] font-bold text-zinc-600 hover:text-black flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw size={12} />
              <span>Load Funny Starter Tasks 🎪</span>
            </button>
          </div>
        </div>
      </div>

      {/* Funny Procrastination Survival Tips Box */}
      <div className="bg-[#A688FA] neo-border neo-shadow rounded-2xl p-4 text-black">
        <h4 className="font-black text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>🧠 Procrastinator Wisdom</span>
        </h4>
        <p className="text-xs font-semibold leading-relaxed">
          "If you wait until the last minute, it only takes a minute to do."
        </p>
        <div className="mt-2 text-[10px] font-black uppercase text-black/70">
          — Anonymous Genius (Probably playing games right now)
        </div>
      </div>
    </aside>
  );
};

export default TaskStats;
