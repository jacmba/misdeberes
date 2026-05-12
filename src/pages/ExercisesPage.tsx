import {
  BarChart3, Calculator,
  Hash, Clock,
  ArrowLeft, BookOpen, Globe,
  Volume2, List, Type,
  Bus, TrainFront, MapPin, LayoutGrid, Microscope
} from 'lucide-react';
import FontLink from '../components/FontLink';
import type { AnswersInput, ClockInput, EngInput, Exercise, FeedbackState, OpInput, ProbInput, Section, Subject } from '../features/app/types';
import EnglishExercisesSection from './exercises/EnglishExercisesSection';
import LenguaExercisesSection from './exercises/LenguaExercisesSection';
import MathExercisesSection from './exercises/MathExercisesSection';
import ScienceExercisesSection from './exercises/ScienceExercisesSection';
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
  featureMatrix: boolean[][];
  setView: (value: 'landing' | 'themes' | 'exercises') => void;
  setCurrentSection: (value: Section) => void;
  setUserNumbers: (value: string[]) => void;
  setAnswers: (value: AnswersInput) => void;
  setOpInput: (value: OpInput) => void;
  setClockInput: (value: ClockInput) => void;
  setProbInput: (value: ProbInput) => void;
  setEngInput: (value: EngInput) => void;
  handleCellClick: (row: number, col: number) => void;
  handleMatrixCellClick: (row: number, col: number) => void;
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
  generateCadaPalabra: () => void;
  generateCorrigeError: () => void;
  generateCambiaGenero: () => void;
  generateSciTransport: () => void;
  generateSciHowTravel: () => void;
  generateSciWhere: () => void;
  generateSciMatrix: () => void;
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
  featureMatrix,
  setView,
  setCurrentSection,
  setUserNumbers,
  setAnswers,
  setOpInput,
  setClockInput,
  setProbInput,
  setEngInput,
  handleCellClick,
  handleMatrixCellClick,
  playAudio,
  checkSolution,
  generateGraficos,
  generateOperaciones,
  generateRelojes,
  generateProblemas,
  generateEngVocab,
  generateEngGrammar,
  generateEngNumbers,
  generateEngListen,
  generateCadaPalabra,
  generateCorrigeError,
  generateCambiaGenero,
  generateSciTransport,
  generateSciHowTravel,
  generateSciWhere,
  generateSciMatrix
}: ExercisesPageProps): JSX.Element => {
  const sidebarMates = [
    { id: 'graficos', icon: <BarChart3 />, label: 'Gráficos' }, { id: 'operaciones', icon: <Hash />, label: 'Operaciones' },
    { id: 'relojes', icon: <Clock />, label: 'Relojes' }, { id: 'problemas', icon: <BookOpen />, label: 'Problemas' }
  ];
  const sidebarEnglish = [
    { id: 'vocab', icon: <List />, label: 'Vocabulary' }, { id: 'grammar', icon: <Type />, label: 'Grammar' },
    { id: 'numbers', icon: <Hash />, label: 'Numbers' }, { id: 'listen', icon: <Volume2 />, label: 'Listen' }
  ];
  const sidebarLengua = [
    { id: 'cadaPalabra', icon: <List />, label: 'Cada palabra' }, { id: 'corrigeError', icon: <Type />, label: 'Corrige error' },
    { id: 'cambiaGenero', icon: <BookOpen />, label: 'Cambia género' }
  ];
  const sidebarScience = [
    { id: 'sciTransport', icon: <Bus />, label: 'Transport' },
    { id: 'sciHowTravel', icon: <TrainFront />, label: 'How we travel' },
    { id: 'sciWhere', icon: <MapPin />, label: 'Where' },
    { id: 'sciMatrix', icon: <LayoutGrid />, label: 'Features' }
  ];
  const navItems =
    subject === 'matematicas'
      ? sidebarMates
      : subject === 'english'
        ? sidebarEnglish
        : subject === 'science'
          ? sidebarScience
          : sidebarLengua;

  return (
    <div className="flex h-screen bg-[#fdfcf0] text-slate-800 overflow-hidden" style={{ fontFamily: "'Borel', cursive" }}>
      <FontLink />
      <div className={layout.sidebar}>
        <button onClick={() => setView('themes')} className="flex items-center gap-2 text-indigo-300 hover:text-white mb-10 font-bold uppercase tracking-widest transition-colors border-b border-indigo-800 pb-4">
          <ArrowLeft size={20} strokeWidth={3} /> Volver a Temas
        </button>
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
          {subject === 'matematicas' ? (
            <Calculator className="text-yellow-400" />
          ) : subject === 'english' ? (
            <Globe className="text-sky-400" />
          ) : subject === 'science' ? (
            <Microscope className="text-emerald-400" />
          ) : (
            <BookOpen className="text-rose-400" />
          )}
          {subject === 'matematicas' ? 'Mates 1º' : subject === 'english' ? 'English 1º' : subject === 'science' ? 'Science 1º' : 'Lengua 1º'}
        </h1>
        <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-8 px-1">
          {subject === 'matematicas' ? 'Tema 7' : subject === 'english' || subject === 'science' ? 'Unit 8' : 'Tema 8'}
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
                {subject === 'english' || subject === 'science' ? 'UNIT 8' : subject === 'matematicas' ? 'TEMA 7' : 'TEMA 8'}
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

            <LenguaExercisesSection
              exercise={exercise}
              currentSection={currentSection}
              engInput={engInput}
              setEngInput={setEngInput}
            />

            <ScienceExercisesSection
              exercise={exercise}
              currentSection={currentSection}
              engInput={engInput}
              setEngInput={setEngInput}
              featureMatrix={featureMatrix}
              onMatrixCellClick={handleMatrixCellClick}
              isCompleted={isCompleted}
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
              generateCadaPalabra={generateCadaPalabra}
              generateCorrigeError={generateCorrigeError}
              generateCambiaGenero={generateCambiaGenero}
              generateSciTransport={generateSciTransport}
              generateSciHowTravel={generateSciHowTravel}
              generateSciWhere={generateSciWhere}
              generateSciMatrix={generateSciMatrix}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
