import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseAndValidateGeminiResponse } from '../utils/validation.js';

const schema = `{"flashcards":[{"question":"","answer":""}],"quiz":[{"question":"","options":["","","",""],"correctAnswer":""}]}`;
const promptFor = (notes) => `You are a precise study-material generator. Based only on the notes below, create 8-12 concise flashcards and 6-10 multiple-choice quiz questions. Generate valid JSON only, matching exactly this schema: ${schema}. Rules: no Markdown, no prose, no code fences. Each quiz must have exactly four plausible options and correctAnswer must exactly equal one option.\n\nNOTES:\n${notes}`;

async function generateWithOpenRouter(notes) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: process.env.OPENROUTER_MODEL || 'openrouter/free', messages: [{ role: 'user', content: promptFor(notes) }], temperature: 0.3 }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) { const error = new Error(payload?.error?.message || 'OpenRouter could not generate study material.'); error.status = response.status; throw error; }
  return parseAndValidateGeminiResponse(payload?.choices?.[0]?.message?.content || '');
}

export async function generateStudyMaterial(notes) {
  if (process.env.OPENROUTER_API_KEY) return generateWithOpenRouter(notes);
  if (!process.env.GEMINI_API_KEY) { const error = new Error('AI service is not configured. Add OPENROUTER_API_KEY or GEMINI_API_KEY to server/.env.'); error.status = 503; throw error; }
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = client.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.0-flash', generationConfig: { responseMimeType: 'application/json', temperature: 0.3 } });
  try {
    const result = await model.generateContent(promptFor(notes));
    return parseAndValidateGeminiResponse(result.response.text());
  } catch (error) {
    if (error?.status === 429 || /\b429\b|quota exceeded|resource exhausted/i.test(error?.message || '')) {
      const quotaError = new Error('Gemini quota is unavailable for this API project. Check AI Studio rate limits or enable billing, then try again.');
      quotaError.status = 429;
      throw quotaError;
    }
    throw error;
  }
}
