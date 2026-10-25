import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import WelcomeHeader from '../components/home/WelcomeHeader';
import StreakBadge from '../components/home/StreakBadge';
import DailyGoalCard from '../components/home/DailyGoalCard';
import RecommendationCard from '../components/home/RecommendationCard';
import { getRecommendedActivity } from '../services/activityService';
import { getFailedWordsReviewLesson, getLessonByActivityId, getSpacedReviewLesson } from '../services/lessonService';
import { getLearningPath } from '../services/learningPathService';
import { colors, spacing, typography } from '../theme';
import AppButton from '../components/common/AppButton';

export default function HomeScreen({ navigation }) {
  const { user } = useApp();
  const recommendation = getRecommendedActivity(user.sessions);
  const reviewLesson = getSpacedReviewLesson(user.wordProgress || {});
  const failedWordsLesson = getFailedWordsReviewLesson(user.failedWords || {});
  const activeLessonProgress = user.activeLessonProgress;
  const activeLesson = activeLessonProgress?.activityId === 'spaced-review'
    ? reviewLesson
    : activeLessonProgress?.activityId === 'failed-words-review'
      ? activeLessonProgress.reviewLesson || failedWordsLesson
      : getLessonByActivityId(activeLessonProgress?.activityId);
  const hasInProgressLesson = Boolean(activeLessonProgress && activeLesson);
  const hasReview = Boolean(reviewLesson);
  const learningPath = getLearningPath(user.sessions, user.placementAssessment);
  const nextPathLesson = learningPath.nextLesson;
  const hasPathLesson = !hasReview && Boolean(nextPathLesson);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <WelcomeHeader name={user.name} level={user.level} motivation={user.motivation} greeting="Hola">
          <View style={styles.headerBadges}>
            <StreakBadge days={user.streak} />
            <Text style={styles.daysLearned}>
              {user.totalLearningDays === 1 ? '1 día aprendido' : `${user.totalLearningDays || 0} días aprendidos`}
            </Text>
          </View>
        </WelcomeHeader>

        <DailyGoalCard completedSeconds={user.todaySeconds || 0} goal={user.dailyGoal} unit="min" />

        <Text style={styles.sectionTitle} accessibilityRole="header">
          {hasInProgressLesson
            ? 'Retoma tu lección'
            : hasReview
              ? 'Tu repaso pendiente'
              : hasPathLesson
                ? `Continúa tu ruta · ${nextPathLesson.levelCode}`
                : 'Tu siguiente práctica'}
        </Text>
        <RecommendationCard
          title={hasInProgressLesson ? activeLesson.title : hasReview ? 'Repasar palabras' : hasPathLesson ? nextPathLesson.title : recommendation.title}
          description={hasInProgressLesson
            ? `Vas por la pregunta ${activeLessonProgress.questionIndex + 1} de ${activeLesson.questions.length}`
            : hasReview
              ? `Tienes ${reviewLesson.questions.length} ${reviewLesson.questions.length === 1 ? 'palabra lista' : 'palabras listas'} para repasar.`
              : hasPathLesson
                ? `Es el siguiente paso de tu ruta de nivel ${nextPathLesson.levelCode}. ${nextPathLesson.time}`
                : recommendation.description}
          time={hasInProgressLesson ? 'Retomar' : hasReview ? '' : hasPathLesson ? nextPathLesson.time : recommendation.time}
          iconName={hasInProgressLesson ? 'play' : hasReview ? 'refresh' : hasPathLesson ? 'school-outline' : recommendation.iconName}
          onPress={() => navigation.navigate('Lesson', hasInProgressLesson
            ? {
              activityId: activeLessonProgress.activityId,
              resumeProgress: activeLessonProgress,
              ...(activeLessonProgress.activityId === 'failed-words-review' ? { reviewLesson: activeLesson } : {}),
            }
            : hasReview
              ? { activityId: reviewLesson.activityId, reviewLesson }
              : { activityId: hasPathLesson ? nextPathLesson.id : recommendation.id })}
        />

        <Text style={styles.sectionTitle} accessibilityRole="header">Repasar palabras</Text>
        {failedWordsLesson ? (
          <RecommendationCard
            title="Practica tus errores"
            description={`Tienes ${failedWordsLesson.questions.length} ${failedWordsLesson.questions.length === 1 ? 'palabra' : 'palabras'} para reforzar.`}
            time=""
            iconName="refresh"
            onPress={() => navigation.navigate('Lesson', {
              activityId: failedWordsLesson.activityId,
              reviewLesson: failedWordsLesson,
            })}
          />
        ) : (
          <Text style={styles.emptyReview}>
            Aquí aparecerán las palabras que quieras volver a practicar.
          </Text>
        )}

        <Text style={styles.sectionTitle} accessibilityRole="header">Aprende alemán</Text>
        <Text style={styles.learningDescription}>
          Avanza de A1 a B2 con lecturas, gramática y práctica de pronunciación.
        </Text>
        <View style={styles.learningActions}>
          <AppButton title="Lecturas" onPress={() => navigation.navigate('Lecturas')} />
          <AppButton title="Teoría del alemán" onPress={() => navigation.navigate('Teoría')} />
          <AppButton title="Pronunciación" onPress={() => navigation.navigate('Pronunciación')} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  sectionTitle: { fontSize: typography.subtitle, fontWeight: typography.semibold, color: colors.black, marginBottom: spacing.lg },
  emptyReview: { color: colors.muted, fontSize: typography.small, marginBottom: spacing.xl },
  learningDescription: { color: colors.muted, fontSize: typography.small, lineHeight: 21, marginBottom: spacing.md },
  learningActions: { gap: spacing.sm, marginBottom: spacing.xl },
  headerBadges: { alignItems: 'flex-end', gap: spacing.xs },
  daysLearned: { color: colors.muted, fontSize: typography.caption, textAlign: 'right' },
});