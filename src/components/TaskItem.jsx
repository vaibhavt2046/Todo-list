import React, { useState } from 'react';
import { Check, Trash2, Edit2, CheckSquare, Square, Flame, Zap, Clock } from 'lucide-react';
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

  return (
    <div
      className={`group relative bg-white neo-border rounded-xl p-4 sm:p-5 transition-all duration-200 ${
        task.completed
          ? 'bg-zinc-100 opacity-80 border-dashed'
          : 'neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px]'
      }`}
    >
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Funky Bouncy Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
          className={`shrink-0 w-8 h-8 rounded-lg border-3 border-black flex items-center justify-center transition-all cursor-pointer ${
            task.completed
              ? 'bg-[#00FF66] shadow-none scale-95'
              : 'bg-white shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] hover:scale-105 active:scale-95'
          }`}
        >
          {task.completed ? (
            <Check size={20} className="stroke-[3.5] text-black animate-pop" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-sm bg-transparent group-hover:bg-black/20" />
          )}
        </button>

        {/* Task Content or Inline Edit Form */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                autoFocus
                className="flex-1 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-sm bg-yellow-50 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="bg-[#00FF66] text-black font-black text-xs px-3 py-1.5 rounded-lg border-2 border-black cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-zinc-200 text-zinc-700 font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-black cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p
                onClick={() => onToggle(task.id)}
                className={`text-base font-bold leading-snug cursor-pointer select-none transition-all break-words ${
                  task.completed
                    ? 'line-through text-zinc-500 font-medium'
                    : 'text-black hover:text-[#FF007A]'
                }`}
              >
                {task.title}
              </p>

              {/* Badges / Metadata row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Clickable Priority Badge (click to cycle) */}
                <button
                  type="button"
                  onClick={cyclePriority}
                  title="Click to cycle priority level!"
                  className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md border-2 border-black cursor-pointer flex items-center gap-1 transition-transform active:scale-95 ${
                    priorityMeta.bg
                  } ${priorityMeta.text} ${task.priority === 'high' && !task.completed ? 'animate-pulse' : ''}`}
                >
                  <span>{priorityMeta.emoji}</span>
                  <span>{priorityMeta.shortLabel}</span>
                </button>

                {/* Category Pill */}
                <span className="text-[11px] font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md border border-zinc-300 flex items-center gap-1">
                  <span>{categoryMeta.emoji}</span>
                  <span>{categoryMeta.name}</span>
                </span>

                {/* Finished sticker badge */}
                {task.completed && (
                  <span className="text-[10px] font-black uppercase bg-[#00FF66] text-black px-2 py-0.5 rounded-md border border-black rotate-[-2deg]">
                    DONE DID IT! 🎉
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Edit and Yeet (Delete) */}
        {!isEditing && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
                playClick();
              }}
              title="Edit Task"
              className="p-1.5 rounded-lg border-2 border-transparent hover:border-black hover:bg-yellow-200 transition-all cursor-pointer text-zinc-600 hover:text-black"
            >
              <Edit2 size={16} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(task.id)}
              title="Yeet this task into the void!"
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg border-2 border-black bg-[#FF3366] text-white hover:bg-black hover:text-[#FF3366] font-black text-xs flex items-center gap-1 transition-all cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">YEET</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
