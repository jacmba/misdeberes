import React from 'react';
import type { AnswersInput, GraficosExercise } from '../../../features/app/types';
import { cn } from '../../../styles/cn';
import { controls } from '../../../styles/tokens';

interface GraficosExerciseProps {
  exercise: GraficosExercise;
  userNumbers: string[];
  grid: boolean[][];
  answers: AnswersInput;
  setUserNumbers: (value: string[]) => void;
  setAnswers: (value: AnswersInput) => void;
  handleCellClick: (row: number, col: number) => void;
}

const GraficosExercise = ({
  exercise,
  userNumbers,
  grid,
  answers,
  setUserNumbers,
  setAnswers,
  handleCellClick
}: GraficosExerciseProps): JSX.Element => (
  <>
    <div className="bg-indigo-50 border-l-8 border-indigo-400 p-6 mb-8 text-2xl font-medium rounded-r-xl italic">"{exercise.intro} {exercise.data.map((d, i) => (<span key={i}><strong>{d.value}</strong> {d.name.split(' ')[1] || d.name}{i === exercise.data.length - 1 ? '.' : ', '}</span>))}"</div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <h3 className="font-bold border-b-2 pb-2 text-slate-400 uppercase text-sm tracking-widest">1. Sintetiza los datos:</h3>
        {exercise.data.map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border-2 border-slate-100">
            <span className="text-3xl w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm">{item.name.split(' ')[0]}</span>
            <span className="flex-1 text-lg font-bold text-slate-600">{item.name}</span>
            <input type="number" value={userNumbers[i] || ''} onChange={(e) => { const n = [...userNumbers]; n[i] = e.target.value; setUserNumbers(n); }} className={cn(controls.baseInput, 'w-20 p-2 text-center rounded-2xl border-slate-200 font-black text-2xl focus:border-indigo-400')} placeholder="?" />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <h3 className="font-bold mb-4 self-start text-slate-400 uppercase text-sm tracking-widest">2. Colorea el gráfico:</h3>
        <div className="flex">
          <div className="grid grid-rows-8 gap-1 h-[280px] pr-4 py-1">{[8, 7, 6, 5, 4, 3, 2, 1].map(n => (<div key={n} className="flex items-center justify-end text-lg font-bold text-slate-400">{n}</div>))}</div>
          <div>
            <div className="grid grid-cols-4 grid-rows-8 gap-2 bg-slate-100 p-2 border-4 border-slate-800 h-[280px] rounded-t-3xl shadow-md">
              {Array(8).fill(null).map((_, r) => (<React.Fragment key={r}>{Array(4).fill(null).map((__, c) => (<div key={c} onClick={() => handleCellClick(r, c)} className={cn('w-14 h-full border border-slate-200/30 transition-all cursor-pointer', grid[r][c] ? ['bg-rose-400', 'bg-emerald-400', 'bg-amber-400', 'bg-sky-400'][c] : 'bg-white hover:bg-slate-50')} />))}</React.Fragment>))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">{exercise.data.map((item, i) => (<div key={i} className="text-center text-3xl bg-white rounded-2xl py-2 border-2 border-slate-100 shadow-sm">{item.name.split(' ')[0]}</div>))}</div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-12 bg-indigo-50 p-8 rounded-3xl border-4 border-indigo-100">
      <h3 className="text-indigo-900 font-black uppercase text-sm border-b-4 border-indigo-200 pb-2 mb-6">3. Responde a las preguntas:</h3>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-xl font-bold text-slate-700">
          <label>{exercise.selectedQuestions[0].label}</label>
          <select value={answers.q1} onChange={e => setAnswers({ ...answers, q1: e.target.value })} className={cn(controls.baseInput, 'p-2 rounded-xl border-indigo-200 w-56 text-indigo-900 shadow-sm')}>
            <option value="">-- Elige --</option>{exercise.data.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xl font-bold text-slate-700">
          <label>{exercise.selectedQuestions[1].label}</label>
          <select value={answers.q2} onChange={e => setAnswers({ ...answers, q2: e.target.value })} className={cn(controls.baseInput, 'p-2 rounded-xl border-indigo-200 w-56 text-indigo-900 shadow-sm')}>
            <option value="">-- Elige --</option>{exercise.data.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-2xl font-black text-indigo-950 pt-4 border-t-2 border-indigo-200">
          <label>¿Cuántos hay en total?</label>
          <input type="number" value={answers.total} onChange={e => setAnswers({ ...answers, total: e.target.value })} className="w-24 p-2 text-center rounded-2xl border-4 border-indigo-300 shadow-inner outline-none focus:ring-4 ring-indigo-100" placeholder="?" />
        </div>
      </div>
    </div>
  </>
);

export default GraficosExercise;
