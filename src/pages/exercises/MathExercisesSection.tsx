import type { AnswersInput, ClockInput, Exercise, OpInput, ProbInput, Section } from '../../features/app/types';
import GraficosExercise from './math/GraficosExercise';
import OperacionesExercise from './math/OperacionesExercise';
import RelojesExercise from './math/RelojesExercise';
import ProblemasExercise from './math/ProblemasExercise';

interface MathExercisesSectionProps {
  exercise: Exercise;
  currentSection: Section;
  userNumbers: string[];
  grid: boolean[][];
  answers: AnswersInput;
  opInput: OpInput;
  clockInput: ClockInput;
  probInput: ProbInput;
  setUserNumbers: (value: string[]) => void;
  setAnswers: (value: AnswersInput) => void;
  setOpInput: (value: OpInput) => void;
  setClockInput: (value: ClockInput) => void;
  setProbInput: (value: ProbInput) => void;
  handleCellClick: (row: number, col: number) => void;
}

const MathExercisesSection = ({
  exercise,
  currentSection,
  userNumbers,
  grid,
  answers,
  opInput,
  clockInput,
  probInput,
  setUserNumbers,
  setAnswers,
  setOpInput,
  setClockInput,
  setProbInput,
  handleCellClick
}: MathExercisesSectionProps): JSX.Element | null => {
  if (exercise.type === 'graficos' && currentSection === 'graficos') {
    return (
      <GraficosExercise
        exercise={exercise}
        userNumbers={userNumbers}
        grid={grid}
        answers={answers}
        setUserNumbers={setUserNumbers}
        setAnswers={setAnswers}
        handleCellClick={handleCellClick}
      />
    );
  }

  if (exercise.type === 'operaciones' && currentSection === 'operaciones') {
    return (
      <OperacionesExercise
        exercise={exercise}
        opInput={opInput}
        setOpInput={setOpInput}
      />
    );
  }

  if (exercise.type === 'relojes' && currentSection === 'relojes') {
    return (
      <RelojesExercise
        exercise={exercise}
        clockInput={clockInput}
        setClockInput={setClockInput}
      />
    );
  }

  if (exercise.type === 'problemas' && currentSection === 'problemas') {
    return (
      <ProblemasExercise
        exercise={exercise}
        probInput={probInput}
        setProbInput={setProbInput}
      />
    );
  }

  return null;
};

export default MathExercisesSection;
