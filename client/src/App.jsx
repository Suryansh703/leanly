import { useRef, useState } from "react";
import Header from "./components/Header";
import Generator from "./components/Generator";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";

import { EMPTY_SESSION, STORAGE_KEYS } from "./constants/app";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";
import { generateStudyMaterial } from "./services/studyApi";
import { errorMessage } from "./utils/studyData";

export default function App() {
  const [session, setSession] = useLocalStorage(
    STORAGE_KEYS.session,
    EMPTY_SESSION
  );

  const [theme, toggleTheme] = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const controller = useRef();
  const requestId = useRef(0);

  const generate = async (notes) => {
    controller.current?.abort();

    const id = ++requestId.current;
    const nextController = new AbortController();

    controller.current = nextController;

    setLoading(true);
    setError("");

    try {
      const data = await generateStudyMaterial(
        notes,
        nextController.signal
      );

      if (id === requestId.current) {
        setSession(data);
      }
    } catch (err) {
      const message = errorMessage(err);

      if (id === requestId.current && message) {
        setError(message);
      }
    } finally {
      if (id === requestId.current) {
        setLoading(false);
      }
    }
  };

 const hasContent =
  session.flashcards.length > 0 || session.quiz.length > 0;
  return (
    <main className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">

      <div className="mx-auto max-w-6xl px-5 py-8">

        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          hasSession={hasContent}
          onClear={() => {
            requestId.current += 1;
            controller.current?.abort();
            setLoading(false);
            setSession(EMPTY_SESSION);
            setError("");
          }}
        />

        <Generator
          onGenerate={generate}
          loading={loading}
        />

        {error && (
          <div className="alert" role="alert">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {!hasContent && !loading && !error && (
          <div className="empty-state">
            <span>📚</span>

            <h3 className="mt-4 text-xl font-semibold text-slate-700 dark:text-slate-200">
              Ready to start studying?
            </h3>

            <p className="mt-2 max-w-md mx-auto">
              Paste your notes above and instantly generate
              AI-powered flashcards and quizzes.
            </p>
          </div>
        )}

        {hasContent && (
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Flashcards cards={session.flashcards} />

            <Quiz questions={session.quiz} />
          </div>
        )}

      </div>

    </main>
  );
}