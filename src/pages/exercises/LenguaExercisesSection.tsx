import type { EngInput, Exercise, Section } from '../../features/app/types';
import CadaPalabraEnSuLugarExercise from './lengua/CadaPalabraEnSuLugarExercise';
import CambiaGeneroExercise from './lengua/CambiaGeneroExercise';
import CorrigeElErrorExercise from './lengua/CorrigeElErrorExercise';

interface LenguaExercisesSectionProps {
  exercise: Exercise;
  currentSection: Section;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const LenguaExercisesSection = ({ exercise, currentSection, engInput, setEngInput }: LenguaExercisesSectionProps): JSX.Element | null => {
  if (exercise.type === 'cadaPalabra' && currentSection === 'cadaPalabra') {
    return <CadaPalabraEnSuLugarExercise exercise={exercise} engInput={engInput} setEngInput={setEngInput} />;
  }

  if (exercise.type === 'corrigeError' && currentSection === 'corrigeError') {
    return <CorrigeElErrorExercise exercise={exercise} engInput={engInput} setEngInput={setEngInput} />;
  }

  if (exercise.type === 'cambiaGenero' && currentSection === 'cambiaGenero') {
    return <CambiaGeneroExercise exercise={exercise} engInput={engInput} setEngInput={setEngInput} />;
  }

  return null;
};

export default LenguaExercisesSection;
