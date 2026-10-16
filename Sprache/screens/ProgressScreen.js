import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import LevelProgressCard from '../components/progress/LevelProgressCard';
import WeeklyActivity from '../components/progress/WeeklyActivity';
import ProgressStat from '../components/progress/ProgressStat';
import BrandLogo from '../components/common/BrandLogo';
import { getWeeklyActivity } from '../services/progressService';
import { colors, typography } from '../theme';

export default function ProgressScreen() {
  const { user } = useApp();
  const weeklyActivity = getWeeklyActivity(user.sessions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tu Progreso</Text>
          <BrandLogo variant="tab" />
        </View>
        
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

        <Text style={styles.sectionTitle}>Práctica por palabra</Text>
        {Object.values(user.wordProgress || {})
          .sort((first, second) => new Date(second.lastPracticedAt) - new Date(first.lastPracticedAt))
          .map((word) => (
            <View key={word.term.toLocaleLowerCase()} style={styles.wordCard}>
              <View style={styles.wordHeading}>
                <Text style={styles.wordTerm}>{word.term}</Text>
                {!!word.translation && <Text style={styles.wordTranslation}>{word.translation}</Text>}
              </View>
              <Text style={styles.wordMetrics}>
                Aciertos: {word.correctAnswers} · Errores: {word.mistakes} · Pistas: {word.hints}
              </Text>
              <Text style={styles.wordDate}>
                Última práctica: {new Date(word.lastPracticedAt).toLocaleDateString()}
              </Text>
            </View>
          ))}
        {Object.keys(user.wordProgress || {}).length === 0 && (
          <Text style={styles.emptyWords}>Completa una lección para ver aciertos, errores, pistas y fechas por palabra.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  headerTitle: { fontSize: typography.title, fontWeight: 'bold', color: colors.black },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.black, marginBottom: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  wordCard: { backgroundColor: colors.surface, borderRadius: 12, padding: 16, marginBottom: 10 },
  wordHeading: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', marginBottom: 6 },
  wordTerm: { color: colors.black, fontSize: 16, fontWeight: '700', marginRight: 8 },
  wordTranslation: { color: colors.muted, fontSize: 14 },
  wordMetrics: { color: colors.black, fontSize: 14, lineHeight: 21 },
  wordDate: { color: colors.muted, fontSize: 13, marginTop: 4 },
  emptyWords: { color: colors.muted, fontSize: 14, lineHeight: 21 },
});