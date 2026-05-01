import type { CadaPalabraExercise, EngInput } from '../../../features/app/types';
import { cn } from '../../../styles/cn';

interface CadaPalabraEnSuLugarExerciseProps {
  exercise: CadaPalabraExercise;
  engInput: EngInput;
  setEngInput: (value: EngInput) => void;
}

const CadaPalabraEnSuLugarExercise = ({ exercise, engInput, setEngInput }: CadaPalabraEnSuLugarExerciseProps): JSX.Element => {
  const groupedWords = [exercise.words.slice(0, 5), exercise.words.slice(5, 10)];

  const assignGender = (noun: string, gender: 'masculino' | 'femenino'): void => {
    setEngInput({ ...engInput, [noun]: gender });
  };

  return (
    <div className="space-y-10">
      <p className="text-2xl text-slate-500 font-bold text-center">Selecciona cada palabra y colócala en su columna.</p>

      <div className="space-y-4">
        {groupedWords.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {row.map(item => (
              <div key={item.noun} className="bg-white border-4 border-slate-200 rounded-2xl p-3">
                <p className="text-2xl font-black text-slate-700 text-center mb-3">{item.noun}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => assignGender(item.noun, 'masculino')}
                    className={cn('flex-1 rounded-xl px-2 py-1 text-sm font-black border-2', engInput[item.noun] === 'masculino' ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-600')}
                  >
                    El
                  </button>
                  <button
                    onClick={() => assignGender(item.noun, 'femenino')}
                    className={cn('flex-1 rounded-xl px-2 py-1 text-sm font-black border-2', engInput[item.noun] === 'femenino' ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-600')}
                  >
                    La
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-4 border-slate-100">
        <div className="bg-sky-50 border-4 border-sky-200 rounded-3xl p-5">
          <h3 className="text-2xl font-black text-sky-700 mb-3">Masculino. El...</h3>
          <p className="text-xl text-sky-900 font-bold">{exercise.words.filter(item => engInput[item.noun] === 'masculino').map(item => item.noun).join(', ') || '-'}</p>
        </div>
        <div className="bg-rose-50 border-4 border-rose-200 rounded-3xl p-5">
          <h3 className="text-2xl font-black text-rose-700 mb-3">Femenino. La...</h3>
          <p className="text-xl text-rose-900 font-bold">{exercise.words.filter(item => engInput[item.noun] === 'femenino').map(item => item.noun).join(', ') || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default CadaPalabraEnSuLugarExercise;
