import type { CorrigeErrorExercise, EngInput } from '../../../features/app/types';
import { controls } from '../../../styles/tokens';
import { cn } from '../../../styles/cn';

interface CorrigeElErrorExerciseProps {
  exercise: CorrigeErrorExercise;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const CorrigeElErrorExercise = ({ exercise, engInput, setEngInput }: CorrigeElErrorExerciseProps): JSX.Element => (
  <div className="space-y-8">
    <p className="text-2xl text-slate-500 font-bold text-center">El artículo está mal. Escribe solo el artículo correcto.</p>
    <div className="grid md:grid-cols-2 gap-6">
      {exercise.questions.map((question, idx) => (
        <div key={`${question.noun}-${idx}`} className="bg-white border-4 border-slate-200 rounded-3xl p-5">
          <p className="text-3xl font-black text-slate-700 mb-4">
            <span className="text-rose-500">{question.wrongArticle}</span> {question.noun}
          </p>
          <input
            value={engInput[`q${idx}`] ?? ''}
            onChange={event => setEngInput({ ...engInput, [`q${idx}`]: event.target.value })}
            placeholder="el / la / los / las"
            className={cn(controls.baseInput, 'w-full h-[75px] px-4 pt-1 text-3xl font-black text-center leading-none')}
          />
        </div>
      ))}
    </div>
  </div>
);

export default CorrigeElErrorExercise;
