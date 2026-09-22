import React, { useState, useEffect } from 'react';
import { PlusCircle, Tag, PenTool } from 'lucide-react';
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
    <section className="paper-sheet rounded-2xl p-5 sm:p-6 mb-8 relative bg-[#FFFDF9]">
      {/* Top Paper Washi Tape Label */}
      <div className="absolute -top-3 left-6 bg-[#FEF08A] text-[#2D241E] text-xs font-bold uppercase px-3.5 py-0.5 rounded-sm border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] rotate-[-1deg] font-hand flex items-center gap-1">
        <span>📌</span> NEW STICKY NOTE
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        {/* Main Text Input Field */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={FUNNY_PLACEHOLDERS[placeholderIndex]}
            className="flex-1 px-4 py-3 bg-[#FBF7EE] border-2 border-[#2D241E] rounded-xl font-medium text-base text-[#2D241E] focus:bg-[#FFFDF9] focus:outline-none focus:ring-3 focus:ring-[#FEF08A] transition-all placeholder:text-[#A89D91]"
          />

          <button
            type="submit"
            disabled={!title.trim()}
            className={`paper-btn px-6 py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 uppercase tracking-wide shrink-0 transition-opacity font-hand ${
              title.trim()
                ? 'bg-[#DCFCE7] text-[#166534] hover:bg-[#bbf7d0]'
                : 'bg-[#EAE4D9] text-[#A89D91] cursor-not-allowed border-[#C8BEB2] shadow-none'
            }`}
          >
            <PenTool size={18} className="stroke-[2.2]" />
            <span className="text-lg">Pin Task 📌</span>
          </button>
        </div>

        {/* Priority and Category Selectors */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t-2 border-dashed border-[#E5DFD5]">
          {/* Priority Choices - Styled as Sticky Bookmark Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-[#6B5E51] mr-1 font-hand text-sm">
              Sticky Color:
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
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer font-hand ${
                    isSelected
                      ? `${p.bg} ${p.text} border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] scale-105`
                      : 'bg-[#F2ECE1] text-[#6B5E51] border border-[#D5CBBF] hover:border-[#2D241E]'
                  }`}
                >
                  <span>{p.emoji}</span>
                  <span className="text-sm">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Tag Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-bold uppercase text-[#6B5E51] flex items-center gap-1 font-hand text-sm">
              <Tag size={13} /> Tag:
            </span>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                playClick();
              }}
              className="bg-[#F8F4EB] border-2 border-[#2D241E] rounded-lg px-2.5 py-1 text-xs font-bold text-[#2D241E] focus:outline-none cursor-pointer font-hand text-sm"
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
