import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { readingLessons } from '../data/readingLessons';
import GermanAudioButton from '../components/learning/GermanAudioButton';
import ScreenHeader from '../components/common/ScreenHeader';
import { colors, radii, spacing, typography } from '../theme';

const levels = ['A1', 'A2', 'B1', 'B2'];

export default function ReadingScreen() {
  const { user, saveLearningProgress, saveWordAttempt } = useApp();
  const [level, setLevel] = useState('A1');
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [saveError, setSaveError] = useState('');
  const lesson = readingLessons.find((item) => item.level === level);
  const progress = user.learningProgress?.readings?.[lesson.id] || {};
  const correctQuestionIds = progress.correctQuestionIds || [];
  const readingQuestions = lesson.questions.map((question, index) => ({
    ...question,
    vocabulary: {
      term: lesson.vocabulary[index % lesson.vocabulary.length].word,
      translation: lesson.vocabulary[index % lesson.vocabulary.length].meaning,
    },
  }));

  const submitAnswer = async (question) => {
    const answer = answers[question.id];
    if (!answer) return;
    const correct = answer === question.answer;
    setFeedback((current) => ({
      ...current,
      [question.id]: correct
        ? { correct: true, message: `¡Correcto! ${question.explanation}` }
        : { correct: false, message: '¡Casi! Inténtalo de nuevo. Puedes repasar el texto y consultar el vocabulario.' },
    }));
    setSaveError('');
    try {
      await saveWordAttempt(question, correct);
      if (correct) {
        const updatedQuestionIds = [...new Set([...correctQuestionIds, question.id])];
        await saveLearningProgress('readings', lesson.id, {
          correctQuestionIds: updatedQuestionIds,
          completed: updatedQuestionIds.length === lesson.questions.length,
        });
      }
    } catch (error) {
      console.error('No se pudo guardar el progreso de lectura.', error);
      setSaveError('No se pudo guardar tu progreso. Comprueba el almacenamiento e inténtalo de nuevo.');
    }
  };

  const markAudioPlayed = (key) => {
    const playCount = user.learningProgress?.pronunciation?.[key]?.playCount || 0;
    void saveLearningProgress('pronunciation', key, {
      playCount: playCount + 1,
      lastPlayedAt: new Date().toISOString(),
    }).catch((error) => {
      console.error('No se pudo guardar el progreso de pronunciación.', error);
      setSaveError('No se pudo guardar el progreso de pronunciación.');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Lecturas en alemán" subtitle="Lee, escucha, consulta palabras y comprueba lo que entendiste." />
        <View style={styles.row}>
          {levels.map((item) => (
            <TouchableOpacity key={item} onPress={() => { setLevel(item); setSelectedMeaning(null); }} style={[styles.chip, item === level && styles.activeChip]} accessibilityRole="button" accessibilityState={{ selected: item === level }}>
              <Text style={[styles.chipText, item === level && styles.activeChipText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.topic}>{lesson.topic} · {lesson.level}</Text>
          <Text style={styles.title} accessibilityRole="header">{lesson.title}</Text>
          <Text style={styles.germanText}>{lesson.text}</Text>
          <GermanAudioButton text={lesson.text} label="Escuchar lectura" onPlaybackStart={() => markAudioPlayed(`${lesson.id}-text`)} />
          <Text style={styles.subheading}>Traducción</Text>
          <Text style={styles.body}>{lesson.translation}</Text>
          <Text style={styles.subheading}>Vocabulario de la lectura</Text>
          <View style={styles.vocabulary}>
            {lesson.vocabulary.map((item) => (
              <View key={item.word} style={[styles.word, selectedMeaning?.word === item.word && styles.selectedWord]}>
                <TouchableOpacity onPress={() => setSelectedMeaning(item)} accessibilityRole="button" accessibilityLabel={`Consultar significado de ${item.word}`}>
                  <Text style={styles.wordText}>{item.word}</Text>
                </TouchableOpacity>
                <GermanAudioButton text={item.word} compact label={`Escuchar ${item.word}`} onPlaybackStart={() => markAudioPlayed(`${lesson.id}-${item.word}`)} />
              </View>
            ))}
          </View>
          {selectedMeaning && (
            <Text style={styles.meaning} accessibilityLiveRegion="polite">
              {selectedMeaning.word}: {selectedMeaning.meaning}
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">Comprensión lectora</Text>
        {readingQuestions.map((question, index) => {
          const isComplete = correctQuestionIds.includes(question.id);
          const result = feedback[question.id];
          return (
            <View key={question.id} style={styles.card}>
              <Text style={styles.question}>{index + 1}. {question.prompt}</Text>
              {question.options.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    if (!isComplete) {
                      setAnswers((current) => ({ ...current, [question.id]: option }));
                      setFeedback((current) => ({ ...current, [question.id]: null }));
                    }
                  }}
                  style={[styles.option, answers[question.id] === option && styles.selectedOption]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: answers[question.id] === option, disabled: isComplete }}
                  disabled={isComplete}
                >
                  <Text style={styles.body}>{option}</Text>
                </TouchableOpacity>
              ))}
              {!isComplete && (
                <TouchableOpacity style={styles.submit} onPress={() => submitAnswer(question)} disabled={!answers[question.id]} accessibilityRole="button">
                  <Text style={styles.submitText}>Comprobar respuesta</Text>
                </TouchableOpacity>
              )}
              {!!result && (
                <Text style={[styles.feedback, result.correct ? styles.correct : styles.incorrect]} accessibilityLiveRegion="polite">
                  {result.message}
                </Text>
              )}
              {isComplete && !result && <Text style={styles.correct}>Completada correctamente.</Text>}
            </View>
          );
        })}
        {progress.completed && <Text style={styles.complete}>¡Lectura completada! Tu progreso quedó guardado.</Text>}
        {!!saveError && <Text style={styles.error} accessibilityRole="alert">{saveError}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  chip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, marginRight: spacing.sm, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radii.pill },
  activeChip: { backgroundColor: colors.goldSoft, borderColor: colors.gold },
  chipText: { color: colors.muted, fontWeight: typography.semibold },
  activeChipText: { color: colors.black },
  card: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  topic: { color: colors.muted, fontSize: typography.caption, marginBottom: spacing.xs },
  title: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.bold, marginBottom: spacing.md },
  germanText: { color: colors.black, fontSize: typography.body, lineHeight: 27, marginBottom: spacing.md },
  subheading: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold, marginTop: spacing.md, marginBottom: spacing.xs },
  body: { color: colors.text, fontSize: typography.small, lineHeight: 22 },
  vocabulary: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs },
  word: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radii.pill, paddingLeft: spacing.md, paddingRight: spacing.xs, marginRight: spacing.xs, marginBottom: spacing.xs },
  selectedWord: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  wordText: { color: colors.black, fontSize: typography.small, marginRight: spacing.xs },
  meaning: { color: colors.success, fontSize: typography.body, fontWeight: typography.semibold, marginTop: spacing.md },
  sectionTitle: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.bold, marginBottom: spacing.md },
  question: { color: colors.black, fontSize: typography.body, fontWeight: typography.semibold, lineHeight: 23, marginBottom: spacing.md },
  option: { padding: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, marginBottom: spacing.sm },
  selectedOption: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  submit: { alignSelf: 'flex-start', padding: spacing.md, backgroundColor: colors.gold, borderRadius: radii.md, marginTop: spacing.xs },
  submitText: { color: colors.black, fontWeight: typography.bold },
  feedback: { fontSize: typography.small, lineHeight: 21, marginTop: spacing.md },
  correct: { color: colors.success, fontSize: typography.small, fontWeight: typography.semibold, marginTop: spacing.md },
  incorrect: { color: colors.redText },
  complete: { color: colors.success, fontSize: typography.body, fontWeight: typography.bold, marginBottom: spacing.md },
  error: { color: colors.redText, fontSize: typography.small, marginTop: spacing.sm },
});
