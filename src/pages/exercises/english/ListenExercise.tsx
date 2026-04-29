import { Volume2 } from 'lucide-react';
import type { ListenExercise as ListenExerciseType } from '../../../features/app/types';
import { controls } from '../../../styles/tokens';
import { cn } from '../../../styles/cn';

interface ListenExerciseProps {
  exercise: ListenExerciseType;
  playAudio: (text: string) => void;
}

const ListenExercise = ({ exercise, playAudio }: ListenExerciseProps): JSX.Element => (
  <div className="flex flex-col items-center py-12">
    <p className="text-3xl text-slate-500 font-bold text-center mb-12">Click to listen and repeat out loud!</p>
    <div className="bg-indigo-50 p-16 rounded-[4rem] border-[8px] border-indigo-200 flex flex-col items-center shadow-xl w-full max-w-2xl relative">
      <span className="text-[9rem] leading-none mb-8 font-black text-indigo-950 drop-shadow-md">{exercise.displayEmoji}</span>
      <h2 className="text-7xl font-black text-indigo-900 mb-4 capitalize">{exercise.word}</h2>
      <p className="text-2xl font-bold text-slate-400 mb-12 uppercase tracking-widest">({exercise.translation})</p>
      <button onClick={() => playAudio(exercise.word)} className={cn(controls.shadowButton, 'bg-rose-500 hover:bg-rose-600 text-white rounded-full p-8 shadow-xl active:scale-90 flex items-center justify-center group absolute -bottom-12 border-8 border-white')}>
        <Volume2 size={64} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  </div>
);

export default ListenExercise;
