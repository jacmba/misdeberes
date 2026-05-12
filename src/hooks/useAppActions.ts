import {
  setAnswers as setAnswersAction,
  setClockInput as setClockInputAction,
  setCurrentSection as setCurrentSectionAction,
  setEngInput as setEngInputAction,
  setExercise as setExerciseAction,
  setFeatureMatrix as setFeatureMatrixAction,
  setFeedback as setFeedbackAction,
  setGrid as setGridAction,
  setIsCompleted as setIsCompletedAction,
  setOpInput as setOpInputAction,
  setProbInput as setProbInputAction,
  setSubject as setSubjectAction,
  setUserNumbers as setUserNumbersAction,
  setView as setViewAction
} from '../features/app/appSlice';
import type { AnswersInput, ClockInput, EngInput, Exercise, FeedbackState, OpInput, ProbInput, Section, Subject, View } from '../features/app/types';
import { useAppDispatch, useAppSelector } from '../app/store';

const useAppActions = () => {
  const dispatch = useAppDispatch();
  const { grid, clockInput, featureMatrix } = useAppSelector(state => state.app);

  const setView = (value: View) => dispatch(setViewAction(value));
  const setSubject = (value: Subject) => dispatch(setSubjectAction(value));
  const setCurrentSection = (value: Section) => dispatch(setCurrentSectionAction(value));
  const setExercise = (value: Exercise | null) => dispatch(setExerciseAction(value));
  const setFeedback = (value: FeedbackState | null) => dispatch(setFeedbackAction(value));
  const setIsCompleted = (value: boolean) => dispatch(setIsCompletedAction(value));
  const setUserNumbers = (value: string[]) => dispatch(setUserNumbersAction(value));
  const setGrid = (value: boolean[][] | ((prev: boolean[][]) => boolean[][])) => dispatch(setGridAction(typeof value === 'function' ? value(grid) : value));
  const setAnswers = (value: AnswersInput) => dispatch(setAnswersAction(value));
  const setOpInput = (value: OpInput) => dispatch(setOpInputAction(value));
  const setClockInput = (value: ClockInput | ((prev: ClockInput) => ClockInput)) => dispatch(setClockInputAction(typeof value === 'function' ? value(clockInput) : value));
  const setProbInput = (value: ProbInput) => dispatch(setProbInputAction(value));
  const setEngInput = (value: EngInput) => dispatch(setEngInputAction(value));
  const setFeatureMatrix = (value: boolean[][] | ((prev: boolean[][]) => boolean[][])) =>
    dispatch(setFeatureMatrixAction(typeof value === 'function' ? value(featureMatrix) : value));

  return {
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
  };
};

export default useAppActions;
