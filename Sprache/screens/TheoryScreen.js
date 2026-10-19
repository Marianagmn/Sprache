import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { theoryModules } from '../data/theoryModules';
import AppButton from '../components/common/AppButton';
import GermanAudioButton from '../components/learning/GermanAudioButton';
import ScreenHeader from '../components/common/ScreenHeader';
import { colors, radii, spacing, typography } from '../theme';

function isModuleComplete(module, progress = {}) {
  const completed = new Set(progress.completedLessonIds || []);
  const correctExercises = new Set(progress.correctExerciseIds || []);
  return module.lessons.every((lesson) => (
    completed.has(lesson.id) || lesson.exercises.every((exercise) => correctExercises.has(exercise.id))
  ));
}

function createReviewQuestion(exercise) {
  return {
    id: exercise.id,
    prompt: exercise.prompt,
    options: exercise.options,
    answer: exercise.answer,
    explanation: exercise.explanation,
    vocabulary: { term: exercise.term, translation: exercise.translation || exercise.term },
  };
}

export default function TheoryScreen() {
  const { user, saveLearningProgress, saveWordAttempt } = useApp();
  const [moduleIndex, setModuleIndex] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [saveError, setSaveError] = useState('');
  const learning = user.learningProgress?.theory || {};
  const selectedModule = theoryModules[moduleIndex];
  const moduleProgress = learning[selectedModule.id] || {};
  const lesson = selectedModule.lessons[lessonIndex];
  const correctExerciseIds = moduleProgress.correctExerciseIds || [];
  const allPreviousModulesComplete = theoryModules
    .slice(0, moduleIndex)
    .every((module) => isModuleComplete(module, learning[module.id]));
  const moduleUnlocked = moduleIndex === 0 || allPreviousModulesComplete;
  const completedLessons = moduleProgress.completedLessonIds || [];
  const lessonComplete = completedLessons.includes(lesson.id)
    || lesson.exercises.every((exercise) => correctExerciseIds.includes(exercise.id));

  const markAudioPlayed = (id) => {
    void saveLearningProgress('pronunciation', id, {
      playCountIncrement: 1,
      lastPlayedAt: new Date().toISOString(),
    }).catch((error) => {
      console.error('No se pudo guardar el progreso de pronunciación.', error);
      setSaveError('No se pudo guardar el progreso de pronunciación.');
    });
  };

  const submitAnswer = async (exercise) => {
    const answer = answers[exercise.id];
    if (!answer) return;
    const reviewQuestion = createReviewQuestion(exercise);
    const correct = answer === exercise.answer;
    setFeedback((current) => ({
      ...current,
      [exercise.id]: correct
        ? { correct: true, message: `¡Correcto! ${exercise.explanation}` }
        : { correct: false, message: '¡Casi! Inténtalo de nuevo. Puedes revisar la regla y volver a elegir.' },
    }));
    setSaveError('');
    try {
      await saveWordAttempt(reviewQuestion, correct);
      if (correct) {
        const updatedCorrectIds = [...new Set([...correctExerciseIds, exercise.id])];
        const lessonCompleted = lesson.exercises.every((item) => updatedCorrectIds.includes(item.id));
        const completedLessonIds = lessonCompleted
          ? [...new Set([...completedLessons, lesson.id])]
          : completedLessons;
        await saveLearningProgress('theory', selectedModule.id, {
          correctExerciseIds: updatedCorrectIds,
          completedLessonIds,
          completed: selectedModule.lessons.every((item) => completedLessonIds.includes(item.id)),
        });
      }
    } catch (error) {
      console.error('No se pudo guardar el progreso de teoría.', error);
      setSaveError('No se pudo guardar tu progreso. Comprueba el almacenamiento e inténtalo de nuevo.');
    }
  };

  const chooseModule = (index) => {
    const unlocked = index === 0 || theoryModules
      .slice(0, index)
      .every((module) => isModuleComplete(module, learning[module.id]));
    if (!unlocked) return;
    setModuleIndex(index);
    setLessonIndex(0);
    setAnswers({});
    setFeedback({});
  };

  const chooseLesson = (index) => {
    setLessonIndex(index);
    setAnswers({});
    setFeedback({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Aprende la teoría del alemán" subtitle="Los módulos se desbloquean progresivamente. Los botones de audio requieren una voz alemana (Alemania) instalada." />
        <View style={styles.moduleList}>
          {theoryModules.map((module, index) => {
            const unlocked = index === 0 || theoryModules
              .slice(0, index)
              .every((previous) => isModuleComplete(previous, learning[previous.id]));
            const complete = isModuleComplete(module, learning[module.id]);
            return (
              <TouchableOpacity
                key={module.id}
                onPress={() => chooseModule(index)}
                disabled={!unlocked}
                style={[styles.moduleChip, index === moduleIndex && styles.selectedChip, !unlocked && styles.lockedChip]}
                accessibilityRole="button"
                accessibilityState={{ selected: index === moduleIndex, disabled: !unlocked }}
                accessibilityLabel={`${module.level}: ${module.title}${complete ? ', completado' : ''}${unlocked ? '' : ', bloqueado'}`}
              >
                <Text style={[styles.chipTitle, index === moduleIndex && styles.selectedText]}>{module.level} · {module.title.split('. ').slice(1).join('. ')}</Text>
                <Text style={styles.chipState}>{complete ? 'Completado' : unlocked ? 'Disponible' : 'Completa el módulo anterior'}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!moduleUnlocked ? (
          <Text style={styles.lockedMessage}>Completa los módulos anteriores para continuar tu recorrido de A1 a B2.</Text>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.topic}>{selectedModule.level}</Text>
              <Text style={styles.title} accessibilityRole="header">{selectedModule.title}</Text>
              <Text style={styles.body}>{selectedModule.summary}</Text>
            </View>
            <Text style={styles.sectionTitle} accessibilityRole="header">Lecciones del módulo</Text>
            <View style={styles.lessonList}>
              {selectedModule.lessons.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => chooseLesson(index)}
                  style={[styles.lessonChip, lessonIndex === index && styles.selectedChip]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: lessonIndex === index }}
                >
                  <Text style={[styles.chipTitle, lessonIndex === index && styles.selectedText]}>{item.title}</Text>
                  <Text style={styles.chipState}>{completedLessons.includes(item.id) || item.exercises.every((exercise) => correctExerciseIds.includes(exercise.id)) ? 'Completada' : 'En progreso'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>{lesson.title}</Text>
              <Text style={styles.body}>{lesson.explanation}</Text>
              <Text style={styles.subheading}>Reglas básicas</Text>
              {lesson.rules.map((rule) => <Text key={rule} style={styles.bullet}>• {rule}</Text>)}
              <Text style={styles.subheading}>Ejemplos en alemán</Text>
              {lesson.examples.map((example, index) => (
                <View key={example.german} style={styles.example}>
                  <View style={styles.exampleLine}>
                    <Text style={styles.german}>{example.german}</Text>
                    <GermanAudioButton
                      text={example.german}
                      compact
                      label={`Escuchar ${example.german}`}
                      onPlaybackStart={() => markAudioPlayed(`${lesson.id}-example-${index}`)}
                    />
                  </View>
                  <Text style={styles.body}>{example.spanish}</Text>
                </View>
              ))}
              {lesson.table && (
                <>
                  <Text style={styles.subheading}>Tabla de referencia</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator>
                    <View>
                      <View style={styles.tableRow}>
                        {lesson.table.columns.map((column) => <Text key={column} style={[styles.tableCell, styles.tableHeader]}>{column}</Text>)}
                      </View>
                      {lesson.table.rows.map((row, index) => (
                        <View key={`${lesson.id}-row-${index}`} style={styles.tableRow}>
                          {row.map((cell, cellIndex) => <Text key={`${cell}-${cellIndex}`} style={styles.tableCell}>{cell}</Text>)}
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </>
              )}
            </View>

            <Text style={styles.sectionTitle} accessibilityRole="header">Ejercicios prácticos</Text>
            {lesson.exercises.map((exercise) => {
              const isComplete = correctExerciseIds.includes(exercise.id);
              const result = feedback[exercise.id];
              return (
                <View key={exercise.id} style={styles.card}>
                  <Text style={styles.question}>{exercise.prompt}</Text>
                  {exercise.options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        if (!isComplete) {
                          setAnswers((current) => ({ ...current, [exercise.id]: option }));
                          setFeedback((current) => ({ ...current, [exercise.id]: null }));
                        }
                      }}
                      style={[styles.option, answers[exercise.id] === option && styles.selectedOption]}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: answers[exercise.id] === option, disabled: isComplete }}
                      disabled={isComplete}
                    >
                      <Text style={styles.body}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                  {!isComplete && <AppButton title="Comprobar respuesta" onPress={() => submitAnswer(exercise)} disabled={!answers[exercise.id]} />}
                  {!!result && <Text style={[styles.feedback, result.correct ? styles.correct : styles.incorrect]} accessibilityLiveRegion="polite">{result.message}</Text>}
                  {isComplete && !result && <Text style={styles.correct}>Ejercicio completado.</Text>}
                </View>
              );
            })}
            {lessonComplete && <Text style={styles.complete}>¡Lección completada! Tu progreso quedó guardado.</Text>}
          </>
        )}
        {!!saveError && <Text style={styles.error} accessibilityRole="alert">{saveError}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl },
  moduleList: { marginBottom: spacing.md },
  moduleChip: { backgroundColor: colors.surface, padding: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, marginBottom: spacing.sm },
  lockedChip: { opacity: 0.55 },
  selectedChip: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  chipTitle: { color: colors.black, fontSize: typography.small, fontWeight: typography.semibold },
  selectedText: { color: colors.black },
  chipState: { color: colors.muted, fontSize: typography.caption, marginTop: spacing.xs },
  lockedMessage: { color: colors.muted, fontSize: typography.body, lineHeight: 23 },
  card: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  topic: { color: colors.muted, fontSize: typography.caption, marginBottom: spacing.xs },
  title: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.bold, marginBottom: spacing.md },
  body: { color: colors.text, fontSize: typography.small, lineHeight: 22 },
  sectionTitle: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.bold, marginTop: spacing.sm, marginBottom: spacing.md },
  lessonList: { marginBottom: spacing.md },
  lessonChip: { padding: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, marginBottom: spacing.sm },
  subheading: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold, marginTop: spacing.lg, marginBottom: spacing.sm },
  bullet: { color: colors.text, fontSize: typography.small, lineHeight: 22, marginBottom: spacing.sm },
  example: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  exampleLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  german: { flex: 1, color: colors.black, fontSize: typography.body, fontWeight: typography.semibold, marginRight: spacing.sm },
  tableRow: { flexDirection: 'row' },
  tableCell: { minWidth: 105, maxWidth: 210, color: colors.text, fontSize: typography.caption, lineHeight: 18, padding: spacing.sm, borderWidth: 0.5, borderColor: colors.border },
  tableHeader: { backgroundColor: colors.goldSoft, fontWeight: typography.bold, color: colors.black },
  question: { color: colors.black, fontSize: typography.body, fontWeight: typography.semibold, lineHeight: 23, marginBottom: spacing.md },
  option: { padding: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, marginBottom: spacing.sm },
  selectedOption: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  feedback: { fontSize: typography.small, lineHeight: 21, marginTop: spacing.md },
  correct: { color: colors.success, fontSize: typography.small, fontWeight: typography.semibold, marginTop: spacing.md },
  incorrect: { color: colors.redText },
  complete: { color: colors.success, fontSize: typography.body, fontWeight: typography.bold, marginBottom: spacing.md },
  error: { color: colors.redText, fontSize: typography.small, marginTop: spacing.sm },
});
