import type { CambiaGeneroPrompt, PalabraGeneroItem } from '../../features/app/types';

export const LENGUA_NOUNS: PalabraGeneroItem[] = [
  { noun: 'gato', gender: 'masculino' }, { noun: 'perro', gender: 'masculino' }, { noun: 'niño', gender: 'masculino' }, { noun: 'libro', gender: 'masculino' }, { noun: 'cuaderno', gender: 'masculino' },
  { noun: 'estuche', gender: 'masculino' }, { noun: 'lápiz', gender: 'masculino' }, { noun: 'bolígrafo', gender: 'masculino' }, { noun: 'colegio', gender: 'masculino' }, { noun: 'patio', gender: 'masculino' },
  { noun: 'árbol', gender: 'masculino' }, { noun: 'coche', gender: 'masculino' }, { noun: 'camión', gender: 'masculino' }, { noun: 'barco', gender: 'masculino' }, { noun: 'avión', gender: 'masculino' },
  { noun: 'tren', gender: 'masculino' }, { noun: 'zapato', gender: 'masculino' }, { noun: 'calcetín', gender: 'masculino' }, { noun: 'sombrero', gender: 'masculino' }, { noun: 'abrigo', gender: 'masculino' },
  { noun: 'parque', gender: 'masculino' }, { noun: 'jardín', gender: 'masculino' }, { noun: 'bosque', gender: 'masculino' }, { noun: 'río', gender: 'masculino' }, { noun: 'mar', gender: 'masculino' },
  { noun: 'cielo', gender: 'masculino' }, { noun: 'sol', gender: 'masculino' }, { noun: 'viento', gender: 'masculino' }, { noun: 'invierno', gender: 'masculino' }, { noun: 'verano', gender: 'masculino' },
  { noun: 'otoño', gender: 'masculino' }, { noun: 'primero', gender: 'masculino' }, { noun: 'recreo', gender: 'masculino' }, { noun: 'pasillo', gender: 'masculino' }, { noun: 'techo', gender: 'masculino' },
  { noun: 'suelo', gender: 'masculino' }, { noun: 'queso', gender: 'masculino' }, { noun: 'pan', gender: 'masculino' }, { noun: 'yogur', gender: 'masculino' }, { noun: 'helado', gender: 'masculino' },
  { noun: 'plátano', gender: 'masculino' }, { noun: 'melón', gender: 'masculino' }, { noun: 'limón', gender: 'masculino' }, { noun: 'tomate', gender: 'masculino' }, { noun: 'pepino', gender: 'masculino' },
  { noun: 'conejo', gender: 'masculino' }, { noun: 'caballo', gender: 'masculino' }, { noun: 'león', gender: 'masculino' }, { noun: 'delfín', gender: 'masculino' }, { noun: 'pulpo', gender: 'masculino' },
  { noun: 'oso', gender: 'masculino' }, { noun: 'mono', gender: 'masculino' }, { noun: 'pájaro', gender: 'masculino' }, { noun: 'ratón', gender: 'masculino' }, { noun: 'dragón', gender: 'masculino' },
  { noun: 'casa', gender: 'femenino' }, { noun: 'libreta', gender: 'femenino' }, { noun: 'mesa', gender: 'femenino' }, { noun: 'silla', gender: 'femenino' }, { noun: 'puerta', gender: 'femenino' },
  { noun: 'ventana', gender: 'femenino' }, { noun: 'mochila', gender: 'femenino' }, { noun: 'regla', gender: 'femenino' }, { noun: 'goma', gender: 'femenino' }, { noun: 'clase', gender: 'femenino' },
  { noun: 'escuela', gender: 'femenino' }, { noun: 'playa', gender: 'femenino' }, { noun: 'montaña', gender: 'femenino' }, { noun: 'ciudad', gender: 'femenino' }, { noun: 'carretera', gender: 'femenino' },
  { noun: 'camisa', gender: 'femenino' }, { noun: 'falda', gender: 'femenino' }, { noun: 'chaqueta', gender: 'femenino' }, { noun: 'bufanda', gender: 'femenino' }, { noun: 'nube', gender: 'femenino' },
  { noun: 'lluvia', gender: 'femenino' }, { noun: 'tormenta', gender: 'femenino' }, { noun: 'primavera', gender: 'femenino' }, { noun: 'luna', gender: 'femenino' }, { noun: 'estrella', gender: 'femenino' },
  { noun: 'fruta', gender: 'femenino' }, { noun: 'manzana', gender: 'femenino' }, { noun: 'pera', gender: 'femenino' }, { noun: 'sandía', gender: 'femenino' }, { noun: 'fresa', gender: 'femenino' },
  { noun: 'naranja', gender: 'femenino' }, { noun: 'zanahoria', gender: 'femenino' }, { noun: 'cebolla', gender: 'femenino' }, { noun: 'patata', gender: 'femenino' }, { noun: 'sopa', gender: 'femenino' },
  { noun: 'tortilla', gender: 'femenino' }, { noun: 'ensalada', gender: 'femenino' }, { noun: 'oveja', gender: 'femenino' }, { noun: 'vaca', gender: 'femenino' }, { noun: 'jirafa', gender: 'femenino' },
  { noun: 'cebra', gender: 'femenino' }, { noun: 'mariposa', gender: 'femenino' }, { noun: 'hormiga', gender: 'femenino' }, { noun: 'araña', gender: 'femenino' }, { noun: 'tortuga', gender: 'femenino' },
  { noun: 'ballena', gender: 'femenino' }, { noun: 'familia', gender: 'femenino' }, { noun: 'amiga', gender: 'femenino' }, { noun: 'vecina', gender: 'femenino' }, { noun: 'profesora', gender: 'femenino' }
];

