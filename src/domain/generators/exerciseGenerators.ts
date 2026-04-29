import { ANIMAL_GRAMMAR_DATA, ENG_NUMBERS, ENGLISH_BODY_PARTS } from '../data/englishData';
import { OTHER_NAMES, PROB_ITEMS, QUESTION_TYPES, THEMES_GRAFICOS } from '../data/mathData';
import type {
  GrammarExercise,
  GraficosExercise,
  ListenExercise,
  NumbersExercise,
  OperacionesExercise,
  ProblemasExercise,
  RelojesExercise,
  VocabExercise
} from '../../features/app/types';

export const generateGraficosExercise = (): GraficosExercise => {
  const theme = THEMES_GRAFICOS[Math.floor(Math.random() * THEMES_GRAFICOS.length)];
  const data = theme.items.map(name => ({ name, value: Math.floor(Math.random() * 7) + 2 }));
  const shuffledQuestions = [...QUESTION_TYPES].sort(() => 0.5 - Math.random()).slice(0, 2);
  return { type: 'graficos', ...theme, name: 'Interpretación de Datos', data, selectedQuestions: shuffledQuestions };
};

export const generateOperacionesExercise = (): OperacionesExercise => {
  const type = Math.random() > 0.5 ? 'suma' : 'resta';
  let a: number;
  let b: number;
  let res: number;
  if (type === 'suma') {
    const uA = Math.floor(Math.random() * 9) + 1;
    let uB = Math.floor(Math.random() * 5) + (10 - uA);
    if (uB > 9) uB = 9;
    const dA = Math.floor(Math.random() * 4) + 1;
    const dB = Math.floor(Math.random() * (8 - dA)) + 1;
    a = dA * 10 + uA;
    b = dB * 10 + uB;
    res = a + b;
  } else {
    const dA = Math.floor(Math.random() * 6) + 3;
    const dB = Math.floor(Math.random() * (dA - 1)) + 1;
    const uA = Math.floor(Math.random() * 9);
    const uB = Math.floor(Math.random() * (uA + 1));
    a = dA * 10 + uA;
    b = dB * 10 + uB;
    res = a - b;
  }
  return { type: 'operaciones', name: type === 'suma' ? 'Suma con llevada' : 'Resta sin llevada', op: type, val1: a, val2: b, res };
};

export const generateRelojesExercise = (): RelojesExercise => {
  const hour = Math.floor(Math.random() * 12) + 1;
  const minute = Math.random() > 0.5 ? 0 : 30;
  let bH = hour - 1;
  if (bH < 1) bH = 12;
  let aH = hour + 1;
  if (aH > 12) aH = 1;
  return { type: 'relojes', name: 'Relojes analógicos', targetHour: hour, targetMinute: minute, targetBeforeH: bH, targetBeforeM: minute, targetAfterH: aH, targetAfterM: minute };
};

export const generateProblemasExercise = (): ProblemasExercise => {
  const opType = Math.random() > 0.5 ? 'suma' : 'resta';
  const name1 = OTHER_NAMES[Math.floor(Math.random() * OTHER_NAMES.length)];
  const name2 = OTHER_NAMES[Math.floor(Math.random() * OTHER_NAMES.length)];
  const item = PROB_ITEMS[Math.floor(Math.random() * PROB_ITEMS.length)];
  let a: number;
  let b: number;
  let res: number;
  if (opType === 'suma') {
    const uA = Math.floor(Math.random() * 9) + 1;
    const uB = Math.floor(Math.random() * 5) + (10 - uA);
    a = (Math.floor(Math.random() * 4 + 1) * 10) + uA;
    b = (Math.floor(Math.random() * 3 + 1) * 10) + uB;
    res = a + b;
  } else {
    const dA = Math.floor(Math.random() * 6) + 3;
    const dB = Math.floor(Math.random() * (dA - 1)) + 1;
    const uA = Math.floor(Math.random() * 9);
    const uB = Math.floor(Math.random() * (uA + 1));
    a = dA * 10 + uA;
    b = dB * 10 + uB;
    res = a - b;
  }
  const isN1Main = Math.random() > 0.5;
  const charA = isN1Main ? name1 : name2;
  const charB = isN1Main ? name2 : name1;
  return {
    type: 'problemas',
    name: 'Resolución de problemas',
    n1: charA,
    n2: charB,
    item,
    v1: a,
    v2: b,
    op: opType,
    res,
    text: `${charA} tiene ${a} ${item}. ${charB} tiene ${b} ${item} ${opType === 'suma' ? 'más' : 'menos'} que ${charA}. ¿Cuántos ${item} tiene ${charB}?`
  };
};

