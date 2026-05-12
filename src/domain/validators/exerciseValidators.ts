import type { AnswersInput, ClockInput, EngInput, Exercise, OpInput, ProbInput } from '../../features/app/types';

interface ValidateExerciseInput {
  exercise: Exercise;
  userNumbers: string[];
  grid: boolean[][];
  answers: AnswersInput;
  opInput: OpInput;
  clockInput: ClockInput;
  probInput: ProbInput;
  engInput: EngInput;
  featureMatrix: boolean[][];
}

export const getColCount = (grid: boolean[][], c: number): number => grid.reduce((acc, r) => acc + (r[c] ? 1 : 0), 0);
const normalizeAccentInsensitive = (value: string): string => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const normalizeCaseInsensitive = (value: string): string => normalizeAccentInsensitive(value).trim().toLowerCase();
const hasSentenceFormat = (value: string): boolean => /^[A-ZÁÉÍÓÚÑÜ].*\.$/.test(value.trim());

export const validateExercise = ({ exercise, userNumbers, grid, answers, opInput, clockInput, probInput, engInput, featureMatrix }: ValidateExerciseInput) => {
  let ok = false;
  let successMsg = '¡Perfecto! Todo está correcto. 🌟';
  let errorMsg = 'Hay algún error. ¡Revísalo bien! 🧐';

  if (exercise.type === 'graficos') {
    const numOk = userNumbers.every((n, i) => parseInt(n, 10) === exercise.data[i].value);
    const gridOk = exercise.data.every((d, i) => getColCount(grid, i) === d.value);
    const sorted = [...exercise.data].sort((a, b) => b.value - a.value);
    const getAns = (id: string) => (id === 'most' ? sorted[0].name : id === 'least' ? sorted[sorted.length - 1].name : id === 'second' ? sorted[1].name : sorted[2].name);
    const q1Ok = answers.q1 === getAns(exercise.selectedQuestions[0].id);
    const q2Ok = answers.q2 === getAns(exercise.selectedQuestions[1].id);
    const totalOk = parseInt(answers.total, 10) === exercise.data.reduce((a, b) => a + b.value, 0);
    ok = numOk && gridOk && q1Ok && q2Ok && totalOk;
  } else if (exercise.type === 'operaciones') {
    ok = parseInt(opInput.tens + opInput.units, 10) === exercise.res;
  } else if (exercise.type === 'relojes') {
    ok = parseInt(clockInput.hour, 10) === exercise.targetHour && parseInt(clockInput.minType, 10) === exercise.targetMinute &&
      clockInput.beforeH === exercise.targetBeforeH && clockInput.beforeM === exercise.targetBeforeM &&
      clockInput.afterH === exercise.targetAfterH && clockInput.afterM === exercise.targetAfterM;
  } else if (exercise.type === 'problemas') {
    ok = parseInt(probInput.val1, 10) === exercise.v1 && parseInt(probInput.val2, 10) === exercise.v2 &&
      probInput.averiguo === (exercise.op === 'suma' ? 'total' : 'diferencia') &&
      probInput.accion === (exercise.op === 'suma' ? 'sumar' : 'restar') &&
      parseInt(probInput.tens + probInput.units, 10) === exercise.res && parseInt(probInput.solucion, 10) === exercise.res;
  } else if (exercise.type === 'vocab') {
    ok = exercise.wordList.every(item => parseInt(engInput[item.en], 10) === item.numberId);
    successMsg = 'Excellent! Good job! 🏆';
    errorMsg = 'Oops! Try again. 🧐';
  } else if (exercise.type === 'grammar') {
    ok = exercise.questions.every((q, i) => engInput[`q${i}`] === q.options.find(o => o.isCorrect)?.label);
    successMsg = 'Perfect grammar! Well done! 🐾';
    errorMsg = 'Check your answers! 🧐';
  } else if (exercise.type === 'numbers') {
    ok = exercise.questions.every((q, i) => engInput[`n${i}`] === q.correctWord);
    successMsg = 'Great counting! 🔢';
    errorMsg = 'Some numbers are wrong. 🧐';
  } else if (exercise.type === 'listen') {
    ok = true;
    successMsg = 'Good pronunciation!';
  } else if (exercise.type === 'cadaPalabra') {
    ok = exercise.words.every(item => engInput[item.noun] === item.gender);
    successMsg = '¡Genial! Has colocado todas las palabras. 💪';
    errorMsg = 'Revisa dónde va cada sustantivo. 🧐';
  } else if (exercise.type === 'corrigeError') {
    ok = exercise.questions.every((question, idx) => normalizeCaseInsensitive(engInput[`q${idx}`] ?? '') === normalizeCaseInsensitive(question.correctArticle));
    successMsg = '¡Muy bien! Has corregido todos los artículos. ✅';
    errorMsg = 'Hay algún artículo incorrecto. Inténtalo otra vez. 🧐';
  } else if (exercise.type === 'cambiaGenero') {
    const userAnswer = (engInput.respuesta ?? '').trim();
    const formatOk = hasSentenceFormat(userAnswer);
    const normalizedAnswer = normalizeCaseInsensitive(userAnswer);
    const isValidVariant = exercise.prompt.validAnswers
      .map(candidate => normalizeCaseInsensitive(candidate))
      .includes(normalizedAnswer);
    ok = formatOk && isValidVariant;
    successMsg = '¡Excelente! Has cambiado el género correctamente. 🌟';
    errorMsg = 'Revisa mayúscula inicial, punto final y el cambio de género. 🧐';
  } else if (exercise.type === 'sciTransport' || exercise.type === 'sciHowTravel' || exercise.type === 'sciWhere') {
    ok = exercise.questions.every((q, i) => engInput[`q${i}`] === q.options.find(o => o.isCorrect)?.label);
    successMsg = 'Great science work! 🧪';
    errorMsg = 'Check your answers! 🧐';
  } else if (exercise.type === 'sciMatrix') {
    const rows = exercise.solution.length;
    const cols = exercise.solution[0]?.length ?? 0;
    const dimsOk = featureMatrix.length === rows && featureMatrix.every((r, ri) => r.length === cols && ri < rows);
    const cellsOk = dimsOk && exercise.solution.every((row, ri) => row.every((cell, ci) => featureMatrix[ri][ci] === cell));
    ok = dimsOk && cellsOk;
    successMsg = 'Perfect matrix! 🌟';
    errorMsg = 'Some ticks are wrong. Try again! 🧐';
  }

  return { ok, successMsg, errorMsg };
};
