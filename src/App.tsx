import LandingPage from './pages/LandingPage';
import ExercisesPage from './pages/ExercisesPage';
import ThemesPage from './pages/ThemesPage';
import { useAppSelector } from './app/store';
import useAppActions from './hooks/useAppActions';
import useExerciseController from './hooks/useExerciseController';

const App = (): JSX.Element | null => {
  const {
    view,
    subject,
    currentSection,
    exercise,
    feedback,
    isCompleted,
    userNumbers,
    grid,
    answers,
    opInput,
    clockInput,
    probInput,
    engInput,
    featureMatrix
  } = useAppSelector(state => state.app);

  const {
    setView,
    setSubject,
    setCurrentSection,
    setExercise,
    setFeedback,
    setIsCompleted,
    setUserNumbers,
    setGrid,
    setAnswers,
    setOpInput,
    setClockInput,
    setProbInput,
    setEngInput,
    setFeatureMatrix
  } = useAppActions();

  const {
    playAudio,
    checkSolution,
    handleCellClick,
    handleMatrixCellClick,
    generateGraficos,
    generateOperaciones,
    generateRelojes,
    generateProblemas,
    generateEngVocab,
    generateEngGrammar,
    generateEngNumbers,
    generateEngListen,
    generateCadaPalabra,
    generateCorrigeError,
    generateCambiaGenero,
    generateSciTransport,
    generateSciHowTravel,
    generateSciWhere,
    generateSciMatrix
  } = useExerciseController({
    view,
    currentSection,
    exercise,
    isCompleted,
    userNumbers,
    grid,
    answers,
    opInput,
    clockInput,
    probInput,
    engInput,
    featureMatrix,
    setExercise,
    setFeedback,
    setIsCompleted,
    setUserNumbers,
    setGrid,
    setAnswers,
    setOpInput,
    setClockInput: value => setClockInput(value),
    setProbInput,
    setEngInput,
    setFeatureMatrix
  });

  if (view === 'landing') {
    return (
      <LandingPage
        onSelectSubject={nextSubject => {
          setSubject(nextSubject);
          setView('themes');
        }}
      />
    );
  }

  if (view === 'themes') {
    return (
      <ThemesPage
        subject={subject}
        onBack={() => setView('landing')}
        onSelectSection={section => {
          setCurrentSection(section);
          setView('exercises');
        }}
      />
    );
  }

  if (!exercise) return null;
  return (
    <ExercisesPage
      subject={subject}
      currentSection={currentSection}
      exercise={exercise}
      isCompleted={isCompleted}
      feedback={feedback}
      userNumbers={userNumbers}
      grid={grid}
      answers={answers}
      opInput={opInput}
      clockInput={clockInput}
      probInput={probInput}
      engInput={engInput}
      featureMatrix={featureMatrix}
      setView={setView}
      setCurrentSection={setCurrentSection}
      setUserNumbers={setUserNumbers}
      setAnswers={setAnswers}
      setOpInput={setOpInput}
      setClockInput={setClockInput}
      setProbInput={setProbInput}
      setEngInput={setEngInput}
      handleCellClick={handleCellClick}
      handleMatrixCellClick={handleMatrixCellClick}
      playAudio={playAudio}
      checkSolution={checkSolution}
      generateGraficos={generateGraficos}
      generateOperaciones={generateOperaciones}
      generateRelojes={generateRelojes}
      generateProblemas={generateProblemas}
      generateEngVocab={generateEngVocab}
      generateEngGrammar={generateEngGrammar}
      generateEngNumbers={generateEngNumbers}
      generateEngListen={generateEngListen}
      generateCadaPalabra={generateCadaPalabra}
      generateCorrigeError={generateCorrigeError}
      generateCambiaGenero={generateCambiaGenero}
      generateSciTransport={generateSciTransport}
      generateSciHowTravel={generateSciHowTravel}
      generateSciWhere={generateSciWhere}
      generateSciMatrix={generateSciMatrix}
    />
  );
};

export default App;
