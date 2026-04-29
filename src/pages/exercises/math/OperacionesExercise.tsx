import type { OpInput, OperacionesExercise } from '../../../features/app/types';
import { cn } from '../../../styles/cn';
import { controls } from '../../../styles/tokens';

interface OperacionesExerciseProps {
  exercise: OperacionesExercise;
  opInput: OpInput;
  setOpInput: (value: OpInput) => void;
}

const OperacionesExercise = ({ exercise, opInput, setOpInput }: OperacionesExerciseProps): JSX.Element => (
  <div className="flex flex-col items-center py-8">
    <p className="text-3xl text-center mb-16 text-slate-500 font-medium tracking-wide">¡Haz la cuenta con mucho cuidado!</p>
    <div className="relative inline-block bg-white p-12 rounded-[4rem] border-8 border-indigo-50 shadow-2xl">
      <h3 className="text-indigo-900 font-black uppercase text-sm border-b-4 border-indigo-100 pb-2 mb-10 self-stretch text-center">Operación</h3>
      <div className="relative inline-block text-7xl font-mono font-black text-slate-700 mt-4">
        <div className="grid grid-cols-3 gap-0">
          <div className="w-24 h-24" /><div className="w-24 h-24 flex items-center justify-center">{Math.floor(exercise.val1 / 10)}</div><div className="w-24 h-24 flex items-center justify-center">{exercise.val1 % 10}</div>
          <div className="w-24 h-24 flex items-center justify-center text-indigo-500">{exercise.op === 'suma' ? '+' : '-'}</div><div className="w-24 h-24 flex items-center justify-center">{Math.floor(exercise.val2 / 10)}</div><div className="w-24 h-24 flex items-center justify-center">{exercise.val2 % 10}</div>
          <div className="col-span-3 h-4 bg-slate-800 my-6 rounded-full shadow-sm" />
          <div className="w-24 h-24" />
          <div className="w-24 h-24 flex items-center justify-center"><input type="number" value={opInput.tens} onChange={e => setOpInput({ ...opInput, tens: e.target.value.slice(-1) })} className={cn(controls.baseInput, 'w-20 h-20 text-center bg-indigo-50 border-indigo-200 rounded-3xl text-6xl font-black text-indigo-900 shadow-inner focus:border-indigo-500')} /></div>
          <div className="w-24 h-24 flex items-center justify-center"><input type="number" value={opInput.units} onChange={e => setOpInput({ ...opInput, units: e.target.value.slice(-1) })} className={cn(controls.baseInput, 'w-20 h-20 text-center bg-indigo-50 border-indigo-200 rounded-3xl text-6xl font-black text-indigo-900 shadow-inner focus:border-indigo-500')} /></div>
        </div>
        {exercise.op === 'suma' && (
          <div className="absolute -top-12 left-1/2 -translate-x-12 flex flex-col items-center z-10">
            <input type="number" value={opInput.carry} onChange={e => setOpInput({ ...opInput, carry: e.target.value })} className="w-12 h-12 text-center text-2xl border-4 border-rose-300 rounded-2xl outline-none text-rose-500 font-black shadow-md bg-white focus:border-rose-500" />
            <p className="text-sm text-rose-400 font-black uppercase mt-1">Llevo</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default OperacionesExercise;
