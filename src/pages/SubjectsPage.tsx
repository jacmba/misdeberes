import { Book, Calculator, Globe, Microscope } from 'lucide-react';
import FontLink from '../components/FontLink';
import type { Subject } from '../features/app/types';
import { cn } from '../styles/cn';
import { layout, typography } from '../styles/tokens';

interface LandingPageProps {
  onSelectSubject: (subject: Exclude<Subject, null>) => void;
}

const LandingPage = ({ onSelectSubject }: LandingPageProps): JSX.Element => {
  const subjectsList: { id: Exclude<Subject, null>; label: string; icon: JSX.Element; color: string; text: string; border: string }[] = [
    { id: 'lengua', label: 'Lengua', icon: <Book size={64} />, color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-200' },
    { id: 'matematicas', label: 'Mates', icon: <Calculator size={64} />, color: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
    { id: 'english', label: 'English', icon: <Globe size={64} />, color: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-200' },
    { id: 'science', label: 'Science', icon: <Microscope size={64} />, color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' }
  ];

  return (
    <div className={layout.pageRootCentered} style={{ fontFamily: "'Borel', cursive" }}>
      <FontLink />
      <h1 className={typography.pageTitle}>¡Mis Deberes!<br /> <span className="text-4xl text-indigo-600">Elige tu asignatura</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
        {subjectsList.map(s => (
          <button key={s.id} onClick={() => onSelectSubject(s.id)} className={cn('flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] shadow-xl border-8 hover:-translate-y-2 hover:shadow-2xl transition-all group', s.border)}>
            <div className={cn('w-32 h-32 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform', s.color, s.text)}>{s.icon}</div>
            <span className="text-4xl font-black text-slate-700 uppercase tracking-widest">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
