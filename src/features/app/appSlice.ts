import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AnswersInput,
  AppState,
  ClockInput,
  EngInput,
  Exercise,
  FeedbackState,
  OpInput,
  ProbInput,
  Section,
  Subject,
  View
} from './types';

const initialState: AppState = {
  view: 'landing',
  subject: null,
  currentSection: '',
  exercise: null,
  feedback: null,
  isCompleted: false,
  userNumbers: ['', '', '', ''],
  grid: Array(8).fill(null).map(() => Array(4).fill(false)),
  answers: { q1: '', q2: '', total: '' },
  opInput: { tens: '', units: '', carry: '' },
  clockInput: { hour: '', minType: '', beforeH: 12, beforeM: 0, afterH: 12, afterM: 0 },
  probInput: { val1: '', val2: '', averiguo: '', accion: '', tens: '', units: '', carry: '', solucion: '' },
  engInput: {},
  featureMatrix: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setView(state, action: PayloadAction<View>) { state.view = action.payload; },
    setSubject(state, action: PayloadAction<Subject>) { state.subject = action.payload; },
    setCurrentSection(state, action: PayloadAction<Section>) { state.currentSection = action.payload; },
    setExercise(state, action: PayloadAction<Exercise | null>) { state.exercise = action.payload; },
    setFeedback(state, action: PayloadAction<FeedbackState | null>) { state.feedback = action.payload; },
    setIsCompleted(state, action: PayloadAction<boolean>) { state.isCompleted = action.payload; },
    setUserNumbers(state, action: PayloadAction<string[]>) { state.userNumbers = action.payload; },
    setGrid(state, action: PayloadAction<boolean[][]>) { state.grid = action.payload; },
    setAnswers(state, action: PayloadAction<AnswersInput>) { state.answers = action.payload; },
    setOpInput(state, action: PayloadAction<OpInput>) { state.opInput = action.payload; },
    setClockInput(state, action: PayloadAction<ClockInput>) { state.clockInput = action.payload; },
    setProbInput(state, action: PayloadAction<ProbInput>) { state.probInput = action.payload; },
    setEngInput(state, action: PayloadAction<EngInput>) { state.engInput = action.payload; },
    setFeatureMatrix(state, action: PayloadAction<boolean[][]>) { state.featureMatrix = action.payload; }
  }
});

export const {
  setView,
  setSubject,
  setCurrentSection,
  setExercise,
  setFeedback,
  setIsCompleted,
  setUserNumbers,
  setGrid,
  setAnswers,
  setOpInput,
  setClockInput,
  setProbInput,
  setEngInput,
  setFeatureMatrix
} = appSlice.actions;

export default appSlice.reducer;
