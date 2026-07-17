export function parseAndValidateGeminiResponse(text) {
  let data;
  try { data = JSON.parse(text.trim()); } catch { const error = new Error('The AI returned an invalid response. Please try again.'); error.status = 502; throw error; }
  if (!data || !Array.isArray(data.flashcards) || !Array.isArray(data.quiz)) { const error = new Error('Unexpected AI response.'); error.status = 502; throw error; }
  const flashcardsValid = data.flashcards.every((card) => typeof card?.question === 'string' && card.question.trim() && typeof card?.answer === 'string' && card.answer.trim());
  const quizValid = data.quiz.every((item) => typeof item?.question === 'string' && item.question.trim() && Array.isArray(item?.options) && item.options.length === 4 && item.options.every((option) => typeof option === 'string' && option.trim()) && typeof item?.correctAnswer === 'string' && item.options.includes(item.correctAnswer));
  if (!flashcardsValid || !quizValid) { const error = new Error('Unexpected AI response.'); error.status = 502; throw error; }
  if (!data.flashcards.length && !data.quiz.length) { const error = new Error('No flashcards were generated.'); error.status = 502; throw error; }
  return data;
}
