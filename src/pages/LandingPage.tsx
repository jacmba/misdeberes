import { GraduationCap, Sprout } from 'lucide-react';
import FontLink from '../components/FontLink';
import type { Course } from '../features/app/types';
import { cn } from '../styles/cn';
import { layout, typography } from '../styles/tokens';

interface LandingPageProps {
  onSelectCourse: (course: Course) => void;
}

const coursesList: { id: Course; label: string; desc: string; icon: JSX.Element; color: string; text: string; border: string }[] = [
  { id: 1, label: '1º Primaria', desc: 'Ejercicios de repaso', icon: <Sprout size={64} />, color: 'bg-lime-100', text: 'text-lime-600', border: 'border-lime-200' },
  { id: 2, label: '2º Primaria', desc: 'Vídeos y juegos de clase', icon: <GraduationCap size={64} />, color: 'bg-violet-100', text: 'text-violet-600', border: 'border-violet-200' }
];

const LandingPage = ({ onSelectCourse }: LandingPageProps): JSX.Element => (
  <div className={layout.pageRootCentered} style={{ fontFamily: "'Borel', cursive" }}>
    <FontLink />
    <h1 className={typography.pageTitle}>¡Mis Deberes!<br /> <span className="text-4xl text-indigo-600">Elige tu curso</span></h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
      {coursesList.map(c => (
        <button key={c.id} onClick={() => onSelectCourse(c.id)} className={cn('flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] shadow-xl border-8 hover:-translate-y-2 hover:shadow-2xl transition-all group', c.border)}>
          <div className={cn('w-32 h-32 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform', c.color, c.text)}>{c.icon}</div>
          <span className="text-4xl font-black text-slate-700 uppercase tracking-widest">{c.label}</span>
          <span className="mt-3 text-xl font-bold text-slate-500">{c.desc}</span>
        </button>
      ))}
    </div>
  </div>
);

export default LandingPage;
