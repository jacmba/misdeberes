import { CalendarClock } from 'lucide-react';
import { daysUntil, formatShortDate, getSubjectExams, type Exam } from '../domain/data/examenes2Data';
import type { Subject } from '../features/app/types';

interface ExamsBoxProps {
  subject: Subject;
  today: string;
}

const countdownLabel = (days: number): string => (days === 0 ? '¡Hoy!' : days === 1 ? 'Mañana' : `En ${days} días`);

const ExamLine = ({ exam }: { exam: Exam }): JSX.Element => (
  <>
    <span className="font-black">{formatShortDate(exam.date)}</span>
    {exam.topic && <span> · {exam.topic}</span>}
    {exam.note && <span className="block text-sm font-bold opacity-70">{exam.note}</span>}
  </>
);

const ExamsBox = ({ subject, today }: ExamsBoxProps): JSX.Element | null => {
  const { upcoming, past } = getSubjectExams(subject, today);
  if (!upcoming.length && !past.length) return null;

  return (
    <section aria-labelledby="exams-title" className="w-full max-w-5xl mb-12 bg-amber-50 border-4 border-amber-200 rounded-[2rem] p-6">
      <h2 id="exams-title" className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-amber-800">
        <CalendarClock size={32} aria-hidden="true" /> Próximos exámenes
      </h2>
      {upcoming.length ? (
        <ul className="mt-4 space-y-3">
          {upcoming.map(e => {
            const days = daysUntil(e.date, today);
            return (
              <li key={e.date} className="flex items-center gap-4 bg-white rounded-2xl border-4 border-amber-100 px-4 py-3 text-lg text-slate-700">
                <span className={days <= 1 ? 'shrink-0 rounded-full bg-rose-500 text-white px-3 py-1 text-sm font-black' : 'shrink-0 rounded-full bg-amber-200 text-amber-900 px-3 py-1 text-sm font-black'}>
                  {countdownLabel(days)}
                </span>
                <span className="min-w-0"><ExamLine exam={e} /></span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-3 text-lg font-bold text-amber-700">No hay exámenes a la vista.</p>
      )}
      {past.length > 0 && (
        <details className="mt-4 text-slate-500">
          <summary className="cursor-pointer font-bold">Exámenes anteriores</summary>
          <ul className="mt-2 space-y-1 pl-2">
            {past.map(e => <li key={e.date}><ExamLine exam={e} /></li>)}
          </ul>
        </details>
      )}
    </section>
  );
};

export default ExamsBox;
