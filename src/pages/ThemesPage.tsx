import { ArrowLeft, Book, Calculator, Globe, Microscope, LucideIcon } from 'lucide-react';
import FontLink from '../components/FontLink';
import type { Section, Subject } from '../features/app/types';
import { cn } from '../styles/cn';
import { layout } from '../styles/tokens';

interface ThemeData {
  id: string;
  title: string;
  desc: string;
  enabled: boolean;
  firstSection?: Section;
}

interface ThemesPageProps {
  subject: Subject;
  onBack: () => void;
  onSelectSection: (section: Section) => void;
}

const ThemesPage = ({ subject, onBack, onSelectSection }: ThemesPageProps): JSX.Element => {
  let themesData: ThemeData[] = [];
  let subjectTitle = '';
  let Icon: LucideIcon = Book;

  if (subject === 'matematicas') {
    subjectTitle = 'Matemáticas';
    Icon = Calculator;
    themesData = [
      { id: 'tema7', title: 'Tema 7', desc: 'Datos, cálculo y tiempo', enabled: true, firstSection: 'graficos' },
      { id: 'tema8', title: 'Tema 8', desc: 'Próximamente...', enabled: false }
    ];
  } else if (subject === 'english') {
    subjectTitle = 'English';
    Icon = Globe;
    themesData = [
      { id: 'unit7', title: 'Unit 7', desc: 'Repaso anterior...', enabled: false },
      { id: 'unit8', title: 'Unit 8', desc: 'We love travelling (Body & Numbers)', enabled: true, firstSection: 'vocab' }
    ];
  } else if (subject === 'lengua') {
    subjectTitle = 'Lengua';
    Icon = Book;
    themesData = [
      { id: 'tema7', title: 'Tema 7', desc: 'Repaso anterior...', enabled: false },
      { id: 'tema8', title: 'Tema 8', desc: 'Artículos masculino y femenino', enabled: true, firstSection: 'cadaPalabra' }
    ];
  } else if (subject === 'science') {
    subjectTitle = 'Science';
    Icon = Microscope;
    themesData = [{ id: 't1', title: 'Unit actual', desc: 'Próximamente...', enabled: false }];
  }

  return (
    <div className={layout.pageRoot} style={{ fontFamily: "'Borel', cursive" }}>
      <FontLink />
      <div className="w-full max-w-5xl flex justify-between items-center mb-16">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-500 hover:text-indigo-800 text-2xl font-bold bg-white px-6 py-3 rounded-full shadow-sm border-4 border-indigo-100 transition-colors"><ArrowLeft strokeWidth={3} /> Asignaturas</button>
      </div>
      <div className="flex items-center gap-6 text-6xl font-black text-indigo-900 mb-16"><Icon size={64} className="text-indigo-500" /> {subjectTitle}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {themesData.map(t => (
          <button
            key={t.id}
            disabled={!t.enabled}
            onClick={() => {
              if (t.enabled && t.firstSection) onSelectSection(t.firstSection);
            }}
            className={cn(
              'p-10 rounded-[3rem] border-[6px] text-left transition-all',
              t.enabled
                ? 'bg-white border-indigo-300 shadow-xl hover:-translate-y-2 hover:border-indigo-500 cursor-pointer'
                : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
            )}
          >
            <h3 className="text-4xl font-black text-slate-800 mb-2">{t.title}</h3>
            <p className="text-xl text-slate-500 font-bold">{t.desc}</p>
            {!t.enabled && <p className="mt-6 text-sm font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">BLOQUEADO</p>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemesPage;