export const generateEngVocabExercise = (): VocabExercise => {
  const selection = [...ENGLISH_BODY_PARTS].sort(() => 0.5 - Math.random()).slice(0, 6);
  const displayItems = selection.map((item, idx) => ({ ...item, numberId: idx + 1 }));
  const wordList = [...displayItems].sort(() => 0.5 - Math.random());
  return { type: 'vocab', name: 'Vocabulary: Body Parts', displayItems, wordList };
};

export const generateEngGrammarExercise = (): GrammarExercise => {
  const animal = ANIMAL_GRAMMAR_DATA[Math.floor(Math.random() * ANIMAL_GRAMMAR_DATA.length)];
  const validPartsEn = Object.keys(animal.features);
  const availableBodyParts = ENGLISH_BODY_PARTS.filter(p => validPartsEn.includes(p.en));
  const safeBodyParts = availableBodyParts.filter(p => !['finger', 'toe'].includes(p.en));
  const evalParts = [...safeBodyParts].sort(() => 0.5 - Math.random()).slice(0, 4);
  const questions = evalParts.map(part => {
    const correctCount = animal.features[part.en];
    let wrongCount = Math.floor(Math.random() * 4) + 1;
    if (correctCount === 4) wrongCount = Math.floor(Math.random() * 2) + 1;
    while (wrongCount === correctCount) wrongCount = Math.floor(Math.random() * 4) + 1;
    const isPlural = correctCount > 1;
    const word = isPlural ? part.plural : part.en;
    const options = [
      { label: ENG_NUMBERS[correctCount], isCorrect: true },
      { label: ENG_NUMBERS[wrongCount], isCorrect: false }
    ].sort(() => 0.5 - Math.random());
    return { part: word, correctCount, emoji: part.emoji, options };
  });
  return { type: 'grammar', name: "Grammar: I've got a...", animalEmoji: animal.emoji, animalName: animal.name, questions };
};

export const generateEngNumbersExercise = (): NumbersExercise => {
  const numbers: number[] = [];
  while (numbers.length < 5) {
    const n = Math.floor(Math.random() * 20) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }
  const questions = numbers.map(n => {
    const correctWord = ENG_NUMBERS[n];
    let wrong1 = ENG_NUMBERS[Math.floor(Math.random() * 20) + 1];
    let wrong2 = ENG_NUMBERS[Math.floor(Math.random() * 20) + 1];
    while (wrong1 === correctWord) wrong1 = ENG_NUMBERS[Math.floor(Math.random() * 20) + 1];
    while (wrong2 === correctWord || wrong2 === wrong1) wrong2 = ENG_NUMBERS[Math.floor(Math.random() * 20) + 1];
    return { number: n, correctWord, options: [correctWord, wrong1, wrong2].sort(() => 0.5 - Math.random()) };
  });
  return { type: 'numbers', name: 'Numbers 1 to 20', questions };
};

export const generateEngListenExercise = (): ListenExercise => {
  const isVocab = Math.random() > 0.5;
  if (isVocab) {
    const part = ENGLISH_BODY_PARTS[Math.floor(Math.random() * ENGLISH_BODY_PARTS.length)];
    return { type: 'listen', name: 'Listen and Repeat', word: part.en, translation: part.es, displayEmoji: part.emoji };
  }
  const n = Math.floor(Math.random() * 20) + 1;
  return { type: 'listen', name: 'Listen and Repeat', word: ENG_NUMBERS[n], translation: n.toString(), displayEmoji: n };
};
