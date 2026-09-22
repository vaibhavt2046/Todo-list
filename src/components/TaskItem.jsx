import React, { useState } from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { PRIORITIES, CATEGORIES } from '../utils/roasts';
import { playClick } from '../utils/audio';

const TaskItem = ({ task, onToggle, onDelete, onUpdatePriority, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const priorityMeta = PRIORITIES[task.priority] || PRIORITIES.medium;
  const categoryMeta = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[1];

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onUpdateTitle(task.id, editTitle.trim());
      setIsEditing(false);
      playClick();
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  // Cycle priority on badge click
  const cyclePriority = () => {
    const keys = ['low', 'medium', 'high'];
    const nextIdx = (keys.indexOf(task.priority) + 1) % keys.length;
    onUpdatePriority(task.id, keys[nextIdx]);
    playClick();
  };

  // Select sticky note background based on priority & completion
  const getCardBg = () => {
    if (task.completed) return 'bg-[#F5F0E6] opacity-75';
    if (task.priority === 'high') return 'bg-[#FFF7ED]';
    if (task.priority === 'medium') return 'bg-[#FEFCE8]';
    return 'bg-[#F5F3FF]';
  };

  return (
    <div
      className={`group relative border-2 border-[#2D241E] rounded-xl p-4 sm:p-5 transition-all duration-200 ${getCardBg()} ${
        task.completed
          ? 'border-dashed shadow-none'
          : 'paper-shadow hover:translate-x-[-1px] hover:translate-y-[-1px]'
      }`}
    >
      {/* Corner Pushpin on active notes */}
      {!task.completed && (
        <div className="absolute -top-2.5 right-4 text-sm pointer-events-none select-none filter drop-shadow-sm">
          📌
        </div>
      )}

      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Paper Doodle Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
          className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-[#2D241E] flex items-center justify-center transition-all cursor-pointer ${
            task.completed
              ? 'bg-[#DCFCE7] shadow-none scale-95'
              : 'bg-[#FFFDF9] shadow-[2px_2px_0px_#2D241E] hover:bg-[#FEF08A] hover:scale-105 active:scale-95'
          }`}
        >
          {task.completed ? (
            <Check size={20} className="stroke-[3.5] text-[#15803D] animate-pop" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-sm bg-transparent group-hover:bg-[#2D241E]/15" />
          )}
        </button>

        {/* Task Title & Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                autoFocus
                className="flex-1 px-3 py-1.5 border-2 border-[#2D241E] rounded-lg font-medium text-base bg-[#FFFDF9] text-[#2D241E] focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="bg-[#DCFCE7] text-[#166534] font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-[#2D241E] cursor-pointer font-hand text-sm"
                >
                  Save ✍️
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-[#EAE4D9] text-[#6B5E51] font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-[#2D241E] cursor-pointer font-hand text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p
                onClick={() => onToggle(task.id)}
                className={`text-lg sm:text-xl font-bold leading-snug cursor-pointer select-none transition-all break-words font-cursive ${
                  task.completed
                    ? 'pen-strikethrough text-[#8C7E72] font-semibold'
                    : 'text-[#2D241E] hover:text-[#C2410C]'
                }`}
              >
                {task.title}
              </p>

              {/* Badges / Sticky Tags row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Priority Tab Badge */}
                <button
                  type="button"
                  onClick={cyclePriority}
                  title="Click to cycle priority sticky!"
                  className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-md border border-[#2D241E] cursor-pointer flex items-center gap-1 transition-transform active:scale-95 font-hand ${
                    priorityMeta.bg
                  } ${priorityMeta.text}`}
                >
                  <span>{priorityMeta.emoji}</span>
                  <span className="text-xs">{priorityMeta.shortLabel}</span>
                </button>

                {/* Category Pill */}
                <span className="text-[11px] font-bold bg-[#F2ECE1] text-[#5A4F44] px-2 py-0.5 rounded-md border border-[#D5CBBF] flex items-center gap-1 font-hand">
                  <span>{categoryMeta.emoji}</span>
                  <span className="text-xs">{categoryMeta.name}</span>
                </span>

                {/* Red Ink Rubber Stamp when completed */}
                {task.completed && (
                  <span className="rubber-stamp text-[11px] px-2 py-0.2 rounded">
                    DONE DID IT! 💮
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Edit and Shred (Yeet) */}
        {!isEditing && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
                playClick();
              }}
              title="Edit Scribble"
              className="p-1.5 rounded-lg border border-transparent hover:border-[#2D241E] hover:bg-[#FEF08A] transition-all cursor-pointer text-[#6B5E51] hover:text-[#2D241E]"
            >
              <Edit2 size={16} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(task.id)}
              title="Shred this paper into the void!"
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg border-2 border-[#2D241E] bg-[#FEE2E2] text-[#991B1B] hover:bg-[#2D241E] hover:text-[#FEE2E2] font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-[2px_2px_0px_#2D241E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none font-hand"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline text-xs">YEET</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
