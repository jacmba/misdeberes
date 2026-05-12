import type { EngInput, ScienceChoiceQuestion } from '../../../features/app/types';
import { answerOption } from '../../../styles/variants';
import { cn } from '../../../styles/cn';

interface ScienceChoiceExerciseProps {
  intro: string;
  questions: ScienceChoiceQuestion[];
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const ScienceChoiceExercise = ({ intro, questions, engInput, setEngInput }: ScienceChoiceExerciseProps): JSX.Element => (
  <div className="space-y-6">
    <p className="text-2xl text-slate-500 font-bold text-center">{intro}</p>
    <div className="w-full space-y-4">
      {questions.map((q, idx) => (
        <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-50 p-5 rounded-[2rem] border-4 border-slate-200 w-full">
          <span className="text-4xl shrink-0">{q.emoji}</span>
          <p className="text-2xl md:text-3xl font-black text-slate-700 flex-1">{q.prompt}</p>
          <div className="flex flex-wrap gap-3 shrink-0">
            {q.options.map(opt => (
              <label
                key={opt.label}
                className={cn(
                  answerOption({ selected: engInput[`q${idx}`] === opt.label, tone: 'indigo' }),
                  'px-5 py-3 rounded-2xl font-black text-xl'
                )}
              >
                <input
                  type="radio"
                  name={`sci-q${idx}`}
                  value={opt.label}
                  onChange={() => setEngInput({ ...engInput, [`q${idx}`]: opt.label })}
                  className="hidden"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ScienceChoiceExercise;
