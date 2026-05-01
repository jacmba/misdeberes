import { describe, expect, it } from 'vitest';
import {
  generateCambiaGeneroExercise,
  generateCadaPalabraExercise,
  generateCorrigeErrorExercise,
  generateEngGrammarExercise,
  generateEngListenExercise,
  generateEngNumbersExercise,
  generateEngVocabExercise,
  generateGraficosExercise,
  generateOperacionesExercise,
  generateProblemasExercise,
  generateRelojesExercise
} from './exerciseGenerators';

describe('exercise generators', () => {
  it('generates graficos with valid shape', () => {
    const exercise = generateGraficosExercise();
    expect(exercise.type).toBe('graficos');
    expect(exercise.data).toHaveLength(4);
    expect(exercise.selectedQuestions).toHaveLength(2);
    expect(exercise.data.every(item => item.value >= 2 && item.value <= 8)).toBe(true);
  });

  it('generates operaciones with coherent result', () => {
    for (let i = 0; i < 30; i += 1) {
      const exercise = generateOperacionesExercise();
      const expected = exercise.op === 'suma' ? exercise.val1 + exercise.val2 : exercise.val1 - exercise.val2;
      expect(exercise.res).toBe(expected);
      if (exercise.op === 'resta') expect(exercise.res).toBeGreaterThanOrEqual(0);
    }
  });

  it('generates relojes with correct wraparound targets', () => {
    for (let i = 0; i < 20; i += 1) {
      const exercise = generateRelojesExercise();
      expect(exercise.targetMinute === 0 || exercise.targetMinute === 30).toBe(true);
      expect(exercise.targetBeforeM).toBe(exercise.targetMinute);
      expect(exercise.targetAfterM).toBe(exercise.targetMinute);
      expect(exercise.targetBeforeH).toBe(exercise.targetHour === 1 ? 12 : exercise.targetHour - 1);
      expect(exercise.targetAfterH).toBe(exercise.targetHour === 12 ? 1 : exercise.targetHour + 1);
    }
  });

  it('generates problemas with coherent math and text', () => {
    const exercise = generateProblemasExercise();
    const expected = exercise.op === 'suma' ? exercise.v1 + exercise.v2 : exercise.v1 - exercise.v2;
    expect(exercise.res).toBe(expected);
    expect(exercise.text).toContain(exercise.n1);
    expect(exercise.text).toContain(exercise.n2);
  });

  it('generates english vocab and grammar with expected constraints', () => {
    const vocab = generateEngVocabExercise();
    expect(vocab.displayItems).toHaveLength(6);
    expect(vocab.wordList).toHaveLength(6);
    expect(new Set(vocab.displayItems.map(i => i.numberId)).size).toBe(6);

    const grammar = generateEngGrammarExercise();
    expect(grammar.questions).toHaveLength(4);
    expect(grammar.questions.every(q => q.options.some(o => o.isCorrect))).toBe(true);
  });

  it('generates numbers and listen exercises with valid options', () => {
    const numbers = generateEngNumbersExercise();
    expect(numbers.questions).toHaveLength(5);
    expect(new Set(numbers.questions.map(q => q.number)).size).toBe(5);
    expect(numbers.questions.every(q => q.options.includes(q.correctWord))).toBe(true);

    const listen = generateEngListenExercise();
    expect(listen.type).toBe('listen');
    expect(listen.word.length).toBeGreaterThan(0);
  });

  it('generates cada palabra exercise with 10 unique words', () => {
    const exercise = generateCadaPalabraExercise();
    expect(exercise.type).toBe('cadaPalabra');
    expect(exercise.words).toHaveLength(10);
    expect(new Set(exercise.words.map(item => item.noun)).size).toBe(10);
    expect(exercise.words.every(item => item.gender === 'masculino' || item.gender === 'femenino')).toBe(true);
  });

  it('generates corrige error with 4 always-wrong article pairs', () => {
    const exercise = generateCorrigeErrorExercise();
    expect(exercise.type).toBe('corrigeError');
    expect(exercise.questions).toHaveLength(4);
    expect(
      exercise.questions.every(
        question => question.wrongArticle.toLowerCase() !== question.correctArticle.toLowerCase()
      )
    ).toBe(true);
  });

  it('generates cambia genero with valid answers set', () => {
    const exercise = generateCambiaGeneroExercise();
    expect(exercise.type).toBe('cambiaGenero');
    expect(exercise.prompt.source.length).toBeGreaterThan(0);
    expect(exercise.prompt.validAnswers.length).toBeGreaterThan(0);
  });
});
