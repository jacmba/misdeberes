import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import appReducer from './features/app/appSlice';

const renderApp = () => {
  const store = configureStore({
    reducer: { app: appReducer }
  });
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const pickCourse = (label: RegExp) => fireEvent.click(screen.getByRole('button', { name: label }));

describe('App integration flow', () => {
  it('shows the course list first', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /1º Primaria/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /2º Primaria/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Mates/i })).not.toBeInTheDocument();
  });

  it('goes back from subjects to the course list', async () => {
    renderApp();
    pickCourse(/1º Primaria/i);
    fireEvent.click(await screen.findByRole('button', { name: /Cursos/i }));
    expect(await screen.findByRole('button', { name: /2º Primaria/i })).toBeInTheDocument();
  });

  describe('exámenes de 2º', () => {
    afterEach(() => vi.useRealTimers());

    it('shows the next exam on the subject card and on the resources page', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date(2026, 10, 11, 10, 0));
      renderApp();
      pickCourse(/2º Primaria/i);

      const science = await screen.findByRole('button', { name: /Science/i });
      expect(science).toHaveTextContent(/Examen 13 nov/i);
      expect(screen.getByRole('button', { name: /English/i })).toHaveTextContent(/Examen hoy/i);
      expect(screen.getByRole('button', { name: /Lengua/i })).not.toHaveTextContent(/Examen/i);

      fireEvent.click(science);
      const box = await screen.findByRole('region', { name: /Próximos exámenes/i });
      expect(box).toHaveTextContent(/En 2 días/i);
      expect(screen.getByText(/Exámenes anteriores/i)).toBeInTheDocument();
    });

    it('marks an exam happening today', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date(2026, 10, 11, 10, 0));
      renderApp();
      pickCourse(/2º Primaria/i);
      fireEvent.click(await screen.findByRole('button', { name: /English/i }));
      expect(await screen.findByRole('region', { name: /Próximos exámenes/i })).toHaveTextContent(/¡Hoy!/);
    });

    it('does not show exam badges in 1º', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date(2026, 10, 11, 10, 0));
      renderApp();
      pickCourse(/1º Primaria/i);
      expect(await screen.findByRole('button', { name: /Science/i })).not.toHaveTextContent(/Examen/i);
    });
  });

  it('opens 2º science resources with embedded videos and external links', async () => {
    renderApp();
    pickCourse(/2º Primaria/i);
    fireEvent.click(await screen.findByRole('button', { name: /Science/i }));

    expect(await screen.findByRole('heading', { name: /The human body/i })).toBeInTheDocument();
    expect(screen.getAllByTitle(/Human body/i)[0].tagName).toBe('IFRAME');
    const link = screen.getByRole('link', { name: /Bones and muscles/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));

    fireEvent.click(screen.getByRole('button', { name: /Asignaturas/i }));
    expect(await screen.findByRole('button', { name: /Lengua/i })).toBeInTheDocument();
  });

  it('plays a single Wordwall game inside the page on demand', async () => {
    renderApp();
    pickCourse(/2º Primaria/i);
    fireEvent.click(await screen.findByRole('button', { name: /Science/i }));

    expect(screen.queryByTitle('Juego: Nutrition, sensitivity and reproduction')).not.toBeInTheDocument();
    const play = screen.getByRole('button', { name: /Jugar aquí: Nutrition, sensitivity and reproduction/i });
    expect(play).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(play);

    const frame = await screen.findByTitle('Juego: Nutrition, sensitivity and reproduction');
    expect(frame).toHaveAttribute('src', 'https://wordwall.net/embed/bb4f10a6e743462a916f287f021b486c?themeId=1');
    expect(play).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(play);
    expect(screen.queryByTitle('Juego: Nutrition, sensitivity and reproduction')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Jugar aquí: Bones and muscles/i })).not.toBeInTheDocument();
  });

  it('navigates landing -> themes -> exercises', async () => {
    renderApp();
    pickCourse(/1º Primaria/i);

    fireEvent.click(screen.getByRole('button', { name: /Mates/i }));
    expect(await screen.findByText('Matemáticas')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Tema 7/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Comprobar/i })).toBeInTheDocument();
    });
    expect(screen.getByText('Gráficos')).toBeInTheDocument();
  });

  it('returns from exercises to themes', async () => {
    renderApp();
    pickCourse(/1º Primaria/i);
    fireEvent.click(screen.getByRole('button', { name: /Mates/i }));
    fireEvent.click(await screen.findByRole('button', { name: /Tema 7/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /Volver a Temas/i }).length).toBeGreaterThan(0);
    });
    fireEvent.click(screen.getAllByRole('button', { name: /Volver a Temas/i })[0]);
    expect(await screen.findByText('Matemáticas')).toBeInTheDocument();
  });

  it('opens lengua tema 8 and shows first lengua section', async () => {
    renderApp();
    pickCourse(/1º Primaria/i);
    fireEvent.click(screen.getByRole('button', { name: /Lengua/i }));
    expect(await screen.findByText('Lengua')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Tema 8/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Comprobar/i })).toBeInTheDocument();
    });
    expect(screen.getByText('Cada palabra')).toBeInTheDocument();
    expect(screen.getByText('Cada palabra en su lugar')).toBeInTheDocument();
  });

  it('opens science unit 8 and shows first science section', async () => {
    renderApp();
    pickCourse(/1º Primaria/i);
    fireEvent.click(screen.getByRole('button', { name: /Science/i }));
    expect(await screen.findByText('Science')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Unit 8/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Comprobar/i })).toBeInTheDocument();
    });
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Collective or individual?')).toBeInTheDocument();
  });
});
