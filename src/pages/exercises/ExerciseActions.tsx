import { ChevronRight, Trophy, XCircle } from 'lucide-react';
import type { FeedbackState, Section, Subject } from '../../features/app/types';
import { cn } from '../../styles/cn';
import { actionButton, feedbackBanner } from '../../styles/variants';

interface ExerciseActionsProps {
  feedback: FeedbackState | null;
  currentSection: Section;
  isCompleted: boolean;
  subject: Subject;
  checkSolution: () => void;
  generateGraficos: () => void;
  generateOperaciones: () => void;
  generateRelojes: () => void;
  generateProblemas: () => void;
  generateEngVocab: () => void;
  generateEngGrammar: () => void;
  generateEngNumbers: () => void;
  generateEngListen: () => void;
}

const ExerciseActions = ({
  feedback,
  currentSection,
  isCompleted,
  subject,
  checkSolution,
  generateGraficos,
  generateOperaciones,
  generateRelojes,
  generateProblemas,
  generateEngVocab,
  generateEngGrammar,
  generateEngNumbers,
  generateEngListen
}: ExerciseActionsProps): JSX.Element => (
  <>
    {feedback && (
      <div className={feedbackBanner({ type: feedback.type })}>
        {feedback.type === 'success' ? <Trophy size={80} className="text-green-500 animate-bounce" /> : <XCircle size={80} className="text-rose-500" />}
        <span className="font-black text-5xl leading-tight">{feedback.message}</span>
      </div>
    )}

    <div className="mt-16 flex gap-8">
      {currentSection !== 'listen' && (
        !isCompleted ? (
          <button onClick={checkSolution} className={cn(actionButton({ intent: 'primary' }), 'text-5xl')}>Comprobar</button>
        ) : (
          <button onClick={() => { if (subject === 'matematicas') { if (currentSection === 'graficos') generateGraficos(); else if (currentSection === 'operaciones') generateOperaciones(); else if (currentSection === 'relojes') generateRelojes(); else generateProblemas(); } else { if (currentSection === 'vocab') generateEngVocab(); else if (currentSection === 'grammar') generateEngGrammar(); else generateEngNumbers(); } }} className={cn(actionButton({ intent: 'success', italic: true }), 'text-5xl')}>¡Siguiente! <ChevronRight strokeWidth={5} size={64} /></button>
        )
      )}
      {currentSection === 'listen' && (
        <button onClick={generateEngListen} className={cn(actionButton({ intent: 'success', italic: true }), 'text-5xl')}>Siguiente palabra <ChevronRight strokeWidth={5} size={64} /></button>
      )}
    </div>
  </>
);

export default ExerciseActions;
