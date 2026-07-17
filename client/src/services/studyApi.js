import { validateStudyData } from '../utils/studyData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export async function generateStudyMaterial(notes, signal) {
  const response = await fetch(`${API_URL}/api/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ notes }), signal });
  let payload;
  try { payload = await response.json(); } catch { throw new Error('INVALID_JSON'); }
  if (!response.ok) throw new Error(payload?.message || 'API_ERROR');
  return validateStudyData(payload);
}
