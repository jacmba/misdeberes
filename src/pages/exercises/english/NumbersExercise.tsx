import type { EngInput, NumbersExercise as NumbersExerciseType } from '../../../features/app/types';
import { answerOption } from '../../../styles/variants';
import { cn } from '../../../styles/cn';

interface NumbersExerciseProps {
  exercise: NumbersExerciseType;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const NumbersExercise = ({ exercise, engInput, setEngInput }: NumbersExerciseProps): JSX.Element => (
  <div className="space-y-8">
    <p className="text-3xl text-slate-500 font-bold text-center mb-10">Read the number and choose the correct word!</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {exercise.questions.map((q, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[3rem] border-[6px] border-sky-100 flex flex-col items-center shadow-sm">
          <div className="text-8xl font-black text-sky-600 mb-8 bg-sky-50 w-32 h-32 flex items-center justify-center rounded-full border-4 border-sky-200 shadow-inner">{q.number}</div>
          <div className="flex flex-col gap-3 w-full">
            {q.options.map(opt => (
              <label
                key={opt}
                className={cn(
                  answerOption({ selected: engInput[`n${idx}`] === opt, tone: 'sky' }),
                  'w-full text-center px-6 py-4 rounded-2xl font-black text-3xl capitalize'
                )}
              >
                <input type="radio" name={`n${idx}`} value={opt} onChange={() => setEngInput({ ...engInput, [`n${idx}`]: opt })} className="hidden" />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NumbersExercise;
