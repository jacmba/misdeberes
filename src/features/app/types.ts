export type View = 'landing' | 'themes' | 'exercises';
export type Subject = 'lengua' | 'matematicas' | 'english' | 'science' | null;
export type Section = 'graficos' | 'operaciones' | 'relojes' | 'problemas' | 'vocab' | 'grammar' | 'numbers' | 'listen' | '';

export interface QuestionType {
  id: 'most' | 'least' | 'second' | 'third';
  label: string;
}

export interface GraphicDataItem {
  name: string;
  value: number;
}

export interface GraficosExercise {
  type: 'graficos';
  name: string;
  id: string;
  intro: string;
  unit: string;
  items: string[];
  data: GraphicDataItem[];
  selectedQuestions: QuestionType[];
}

export interface OperacionesExercise {
  type: 'operaciones';
  name: string;
  op: 'suma' | 'resta';
  val1: number;
  val2: number;
  res: number;
}

export interface RelojesExercise {
  type: 'relojes';
  name: string;
  targetHour: number;
  targetMinute: number;
  targetBeforeH: number;
  targetBeforeM: number;
  targetAfterH: number;
  targetAfterM: number;
}

export interface ProblemasExercise {
  type: 'problemas';
  name: string;
  n1: string;
  n2: string;
  item: string;
  v1: number;
  v2: number;
  op: 'suma' | 'resta';
  res: number;
  text: string;
}

export interface VocabDisplayItem {
  es: string;
  en: string;
  plural: string;
  emoji: string;
  numberId: number;
}

export interface VocabExercise {
  type: 'vocab';
  name: string;
  displayItems: VocabDisplayItem[];
  wordList: VocabDisplayItem[];
}

export interface GrammarOption {
  label: string;
  isCorrect: boolean;
}

export interface GrammarQuestion {
  part: string;
  correctCount: number;
  emoji: string;
  options: GrammarOption[];
}

export interface GrammarExercise {
  type: 'grammar';
  name: string;
  animalEmoji: string;
  animalName: string;
  questions: GrammarQuestion[];
}

export interface NumbersQuestion {
  number: number;
  correctWord: string;
  options: string[];
}

export interface NumbersExercise {
  type: 'numbers';
  name: string;
  questions: NumbersQuestion[];
}

export interface ListenExercise {
  type: 'listen';
  name: string;
  word: string;
  translation: string;
  displayEmoji: string | number;
}

export type Exercise =
  | GraficosExercise
  | OperacionesExercise
  | RelojesExercise
  | ProblemasExercise
  | VocabExercise
  | GrammarExercise
  | NumbersExercise
  | ListenExercise;

export interface FeedbackState {
  type: 'success' | 'error';
  message: string;
}

export interface AnswersInput {
  q1: string;
  q2: string;
  total: string;
}

export interface OpInput {
  tens: string;
  units: string;
  carry: string;
}

export interface ClockInput {
  hour: string;
  minType: string;
  beforeH: number;
  beforeM: number;
  afterH: number;
  afterM: number;
}

export interface ProbInput {
  val1: string;
  val2: string;
  averiguo: string;
  accion: string;
  tens: string;
  units: string;
  carry: string;
  solucion: string;
}

export type EngInput = Record<string, string>;

export interface AppState {
  view: View;
  subject: Subject;
  currentSection: Section;
  exercise: Exercise | null;
  feedback: FeedbackState | null;
  isCompleted: boolean;
  userNumbers: string[];
  grid: boolean[][];
  answers: AnswersInput;
  opInput: OpInput;
  clockInput: ClockInput;
  probInput: ProbInput;
  engInput: EngInput;
}
