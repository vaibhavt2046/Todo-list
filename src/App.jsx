import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Search, Filter, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF007A', '#00F0FF', '#FFE600', '#00FF66', '#A688FA'],
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
              particleCount: 150,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#FF007A', '#00F0FF', '#FFE600', '#00FF66', '#A688FA'],
            });
          }, 350);
        }
      } else {
        playUncheck();
      }

      return nextTasks;
    });
  };

  // 3. Delete Task (Yeet)
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
      // Search matching
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      // Status matching
      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'completed'
          ? task.completed
          : !task.completed;

      // Priority matching
      const matchesPriority =
        priorityFilter === 'all' ? true : task.priority === priorityFilter;

      // Category matching
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

          {/* Search & Filter Toolbar */}
          <div className="bg-white neo-border neo-shadow rounded-2xl p-4 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks or search for excuses..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border-2 border-black rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE600]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black bg-zinc-200 px-1.5 py-0.5 rounded cursor-pointer hover:bg-black hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Chaos', count: totalTasks },
                  { id: 'active', label: 'In Progress ⏳', count: totalTasks - completedTasks },
                  { id: 'completed', label: 'Conquered 🏆', count: completedTasks },
                ].map((tab) => {
                  const isActive = statusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setStatusFilter(tab.id);
                        playClick();
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-black text-white neo-shadow-sm scale-102'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-[#FFE600] text-black' : 'bg-zinc-300 text-black'
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
                <span className="text-xs font-black text-zinc-500">Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => {
                    setPriorityFilter(e.target.value);
                    playClick();
                  }}
                  className="bg-zinc-100 border border-black rounded-lg px-2 py-1 text-xs font-black cursor-pointer focus:outline-none"
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
                      ? 'ring-4 ring-[#FF007A] scale-[1.02] rounded-xl'
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
              /* Funky Humorous Empty State */
              <div className="bg-white neo-border neo-shadow-lg rounded-2xl p-8 text-center space-y-4">
                <div className="text-5xl animate-bounce">
                  {tasks.length === 0 ? '🎉' : '🔍'}
                </div>
                <h3 className="text-xl font-black text-black font-funky">
                  {tasks.length === 0
                    ? 'THE VOID HAS CONSUMED ALL TASKS!'
                    : 'NO MATCHING CHAOS FOUND'}
                </h3>
                <p className="text-sm font-bold text-zinc-600 max-w-sm mx-auto">
                  {tasks.length === 0
                    ? 'You are completely free! Go take a nap, pet a dog, or invent a new excuse.'
                    : "Either you're all done or your search query is too wildly specific."}
                </p>
                {tasks.length === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      handleResetPresets();
                    }}
                    className="neo-btn bg-[#FFE600] px-4 py-2 rounded-xl text-xs font-black uppercase inline-flex items-center gap-2"
                  >
                    <RefreshCw size={14} />
                    <span>Bring Back Fun Starter Tasks 🎪</span>
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

      {/* Funky Footer */}
      {/* <footer className="mt-14 pb-8 text-center text-xs font-black text-black/75">
        <p className="flex items-center justify-center gap-1">
          Made with ⚡ and lots of procrastination • Ready for Vercel 🚀
        </p>
      </footer> */}
    </div>
  );
};

export default App;