import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Search, Filter, RefreshCw } from 'lucide-react';
import Navbar from './components/Navbar';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import TaskStats from './components/TaskStats';
import { DEFAULT_TASKS, PRIORITIES, CATEGORIES } from './utils/roasts';
import {
  playSuccess,
  playUncheck,
  playYeet,
  playClick,
  playFanfare,
  getIsMuted,
  setIsMutedStorage,
} from './utils/audio';

const STORAGE_KEY = 'TASK_CHAOS_ITEMS_V1';

const App = () => {
  // 1. Initialize tasks from localStorage or use hilarious defaults
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return DEFAULT_TASKS;
  });

  // Sound mute state
  const [isMuted, setIsMuted] = useState(() => getIsMuted());

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'high' | 'medium' | 'low'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [highlightedTaskId, setHighlightedTaskId] = useState(null);

  // Sync tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  // Sound toggle handler
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setIsMutedStorage(nextMuted);
  };

  // Launch celebratory funky confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FEF08A', '#FFD6E0', '#BAE6FD', '#BBF7D0', '#DDD6FE'],
      disableForReducedMotion: true,
    });
  };

  // 1. Add Task
  const handleAddTask = ({ title, priority, category }) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      priority,
      category,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // 2. Mark Complete / Incomplete
  const handleToggleTask = (taskId) => {
    setTasks((prev) => {
      const target = prev.find((t) => t.id === taskId);
      const isCompleting = target ? !target.completed : false;

      const nextTasks = prev.map((t) =>
        t.id === taskId ? { ...t, completed: isCompleting } : t
      );

      if (isCompleting) {
        playSuccess();
        triggerConfetti();

        // Check if all active tasks are now finished!
        const remaining = nextTasks.filter((t) => !t.completed);
        if (remaining.length === 0 && nextTasks.length > 0) {
          setTimeout(() => {
            playFanfare();
            confetti({
              particleCount: 140,
              spread: 90,
              origin: { y: 0.5 },
              colors: ['#FEF08A', '#FFD6E0', '#BAE6FD', '#BBF7D0', '#DDD6FE'],
            });
          }, 350);
        }
      } else {
        playUncheck();
      }

      return nextTasks;
    });
  };

  // 3. Delete Task (Yeet / Shred)
  const handleDeleteTask = (taskId) => {
    playYeet();
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // 4. Update Priority
  const handleUpdatePriority = (taskId, newPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, priority: newPriority } : t))
    );
  };

  // 5. Update Title (Inline edit)
  const handleUpdateTitle = (taskId, newTitle) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t))
    );
  };

  // 6. Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // 7. Reset sample funny tasks
  const handleResetPresets = () => {
    setTasks(DEFAULT_TASKS);
  };

  // Filter tasks based on search, status, priority, category
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'completed'
          ? task.completed
          : !task.completed;

      const matchesPriority =
        priorityFilter === 'all' ? true : task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === 'all' ? true : task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Navbar & Header with Roasts & Audio */}
      <Navbar
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Todo Column (Left / 2 columns on lg) */}
        <main className="lg:col-span-2 space-y-6">
          {/* Add Task Input Component */}
          <TaskInput onAddTask={handleAddTask} />

          {/* Search & Filter Desk Toolbar */}
          <div className="paper-sheet rounded-2xl p-4 space-y-3 bg-[#FFFDF9]">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7E72]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes or search for excuses..."
                className="w-full pl-10 pr-4 py-2 bg-[#FBF7EE] border-2 border-[#2D241E] rounded-xl font-medium text-sm text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#FEF08A] placeholder:text-[#A89D91]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-[#EAE4D9] text-[#2D241E] px-2 py-0.5 rounded cursor-pointer hover:bg-[#2D241E] hover:text-[#FFFDF9] font-hand"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E1D5]">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Doodles', count: totalTasks },
                  { id: 'active', label: 'In Progress ⏳', count: totalTasks - completedTasks },
                  { id: 'completed', label: 'Crossed Off 🏆', count: completedTasks },
                ].map((tab) => {
                  const isActive = statusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setStatusFilter(tab.id);
                        playClick();
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 font-hand ${
                        isActive
                          ? 'bg-[#2D241E] text-[#FFFDF9] paper-shadow-sm scale-102'
                          : 'bg-[#F2ECE1] text-[#6B5E51] hover:bg-[#EAE4D9]'
                      }`}
                    >
                      <span className="text-sm">{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-[#FEF08A] text-[#2D241E]' : 'bg-[#DCD5C8] text-[#2D241E]'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Priority Filter Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#6B5E51] font-hand text-sm">Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => {
                    setPriorityFilter(e.target.value);
                    playClick();
                  }}
                  className="bg-[#F8F4EB] border-2 border-[#2D241E] rounded-lg px-2 py-1 text-xs font-bold text-[#2D241E] cursor-pointer focus:outline-none font-hand text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">🌶️ Holy Guacamole</option>
                  <option value="medium">⚡ Whenever</option>
                  <option value="low">🦥 Sloth</option>
                </select>
              </div>
            </div>
          </div>

          {/* Task List Section */}
          <section className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`transition-all duration-300 ${
                    highlightedTaskId === task.id
                      ? 'ring-4 ring-[#EA580C] scale-[1.02] rounded-xl'
                      : ''
                  }`}
                >
                  <TaskItem
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                    onUpdatePriority={handleUpdatePriority}
                    onUpdateTitle={handleUpdateTitle}
                  />
                </div>
              ))
            ) : (
              /* Paper Themed Empty State */
              <div className="paper-sheet rounded-2xl p-8 text-center space-y-3 bg-[#FFFDF9] relative">
                <div className="washi-tape w-24" />
                <div className="text-5xl">
                  {tasks.length === 0 ? '📜' : '🔍'}
                </div>
                <h3 className="text-2xl font-bold text-[#2D241E] font-hand">
                  {tasks.length === 0
                    ? 'CLEAN DESK, NO STICKIES LEFT!'
                    : 'NO MATCHING SCRIBBLES FOUND'}
                </h3>
                <p className="text-sm font-medium text-[#6B5E51] max-w-sm mx-auto font-hand text-base">
                  {tasks.length === 0
                    ? 'You have defeated all sticky notes! Take a glorious coffee break or doodle something fun.'
                    : 'Try checking your spelling or clearing your search filters.'}
                </p>
                {tasks.length === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      handleResetPresets();
                    }}
                    className="paper-btn bg-[#FEF08A] px-4 py-2 rounded-xl text-xs font-bold uppercase inline-flex items-center gap-2 font-hand text-sm text-[#2D241E]"
                  >
                    <RefreshCw size={14} />
                    <span>Load Starter Stickies 🎪</span>
                  </button>
                )}
              </div>
            )}
          </section>
        </main>

        {/* Sidebar / Stats & Fate Wheel (Right column on lg) */}
        <TaskStats
          tasks={tasks}
          onClearCompleted={handleClearCompleted}
          onResetPresets={handleResetPresets}
          onHighlightTask={(id) => {
            setHighlightedTaskId(id);
            setTimeout(() => setHighlightedTaskId(null), 3000);
          }}
        />
      </div>

      {/* Funky Footer (kept commented out as requested) */}
      {/* <footer className="mt-14 pb-8 text-center text-xs font-black text-black/75">
        <p className="flex items-center justify-center gap-1">
          Made with ⚡ and lots of procrastination • Ready for Vercel 🚀
        </p>
      </footer> */}
    </div>
  );
};

export default App;