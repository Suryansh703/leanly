import { generateStudyMaterial } from '../services/geminiService.js';

export async function generate(req, res, next) {
  try { const { notes } = req.body; if (typeof notes !== 'string' || notes.trim().length < 10) return res.status(400).json({ message: 'Please provide at least 10 characters of study notes.' }); if (notes.length > 30000) return res.status(400).json({ message: 'Notes must be under 30,000 characters.' }); res.json(await generateStudyMaterial(notes.trim())); } catch (error) { next(error); }
}
