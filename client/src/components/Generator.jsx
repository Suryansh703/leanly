import { useState } from "react";

export default function Generator({ onGenerate, loading }) {
  const [notes, setNotes] = useState("");

  const submit = (event) => {
    event.preventDefault();
    onGenerate(notes);
  };

  return (
    <section className="panel">

      <div className="mb-6">

        <p className="eyebrow">
          STUDY MATERIAL
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Generate Flashcards & Quiz
        </h2>

        <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          Paste your notes below and instantly create flashcards and practice
          questions to make revision quicker and more effective.
        </p>

      </div>

      <form onSubmit={submit}>

        <label htmlFor="notes" className="sr-only">
          Study Notes
        </label>

        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your study notes here..."
          className="input-area"
          disabled={loading}
          required
          minLength={10}
        />

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">

          <span>{notes.length} characters</span>

          <span>Minimum 10 characters</span>

        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            💡 Include definitions, formulas, examples, and important concepts
            for better results.
          </div>

          <button
            type="submit"
            className="primary-button min-w-[180px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </button>

        </div>

      </form>

    </section>
  );
}