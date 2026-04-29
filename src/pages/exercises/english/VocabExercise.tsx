import type { EngInput, VocabExercise as VocabExerciseType } from '../../../features/app/types';
import { cn } from '../../../styles/cn';
import { controls } from '../../../styles/tokens';

interface VocabExerciseProps {
  exercise: VocabExerciseType;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const VocabExercise = ({ exercise, engInput, setEngInput }: VocabExerciseProps): JSX.Element => (
  <div className="space-y-12">
    <p className="text-2xl text-slate-500 font-bold text-center">Look at the pictures and match the numbers!</p>
    <div className="flex justify-center gap-6 flex-wrap">
      {exercise.displayItems.map(item => (
        <div key={item.numberId} className="flex flex-col items-center bg-indigo-50 p-6 rounded-[2rem] border-4 border-indigo-100 shadow-sm">
          <div className="bg-white text-indigo-600 font-black text-2xl rounded-full w-10 h-10 flex items-center justify-center mb-4 border-2 border-indigo-200">{item.numberId}</div>
          <span className="text-7xl">{item.emoji}</span>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t-4 border-slate-100">
      {exercise.wordList.map(item => (
        <div key={item.en} className="flex items-center justify-between bg-white p-4 rounded-2xl border-4 border-slate-200">
          <span className="text-3xl font-black text-slate-700 capitalize">{item.en}</span>
          <select value={engInput[item.en] || ''} onChange={e => setEngInput({ ...engInput, [item.en]: e.target.value })} className={cn(controls.baseInput, 'w-16 p-2 text-center text-2xl font-black bg-indigo-50 border-indigo-200 rounded-xl focus:border-indigo-500')}>
            <option value="">?</option>
            {exercise.displayItems.map(d => <option key={d.numberId} value={d.numberId}>{d.numberId}</option>)}
          </select>
        </div>
      ))}
    </div>
  </div>
);

export default VocabExercise;
