import React, { useState, useEffect } from 'react';
import { PlusCircle, Flame, Zap, Clock, Tag } from 'lucide-react';
import { PRIORITIES, CATEGORIES, FUNNY_PLACEHOLDERS } from '../utils/roasts';
import { playPop, playClick } from '../utils/audio';

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('adulting');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Cycle funny placeholders periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % FUNNY_PLACEHOLDERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      priority,
      category,
    });

    playPop();
    setTitle('');
  };

  return (
    <section className="bg-white neo-border neo-shadow-lg rounded-2xl p-5 sm:p-6 mb-8 relative">
      <div className="absolute -top-3.5 left-6 bg-[#00F0FF] text-black text-xs font-black uppercase px-3 py-1 rounded-md neo-border rotate-[-1deg]">
        ✨ ADD SOMETHING NEW ✨
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        {/* Main Text Input Field */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={FUNNY_PLACEHOLDERS[placeholderIndex]}
            className="flex-1 px-4 py-3.5 bg-zinc-50 border-3 border-black rounded-xl font-bold text-base focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FFE600] transition-all placeholder:text-zinc-400"
          />

          <button
            type="submit"
            disabled={!title.trim()}
            className={`neo-btn px-6 py-3.5 rounded-xl font-black text-base flex items-center justify-center gap-2 uppercase tracking-wider shrink-0 transition-opacity ${
              title.trim()
                ? 'bg-[#00FF66] text-black hover:bg-[#20e976]'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed border-zinc-400 shadow-none'
            }`}
          >
            <PlusCircle size={22} className="stroke-[2.5]" />
            <span>Add Task 🚀</span>
          </button>
        </div>

        {/* Priority and Category Selectors */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t-2 border-dashed border-zinc-300">
          {/* Priority Choices */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase text-zinc-600 mr-1 flex items-center gap-1">
              Priority:
            </span>
            {Object.values(PRIORITIES).map((p) => {
              const isSelected = priority === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPriority(p.id);
                    playClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? `${p.bg} ${p.text} border-2 border-black shadow-[2px_2px_0px_#000] scale-105`
                      : 'bg-zinc-100 text-zinc-600 border border-zinc-300 hover:border-black'
                  }`}
                >
                  <span>{p.emoji}</span>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Tag Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-black uppercase text-zinc-600 flex items-center gap-1">
              <Tag size={14} /> Tag:
            </span>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                playClick();
              }}
              className="bg-zinc-100 border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none cursor-pointer"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TaskInput;
