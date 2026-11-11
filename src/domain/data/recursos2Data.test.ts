import { describe, expect, it } from 'vitest';
import { getYoutubeEmbedUrl, recursos2, type ResourceKind } from './recursos2Data';

const allResources = recursos2.flatMap(s => s.blocks.flatMap(b => b.resources));

describe('recursos de 2º', () => {
  it('cubre las cuatro asignaturas en orden', () => {
    expect(recursos2.map(s => s.subject)).toEqual(['matematicas', 'lengua', 'english', 'science']);
  });

  it('incluye todos los enlaces publicados en el canal sin duplicados', () => {
    expect(allResources).toHaveLength(34);
    const urls = allResources.map(r => r.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('no tiene bloques vacíos y cada recurso tiene datos válidos', () => {
    const kinds: ResourceKind[] = ['juegos', 'juego', 'video', 'interactivo'];
    recursos2.forEach(s => {
      expect(s.blocks.length).toBeGreaterThan(0);
      s.blocks.forEach(b => expect(b.resources.length).toBeGreaterThan(0));
    });
    allResources.forEach(r => {
      expect(r.title.length).toBeGreaterThan(0);
      expect(r.date).toMatch(/^2026-\d{2}-\d{2}$/);
      expect(kinds).toContain(r.kind);
      expect(r.url).toMatch(/^https:\/\//);
    });
  });

  it('todos los vídeos se pueden embeber', () => {
    const videos = allResources.filter(r => r.kind === 'video');
    expect(videos).toHaveLength(6);
    videos.forEach(v => expect(getYoutubeEmbedUrl(v.url)).not.toBeNull());
  });
});

describe('getYoutubeEmbedUrl', () => {
  it('convierte enlaces youtu.be y youtube.com a embed sin cookies', () => {
    expect(getYoutubeEmbedUrl('https://youtu.be/mOKmjYwfDGU')).toBe('https://www.youtube-nocookie.com/embed/mOKmjYwfDGU');
    expect(getYoutubeEmbedUrl('https://youtu.be/mOKmjYwfDGU?si=abc')).toBe('https://www.youtube-nocookie.com/embed/mOKmjYwfDGU');
    expect(getYoutubeEmbedUrl('https://www.youtube.com/watch?v=P9ptHAClC4Q&t=3')).toBe('https://www.youtube-nocookie.com/embed/P9ptHAClC4Q');
  });

  it('devuelve null para enlaces que no son de YouTube', () => {
    expect(getYoutubeEmbedUrl('https://wordwall.net/resource/1/x')).toBeNull();
    expect(getYoutubeEmbedUrl('no es una url')).toBeNull();
  });
});
