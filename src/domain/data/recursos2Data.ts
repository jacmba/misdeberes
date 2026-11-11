import type { Subject } from '../../features/app/types';

/**
 * Recursos de 2º de Primaria (curso 2026-27) que la tutora ha ido publicando
 * en el canal General de 2ºB de Teams. Para añadir un recurso nuevo, basta con
 * meterlo en el bloque que corresponda (o crear un bloque nuevo).
 */

/** juegos: colección de Wordwall con varios juegos · juego: un solo recurso · video: YouTube · interactivo: Genially */
export type ResourceKind = 'juegos' | 'juego' | 'video' | 'interactivo';

export interface Resource {
  title: string;
  kind: ResourceKind;
  url: string;
  /** Fecha de publicación en el canal (AAAA-MM-DD). */
  date: string;
  /**
   * Solo juegos sueltos de Wordwall: URL del iframe para jugar dentro de la web.
   * Se saca de https://wordwall.net/api/oembed?url=<url del recurso> (campo html → src, sin &ref=oembed).
   */
  embedUrl?: string;
}

export interface ResourceBlock {
  id: string;
  title: string;
  desc?: string;
  resources: Resource[];
}

export interface SubjectResources {
  subject: Exclude<Subject, null>;
  blocks: ResourceBlock[];
}

