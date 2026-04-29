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

describe('App integration flow', () => {
  it('navigates landing -> themes -> exercises', async () => {
    renderApp();

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
    fireEvent.click(screen.getByRole('button', { name: /Mates/i }));
    fireEvent.click(await screen.findByRole('button', { name: /Tema 7/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /Volver a Temas/i }).length).toBeGreaterThan(0);
    });
    fireEvent.click(screen.getAllByRole('button', { name: /Volver a Temas/i })[0]);
    expect(await screen.findByText('Matemáticas')).toBeInTheDocument();
  });
});
