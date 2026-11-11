import type { Subject } from '../../features/app/types';

/** Fechas de examen de 2º publicadas en el canal de clase (curso 2026-27). */
export interface Exam {
  subject: Exclude<Subject, null>;
  /** AAAA-MM-DD */
  date: string;
  topic?: string;
  note?: string;
}

export const examenes2: Exam[] = [
  { subject: 'english', date: '2026-10-01', topic: 'Unit 1' },
  { subject: 'english', date: '2026-10-20', topic: "Toys, school objects y have got" },
  { subject: 'english', date: '2026-11-11', note: 'Aplazado desde el 4 de noviembre' },
  { subject: 'science', date: '2026-10-02', topic: 'El cuerpo humano' },
  { subject: 'science', date: '2026-10-22', topic: 'Los animales', note: 'Aplazado desde el 21 de octubre' },
  { subject: 'science', date: '2026-11-13', note: 'Aplazado desde el 5 de noviembre' }
];

export const toLocalIsoDate = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const isoToUtcMs = (iso: string): number => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

/** Días naturales entre `today` y `date` (ambos AAAA-MM-DD). */
export const daysUntil = (date: string, today: string): number =>
  Math.round((isoToUtcMs(date) - isoToUtcMs(today)) / 86_400_000);

/** Exámenes de una asignatura: próximos (desde hoy, el más cercano primero) y pasados (el más reciente primero). */
export const getSubjectExams = (subject: Subject, today: string): { upcoming: Exam[]; past: Exam[] } => {
  const exams = examenes2.filter(e => e.subject === subject);
  return {
    upcoming: exams.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)),
    past: exams.filter(e => e.date < today).sort((a, b) => b.date.localeCompare(a.date))
  };
};

/** Fecha corta en español, p. ej. "13 nov". */
export const formatShortDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};
