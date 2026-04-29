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
}

export const getColCount = (grid: boolean[][], c: number): number => grid.reduce((acc, r) => acc + (r[c] ? 1 : 0), 0);

export const validateExercise = ({ exercise, userNumbers, grid, answers, opInput, clockInput, probInput, engInput }: ValidateExerciseInput) => {
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
  }

  return { ok, successMsg, errorMsg };
};
