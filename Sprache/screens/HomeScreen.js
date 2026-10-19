import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import WelcomeHeader from '../components/home/WelcomeHeader';
import StreakBadge from '../components/home/StreakBadge';
import DailyGoalCard from '../components/home/DailyGoalCard';
import RecommendationCard from '../components/home/RecommendationCard';
import { getRecommendedActivity } from '../services/activityService';
import { getLessonByActivityId, getSpacedReviewLesson } from '../services/lessonService';
import { getLearningPath } from '../services/learningPathService';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user } = useApp();
  const recommendation = getRecommendedActivity(user.sessions);
  const reviewLesson = getSpacedReviewLesson(user.wordProgress || {});
  const activeLessonProgress = user.activeLessonProgress;
  const activeLesson = activeLessonProgress?.activityId === 'spaced-review'
    ? reviewLesson
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
          <StreakBadge days={user.streak} />
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
          time={hasInProgressLesson ? 'Retomar' : hasReview ? `${reviewLesson.questions.length} palabras` : hasPathLesson ? nextPathLesson.time : recommendation.time}
          iconName={hasInProgressLesson ? 'play' : hasReview ? 'refresh' : hasPathLesson ? 'school-outline' : recommendation.iconName}
          onPress={() => navigation.navigate('Lesson', hasInProgressLesson
            ? { activityId: activeLessonProgress.activityId, resumeProgress: activeLessonProgress }
            : hasReview
              ? { activityId: reviewLesson.activityId, reviewLesson }
              : { activityId: hasPathLesson ? nextPathLesson.id : recommendation.id })}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  sectionTitle: { fontSize: typography.subtitle, fontWeight: typography.semibold, color: colors.black, marginBottom: spacing.lg },
});