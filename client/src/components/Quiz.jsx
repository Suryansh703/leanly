import { useEffect, useState } from 'react';

export default function Quiz({ questions }) {
  const [active, setActive] = useState(questions); const [index, setIndex] = useState(0); const [selected, setSelected] = useState(''); const [answers, setAnswers] = useState([]); const [finished, setFinished] = useState(false);
  useEffect(() => { setActive(questions); setIndex(0); setSelected(''); setAnswers([]); setFinished(false); }, [questions]);
  if (!active.length) return null; const question = active[index]; const submit = () => { if (!selected) return; const nextAnswers = [...answers, { question, selected }]; setAnswers(nextAnswers); if (index + 1 === active.length) setFinished(true); else { setIndex(index + 1); setSelected(''); } }; const incorrect = answers.filter(({ question: q, selected: a }) => q.correctAnswer !== a);
  if (finished) return <section className="panel quiz-result"><p className="eyebrow">QUIZ COMPLETE</p><h2>{answers.length - incorrect.length} / {answers.length}</h2><p className="text-slate-500 dark:text-slate-400">{incorrect.length ? `${incorrect.length} question${incorrect.length > 1 ? 's' : ''} to revisit.` : 'Perfect score—excellent work!'}</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button className="secondary-button" onClick={() => { setIndex(0); setSelected(''); setAnswers([]); setFinished(false); }}>Retry all</button>{incorrect.length > 0 && <button className="primary-button" onClick={() => { setActive(incorrect.map((item) => item.question)); setIndex(0); setSelected(''); setAnswers([]); setFinished(false); }}>Retry incorrect questions</button>}</div></section>;
  return <section className="panel"><div className="section-heading"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
  KNOWLEDGE CHECK
</p><h2>Test yourself</h2></div><span className="badge">{index + 1} / {active.length}</span></div><div className="mt-6">
  <div className="mb-2 flex justify-between text-sm text-slate-500">
    <span>
      Question {index + 1} of {active.length}
    </span>

    <span>
      {Math.round(((index + 1) / active.length) * 100)}%
    </span>
  </div>

  <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
    <div
      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
      style={{
        width: `${((index + 1) / active.length) * 100}%`,
      }}
    />
  </div>
</div><div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">

  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
    QUESTION
  </p>

  <h3 className="text-xl font-bold leading-8">
    {question.question}
  </h3>

</div><fieldset className="mt-5 grid gap-3"><legend className="sr-only">Answer options</legend>{question.options.map((option) => <label key={option} className={`option ${selected === option ? 'selected' : ''}`}><input type="radio" name="answer" value={option} checked={selected === option} onChange={(e) => setSelected(e.target.value)} /><div className="flex items-center gap-4">

  <div
  className={`grid h-8 w-8 place-items-center rounded-full font-bold transition-all duration-200 ${
    selected === option
      ? "bg-indigo-600 text-white shadow-md"
      : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
  }`}
>
  {String.fromCharCode(65 + question.options.indexOf(option))}
</div>

  <span className="font-medium">
    {option}
  </span>

</div></label>)}</fieldset><div className="mt-6 flex justify-end"><button className="primary-button" onClick={submit} disabled={!selected}>{index + 1 === active.length ? 'See results' : 'Submit answer →'}</button></div></section>;
}
