import type { GrammarOption } from '../../features/app/types';

const opt = (label: string, isCorrect: boolean): GrammarOption => ({ label, isCorrect });

export const SCIENCE_MATRIX_ROW_LABELS = ['Bus', 'Train', 'Airplane', 'Car', 'Bike', 'Motorbike'] as const;

export const SCIENCE_MATRIX_COLUMN_LABELS = [
  'On land',
  'By sea',
  'By air',
  'Individual',
  'Collective',
  'Bus station',
  'Train station',
  'Airport'
] as const;

/** Rows match SCIENCE_MATRIX_ROW_LABELS; columns match SCIENCE_MATRIX_COLUMN_LABELS */
export const SCIENCE_MATRIX_SOLUTION: boolean[][] = [
  [true, false, false, false, true, true, false, false],
  [true, false, false, false, true, false, true, false],
  [false, false, true, false, true, false, false, true],
  [true, false, false, true, false, false, false, false],
  [true, false, false, true, false, false, false, false],
  [true, false, false, true, false, false, false, false]
];

export const SCIENCE_TRANSPORT_QUESTIONS = [
  {
    prompt: 'Is a bus collective or individual?',
    emoji: '🚌',
    options: [opt('Collective', true), opt('Individual', false)]
  },
  {
    prompt: 'Is a train collective or individual?',
    emoji: '🚆',
    options: [opt('Collective', true), opt('Individual', false)]
  },
  {
    prompt: 'Is an airplane collective or individual?',
    emoji: '✈️',
    options: [opt('Collective', true), opt('Individual', false)]
  },
  {
    prompt: 'Is a car collective or individual?',
    emoji: '🚗',
    options: [opt('Collective', false), opt('Individual', true)]
  },
  {
    prompt: 'Is a bike collective or individual?',
    emoji: '🚲',
    options: [opt('Collective', false), opt('Individual', true)]
  },
  {
    prompt: 'Is a motorbike collective or individual?',
    emoji: '🏍️',
    options: [opt('Collective', false), opt('Individual', true)]
  }
];

export const SCIENCE_HOW_TRAVEL_QUESTIONS = [
  { prompt: 'How does a bus usually travel?', emoji: '🚌', options: [opt('On land', true), opt('By air', false), opt('By sea', false)] },
  { prompt: 'How does a train usually travel?', emoji: '🚆', options: [opt('On land', true), opt('By air', false), opt('By sea', false)] },
  { prompt: 'How does an airplane usually travel?', emoji: '✈️', options: [opt('On land', false), opt('By air', true), opt('By sea', false)] },
  { prompt: 'How does a car usually travel?', emoji: '🚗', options: [opt('On land', true), opt('By air', false), opt('By sea', false)] },
  { prompt: 'How does a bike usually travel?', emoji: '🚲', options: [opt('On land', true), opt('By air', false), opt('By sea', false)] },
  { prompt: 'How does a motorbike usually travel?', emoji: '🏍️', options: [opt('On land', true), opt('By air', false), opt('By sea', false)] }
];

export const SCIENCE_WHERE_QUESTIONS = [
  {
    prompt: 'Where do you usually take a plane?',
    emoji: '✈️',
    options: [opt('Airport', true), opt('Port', false), opt('Bus station', false), opt('Train station', false)]
  },
  {
    prompt: 'Where do you usually take a ship?',
    emoji: '🚢',
    options: [opt('Airport', false), opt('Port', true), opt('Bus station', false), opt('Train station', false)]
  },
  {
    prompt: 'Where do you usually take a bus?',
    emoji: '🚌',
    options: [opt('Airport', false), opt('Port', false), opt('Bus station', true), opt('Train station', false)]
  },
  {
    prompt: 'Where do you usually take a train?',
    emoji: '🚆',
    options: [opt('Airport', false), opt('Port', false), opt('Bus station', false), opt('Train station', true)]
  }
];
