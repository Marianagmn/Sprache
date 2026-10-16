import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import AppButton from '../components/common/AppButton';
import WelcomeHeader from '../components/home/WelcomeHeader';
import StreakBadge from '../components/home/StreakBadge';
import DailyGoalCard from '../components/home/DailyGoalCard';
import RecommendationCard from '../components/home/RecommendationCard';
import { getRecommendedActivity } from '../services/activityService';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user } = useApp();
  const recommendation = getRecommendedActivity(user.sessions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <WelcomeHeader name={user.name} level={user.level} motivation={user.motivation} greeting="Hola">
          <StreakBadge days={user.streak} />
        </WelcomeHeader>

        <DailyGoalCard completed={user.todayMinutes} goal={user.dailyGoal} unit="min" />

        <Text style={styles.sectionTitle}>Recomendado para ti</Text>
        <RecommendationCard
          title={recommendation.title}
          description={recommendation.description}
          time={recommendation.time}
          iconName={recommendation.iconName}
          onPress={() => navigation.navigate('Lesson', { activityId: recommendation.id })}
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