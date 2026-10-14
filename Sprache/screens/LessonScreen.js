import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { getLessonByActivityId } from '../services/lessonService';
import { buildLessonCompletion } from '../services/lessonProgressService';
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

export default function LessonScreen({ navigation, route }) {
  const { completeActivity } = useApp();
  const lesson = getLessonByActivityId(route.params?.activityId);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [sessionSummary, setSessionSummary] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionError, setCompletionError] = useState('');
  const completionRecorded = useRef(false);

  const question = lesson?.questions?.[questionIndex];
  const isCorrect = question ? selectedAnswer === question.answer : false;

  const handleCheck = () => {
    if (!selectedAnswer || answered || !question) {
      return;
    }

    setAnswered(true);
    setSubmittedAnswers((current) => {
      const nextAnswers = [...current];
      nextAnswers[questionIndex] = selectedAnswer;
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
        const completion = buildLessonCompletion(lesson, submittedAnswers, route.params?.activityId);
        await completeActivity(completion);
        setSessionSummary(completion);
        setFinished(true);
      } catch {
        completionRecorded.current = false;
        setCompletionError('No se pudo guardar tu sesión en este dispositivo. Comprueba el almacenamiento e inténtalo de nuevo.');
      } finally {
        setIsCompleting(false);
      }
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setHintVisible(false);
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

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <SessionSummary
          correctAnswers={sessionSummary.correctAnswers}
          totalQuestions={sessionSummary.totalQuestions}
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
        <QuestionCard question={question.word} prompt={question.prompt} />
        <AudioButton />
        <View style={styles.options}>
          {question.options.map((option) => (
            <AnswerOption
              key={option}
              label={option}
              selected={selectedAnswer === option}
              correct={answered && option === question.answer}
              incorrect={answered && selectedAnswer === option && option !== question.answer}
              disabled={answered}
              onPress={() => setSelectedAnswer(option)}
            />
          ))}
        </View>
        {!answered && <HintButton visible={hintVisible} hint={question.hint} onPress={() => setHintVisible(true)} />}
        {answered && (
          <FeedbackMessage
            correct={isCorrect}
            message={isCorrect ? 'La respuesta es correcta.' : `La respuesta correcta era ${question.answer}.`}
          />
        )}
        {!!completionError && <FeedbackMessage correct={false} message={completionError} />}
        <AppButton
          title={answered ? (questionIndex === lesson.questions.length - 1 ? 'Ver resumen' : 'Siguiente') : 'Comprobar'}
          onPress={answered ? handleNext : handleCheck}
          disabled={!selectedAnswer || isCompleting}
          loading={isCompleting}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  unavailable: { justifyContent: 'center' },
  content: { padding: 20, paddingBottom: 32 },
  options: { marginBottom: 4 },
});
