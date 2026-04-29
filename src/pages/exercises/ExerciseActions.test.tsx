import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ExerciseActions from './ExerciseActions';

const baseProps = {
  feedback: null,
  currentSection: 'graficos' as const,
  isCompleted: false,
  subject: 'matematicas' as const,
  checkSolution: vi.fn(),
  generateGraficos: vi.fn(),
  generateOperaciones: vi.fn(),
  generateRelojes: vi.fn(),
  generateProblemas: vi.fn(),
  generateEngVocab: vi.fn(),
  generateEngGrammar: vi.fn(),
  generateEngNumbers: vi.fn(),
  generateEngListen: vi.fn()
};

describe('ExerciseActions', () => {
  it('shows check button while not completed', () => {
    render(<ExerciseActions {...baseProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Comprobar' }));
    expect(baseProps.checkSolution).toHaveBeenCalledTimes(1);
  });

  it('shows next button and runs section generator when completed', () => {
    render(<ExerciseActions {...baseProps} isCompleted />);
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(baseProps.generateGraficos).toHaveBeenCalledTimes(1);
  });

  it('renders listen mode action', () => {
    render(<ExerciseActions {...baseProps} currentSection="listen" subject="english" />);
    fireEvent.click(screen.getByRole('button', { name: /Siguiente palabra/i }));
    expect(baseProps.generateEngListen).toHaveBeenCalledTimes(1);
  });

  it('renders success feedback banner', () => {
    render(<ExerciseActions {...baseProps} feedback={{ type: 'success', message: 'Perfecto' }} />);
    expect(screen.getByText('Perfecto')).toBeInTheDocument();
  });
});
