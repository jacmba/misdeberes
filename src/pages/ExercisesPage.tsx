import {
  BarChart3, Calculator,
  Hash, Clock,
  ArrowLeft, BookOpen, Globe,
  Volume2, List, Type
} from 'lucide-react';
import FontLink from '../components/FontLink';
import type { AnswersInput, ClockInput, EngInput, Exercise, FeedbackState, OpInput, ProbInput, Section, Subject } from '../features/app/types';
import EnglishExercisesSection from './exercises/EnglishExercisesSection';
import MathExercisesSection from './exercises/MathExercisesSection';
import ExerciseActions from './exercises/ExerciseActions';
import { answerOption } from '../styles/variants';
import { layout, typography } from '../styles/tokens';
import { cn } from '../styles/cn';

interface ExercisesPageProps {
  subject: Subject;
  currentSection: Section;
  exercise: Exercise;
  isCompleted: boolean;
  feedback: FeedbackState | null;
  userNumbers: string[];
  grid: boolean[][];
  answers: AnswersInput;
  opInput: OpInput;
  clockInput: ClockInput;
  probInput: ProbInput;
  engInput: EngInput;
  setView: (value: 'landing' | 'themes' | 'exercises') => void;
  setCurrentSection: (value: Section) => void;
  setUserNumbers: (value: string[]) => void;
  setAnswers: (value: AnswersInput) => void;
  setOpInput: (value: OpInput) => void;
  setClockInput: (value: ClockInput) => void;
  setProbInput: (value: ProbInput) => void;
  setEngInput: (value: EngInput) => void;
  handleCellClick: (row: number, col: number) => void;
  playAudio: (text: string) => void;
  checkSolution: () => void;
  generateGraficos: () => void;
  generateOperaciones: () => void;
  generateRelojes: () => void;
  generateProblemas: () => void;
  generateEngVocab: () => void;
  generateEngGrammar: () => void;
  generateEngNumbers: () => void;
  generateEngListen: () => void;
}

const ExercisesPage = ({
  subject,
  currentSection,
  exercise,
  isCompleted,
  feedback,
  userNumbers,
  grid,
  answers,
  opInput,
  clockInput,
  probInput,
  engInput,
  setView,
  setCurrentSection,
  setUserNumbers,
  setAnswers,
  setOpInput,
  setClockInput,
  setProbInput,
  setEngInput,
  handleCellClick,
  playAudio,
  checkSolution,
  generateGraficos,
  generateOperaciones,
  generateRelojes,
  generateProblemas,
  generateEngVocab,
  generateEngGrammar,
  generateEngNumbers,
  generateEngListen
}: ExercisesPageProps): JSX.Element => {
  const sidebarMates = [
    { id: 'graficos', icon: <BarChart3 />, label: 'Gráficos' }, { id: 'operaciones', icon: <Hash />, label: 'Operaciones' },
    { id: 'relojes', icon: <Clock />, label: 'Relojes' }, { id: 'problemas', icon: <BookOpen />, label: 'Problemas' }
  ];
  const sidebarEnglish = [
    { id: 'vocab', icon: <List />, label: 'Vocabulary' }, { id: 'grammar', icon: <Type />, label: 'Grammar' },
    { id: 'numbers', icon: <Hash />, label: 'Numbers' }, { id: 'listen', icon: <Volume2 />, label: 'Listen' }
  ];
  const navItems = subject === 'matematicas' ? sidebarMates : sidebarEnglish;

  return (
    <div className="flex h-screen bg-[#fdfcf0] text-slate-800 overflow-hidden" style={{ fontFamily: "'Borel', cursive" }}>
      <FontLink />
      <div className={layout.sidebar}>
        <button onClick={() => setView('themes')} className="flex items-center gap-2 text-indigo-300 hover:text-white mb-10 font-bold uppercase tracking-widest transition-colors border-b border-indigo-800 pb-4">
          <ArrowLeft size={20} strokeWidth={3} /> Volver a Temas
        </button>
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
          {subject === 'matematicas' ? <Calculator className="text-yellow-400" /> : <Globe className="text-sky-400" />}
          {subject === 'matematicas' ? 'Mates 1º' : 'English 1º'}
        </h1>
        <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-8 px-1">
          {subject === 'matematicas' ? 'Tema 7' : 'Unit 8'}
        </p>
        <nav className="flex-1 space-y-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id as Section)}
              className={cn(
                answerOption({ selected: currentSection === item.id, tone: 'indigo' }),
                'w-full flex items-center gap-4 p-4 rounded-2xl text-2xl font-bold',
                currentSection === item.id ? 'shadow-inner' : 'hover:bg-indigo-800 hover:text-white'
              )}
            >
              {item.icon}<span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={cn(layout.contentWrap, 'bg-[#fdfcf0]')}>
        <div className={layout.contentMax}>
          <div className="mb-6 flex justify-between items-end">
            <div>
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                {subject === 'matematicas' ? 'TEMA 7' : 'UNIT 8'}
              </span>
              <h2 className={typography.sectionTitle}>{exercise.name}</h2>
            </div>
            {isCompleted && <div className="animate-bounce text-5xl shadow-xl rounded-full bg-white p-2">⭐</div>}
          </div>

          <div className={cn(layout.panelCard, 'mb-8')}>
            <EnglishExercisesSection
              exercise={exercise}
              currentSection={currentSection}
              engInput={engInput}
              setEngInput={setEngInput}
              playAudio={playAudio}
            />

            <MathExercisesSection
              exercise={exercise}
              currentSection={currentSection}
              userNumbers={userNumbers}
              grid={grid}
              answers={answers}
              opInput={opInput}
              clockInput={clockInput}
              probInput={probInput}
              setUserNumbers={setUserNumbers}
              setAnswers={setAnswers}
              setOpInput={setOpInput}
              setClockInput={setClockInput}
              setProbInput={setProbInput}
              handleCellClick={handleCellClick}
            />

            <ExerciseActions
              feedback={feedback}
              currentSection={currentSection}
              isCompleted={isCompleted}
              subject={subject}
              checkSolution={checkSolution}
              generateGraficos={generateGraficos}
              generateOperaciones={generateOperaciones}
              generateRelojes={generateRelojes}
              generateProblemas={generateProblemas}
              generateEngVocab={generateEngVocab}
              generateEngGrammar={generateEngGrammar}
              generateEngNumbers={generateEngNumbers}
              generateEngListen={generateEngListen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
