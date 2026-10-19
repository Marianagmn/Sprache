import React, { useRef, useState } from 'react';
import { AppState, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { getLessonByActivityId } from '../services/lessonService';
import {
  buildLessonCompletion,
  getCorrectAnswerFeedback,
  isQuestionAnswerCorrect,
} from '../services/lessonProgressService';
import AppButton from '../components/common/AppButton';
import AnswerOption from '../components/learning/AnswerOption';
import AudioButton from '../components/learning/AudioButton';
import FeedbackMessage from '../components/learning/FeedbackMessage';
import HintButton from '../components/learning/HintButton';
import LessonHeader from '../components/learning/LessonHeader';
import LessonProgress from '../components/learning/LessonProgress';
import QuestionCard from '../components/learning/QuestionCard';
import SessionSummary from '../components/learning/SessionSummary';
import EmptyState from '../components/common/EmptyState';
import DictationInput from '../components/learning/DictationInput';
import FillBlanks from '../components/learning/FillBlanks';
import WordOrder from '../components/learning/WordOrder';
import WriteResponse from '../components/learning/WriteResponse';
import ListeningComprehension from '../components/learning/ListeningComprehension';
import { getExperience, getNewlyUnlockedAchievements } from '../services/achievementService.js';
import { provideAnswerHapticFeedback } from '../services/hapticFeedback.js';
import { colors } from '../theme';

export default function LessonScreen({ navigation, route }) {
  const { user, completeActivity, saveLessonProgress, saveWordAttempt } = useApp();
  const lesson = route.params?.reviewLesson || getLessonByActivityId(route.params?.activityId);
  const resumedProgress = route.params?.resumeProgress?.activityId === lesson?.activityId
    ? route.params.resumeProgress
    : null;
  const [questionIndex, setQuestionIndex] = useState(() => (
    Number.isInteger(resumedProgress?.questionIndex)
      ? Math.min(Math.max(0, resumedProgress.questionIndex), Math.max(0, (lesson?.questions?.length || 1) - 1))
      : 0
  ));
  const [selectedAnswer, setSelectedAnswer] = useState(resumedProgress?.selectedAnswer ?? null);
  const [answered, setAnswered] = useState(Boolean(resumedProgress?.answered));
  const [answerFeedbackCorrect, setAnswerFeedbackCorrect] = useState(
    resumedProgress?.answerFeedbackCorrect ?? (resumedProgress?.answered ? true : null),
  );
  const [submittedAnswers, setSubmittedAnswers] = useState(() => resumedProgress?.submittedAnswers || []);
  const [hintUsage, setHintUsage] = useState(() => resumedProgress?.hintUsage || []);
  const [sessionSummary, setSessionSummary] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionError, setCompletionError] = useState('');
  const [progressSaveError, setProgressSaveError] = useState('');
  const [wordSaveError, setWordSaveError] = useState('');
  const completionRecorded = useRef(false);
  const elapsedActiveMs = useRef(resumedProgress?.elapsedActiveMs || 0);
  const activeSinceMs = useRef(Date.now());

  // State for new question types
  const [textInputValue, setTextInputValue] = useState(resumedProgress?.textInputValue || '');
  const [orderedWords, setOrderedWords] = useState(() => resumedProgress?.orderedWords || []);
  const lessonProgressRef = useRef(null);
  const currentElapsedMs = elapsedActiveMs.current + (
    activeSinceMs.current === null ? 0 : Math.max(0, Date.now() - activeSinceMs.current)
  );
  lessonProgressRef.current = {
    activityId: lesson?.activityId,
    ...(lesson?.activityId === 'failed-words-review' ? { reviewLesson: lesson } : {}),
    questionIndex,
    selectedAnswer,
    answered,
    answerFeedbackCorrect,
    submittedAnswers,
    hintUsage,
    textInputValue,
    orderedWords,
    elapsedActiveMs: currentElapsedMs,
  };

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        if (activeSinceMs.current === null) {
          activeSinceMs.current = Date.now();
        }
        return;
      }

      if (activeSinceMs.current !== null) {
        elapsedActiveMs.current += Math.max(0, Date.now() - activeSinceMs.current);
        activeSinceMs.current = null;
        if (lessonProgressRef.current?.activityId) {
          void saveLessonProgress({
            ...lessonProgressRef.current,
            elapsedActiveMs: elapsedActiveMs.current,
          }).catch((error) => {
            console.error('No se pudo guardar la lección antes de salir de la app.', error);
          });
        }
      }
    });

    return () => subscription.remove();
  }, [saveLessonProgress]);

  const question = lesson?.questions?.[questionIndex];
  const questionType = question?.type || 'multiple-choice';

  React.useEffect(() => {
    if (!lesson?.activityId || finished || isCompleting) {
      return;
    }

    void saveLessonProgress(lessonProgressRef.current).then(() => {
      setProgressSaveError('');
    }).catch((error) => {
      console.error('No se pudo guardar el avance de la lección.', error);
      setProgressSaveError('No pudimos guardar tu avance. Mantén esta pantalla abierta e inténtalo de nuevo.');
    });
  }, [
    lesson?.activityId,
    questionIndex,
    selectedAnswer,
    answered,
    answerFeedbackCorrect,
    submittedAnswers,
    hintUsage,
    textInputValue,
    orderedWords,
    finished,
    isCompleting,
    saveLessonProgress,
  ]);
  const answerToSave = questionType === 'word-order' ? orderedWords.join(' ')
    : ['dictation', 'fill-blanks', 'write-response'].includes(questionType) ? textInputValue
      : selectedAnswer;
  const isCorrect = isQuestionAnswerCorrect(question, answerToSave);

  const handleCheck = async () => {
    if (answered || !question) {
      return;
    }

    // Validate based on question type
    let isValid = false;
    switch (questionType) {
      case 'multiple-choice':
      case 'listening':
        isValid = Boolean(selectedAnswer);
        break;
      case 'dictation':
      case 'fill-blanks':
      case 'write-response':
        isValid = textInputValue.trim().length > 0;
        break;
      case 'word-order':
        isValid = orderedWords.length > 0;
        break;
      default:
        isValid = Boolean(selectedAnswer);
    }

    if (!isValid) return;

    setAnswered(isCorrect);
    setAnswerFeedbackCorrect(isCorrect);
    void provideAnswerHapticFeedback(isCorrect, Boolean(user.preferences?.hapticsEnabled));
    const word = question.vocabulary?.term || question.word;
    if (typeof word === 'string' && word.trim()) {
      setWordSaveError('');
      try {
        await saveWordAttempt(question, isCorrect);
      } catch (error) {
        console.error('No se pudo guardar la palabra para repasar.', error);
        setWordSaveError('No pudimos guardar esta palabra para repasar. Comprueba tu conexión e inténtalo de nuevo.');
      }
    }
    setSubmittedAnswers((current) => {
      const nextAnswers = [...current];
      nextAnswers[questionIndex] = answerToSave;
      return nextAnswers;
    });
  };

  const handleNext = async () => {
    if (!answered) {
      return;
    }

    if (questionIndex === lesson.questions.length - 1) {
      if (completionRecorded.current) {
        return;
      }

      completionRecorded.current = true;
      setIsCompleting(true);
      setCompletionError('');
      try {
        const activeDurationMs = elapsedActiveMs.current + (
          activeSinceMs.current === null ? 0 : Math.max(0, Date.now() - activeSinceMs.current)
        );
        const durationSeconds = Math.floor(activeDurationMs / 1000);
        const completion = buildLessonCompletion(
          lesson,
          submittedAnswers,
          route.params?.activityId,
          hintUsage,
          durationSeconds,
        );
        const previousSessions = user.sessions || [];
        const updatedUser = await completeActivity(completion);
        const previousExperience = getExperience(previousSessions);
        const currentExperience = getExperience(updatedUser.sessions);
        const sessionNotice = {
          id: 'practice-completed',
          title: '¡Un paso más en tu camino!',
          message: `Completaste tu práctica: +${currentExperience.xp - previousExperience.xp} XP por dedicarte, intentarlo y aprender.`,
          icon: 'heart',
        };
        setSessionSummary({
          ...completion,
          earnedXp: currentExperience.xp - previousExperience.xp,
          practiceMinutes: Math.floor(durationSeconds / 60),
          celebrations: [sessionNotice, ...getNewlyUnlockedAchievements(previousSessions, updatedUser.sessions)],
        });
        setFinished(true);
      } catch {
        completionRecorded.current = false;
        setCompletionError('No pudimos guardar esta sesión. Tu progreso anterior sigue intacto; inténtalo de nuevo cuando quieras.');
      } finally {
        setIsCompleting(false);
      }
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswerFeedbackCorrect(null);
    setHintVisible(false);
    setTextInputValue('');
    setOrderedWords([]);
    setProgressSaveError('');
  };

  if (!lesson || !question) {
    return (
      <SafeAreaView style={[styles.container, styles.unavailable]}>
        <EmptyState
          title="Lección no disponible"
          message="Esta actividad todavía no tiene una lección. Prueba otra actividad más tarde."
          actionLabel="Volver a actividades"
          onAction={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  // Handlers for new question types
  const handleWordPress = (word) => {
    if (answered) return;
    setAnswerFeedbackCorrect(null);
    if (orderedWords.includes(word)) {
      setOrderedWords(orderedWords.filter((w) => w !== word));
    } else {
      setOrderedWords([...orderedWords, word]);
    }
  };

  const handleResetWords = () => {
    if (answered) return;
    setAnswerFeedbackCorrect(null);
    setOrderedWords([]);
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswerFeedbackCorrect(null);
  };

  const handleTextInputChange = (value) => {
    setTextInputValue(value);
    setAnswerFeedbackCorrect(null);
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <SessionSummary
          correctAnswers={sessionSummary.correctAnswers}
          totalQuestions={sessionSummary.totalQuestions}
          earnedXp={sessionSummary.earnedXp}
          practiceMinutes={sessionSummary.practiceMinutes}
          celebrations={sessionSummary.celebrations}
          onFinish={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LessonHeader
          title={lesson.title}
          currentQuestion={questionIndex + 1}
          totalQuestions={lesson.questions.length}
          onClose={() => navigation.goBack()}
        />
        <LessonProgress current={questionIndex + 1} total={lesson.questions.length} />
        <QuestionCard question={question.word || question.prompt} prompt={question.prompt} />

        {/* Audio button for applicable question types */}
        {(questionType === 'multiple-choice' || questionType === 'dictation' || questionType === 'listening') && (
          <AudioButton
            wordText={question.audioWord || question.vocabulary?.term || question.word}
            phraseText={question.audioPhrase}
          />
        )}

        {/* Render different question types */}
        {questionType === 'multiple-choice' && (
          <View style={styles.options}>
            {question.options.map((option) => (
              <AnswerOption
                key={option}
                label={option}
                selected={selectedAnswer === option}
                correct={answered && isCorrect && option === question.answer}
                incorrect={answerFeedbackCorrect === false && selectedAnswer === option}
                disabled={answered}
                onPress={() => handleSelectAnswer(option)}
              />
            ))}
          </View>
        )}

        {questionType === 'dictation' && (
          <DictationInput
            value={textInputValue}
            onChangeText={handleTextInputChange}
            placeholder="Escribe lo que escuchas..."
            answered={answered}
            isCorrect={isCorrect}
          />
        )}

        {questionType === 'fill-blanks' && (
          <FillBlanks
            sentence={question.sentence}
            blankIndex={question.blankIndex || 0}
            value={textInputValue}
            onChangeText={handleTextInputChange}
            answered={answered}
            isCorrect={isCorrect}
          />
        )}

        {questionType === 'word-order' && (
          <WordOrder
            words={question.words}
            orderedWords={orderedWords}
            onWordPress={handleWordPress}
            onReset={handleResetWords}
            answered={answered}
            isCorrect={isCorrect}
          />
        )}

        {questionType === 'write-response' && (
          <WriteResponse
            value={textInputValue}
            onChangeText={handleTextInputChange}
            placeholder={question.placeholder || 'Escribe tu respuesta...'}
            answered={answered}
            isCorrect={isCorrect}
          />
        )}

        {questionType === 'listening' && (
          <ListeningComprehension
            scenario={question.scenario}
            questions={question.questions}
            answered={answered}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            isCorrect={isCorrect}
            answerFeedbackCorrect={answerFeedbackCorrect}
          />
        )}

        {!answered && question.hint && (
          <HintButton
            visible={hintVisible}
            hint={question.hint}
            onPress={() => {
              setHintVisible(true);
              setHintUsage((current) => {
                const nextUsage = [...current];
                nextUsage[questionIndex] = true;
                return nextUsage;
              });
            }}
          />
        )}
        {answerFeedbackCorrect !== null && (
          <FeedbackMessage
            correct={answerFeedbackCorrect}
            message={answerFeedbackCorrect
              ? getCorrectAnswerFeedback(question)
              : '¡Casi! Inténtalo de nuevo. Si necesitas ayuda, puedes solicitar una pista.'}
          />
        )}
        {!!completionError && <FeedbackMessage correct={false} message={completionError} />}
        {!!progressSaveError && <FeedbackMessage correct={false} message={progressSaveError} />}
        {!!wordSaveError && <FeedbackMessage correct={false} message={wordSaveError} />}
        <AppButton
          title={answered ? (questionIndex === lesson.questions.length - 1 ? 'Ver resumen' : 'Siguiente') : 'Comprobar'}
          onPress={answered ? handleNext : handleCheck}
          disabled={isCompleting}
          loading={isCompleting}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  unavailable: { justifyContent: 'center' },
  content: { padding: 20, paddingBottom: 32 },
  options: { marginBottom: 4 },
});
