import { ArrowLeft, Book, Calculator, Globe, Microscope } from 'lucide-react';
import FontLink from '../components/FontLink';
import { daysUntil, formatShortDate, getSubjectExams, toLocalIsoDate } from '../domain/data/examenes2Data';
import type { Course, Subject } from '../features/app/types';
import { cn } from '../styles/cn';
import { layout, typography } from '../styles/tokens';

interface SubjectsPageProps {
  course: Course;
  onBack: () => void;
  onSelectSubject: (subject: Exclude<Subject, null>) => void;
}

const SubjectsPage = ({ course, onBack, onSelectSubject }: SubjectsPageProps): JSX.Element => {
  const subjectsList: { id: Exclude<Subject, null>; label: string; icon: JSX.Element; color: string; text: string; border: string }[] = [
    { id: 'lengua', label: 'Lengua', icon: <Book size={64} />, color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-200' },
    { id: 'matematicas', label: 'Mates', icon: <Calculator size={64} />, color: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
    { id: 'english', label: 'English', icon: <Globe size={64} />, color: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-200' },
    { id: 'science', label: 'Science', icon: <Microscope size={64} />, color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' }
  ];

  const today = toLocalIsoDate(new Date());
  const examLabel = (date: string): string => {
    const days = daysUntil(date, today);
    return days === 0 ? 'hoy' : days === 1 ? 'mañana' : formatShortDate(date);
  };
  const nextExam = (subject: Exclude<Subject, null>) => (course === 2 ? getSubjectExams(subject, today).upcoming[0] : undefined);

  return (
    <div className={layout.pageRoot} style={{ fontFamily: "'Borel', cursive" }}>
      <FontLink />
      <div className="w-full max-w-4xl flex justify-start mb-10">
        <button onClick={onBack} className={layout.backButton}><ArrowLeft strokeWidth={3} /> Cursos</button>
      </div>
      <h1 className={typography.pageTitle}>{course}º de Primaria<br /> <span className="text-4xl text-indigo-600">Elige tu asignatura</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
        {subjectsList.map(s => {
          const exam = nextExam(s.id);
          return (
            <button key={s.id} onClick={() => onSelectSubject(s.id)} className={cn('flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] shadow-xl border-8 hover:-translate-y-2 hover:shadow-2xl transition-all group', s.border)}>
              <div className={cn('w-32 h-32 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform', s.color, s.text)}>{s.icon}</div>
              <span className="text-4xl font-black text-slate-700 uppercase tracking-widest">{s.label}</span>
              {exam && <span className="mt-4 rounded-full bg-amber-100 border-4 border-amber-200 text-amber-800 px-4 py-1 text-lg font-black">📝 Examen {examLabel(exam.date)}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectsPage;
