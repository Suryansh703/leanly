import { useEffect, useState } from "react";

export default function Flashcards({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [cards]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(0, i - 1));
        setFlipped(false);
      }

      if (e.key === "ArrowRight") {
        setIndex((i) => Math.min(cards.length - 1, i + 1));
        setFlipped(false);
      }

      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cards.length]);

  if (!cards.length) return null;

  const card = cards[index];

  const navigate = (delta) => {
    setIndex((i) => Math.max(0, Math.min(cards.length - 1, i + delta)));
    setFlipped(false);
  };

  return (
    <section className="panel">

      <div className="section-heading">

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
  LEARNING MODE
</p>

          <h2>Flashcards</h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Flip each card to check your understanding.
          </p>
        </div>

        <span className="badge">
          {index + 1} / {cards.length}
        </span>

      </div>

      <div className="progress">
    <i
      style={{
        width: `${((index + 1) / cards.length) * 100}%`,
      }}
    />
</div>

      <button
        className={`flashcard ${flipped ? "is-flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
        aria-label="Flip Flashcard"
      >
        <div className="card-inner">

          <div className="card-face">

            <span>QUESTION</span>

            <strong>{card.question}</strong>

            <small>Press Space or click to flip</small>

          </div>

          <div className="card-face card-back">

            <span>ANSWER</span>

            <strong>{card.answer}</strong>

            <small>Click again to continue</small>

          </div>

        </div>
      </button>

      <div className="mt-6 flex items-center justify-between">

        <button
          className="secondary-button"
          onClick={() => navigate(-1)}
          disabled={index === 0}
        >
          ← Previous
        </button>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Card {index + 1}
          </p>

          <p className="text-xs text-slate-500">
            of {cards.length}
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate(1)}
          disabled={index === cards.length - 1}
        >
          Next →
        </button>

      </div>

    </section>
  );
}