export const recursos2: SubjectResources[] = [
  {
    subject: 'matematicas',
    blocks: [
      {
        id: 'numeros-200',
        title: 'Números hasta el 200',
        desc: 'Unidades, decenas y centenas, orden y comparación',
        resources: [
          { title: 'Unidades, decenas y centenas', kind: 'juegos', date: '2026-09-21', url: 'https://wordwall.net/es-cl/community/juego-de-unidades-decenas-y-centenas' },
          { title: 'Número anterior y posterior', kind: 'juegos', date: '2026-09-21', url: 'https://wordwall.net/es-ar/community/numeros-anterior-y-posterior' },
          { title: 'Mayor que / menor que', kind: 'juegos', date: '2026-09-21', url: 'https://wordwall.net/es-cl/community/mayor-menor-que' },
          { title: 'Lectura y escritura de números hasta el 200', kind: 'juego', date: '2026-10-14', url: 'https://wordwall.net/es/resource/18843564/lectura-y-escritura-n%C3%BAmeros-hasta-el-200', embedUrl: 'https://wordwall.net/es/embed/5a83a34aaf5642268b3616f555e23277?themeId=27' },
          { title: 'Numeración hasta el 200', kind: 'juego', date: '2026-10-14', url: 'https://wordwall.net/es/resource/16595072/numeraci%C3%B3n-hasta-el-200', embedUrl: 'https://wordwall.net/es/embed/00d4699e3bd043ff812e08cf4bf56b33?themeId=65' }
        ]
      },
      {
        id: 'calculo',
        title: 'Sumas, restas y cálculo mental',
        resources: [
          { title: 'Restas con llevadas (método de clase)', kind: 'video', date: '2026-11-05', url: 'https://youtu.be/pRTII2H5EDg' },
          { title: 'Cálculo mental', kind: 'juegos', date: '2026-09-21', url: 'https://wordwall.net/en-es/community/2%C2%BA-educaci%C3%B3n-primaria/matem%C3%A1ticas/c%C3%A1lculo-mental' },
          { title: 'Sumas y restas', kind: 'juegos', date: '2026-10-14', url: 'https://wordwall.net/es-ar/community/sumas-y-restas-para-2do-grado' }
        ]
      },
      {
        id: 'problemas',
        title: 'Problemas',
        resources: [
          { title: 'Problemas', kind: 'juegos', date: '2026-10-14', url: 'https://wordwall.net/es-es/community/primaria/problemas' }
        ]
      }
    ]
  },
  {
    subject: 'lengua',
    blocks: [
      {
        id: 'g-suave',
        title: 'La g suave y la diéresis',
        desc: 'ga, go, gu, gue, gui · güe, güi',
        resources: [
          { title: 'Sílabas güe, güi (la diéresis)', kind: 'video', date: '2026-10-21', url: 'https://youtu.be/nRFemVUoq70' },
          { title: 'Palabras con ga, go, gu, gue, gui', kind: 'juegos', date: '2026-10-14', url: 'https://wordwall.net/es-cl/community/ga-go-gu-gue-gui' },
          { title: 'Sílabas güe, güi', kind: 'juegos', date: '2026-10-21', url: 'https://wordwall.net/es-cl/community/g%C3%BCe-g%C3%BCi' }
        ]
      }
    ]
  },
  {
    subject: 'english',
    blocks: [
      {
        id: 'personal-info',
        title: 'Personal information',
        desc: "What's your name? · How old are you?",
        resources: [
          { title: 'Personal information', kind: 'interactivo', date: '2026-09-23', url: 'https://view.genially.com/60373b656a36af0d64c6c69b' }
        ]
      },
      {
        id: 'have-got',
        title: "Toys: I've got / I haven't got",
        resources: [
          { title: "I've got / I haven't got (toys)", kind: 'juego', date: '2026-10-09', url: 'https://wordwall.net/es/resource/71224978/ive-got-i-havent-got-toys-beehive-1-unit-2', embedUrl: 'https://wordwall.net/es/embed/fce4107f0fa346f7b77b547284daf1f8?themeId=21' },
          { title: "I've got / I haven't got (quiz)", kind: 'juego', date: '2026-10-09', url: 'https://wordwall.net/es/resource/34710704/english/ive-got-i-havent-got', embedUrl: 'https://wordwall.net/es/embed/9d4df20c5c7240db9e7692f8bace39f9?themeId=1' },
          { title: "Have got / haven't got (quiz)", kind: 'juego', date: '2026-10-09', url: 'https://wordwall.net/es/resource/10508639/have-got-havent-got', embedUrl: 'https://wordwall.net/es/embed/d65630d29c764e96af86500ff84b5b89?themeId=27' },
          { title: "Have got / haven't got", kind: 'juego', date: '2026-10-09', url: 'https://wordwall.net/es/resource/8817340/have-got-havent-got', embedUrl: 'https://wordwall.net/es/embed/fedcd07a777446b58d24d41d7c7430a7?themeId=21' },
          { title: "I've got / I haven't got (maze chase)", kind: 'juego', date: '2026-10-09', url: 'https://wordwall.net/es/resource/57423274/ive-got-i-havent-got', embedUrl: 'https://wordwall.net/es/embed/e80653f5261b403d82fd0f53afd5ae62?themeId=23' }
        ]
      },
      {
        id: 'can-free-time',
        title: "Free time: can / can't",
        resources: [
          { title: "Can / can't", kind: 'juegos', date: '2026-11-06', url: 'https://wordwall.net/es-ar/community/can-y-cant' },
          { title: 'Free time activities', kind: 'juegos', date: '2026-11-06', url: 'https://wordwall.net/es-ar/community/free-time-activities' }
        ]
      }
    ]
  },
  {
    subject: 'science',
    blocks: [
      {
        id: 'human-body',
        title: 'The human body',
        desc: 'Life stages, senses, bones and muscles',
        resources: [
          { title: 'Human body (video 1)', kind: 'video', date: '2026-09-28', url: 'https://youtu.be/mOKmjYwfDGU' },
          { title: 'Human body (video 2)', kind: 'video', date: '2026-09-28', url: 'https://youtu.be/ZBZWgrfZFbU' },
          { title: 'Life stages', kind: 'juegos', date: '2026-09-28', url: 'https://wordwall.net/es-eg/community/life-stages' },
          { title: 'Nutrition, sensitivity and reproduction', kind: 'juego', date: '2026-09-28', url: 'https://wordwall.net/resource/61503505/nutrition-sensitivity-and-reproduction-quiz', embedUrl: 'https://wordwall.net/embed/bb4f10a6e743462a916f287f021b486c?themeId=1' },
          { title: 'Senses', kind: 'juegos', date: '2026-09-28', url: 'https://wordwall.net/en-us/community/senses' },
          { title: 'Bones and muscles', kind: 'juegos', date: '2026-09-28', url: 'https://wordwall.net/es-us/community/bones-muscles' }
        ]
      },
      {
        id: 'animals',
        title: 'Animals',
        desc: 'Vertebrates and invertebrates · the five groups of vertebrates',
        resources: [
          { title: 'The vertebrates song', kind: 'video', date: '2026-10-08', url: 'https://youtu.be/P9ptHAClC4Q' },
          { title: 'Five groups of vertebrates (video)', kind: 'video', date: '2026-10-16', url: 'https://youtu.be/Pkd7AvAPiO4' },
          { title: 'Vertebrates and invertebrates', kind: 'juegos', date: '2026-10-08', url: 'https://wordwall.net/es-es/community/vertebrate-and-invertebrates' },
          { title: 'Five groups of vertebrates (game 1)', kind: 'juego', date: '2026-10-16', url: 'https://wordwall.net/resource/54084358/mammals-birds-reptiles-amphibians-fish', embedUrl: 'https://wordwall.net/embed/571fb967009742b5980a70125c4052fc?themeId=1' },
          { title: 'Five groups of vertebrates (game 2)', kind: 'juego', date: '2026-10-16', url: 'https://wordwall.net/resource/64547174/mammals-birds-fish-amphibians-and-reptiles', embedUrl: 'https://wordwall.net/embed/92f3f1b0c10449f3bb0b1444574f9fba?themeId=1' },
          { title: 'Five groups of vertebrates (game 3)', kind: 'juego', date: '2026-10-16', url: 'https://wordwall.net/resource/55887710/mammals-birds-fish-amphibians-and-reptiles', embedUrl: 'https://wordwall.net/embed/bc87b479565e41b09668d5155f102356?themeId=65' }
        ]
      },
      {
        id: 'plants',
        title: 'Plants',
        resources: [
          { title: 'Parts of a plant', kind: 'juegos', date: '2026-11-06', url: 'https://wordwall.net/es-es/community/parts-of-plant' },
          { title: 'Plant life cycle', kind: 'juegos', date: '2026-11-06', url: 'https://wordwall.net/en-gb/community/plants/life-cycle' }
        ]
      }
    ]
  }
];

export const getSubjectResources = (subject: Subject): SubjectResources | undefined =>
  recursos2.find(s => s.subject === subject);

/** Devuelve la URL para embeber un vídeo de YouTube (sin cookies) o null si no es de YouTube. */
export const getYoutubeEmbedUrl = (url: string): string | null => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, '');
  let id: string | null = null;
  if (host === 'youtu.be') id = parsed.pathname.slice(1).split('/')[0] || null;
  else if (host === 'youtube.com' || host === 'm.youtube.com') id = parsed.searchParams.get('v');
  if (!id || !/^[\w-]{6,}$/.test(id)) return null;
  return `https://www.youtube-nocookie.com/embed/${id}`;
};
