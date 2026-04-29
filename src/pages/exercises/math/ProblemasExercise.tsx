import type { ProbInput, ProblemasExercise } from '../../../features/app/types';
import { answerOption } from '../../../styles/variants';
import { cn } from '../../../styles/cn';

interface ProblemasExerciseProps {
  exercise: ProblemasExercise;
  probInput: ProbInput;
  setProbInput: (value: ProbInput) => void;
}

const ProblemasExercise = ({ exercise, probInput, setProbInput }: ProblemasExerciseProps): JSX.Element => (
  <div className="space-y-12">
    <div className="bg-amber-50 border-l-[12px] border-amber-400 p-10 rounded-3xl shadow-sm">
      <h3 className="text-amber-800 font-black uppercase text-base mb-4 tracking-widest underline decoration-amber-200 decoration-4">Enunciado:</h3>
      <p className="text-4xl leading-relaxed font-bold text-slate-800">"{exercise.text}"</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white p-10 rounded-[3rem] border-4 border-slate-100 shadow-sm flex flex-col gap-8 text-xl font-bold">
        <h3 className="text-indigo-900 font-black uppercase text-sm border-b-4 border-indigo-50 pb-2 tracking-widest">Datos:</h3>
        <div className="space-y-8">
          <div><span>{exercise.n1} tiene </span><input type="number" value={probInput.val1} onChange={e => setProbInput({ ...probInput, val1: e.target.value })} className="w-24 p-2 text-center bg-indigo-50 border-4 border-indigo-200 rounded-2xl outline-none font-black text-3xl shadow-inner focus:border-indigo-500" placeholder="?" /><span> {exercise.item}.</span></div>
          <div><span>{exercise.n2} tiene </span><input type="number" value={probInput.val2} onChange={e => setProbInput({ ...probInput, val2: e.target.value })} className="w-24 p-2 text-center bg-indigo-50 border-4 border-indigo-200 rounded-2xl outline-none font-black text-3xl shadow-inner focus:border-indigo-500" placeholder="?" /><span> {exercise.item} {exercise.op === 'suma' ? 'más' : 'menos'} que {exercise.n1}.</span></div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-[3rem] border-4 border-slate-100 shadow-sm">
        <h3 className="text-indigo-900 font-black uppercase text-sm border-b-4 border-indigo-50 pb-2 mb-8 tracking-widest">Razonamiento:</h3>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-5"><p className="font-black text-slate-400 text-xs uppercase tracking-widest text-center">Averiguo...</p>
            {[{ v: 'total', l: 'El total' }, { v: 'diferencia', l: 'La diferencia' }].map(opt => (
              <label
                key={opt.v}
                className={cn(
                  answerOption({ selected: probInput.averiguo === opt.v, tone: 'indigo' }),
                  'flex items-center gap-4 p-4 rounded-2xl'
                )}
              >
                <input type="radio" checked={probInput.averiguo === opt.v} onChange={() => setProbInput({ ...probInput, averiguo: opt.v })} className="hidden" />
                <span className="font-bold text-lg">{opt.l}</span>
              </label>
            ))}
          </div>
          <div className="space-y-5"><p className="font-black text-slate-400 text-xs uppercase tracking-widest text-center">Hay que...</p>
            {[{ v: 'sumar', l: 'Sumar' }, { v: 'restar', l: 'Restar' }].map(opt => (
              <label
                key={opt.v}
                className={cn(
                  answerOption({ selected: probInput.accion === opt.v, tone: 'indigo' }),
                  'flex items-center gap-4 p-4 rounded-2xl'
                )}
              >
                <input type="radio" checked={probInput.accion === opt.v} onChange={() => setProbInput({ ...probInput, accion: opt.v })} className="hidden" />
                <span className="font-bold text-lg">{opt.l}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="bg-slate-50 p-10 rounded-[4rem] border-4 border-slate-200 flex flex-col items-center shadow-inner">
        <h3 className="text-indigo-900 font-black uppercase text-sm border-b-4 border-indigo-100 pb-2 mb-14 self-stretch text-center tracking-widest">Operación</h3>
        <div className="relative inline-block text-6xl font-mono font-black text-slate-700 mt-4">
          <div className="grid grid-cols-3 gap-0">
            <div className="w-16 h-16" />
            <div className="w-16 h-16 flex items-center justify-center">{Math.floor(exercise.v1 / 10)}</div>
            <div className="w-16 h-16 flex items-center justify-center">{exercise.v1 % 10}</div>
            <div className="w-16 h-16 flex items-center justify-center text-indigo-600 font-bold transition-opacity">{probInput.accion === 'sumar' ? '+' : probInput.accion === 'restar' ? '-' : ''}</div>
            <div className="w-16 h-16 flex items-center justify-center">{Math.floor(exercise.v2 / 10)}</div>
            <div className="w-16 h-16 flex items-center justify-center">{exercise.v2 % 10}</div>
            <div className="col-span-3 h-4 bg-slate-800 my-4 rounded-full" />
            <div className="w-16 h-16" />
            <div className="w-16 h-16 flex items-center justify-center"><input type="number" value={probInput.tens} onChange={e => setProbInput({ ...probInput, tens: e.target.value.slice(-1) })} className="w-14 h-14 text-center bg-white border-4 border-indigo-200 rounded-2xl outline-none font-black text-4xl shadow-inner focus:border-indigo-500" /></div>
            <div className="w-16 h-16 flex items-center justify-center"><input type="number" value={probInput.units} onChange={e => setProbInput({ ...probInput, units: e.target.value.slice(-1) })} className="w-14 h-14 text-center bg-white border-4 border-indigo-200 rounded-2xl outline-none font-black text-4xl shadow-inner focus:border-indigo-500" /></div>
          </div>
          {exercise.op === 'suma' && (
            <div className="absolute -top-12 left-1/2 -translate-x-8 flex flex-col items-center z-10">
              <input type="number" value={probInput.carry} onChange={e => setProbInput({ ...probInput, carry: e.target.value })} className="w-10 h-10 text-center text-lg border-4 border-rose-300 rounded-xl outline-none text-rose-500 font-black shadow-md bg-white focus:border-rose-500" />
              <p className="text-[10px] text-rose-400 font-black uppercase mt-1">Llevo</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-indigo-900 text-white p-12 rounded-[4rem] shadow-2xl flex flex-col gap-8 text-4xl font-bold">
        <h3 className="font-black uppercase text-sm text-indigo-300 tracking-widest border-b-2 border-indigo-800 pb-2">Solución final:</h3>
        <div><span>{exercise.n2} tiene </span><input type="number" value={probInput.solucion} onChange={e => setProbInput({ ...probInput, solucion: e.target.value })} className="w-32 p-4 text-center bg-white text-indigo-900 border-[6px] border-indigo-400 rounded-[2rem] outline-none font-black text-5xl shadow-2xl focus:ring-4 ring-indigo-500" placeholder="?" /><span> {exercise.item}.</span></div>
      </div>
    </div>
  </div>
);

export default ProblemasExercise;
