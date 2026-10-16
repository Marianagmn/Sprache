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
import { colors, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user } = useApp();
  const recommendation = getRecommendedActivity(user.sessions);
  const dueWords = getDueWords(user.wordProgress || {});
  const reviewLesson = getSpacedReviewLesson(user.wordProgress || {});
  const hasReview = Boolean(reviewLesson);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <WelcomeHeader name={user.name} level={user.level} motivation={user.motivation} greeting="Hola">
          <StreakBadge days={user.streak} />
        </WelcomeHeader>

        <DailyGoalCard completedSeconds={user.todaySeconds || 0} goal={user.dailyGoal} unit="min" />

        <Text style={styles.sectionTitle}>{hasReview ? 'Repaso recomendado' : 'Recomendado para ti'}</Text>
        <RecommendationCard
          title={hasReview ? 'Repasar palabras' : recommendation.title}
          description={hasReview
            ? `${dueWords.length} ${dueWords.length === 1 ? 'palabra necesita' : 'palabras necesitan'} un repaso. Empezamos por las que más cuestan.`
            : recommendation.description}
          time={hasReview ? `${reviewLesson.questions.length} palabras` : recommendation.time}
          iconName={hasReview ? 'refresh' : recommendation.iconName}
          onPress={() => navigation.navigate('Lesson', hasReview
            ? { activityId: reviewLesson.activityId, reviewLesson }
            : { activityId: recommendation.id })}
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