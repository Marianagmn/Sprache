import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import AppButton from '../components/common/AppButton';
import WelcomeHeader from '../components/home/WelcomeHeader';
import StreakBadge from '../components/home/StreakBadge';
import DailyGoalCard from '../components/home/DailyGoalCard';
import RecommendationCard from '../components/home/RecommendationCard';
import { getRecommendedActivity } from '../services/activityService';
import { getSpacedReviewLesson } from '../services/lessonService';
import { getDueWords } from '../services/spacedRepetitionService';
import { getLearningPath } from '../services/learningPathService';
import AchievementPanel from '../components/progress/AchievementPanel';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user } = useApp();
  const recommendation = getRecommendedActivity(user.sessions);
  const dueWords = getDueWords(user.wordProgress || {});
  const reviewLesson = getSpacedReviewLesson(user.wordProgress || {});
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

        <AchievementPanel sessions={user.sessions} compact />

        <Text style={styles.sectionTitle}>
          {hasReview ? 'Repaso recomendado' : hasPathLesson ? `Tu ruta · nivel ${nextPathLesson.levelCode}` : 'Recomendado para ti'}
        </Text>
        <RecommendationCard
          title={hasReview ? 'Repasar palabras' : hasPathLesson ? nextPathLesson.title : recommendation.title}
          description={hasReview
            ? `${dueWords.length} ${dueWords.length === 1 ? 'palabra necesita' : 'palabras necesitan'} un repaso. Empezamos por las que más cuestan.`
            : hasPathLesson
              ? `Siguiente paso de tu ruta de nivel ${nextPathLesson.levelCode}. ${nextPathLesson.time}`
              : recommendation.description}
          time={hasReview ? `${reviewLesson.questions.length} palabras` : hasPathLesson ? nextPathLesson.time : recommendation.time}
          iconName={hasReview ? 'refresh' : hasPathLesson ? 'school-outline' : recommendation.iconName}
          onPress={() => navigation.navigate('Lesson', hasReview
            ? { activityId: reviewLesson.activityId, reviewLesson }
            : { activityId: hasPathLesson ? nextPathLesson.id : recommendation.id })}
        />

        <AppButton title="Continuar práctica" onPress={() => navigation.navigate('Actividades')} style={styles.mainActionBtn} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  sectionTitle: { fontSize: typography.subtitle, fontWeight: typography.semibold, color: colors.black, marginBottom: spacing.lg },
  mainActionBtn: { marginTop: 0 }
});