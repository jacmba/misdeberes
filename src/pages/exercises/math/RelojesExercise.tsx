import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import AnalogClock from '../../../components/AnalogClock';
import type { ClockInput, RelojesExercise } from '../../../features/app/types';
import { answerOption } from '../../../styles/variants';
import { cn } from '../../../styles/cn';

interface RelojesExerciseProps {
  exercise: RelojesExercise;
  clockInput: ClockInput;
  setClockInput: (value: ClockInput) => void;
}

const RelojesExercise = ({ exercise, clockInput, setClockInput }: RelojesExerciseProps): JSX.Element => (
  <div className="flex flex-col items-center py-2">
    <div className="flex flex-col xl:flex-row items-center gap-16 w-full justify-center mb-16 pb-12 border-b-4 border-slate-100 border-dashed">
      <AnalogClock hour={exercise.targetHour} minute={exercise.targetMinute} size={340} />
      <div className="bg-indigo-50 p-10 rounded-[3rem] border-4 border-indigo-100 shadow-sm w-full max-w-md">
        <p className="text-2xl font-bold text-indigo-900 mb-8 flex items-center gap-3"><Clock size={32} className="text-indigo-400" />¿Qué hora es?</p>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-6">
            <input type="number" value={clockInput.hour} onChange={e => setClockInput({ ...clockInput, hour: e.target.value })} className="w-32 p-4 text-center text-5xl font-black bg-white border-4 border-indigo-300 rounded-3xl outline-none text-indigo-900 shadow-inner" placeholder="?" /><span className="text-2xl font-bold text-indigo-400 uppercase tracking-widest">Horas</span>
          </div>
          <div className="flex flex-col gap-4">
            {[{ v: '0', l: 'En punto' }, { v: '30', l: 'Y media' }].map(m => (
              <label
                key={m.v}
                className={cn(
                  answerOption({ selected: clockInput.minType === m.v, tone: 'indigo' }),
                  'flex items-center gap-5 p-5 rounded-3xl'
                )}
              >
                <input type="radio" name="mainMin" value={m.v} checked={clockInput.minType === m.v} onChange={e => setClockInput({ ...clockInput, minType: e.target.value })} className="hidden" /><span className="font-black text-2xl">{m.l}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-slate-700">
      <div className="flex flex-col items-center bg-rose-50/50 p-10 rounded-[4rem] border-4 border-rose-100">
        <h3 className="text-2xl font-black text-rose-700 mb-8 flex items-center gap-3"><ArrowLeft size={30} strokeWidth={4} /> HORA ANTES</h3>
        <AnalogClock hour={clockInput.beforeH} minute={clockInput.beforeM} size={240} color="#991b1b" />
        <div className="flex flex-col gap-6 mt-8 w-full items-center">
          <div className="flex gap-2">
            <button onClick={() => { let h = clockInput.beforeH - 1; if (h < 1) h = 12; setClockInput({ ...clockInput, beforeH: h }); }} className="w-14 h-14 rounded-2xl bg-white border-4 border-rose-200 text-rose-600 font-black text-2xl shadow-md active:scale-95 transition-transform">-</button>
            <button onClick={() => { let h = clockInput.beforeH + 1; if (h > 12) h = 1; setClockInput({ ...clockInput, beforeH: h }); }} className="w-14 h-14 rounded-2xl bg-white border-4 border-rose-200 text-rose-600 font-black text-2xl shadow-md active:scale-95 transition-transform">+</button>
          </div>
          <div className="flex gap-4">
            {[{ v: 0, l: 'En Punto' }, { v: 30, l: 'Y Media' }].map(m => (
              <button
                key={m.v}
                onClick={() => setClockInput({ ...clockInput, beforeM: m.v })}
                className={cn(answerOption({ selected: clockInput.beforeM === m.v, tone: 'rose' }), 'px-6 py-2 rounded-xl font-black shadow-sm')}
              >
                {m.l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-emerald-50/50 p-10 rounded-[4rem] border-4 border-emerald-100">
        <h3 className="text-2xl font-black text-emerald-700 mb-8 flex items-center gap-3">HORA DESPUÉS <ArrowRight size={30} strokeWidth={4} /></h3>
        <AnalogClock hour={clockInput.afterH} minute={clockInput.afterM} size={240} color="#065f46" />
        <div className="flex flex-col gap-6 mt-8 w-full items-center">
          <div className="flex gap-2">
            <button onClick={() => { let h = clockInput.afterH - 1; if (h < 1) h = 12; setClockInput({ ...clockInput, afterH: h }); }} className="w-14 h-14 rounded-2xl bg-white border-4 border-emerald-200 text-emerald-600 font-black text-2xl shadow-md active:scale-95 transition-transform">-</button>
            <button onClick={() => { let h = clockInput.afterH + 1; if (h > 12) h = 1; setClockInput({ ...clockInput, afterH: h }); }} className="w-14 h-14 rounded-2xl bg-white border-4 border-emerald-200 text-emerald-600 font-black text-2xl shadow-md active:scale-95 transition-transform">+</button>
          </div>
          <div className="flex gap-4">
            {[{ v: 0, l: 'En Punto' }, { v: 30, l: 'Y Media' }].map(m => (
              <button
                key={m.v}
                onClick={() => setClockInput({ ...clockInput, afterM: m.v })}
                className={cn(answerOption({ selected: clockInput.afterM === m.v, tone: 'emerald' }), 'px-6 py-2 rounded-xl font-black shadow-sm')}
              >
                {m.l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RelojesExercise;
