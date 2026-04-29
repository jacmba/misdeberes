import { describe, expect, it } from 'vitest';
import reducer, {
  setAnswers,
  setClockInput,
  setCurrentSection,
  setEngInput,
  setExercise,
  setFeedback,
  setIsCompleted,
  setOpInput,
  setProbInput,
  setSubject,
  setUserNumbers,
  setView
} from './appSlice';
import type { AppState } from './types';

const initial = reducer(undefined, { type: '@@INIT' }) as AppState;

describe('appSlice', () => {
  it('has expected initial state shape', () => {
    expect(initial.view).toBe('landing');
    expect(initial.subject).toBeNull();
    expect(initial.grid).toHaveLength(8);
    expect(initial.grid[0]).toHaveLength(4);
    expect(initial.feedback).toBeNull();
  });

  it('updates top-level state fields', () => {
    let state = reducer(initial, setView('themes'));
    state = reducer(state, setSubject('matematicas'));
    state = reducer(state, setCurrentSection('graficos'));
    state = reducer(state, setIsCompleted(true));
    state = reducer(state, setFeedback({ type: 'success', message: 'ok' }));

    expect(state.view).toBe('themes');
    expect(state.subject).toBe('matematicas');
    expect(state.currentSection).toBe('graficos');
    expect(state.isCompleted).toBe(true);
    expect(state.feedback?.type).toBe('success');
  });

  it('updates exercise and input payloads', () => {
    let state = reducer(
      initial,
      setExercise({ type: 'listen', name: 'Listen and Repeat', word: 'eye', translation: 'ojo', displayEmoji: '👁️' })
    );
    state = reducer(state, setUserNumbers(['1', '2', '3', '4']));
    state = reducer(state, setAnswers({ q1: 'a', q2: 'b', total: '5' }));
    state = reducer(state, setOpInput({ tens: '1', units: '2', carry: '' }));
    state = reducer(state, setClockInput({ hour: '3', minType: '30', beforeH: 2, beforeM: 30, afterH: 4, afterM: 30 }));
    state = reducer(state, setProbInput({ val1: '1', val2: '2', averiguo: 'total', accion: 'sumar', tens: '0', units: '3', carry: '', solucion: '3' }));
    state = reducer(state, setEngInput({ q0: 'two' }));

    expect(state.exercise?.type).toBe('listen');
    expect(state.userNumbers).toEqual(['1', '2', '3', '4']);
    expect(state.answers.total).toBe('5');
    expect(state.opInput.units).toBe('2');
    expect(state.clockInput.minType).toBe('30');
    expect(state.probInput.solucion).toBe('3');
    expect(state.engInput.q0).toBe('two');
  });
});
