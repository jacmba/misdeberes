import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useExerciseController from './useExerciseController';

vi.mock('../domain/generators/exerciseGenerators', () => ({
  generateGraficosExercise: vi.fn(() => ({
    type: 'graficos',
    name: 'Interpretación de Datos',
    id: 'test',
    intro: '',
    unit: '',
    items: [],
    data: [],
    selectedQuestions: []
  })),
  generateOperacionesExercise: vi.fn(() => ({ type: 'operaciones', name: 'Op', op: 'suma', val1: 10, val2: 20, res: 30 })),
  generateRelojesExercise: vi.fn(() => ({
    type: 'relojes',
    name: 'Clock',
    targetHour: 10,
    targetMinute: 30,
    targetBeforeH: 9,
    targetBeforeM: 30,
    targetAfterH: 11,
    targetAfterM: 30
  })),
  generateProblemasExercise: vi.fn(() => ({
    type: 'problemas',
    name: 'Prob',
    n1: 'A',
    n2: 'B',
    item: 'globos',
    v1: 10,
    v2: 2,
    op: 'resta',
    res: 8,
    text: ''
  })),
  generateEngVocabExercise: vi.fn(() => ({ type: 'vocab', name: 'Vocab', displayItems: [], wordList: [] })),
  generateEngGrammarExercise: vi.fn(() => ({ type: 'grammar', name: 'Grammar', animalEmoji: '', animalName: '', questions: [] })),
  generateEngNumbersExercise: vi.fn(() => ({ type: 'numbers', name: 'Numbers', questions: [] })),
  generateEngListenExercise: vi.fn(() => ({ type: 'listen', name: 'Listen', word: 'one', translation: '1', displayEmoji: 1 })),
  generateCadaPalabraExercise: vi.fn(() => ({ type: 'cadaPalabra', name: 'Cada palabra en su lugar', words: [] })),
  generateCorrigeErrorExercise: vi.fn(() => ({ type: 'corrigeError', name: 'Corrige el error', questions: [] })),
  generateCambiaGeneroExercise: vi.fn(() => ({
    type: 'cambiaGenero',
    name: 'Cambia el género',
    prompt: { source: 'El niño está contento.', validAnswers: ['La niña está contenta.'] }
  }))
}));

vi.mock('../domain/validators/exerciseValidators', () => ({
  validateExercise: vi.fn(() => ({ ok: true, successMsg: 'ok', errorMsg: 'no' }))
}));

const makeParams = () => ({
  view: 'exercises' as const,
  currentSection: 'graficos' as const,
  exercise: null,
  isCompleted: false,
  userNumbers: ['', '', '', ''],
  grid: Array(8).fill(null).map(() => Array(4).fill(false)),
  answers: { q1: '', q2: '', total: '' },
  opInput: { tens: '', units: '', carry: '' },
  clockInput: { hour: '', minType: '', beforeH: 12, beforeM: 0, afterH: 12, afterM: 0 },
  probInput: { val1: '', val2: '', averiguo: '', accion: '', tens: '', units: '', carry: '', solucion: '' },
  engInput: {},
  setExercise: vi.fn(),
  setFeedback: vi.fn(),
  setIsCompleted: vi.fn(),
  setUserNumbers: vi.fn(),
  setGrid: vi.fn(),
  setAnswers: vi.fn(),
  setOpInput: vi.fn(),
  setClockInput: vi.fn(),
  setProbInput: vi.fn(),
  setEngInput: vi.fn()
});

describe('useExerciseController', () => {
  it('generates section exercise from effect', () => {
    const params = makeParams();
    renderHook(() => useExerciseController(params));
    expect(params.setExercise).toHaveBeenCalled();
    expect(params.setFeedback).toHaveBeenCalledWith(null);
  });

  it('checkSolution sets success feedback and completion', () => {
    const params = makeParams();
    const { result } = renderHook(() =>
      useExerciseController({
        ...params,
        exercise: {
          type: 'listen',
          name: 'Listen',
          word: 'two',
          translation: '2',
          displayEmoji: 2
        }
      })
    );
    result.current.checkSolution();
    expect(params.setFeedback).toHaveBeenCalledWith({ type: 'success', message: 'ok' });
    expect(params.setIsCompleted).toHaveBeenCalledWith(true);
  });

  it('handleCellClick toggles one grid cell when enabled', () => {
    const params = makeParams();
    const { result } = renderHook(() => useExerciseController(params));
    result.current.handleCellClick(0, 1);

    const updateFn = params.setGrid.mock.calls[1][0] as (value: boolean[][]) => boolean[][];
    const next = updateFn(Array(8).fill(null).map(() => Array(4).fill(false)));
    expect(next[0][1]).toBe(true);
  });
});
