import type { QuestionType } from '../../features/app/types';

interface ThemeGrafico {
  id: string;
  name: string;
  intro: string;
  unit: string;
  items: string[];
}

export const THEMES_GRAFICOS: ThemeGrafico[] = [
  { id: 'deportes', name: 'Deportes', intro: 'En el club deportivo, los niños se han apuntado a:', unit: 'niños', items: ['⚽ Fútbol', '🏐 Voley', '🏀 Basket', '🎾 Tenis'] },
  { id: 'frutas', name: 'Frutas', intro: 'En el frutero de la cocina tenemos estas piezas:', unit: 'frutas', items: ['🍎 Manzana', '🍌 Plátano', '🍐 Pera', '🍊 Naranja'] },
  { id: 'animales', name: 'Granja', intro: 'En la granja del tío Pepe hemos contado:', unit: 'animales', items: ['🐥 Pollitos', '🐷 Cerditos', '🐮 Vacas', '🐑 Ovejas'] },
  { id: 'colegio', name: 'Colegio', intro: 'En nuestra mochila de clase hay:', unit: 'objetos', items: ['✏️ Lápices', '📚 Libros', '🎨 Pinceles', '📏 Reglas'] },
  { id: 'juguetes', name: 'Juguetes', intro: 'En el baúl de los juegos hay:', unit: 'juguetes', items: ['🚗 Coches', '🧸 Peluches', '🧩 Puzles', '🪁 Cometas'] }
];

export const OTHER_NAMES: string[] = ['Rocío', 'Frida', 'Amaia', 'Mario', 'Encho', 'Cloe', 'Lucía', 'Claudia', 'Sofía', 'Alba'];
export const PROB_ITEMS: string[] = [
  'pegatinas de las guerreras K-Pop', 'cartas de Pikachu', 'gomas de borrar', 'muñecas Barbie',
  'pegatinas', 'canicas', 'cromos', 'lápices', 'caramelos', 'bombones',
  'estrellas', 'flores', 'globos', 'galletas', 'conchas de mar', 'pinceles'
];

export const QUESTION_TYPES: QuestionType[] = [
  { id: 'most', label: '¿En qué grupo hay MÁS cantidad?' },
  { id: 'least', label: '¿En qué grupo hay MENOS cantidad?' },
  { id: 'second', label: '¿Cuál es el 2º con más cantidad?' },
  { id: 'third', label: '¿Cuál es el 3º con más cantidad?' }
];
