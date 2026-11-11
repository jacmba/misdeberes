import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
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
