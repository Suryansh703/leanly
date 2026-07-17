import {
  Brain,
  Moon,
  Sun,
  BookOpen,
  Sparkles,
  CircleHelp,
  Trash2,
} from "lucide-react";

export default function Header({
  theme,
  toggleTheme,
  hasSession,
  onClear,
}) {
  return (
    <header className="mb-10 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">

      {/* Branding */}
      <div className="text-center">

        <h1
          className="flex items-center justify-center gap-3 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <Brain
            size={42}
            strokeWidth={2.3}
            className="text-indigo-600 dark:text-indigo-400"
          />
          Learnly
        </h1>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Turn your notes into interactive learning in seconds.
        </p>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
          AI-powered flashcards and quizzes for smarter revision.
        </p>

        {/* Feature Chips */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">

          <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <BookOpen size={16} />
            Flashcards
          </span>

          <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Sparkles size={16} />
            AI Powered
          </span>

          <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <CircleHelp size={16} />
            Practice Quiz
          </span>

        </div>
      </div>

      {/* Bottom Controls */}
      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">

        <button
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <button
          onClick={onClear}
          disabled={!hasSession}
          className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            hasSession
              ? "border-slate-300 text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-300"
              : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600"
          }`}
        >
          <Trash2 size={16} />
          Clear Session
        </button>

      </div>

    </header>
  );
}