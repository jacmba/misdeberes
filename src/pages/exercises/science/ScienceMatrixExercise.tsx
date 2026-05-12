import type { ScienceMatrixExercise as ScienceMatrixExerciseType } from '../../../features/app/types';
import { cn } from '../../../styles/cn';

interface ScienceMatrixExerciseProps {
  exercise: ScienceMatrixExerciseType;
  featureMatrix: boolean[][];
  onCellClick: (row: number, col: number) => void;
  isCompleted: boolean;
}

const ScienceMatrixExercise = ({ exercise, featureMatrix, onCellClick, isCompleted }: ScienceMatrixExerciseProps): JSX.Element => (
  <div className="space-y-4">
    <p className="text-2xl text-slate-500 font-bold text-center">Tap a cell to tick the features that match each vehicle.</p>
    <div className="overflow-x-auto rounded-3xl border-4 border-slate-200 bg-white p-2">
      <table className="w-full min-w-[720px] border-collapse text-center">
        <thead>
          <tr>
            <th className="p-2 text-sm font-black text-slate-500 uppercase tracking-wide w-28" />
            {exercise.columnLabels.map(label => (
              <th key={label} className="p-2 text-xs md:text-sm font-black text-indigo-800 align-bottom leading-tight max-w-[5.5rem]">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exercise.rowLabels.map((rowLabel, ri) => (
            <tr key={rowLabel} className="border-t-4 border-slate-100">
              <td className="p-3 text-left text-xl font-black text-slate-700 whitespace-nowrap pr-4">{rowLabel}</td>
              {exercise.columnLabels.map((_, ci) => {
                const checked = featureMatrix[ri]?.[ci] ?? false;
                return (
                  <td key={ci} className="p-1">
                    <button
                      type="button"
                      disabled={isCompleted}
                      onClick={() => onCellClick(ri, ci)}
                      className={cn(
                        'w-full min-h-[3rem] rounded-2xl border-4 font-black text-lg transition-colors',
                        checked ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-300 hover:border-indigo-200'
                      )}
                    >
                      {checked ? '✓' : ''}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ScienceMatrixExercise;
