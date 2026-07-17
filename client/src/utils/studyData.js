export function validateStudyData(data) {
  if (!data || !Array.isArray(data.flashcards) || !Array.isArray(data.quiz)) throw new Error('Unexpected AI response.');
  const cardsValid = data.flashcards.every((card) => typeof card?.question === 'string' && typeof card?.answer === 'string');
  const quizValid = data.quiz.every((item) => typeof item?.question === 'string' && Array.isArray(item?.options) && item.options.length === 4 && typeof item?.correctAnswer === 'string' && item.options.includes(item.correctAnswer));
  if (!cardsValid || !quizValid) throw new Error('Unexpected AI response.');
  return data;
}

export function errorMessage(error) {
  if (error.name === 'AbortError') return '';
  if (error.message === 'INVALID_JSON') return 'The AI returned an invalid response. Please try again.';
  if (error.message === 'Unexpected AI response.') return error.message;
  if (error.message && error.message !== 'API_ERROR') return error.message;
  return 'Unable to contact AI.';
}
