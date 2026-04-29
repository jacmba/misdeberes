import type { EngInput, Exercise, Section } from '../../features/app/types';
import VocabExercise from './english/VocabExercise';
import GrammarExercise from './english/GrammarExercise';
import NumbersExercise from './english/NumbersExercise';
import ListenExercise from './english/ListenExercise';

interface EnglishExercisesSectionProps {
  exercise: Exercise;
  currentSection: Section;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
  playAudio: (text: string) => void;
}

const EnglishExercisesSection = ({ exercise, currentSection, engInput, setEngInput, playAudio }: EnglishExercisesSectionProps): JSX.Element | null => {
  if (exercise.type === 'vocab' && currentSection === 'vocab') {
    return <VocabExercise exercise={exercise} engInput={engInput} setEngInput={setEngInput} />;
  }

  if (exercise.type === 'grammar' && currentSection === 'grammar') {
    return <GrammarExercise exercise={exercise} engInput={engInput} setEngInput={setEngInput} />;
  }

  if (exercise.type === 'numbers' && currentSection === 'numbers') {
    return <NumbersExercise exercise={exercise} engInput={engInput} setEngInput={setEngInput} />;
  }

  if (exercise.type === 'listen' && currentSection === 'listen') {
    return <ListenExercise exercise={exercise} playAudio={playAudio} />;
  }

  return null;
};

export default EnglishExercisesSection;
