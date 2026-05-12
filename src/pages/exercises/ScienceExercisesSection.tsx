import type { EngInput, Exercise, Section } from '../../features/app/types';
import ScienceChoiceExercise from './science/ScienceChoiceExercise';
import ScienceMatrixExercise from './science/ScienceMatrixExercise';

interface ScienceExercisesSectionProps {
  exercise: Exercise;
  currentSection: Section;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
  featureMatrix: boolean[][];
  onMatrixCellClick: (row: number, col: number) => void;
  isCompleted: boolean;
}

const ScienceExercisesSection = ({
  exercise,
  currentSection,
  engInput,
  setEngInput,
  featureMatrix,
  onMatrixCellClick,
  isCompleted
}: ScienceExercisesSectionProps): JSX.Element | null => {
  if (exercise.type === 'sciTransport' && currentSection === 'sciTransport') {
    return (
      <ScienceChoiceExercise
        intro="Choose collective (many people) or individual (one or few people)."
        questions={exercise.questions}
        engInput={engInput}
        setEngInput={setEngInput}
      />
    );
  }

  if (exercise.type === 'sciHowTravel' && currentSection === 'sciHowTravel') {
    return (
      <ScienceChoiceExercise
        intro="How do we usually travel with each vehicle?"
        questions={exercise.questions}
        engInput={engInput}
        setEngInput={setEngInput}
      />
    );
  }

  if (exercise.type === 'sciWhere' && currentSection === 'sciWhere') {
    return (
      <ScienceChoiceExercise
        intro="Where do we take this transport?"
        questions={exercise.questions}
        engInput={engInput}
        setEngInput={setEngInput}
      />
    );
  }

  if (exercise.type === 'sciMatrix' && currentSection === 'sciMatrix') {
    return (
      <ScienceMatrixExercise
        exercise={exercise}
        featureMatrix={featureMatrix}
        onCellClick={onMatrixCellClick}
        isCompleted={isCompleted}
      />
    );
  }

  return null;
};

export default ScienceExercisesSection;
