import type { CambiaGeneroExercise as CambiaGeneroExerciseType, EngInput } from '../../../features/app/types';
import { cn } from '../../../styles/cn';
import { controls } from '../../../styles/tokens';

interface CambiaGeneroExerciseProps {
  exercise: CambiaGeneroExerciseType;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const CambiaGeneroExercise = ({ exercise, engInput, setEngInput }: CambiaGeneroExerciseProps): JSX.Element => (
  <div className="space-y-8">
    <p className="text-2xl text-slate-500 font-bold text-center">Copia la frase cambiando el género.</p>
    <div className="bg-indigo-50 border-4 border-indigo-200 rounded-3xl p-6">
      <p className="text-3xl font-black text-indigo-900 text-center">{exercise.prompt.source}</p>
    </div>
    <textarea
      value={engInput.respuesta ?? ''}
      onChange={event => setEngInput({ ...engInput, respuesta: event.target.value })}
      placeholder="Escribe aquí la frase cambiada."
      className={cn(controls.baseInput, 'w-full h-24 px-4 py-5 resize-none text-3xl font-black text-center leading-tight')}
    />
  </div>
);

export default CambiaGeneroExercise;
