import { describe, expect, it } from 'vitest';
import { validateExercise } from './exerciseValidators';
import type { Exercise } from '../../features/app/types';

const baseInput = {
  userNumbers: ['', '', '', ''],
  grid: Array(8).fill(null).map(() => Array(4).fill(false)),
  answers: { q1: '', q2: '', total: '' },
  opInput: { tens: '', units: '', carry: '' },
  clockInput: { hour: '', minType: '', beforeH: 12, beforeM: 0, afterH: 12, afterM: 0 },
  probInput: { val1: '', val2: '', averiguo: '', accion: '', tens: '', units: '', carry: '', solucion: '' },
  engInput: {},
  featureMatrix: []
};

describe('validateExercise', () => {
  it('validates graficos success path', () => {
    const exercise: Exercise = {
      type: 'graficos',
      name: 'Interpretación',
      id: 'demo',
      intro: 'x',
      unit: 'u',
      items: ['A', 'B', 'C', 'D'],
      data: [
        { name: '⚽ Fútbol', value: 2 },
        { name: '🏀 Basket', value: 3 },
        { name: '🎾 Tenis', value: 4 },
        { name: '🏐 Voley', value: 5 }
      ],
      selectedQuestions: [
        { id: 'most', label: 'Most?' },
        { id: 'least', label: 'Least?' }
      ]
    };
    const grid = Array(8).fill(null).map(() => Array(4).fill(false));
    for (let row = 0; row < 2; row += 1) grid[row][0] = true;
    for (let row = 0; row < 3; row += 1) grid[row][1] = true;
    for (let row = 0; row < 4; row += 1) grid[row][2] = true;
    for (let row = 0; row < 5; row += 1) grid[row][3] = true;

    const result = validateExercise({
      ...baseInput,
      exercise,
      userNumbers: ['2', '3', '4', '5'],
      grid,
      answers: { q1: '🏐 Voley', q2: '⚽ Fútbol', total: '14' }
    });

    expect(result.ok).toBe(true);
  });

  it('fails graficos when totals do not match', () => {
    const exercise: Exercise = {
      type: 'graficos',
      name: 'Interpretación',
      id: 'demo',
      intro: 'x',
      unit: 'u',
      items: ['A', 'B', 'C', 'D'],
      data: [
        { name: 'A', value: 2 },
        { name: 'B', value: 2 },
        { name: 'C', value: 2 },
        { name: 'D', value: 2 }
      ],
      selectedQuestions: [
        { id: 'most', label: 'Most?' },
        { id: 'least', label: 'Least?' }
      ]
    };
    const result = validateExercise({
      ...baseInput,
      exercise,
      userNumbers: ['2', '2', '2', '2'],
      answers: { q1: 'A', q2: 'D', total: '99' }
    });
    expect(result.ok).toBe(false);
  });

  it('validates operaciones by tens/units', () => {
    const exercise: Exercise = { type: 'operaciones', name: 'Op', op: 'suma', val1: 21, val2: 22, res: 43 };
    const ok = validateExercise({ ...baseInput, exercise, opInput: { tens: '4', units: '3', carry: '' } });
    const fail = validateExercise({ ...baseInput, exercise, opInput: { tens: '9', units: '9', carry: '' } });
    expect(ok.ok).toBe(true);
    expect(fail.ok).toBe(false);
  });

  it('validates relojes exact matching', () => {
    const exercise: Exercise = {
      type: 'relojes',
      name: 'Clock',
      targetHour: 8,
      targetMinute: 30,
      targetBeforeH: 7,
      targetBeforeM: 30,
      targetAfterH: 9,
      targetAfterM: 30
    };
    const result = validateExercise({
      ...baseInput,
      exercise,
      clockInput: { hour: '8', minType: '30', beforeH: 7, beforeM: 30, afterH: 9, afterM: 30 }
    });
    expect(result.ok).toBe(true);
  });

  it('validates problemas business rules', () => {
    const exercise: Exercise = {
      type: 'problemas',
      name: 'Problema',
      n1: 'Ana',
      n2: 'Luis',
      item: 'globos',
      v1: 12,
      v2: 11,
      op: 'resta',
      res: 1,
      text: '...'
    };
    const ok = validateExercise({
      ...baseInput,
      exercise,
      probInput: { val1: '12', val2: '11', averiguo: 'diferencia', accion: 'restar', tens: '0', units: '1', carry: '', solucion: '1' }
    });
    expect(ok.ok).toBe(true);
  });

  it('validates english exercise variants', () => {
    const vocab: Exercise = {
      type: 'vocab',
      name: 'Voc',
      displayItems: [],
      wordList: [
        { es: 'brazo', en: 'arm', plural: 'arms', emoji: '💪', numberId: 2 },
        { es: 'ojo', en: 'eye', plural: 'eyes', emoji: '👁️', numberId: 1 }
      ]
    };
    const grammar: Exercise = {
      type: 'grammar',
      name: 'Grammar',
      animalEmoji: '🐶',
      animalName: 'dog',
      questions: [{ part: 'ears', correctCount: 2, emoji: '👂', options: [{ label: 'two', isCorrect: true }, { label: 'three', isCorrect: false }] }]
    };
    const numbers: Exercise = {
      type: 'numbers',
      name: 'Numbers',
      questions: [{ number: 3, correctWord: 'three', options: ['three', 'five', 'seven'] }]
    };
    const listen: Exercise = { type: 'listen', name: 'Listen', word: 'hand', translation: 'mano', displayEmoji: '✋' };

    expect(validateExercise({ ...baseInput, exercise: vocab, engInput: { arm: '2', eye: '1' } }).ok).toBe(true);
    expect(validateExercise({ ...baseInput, exercise: grammar, engInput: { q0: 'two' } }).ok).toBe(true);
    expect(validateExercise({ ...baseInput, exercise: numbers, engInput: { n0: 'three' } }).ok).toBe(true);
    expect(validateExercise({ ...baseInput, exercise: listen }).ok).toBe(true);
  });

  it('validates corrige error answers as case-insensitive article only', () => {
    const exercise: Exercise = {
      type: 'corrigeError',
      name: 'Corrige el error',
      questions: [
        { noun: 'perro', wrongArticle: 'la', correctArticle: 'el' },
        { noun: 'abuelas', wrongArticle: 'el', correctArticle: 'las' },
        { noun: 'libreta', wrongArticle: 'los', correctArticle: 'la' },
        { noun: 'estuches', wrongArticle: 'la', correctArticle: 'los' }
      ]
    };

    const ok = validateExercise({
      ...baseInput,
      exercise,
      engInput: { q0: 'EL', q1: 'Las', q2: 'la', q3: 'los' }
    });
    const fail = validateExercise({
      ...baseInput,
      exercise,
      engInput: { q0: 'la', q1: 'las', q2: 'la', q3: 'los' }
    });

    expect(ok.ok).toBe(true);
    expect(fail.ok).toBe(false);
  });

  it('validates cambia genero with accent-insensitive multiple valid answers and strict format', () => {
    const exercise: Exercise = {
      type: 'cambiaGenero',
      name: 'Cambia el género',
      prompt: {
        source: 'El niño está contento.',
        validAnswers: ['La niña está contenta.', 'La niña esta contenta.']
      }
    };

    const ok = validateExercise({
      ...baseInput,
      exercise,
      engInput: { respuesta: 'La niña está contenta.' }
    });
    const wrongCase = validateExercise({
      ...baseInput,
      exercise,
      engInput: { respuesta: 'la niña está contenta.' }
    });
    const wrongPunctuation = validateExercise({
      ...baseInput,
      exercise,
      engInput: { respuesta: 'La niña está contenta' }
    });

    expect(ok.ok).toBe(true);
    expect(wrongCase.ok).toBe(false);
    expect(wrongPunctuation.ok).toBe(false);
  });

  it('validates science transport with correct radio labels', () => {
    const exercise: Exercise = {
      type: 'sciTransport',
      name: 'Transport',
      questions: [
        { prompt: 'Bus?', emoji: '🚌', options: [{ label: 'Collective', isCorrect: true }, { label: 'Individual', isCorrect: false }] }
      ]
    };
    expect(validateExercise({ ...baseInput, exercise, engInput: { q0: 'Collective' } }).ok).toBe(true);
    expect(validateExercise({ ...baseInput, exercise, engInput: { q0: 'Individual' } }).ok).toBe(false);
  });

  it('validates science matrix against featureMatrix', () => {
    const solution = [
      [true, false],
      [false, true]
    ];
    const exercise: Exercise = {
      type: 'sciMatrix',
      name: 'Matrix',
      rowLabels: ['A', 'B'],
      columnLabels: ['c1', 'c2'],
      solution
    };
    const ok = validateExercise({ ...baseInput, exercise, featureMatrix: solution.map(row => [...row]) });
    const bad = validateExercise({ ...baseInput, exercise, featureMatrix: [[false, false], [false, false]] });
    const wrongDims = validateExercise({ ...baseInput, exercise, featureMatrix: [[true]] });
    expect(ok.ok).toBe(true);
    expect(bad.ok).toBe(false);
    expect(wrongDims.ok).toBe(false);
  });
});
