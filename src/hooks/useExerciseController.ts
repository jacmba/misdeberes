import { useCallback, useEffect } from 'react';
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
} from '../domain/generators/exerciseGenerators';
import { validateExercise } from '../domain/validators/exerciseValidators';
import type { AnswersInput, ClockInput, EngInput, Exercise, FeedbackState, OpInput, ProbInput, Section, View } from '../features/app/types';

interface UseExerciseControllerParams {
  view: View;
  currentSection: Section;
  exercise: Exercise | null;
  isCompleted: boolean;
  userNumbers: string[];
  grid: boolean[][];
  answers: AnswersInput;
  opInput: OpInput;
  clockInput: ClockInput;
  probInput: ProbInput;
  engInput: EngInput;
  setExercise: (value: Exercise | null) => void;
  setFeedback: (value: FeedbackState | null) => void;
  setIsCompleted: (value: boolean) => void;
  setUserNumbers: (value: string[]) => void;
  setGrid: (value: boolean[][] | ((prev: boolean[][]) => boolean[][])) => void;
  setAnswers: (value: AnswersInput) => void;
  setOpInput: (value: OpInput) => void;
  setClockInput: (value: ClockInput) => void;
  setProbInput: (value: ProbInput) => void;
  setEngInput: (value: EngInput) => void;
}

const useExerciseController = ({
  view,
  currentSection,
  exercise,
  isCompleted,
  userNumbers,
  grid,
  answers,
  opInput,
  clockInput,
  probInput,
  engInput,
  setExercise,
  setFeedback,
  setIsCompleted,
  setUserNumbers,
  setGrid,
  setAnswers,
  setOpInput,
  setClockInput,
  setProbInput,
  setEngInput
}: UseExerciseControllerParams) => {
  const playAudio = (text: string): void => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateGraficos = useCallback(() => {
    setExercise(generateGraficosExercise());
    setUserNumbers(['', '', '', '']);
    setGrid(Array(8).fill(null).map(() => Array(4).fill(false)));
    setAnswers({ q1: '', q2: '', total: '' });
    setFeedback(null);
    setIsCompleted(false);
  }, [setAnswers, setExercise, setFeedback, setGrid, setIsCompleted, setUserNumbers]);

  const generateOperaciones = useCallback(() => {
    setExercise(generateOperacionesExercise());
    setOpInput({ tens: '', units: '', carry: '' });
    setFeedback(null);
    setIsCompleted(false);
  }, [setExercise, setFeedback, setIsCompleted, setOpInput]);

  const generateRelojes = useCallback(() => {
    setExercise(generateRelojesExercise());
    setClockInput({ hour: '', minType: '', beforeH: 12, beforeM: 0, afterH: 12, afterM: 0 });
    setFeedback(null);
    setIsCompleted(false);
  }, [setClockInput, setExercise, setFeedback, setIsCompleted]);

  const generateProblemas = useCallback(() => {
    setExercise(generateProblemasExercise());
    setProbInput({ val1: '', val2: '', averiguo: '', accion: '', tens: '', units: '', carry: '', solucion: '' });
    setFeedback(null);
    setIsCompleted(false);
  }, [setExercise, setFeedback, setIsCompleted, setProbInput]);

  const generateEngVocab = useCallback(() => {
    setExercise(generateEngVocabExercise());
    setEngInput({});
    setFeedback(null);
    setIsCompleted(false);
  }, [setEngInput, setExercise, setFeedback, setIsCompleted]);

  const generateEngGrammar = useCallback(() => {
    setExercise(generateEngGrammarExercise());
    setEngInput({});
    setFeedback(null);
    setIsCompleted(false);
  }, [setEngInput, setExercise, setFeedback, setIsCompleted]);

  const generateEngNumbers = useCallback(() => {
    setExercise(generateEngNumbersExercise());
    setEngInput({});
    setFeedback(null);
    setIsCompleted(false);
  }, [setEngInput, setExercise, setFeedback, setIsCompleted]);

  const generateEngListen = useCallback(() => {
    setExercise(generateEngListenExercise());
    setFeedback(null);
    setIsCompleted(false);
  }, [setExercise, setFeedback, setIsCompleted]);

  const generateCadaPalabra = useCallback(() => {
    setExercise(generateCadaPalabraExercise());
    setEngInput({});
    setFeedback(null);
    setIsCompleted(false);
  }, [setEngInput, setExercise, setFeedback, setIsCompleted]);

  const generateCorrigeError = useCallback(() => {
    setExercise(generateCorrigeErrorExercise());
    setEngInput({});
    setFeedback(null);
    setIsCompleted(false);
  }, [setEngInput, setExercise, setFeedback, setIsCompleted]);

  const generateCambiaGenero = useCallback(() => {
    setExercise(generateCambiaGeneroExercise());
    setEngInput({});
    setFeedback(null);
    setIsCompleted(false);
  }, [setEngInput, setExercise, setFeedback, setIsCompleted]);

  useEffect(() => {
    if (view !== 'exercises' || !currentSection) return;

    const sectionTypeMap: Record<Exclude<Section, ''>, string> = {
      graficos: 'graficos',
      operaciones: 'operaciones',
      relojes: 'relojes',
      problemas: 'problemas',
      vocab: 'vocab',
      grammar: 'grammar',
      numbers: 'numbers',
      listen: 'listen',
      cadaPalabra: 'cadaPalabra',
      corrigeError: 'corrigeError',
      cambiaGenero: 'cambiaGenero'
    };

    const targetType = sectionTypeMap[currentSection as Exclude<Section, ''>];
    if (!targetType) return;
    if (exercise?.type === targetType) return;

    if (currentSection === 'graficos') generateGraficos();
    if (currentSection === 'operaciones') generateOperaciones();
    if (currentSection === 'relojes') generateRelojes();
    if (currentSection === 'problemas') generateProblemas();
    if (currentSection === 'vocab') generateEngVocab();
    if (currentSection === 'grammar') generateEngGrammar();
    if (currentSection === 'numbers') generateEngNumbers();
    if (currentSection === 'listen') generateEngListen();
    if (currentSection === 'cadaPalabra') generateCadaPalabra();
    if (currentSection === 'corrigeError') generateCorrigeError();
    if (currentSection === 'cambiaGenero') generateCambiaGenero();
  }, [view, currentSection, exercise, generateGraficos, generateOperaciones, generateRelojes, generateProblemas, generateEngVocab, generateEngGrammar, generateEngNumbers, generateEngListen, generateCadaPalabra, generateCorrigeError, generateCambiaGenero]);

  const checkSolution = (): void => {
    if (!exercise) return;
    const { ok, successMsg, errorMsg } = validateExercise({ exercise, userNumbers, grid, answers, opInput, clockInput, probInput, engInput });
    if (ok) {
      setFeedback({ type: 'success', message: successMsg });
      setIsCompleted(true);
    } else {
      setFeedback({ type: 'error', message: errorMsg });
    }
  };

  const handleCellClick = (row: number, col: number): void => {
    if (isCompleted || currentSection !== 'graficos') return;
    setGrid(prev =>
      prev.map((r, rIdx) =>
        rIdx === row ? r.map((cell, cIdx) => (cIdx === col ? !cell : cell)) : r
      )
    );
  };

  return {
    playAudio,
    checkSolution,
    handleCellClick,
    generateGraficos,
    generateOperaciones,
    generateRelojes,
    generateProblemas,
    generateEngVocab,
    generateEngGrammar,
    generateEngNumbers,
    generateEngListen,
    generateCadaPalabra,
    generateCorrigeError,
    generateCambiaGenero
  };
};

export default useExerciseController;
