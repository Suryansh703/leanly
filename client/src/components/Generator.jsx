import { useState } from 'react';

export default function Generator({ onGenerate, loading }) {
  const [notes, setNotes] = useState('');
  const submit = (event) => { event.preventDefault(); onGenerate(notes); };
  return <section className="panel"><div className="mb-5"><p className="eyebrow">STUDY SMARTER</p><h2 className="text-2xl font-bold">Turn notes into recall practice</h2><p className="mt-1 text-slate-500 dark:text-slate-400">Paste notes, then generate a complete flashcard deck and quiz.</p></div><form onSubmit={submit}><label className="sr-only" htmlFor="notes">Study notes</label><textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your study notes here..." className="input-area" disabled={loading} required minLength="10"/><div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-400">Tip: Include definitions, concepts, and key dates.</p><button className="primary-button" disabled={loading}>{loading ? <><span className="spinner"/> Generating study material...</> : 'Generate study material →'}</button></div></form></section>;
}
