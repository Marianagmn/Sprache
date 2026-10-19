import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import LevelProgressCard from '../components/progress/LevelProgressCard';
import WeeklyActivity from '../components/progress/WeeklyActivity';
import LearningPath from '../components/progress/LearningPath';
import BrandLogo from '../components/common/BrandLogo';
import { getWeeklyActivity } from '../services/progressService';
import { colors, spacing, typography } from '../theme';

export default function ProgressScreen({ navigation }) {
  const { user } = useApp();
  const weeklyActivity = getWeeklyActivity(user.sessions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle} accessibilityRole="header">Tu Progreso</Text>
          <BrandLogo variant="tab" />
        </View>

        <LevelProgressCard
          level={user.level}
          studiedSeconds={user.studiedSeconds || 0}
          learnedWords={user.learnedWords || 0}
          totalSessions={user.totalSessions || 0}
        />

        <Text style={styles.sectionTitle} accessibilityRole="header">Actividad de esta semana</Text>
        {user.sessions.length ? (
          <WeeklyActivity days={weeklyActivity} />
        ) : (
          <Text style={styles.emptyState}>Cuando completes una práctica, aquí verás tu actividad de esta semana.</Text>
        )}

        <Text style={styles.sectionTitle} accessibilityRole="header">Tu ruta de aprendizaje</Text>
        <Text style={styles.helperText}>Abre un nivel para ver las lecciones disponibles.</Text>
        <LearningPath
          sessions={user.sessions}
          placementAssessment={user.placementAssessment}
          onStartLesson={(activityId) => navigation.navigate('Lesson', { activityId })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  headerTitle: { fontSize: typography.title, fontWeight: 'bold', color: colors.black },
  sectionTitle: { fontSize: typography.subtitle, fontWeight: typography.semibold, color: colors.black, marginBottom: spacing.sm },
  helperText: { color: colors.muted, fontSize: typography.small, lineHeight: 21, marginBottom: spacing.md },
  emptyState: { color: colors.muted, fontSize: typography.small, lineHeight: 21, marginBottom: spacing.xl },
});
