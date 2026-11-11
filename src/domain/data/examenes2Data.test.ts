import { describe, expect, it } from 'vitest';
import { daysUntil, examenes2, getSubjectExams, toLocalIsoDate } from './examenes2Data';

describe('exámenes de 2º', () => {
  it('tiene los exámenes publicados en el canal con fechas válidas', () => {
    expect(examenes2).toHaveLength(6);
    examenes2.forEach(e => expect(e.date).toMatch(/^2026-\d{2}-\d{2}$/));
  });

  it('separa próximos (incluido hoy) y pasados, ordenados', () => {
    const { upcoming, past } = getSubjectExams('science', '2026-11-11');
    expect(upcoming.map(e => e.date)).toEqual(['2026-11-13']);
    expect(past.map(e => e.date)).toEqual(['2026-10-22', '2026-10-02']);

    const english = getSubjectExams('english', '2026-11-11');
    expect(english.upcoming.map(e => e.date)).toEqual(['2026-11-11']);
  });

  it('devuelve listas vacías para asignaturas sin exámenes', () => {
    expect(getSubjectExams('lengua', '2026-11-11')).toEqual({ upcoming: [], past: [] });
  });

  it('calcula los días que faltan', () => {
    expect(daysUntil('2026-11-13', '2026-11-11')).toBe(2);
    expect(daysUntil('2026-11-11', '2026-11-11')).toBe(0);
    expect(daysUntil('2026-12-01', '2026-11-30')).toBe(1);
    expect(daysUntil('2027-03-29', '2027-03-27')).toBe(2);
  });

  it('formatea la fecha local como AAAA-MM-DD', () => {
    expect(toLocalIsoDate(new Date(2026, 10, 5, 23, 30))).toBe('2026-11-05');
  });
});
