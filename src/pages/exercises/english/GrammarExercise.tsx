import type { EngInput, GrammarExercise as GrammarExerciseType } from '../../../features/app/types';
import { answerOption } from '../../../styles/variants';
import { cn } from '../../../styles/cn';

interface GrammarExerciseProps {
  exercise: GrammarExerciseType;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const GrammarExercise = ({ exercise, engInput, setEngInput }: GrammarExerciseProps): JSX.Element => (
  <div className="flex flex-col items-center py-4">
    <div className="w-full flex flex-col items-center mb-10 bg-amber-50 p-8 rounded-[3rem] border-[6px] border-amber-200 max-w-2xl shadow-sm">
      <span className="text-[10rem] leading-none mb-4 animate-bounce">{exercise.animalEmoji}</span>
      <p className="text-3xl font-black text-slate-600 text-center mb-2">"Hi! I am a {exercise.animalName}!"</p>
    </div>
    <div className="w-full space-y-4">
      {exercise.questions.map((q, idx) => (
        <div key={idx} className="flex items-center gap-6 bg-slate-50 p-5 rounded-[2rem] border-4 border-slate-200 w-full">
          <span className="text-4xl">{q.emoji}</span>
          <p className="text-3xl font-black text-slate-600 flex-1">I've got <span className="text-indigo-300">______</span> {q.part}.</p>
          <div className="flex gap-4">
            {q.options.map(opt => (
              <label
                key={opt.label}
                className={cn(
                  answerOption({ selected: engInput[`q${idx}`] === opt.label, tone: 'indigo' }),
                  'px-6 py-3 rounded-2xl font-black text-2xl'
                )}
              >
                <input type="radio" name={`q${idx}`} value={opt.label} onChange={() => setEngInput({ ...engInput, [`q${idx}`]: opt.label })} className="hidden" />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GrammarExercise;