export interface CorrigeTemplate {
  noun: string;
  correctArticle: string;
}

export const CORRIGE_ERROR_TEMPLATES: CorrigeTemplate[] = [
  { noun: 'perro', correctArticle: 'el' }, { noun: 'gato', correctArticle: 'el' }, { noun: 'estuche', correctArticle: 'el' }, { noun: 'camión', correctArticle: 'el' }, { noun: 'árbol', correctArticle: 'el' },
  { noun: 'cuaderno', correctArticle: 'el' }, { noun: 'libro', correctArticle: 'el' }, { noun: 'patio', correctArticle: 'el' }, { noun: 'zapato', correctArticle: 'el' }, { noun: 'sombrero', correctArticle: 'el' },
  { noun: 'abuelas', correctArticle: 'las' }, { noun: 'mochilas', correctArticle: 'las' }, { noun: 'ventanas', correctArticle: 'las' }, { noun: 'faldas', correctArticle: 'las' }, { noun: 'cebras', correctArticle: 'las' },
  { noun: 'libreta', correctArticle: 'la' }, { noun: 'mesa', correctArticle: 'la' }, { noun: 'silla', correctArticle: 'la' }, { noun: 'puerta', correctArticle: 'la' }, { noun: 'chaqueta', correctArticle: 'la' },
  { noun: 'perros', correctArticle: 'los' }, { noun: 'gatos', correctArticle: 'los' }, { noun: 'estuches', correctArticle: 'los' }, { noun: 'camiones', correctArticle: 'los' }, { noun: 'árboles', correctArticle: 'los' }
];

export const CAMBIA_GENERO_PROMPTS: CambiaGeneroPrompt[] = [
  { source: 'El niño está contento.', validAnswers: ['La niña está contenta.'] },
  { source: 'El abuelo es divertido.', validAnswers: ['La abuela es divertida.'] },
  { source: 'El gato es pequeño.', validAnswers: ['La gata es pequeña.'] },
  { source: 'El profesor está cansado.', validAnswers: ['La profesora está cansada.'] },
  { source: 'El amigo es alto.', validAnswers: ['La amiga es alta.'] },
  { source: 'El hermano está nervioso.', validAnswers: ['La hermana está nerviosa.'] },
  { source: 'El panadero es amable.', validAnswers: ['La panadera es amable.'] },
  { source: 'El vecino está tranquilo.', validAnswers: ['La vecina está tranquila.'] }
];
