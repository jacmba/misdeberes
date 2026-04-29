interface EnglishBodyPart {
  es: string;
  en: string;
  plural: string;
  emoji: string;
}

interface AnimalGrammarData {
  emoji: string;
  name: string;
  features: Record<string, number>;
}

export const ENGLISH_BODY_PARTS: EnglishBodyPart[] = [
  { es: 'ojos', en: 'eye', plural: 'eyes', emoji: '👀' },
  { es: 'boca', en: 'mouth', plural: 'mouths', emoji: '👄' },
  { es: 'orejas', en: 'ear', plural: 'ears', emoji: '👂' },
  { es: 'nariz', en: 'nose', plural: 'noses', emoji: '👃' },
  { es: 'brazos', en: 'arm', plural: 'arms', emoji: '💪' },
  { es: 'piernas', en: 'leg', plural: 'legs', emoji: '🦵' },
  { es: 'manos', en: 'hand', plural: 'hands', emoji: '🙌' },
  { es: 'pies', en: 'foot', plural: 'feet', emoji: '🦶' },
  { es: 'dedos de la mano', en: 'finger', plural: 'fingers', emoji: '🖐️' },
  { es: 'dedos del pie', en: 'toe', plural: 'toes', emoji: '🐾' }
];

export const ENG_NUMBERS: string[] = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
];

export const ANIMAL_GRAMMAR_DATA: AnimalGrammarData[] = [
  { emoji: '🐵', name: 'monkey', features: { eye: 2, mouth: 1, ear: 2, nose: 1, arm: 2, leg: 2, hand: 2, foot: 2 } },
  { emoji: '🐶', name: 'dog', features: { eye: 2, mouth: 1, ear: 2, nose: 1, leg: 4 } },
  { emoji: '🐱', name: 'cat', features: { eye: 2, mouth: 1, ear: 2, nose: 1, leg: 4 } },
  { emoji: '🐮', name: 'cow', features: { eye: 2, mouth: 1, ear: 2, nose: 1, leg: 4 } },
  { emoji: '🐦', name: 'bird', features: { eye: 2, mouth: 1, leg: 2, foot: 2 } },
  { emoji: '🐸', name: 'frog', features: { eye: 2, mouth: 1, leg: 4, foot: 4 } }
];
