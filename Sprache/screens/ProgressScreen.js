import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import LevelProgressCard from '../components/progress/LevelProgressCard';
import WeeklyActivity from '../components/progress/WeeklyActivity';
import ProgressStat from '../components/progress/ProgressStat';
import { getWeeklyActivity } from '../services/progressService';
import { colors, typography } from '../theme';

export default function ProgressScreen() {
  const { user } = useApp();
  const weeklyActivity = getWeeklyActivity(user.sessions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>Tu Progreso</Text>
        
        <LevelProgressCard
          level={user.level}
          motivation={user.motivation}
          dailyGoal={user.dailyGoal}
          studiedMinutes={user.studiedMinutes}
          learnedWords={user.learnedWords}
        />

        <Text style={styles.sectionTitle}>Actividad semanal</Text>
        <WeeklyActivity days={weeklyActivity} />

        <View style={styles.statsGrid}>
          <ProgressStat iconName="flame" color={colors.red} value={`${user.streak} días`} label="Racha actual" />
          <ProgressStat iconName="time" color={colors.black} value={`${user.studiedMinutes} min`} label="Estudiados" />
          <ProgressStat iconName="school" color={colors.gold} value={`${user.learnedWords}`} label="Palabras" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  headerTitle: { fontSize: typography.title, fontWeight: 'bold', color: colors.black, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.black, marginBottom: 16 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' }
});