import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import LevelProgressCard from '../components/progress/LevelProgressCard';
import WeeklyActivity from '../components/progress/WeeklyActivity';
import ProgressStat from '../components/progress/ProgressStat';
import LearningPath from '../components/progress/LearningPath';
import AchievementPanel from '../components/progress/AchievementPanel';
import BrandLogo from '../components/common/BrandLogo';
import { getWeeklyActivity } from '../services/progressService';
import { getNextReviewIntervalLabel } from '../services/spacedRepetitionService';
import { colors, typography } from '../theme';

export default function ProgressScreen({ navigation }) {
  const { user } = useApp();
  const weeklyActivity = getWeeklyActivity(user.sessions);
  const studiedTime = user.studiedSeconds >= 60
    ? `${Math.floor(user.studiedSeconds / 60)} min ${user.studiedSeconds % 60} s`
    : `${user.studiedSeconds || 0} s`;
  const trackedHints = Object.values(user.wordProgress || {}).reduce((total, word) => total + (word.hints || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle} accessibilityRole="header">Tu Progreso</Text>
          <BrandLogo variant="tab" />
        </View>
        
        <LevelProgressCard
          level={user.level}
          motivation={user.motivation}
          dailyGoal={user.dailyGoal}
          studiedSeconds={user.studiedSeconds || 0}
          learnedWords={user.learnedWords}
        />

        <Text style={styles.sectionTitle} accessibilityRole="header">Tu ruta de aprendizaje</Text>
        <LearningPath
          sessions={user.sessions}
          placementAssessment={user.placementAssessment}
          onStartLesson={(activityId) => navigation.navigate('Lesson', { activityId })}
        />

        <Text style={styles.sectionTitle} accessibilityRole="header">Experiencia y logros</Text>
        <AchievementPanel sessions={user.sessions} />

        <Text style={styles.sectionTitle} accessibilityRole="header">Actividad semanal</Text>
        {user.sessions.length ? (
          <WeeklyActivity days={weeklyActivity} />
        ) : (
          <Text style={styles.emptyWords}>Cuando completes una práctica, aquí verás tu actividad de esta semana.</Text>
        )}

        <View style={styles.statsGrid}>
          <ProgressStat iconName="flame" color={colors.red} value={`${user.streak} días`} label="Racha actual" />
          <ProgressStat iconName="time" color={colors.black} value={studiedTime} label="Tiempo practicado" />
          <ProgressStat iconName="school" color={colors.gold} value={`${user.totalSessions || 0}`} label="Prácticas completadas" />
          <ProgressStat
            iconName="checkmark-circle"
            color={colors.success}
            value={user.totalQuestions ? `${user.accuracy}%` : '—'}
            label={user.totalQuestions
              ? `Precisión · ${user.correctAnswers}/${user.totalQuestions} respuestas`
              : 'Precisión · sin respuestas todavía'}
          />
          <ProgressStat iconName="bulb" color={colors.gold} value={`${trackedHints}`} label="Pistas utilizadas" />
          <ProgressStat iconName="book" color={colors.black} value={`${user.learnedWords}`} label="Palabras con acierto" />
          <ProgressStat
            iconName="flag"
            color={colors.red}
            value={user.goalDaysTracked ? `${user.goalDaysReached}/${user.goalDaysTracked}` : '—'}
            label="Metas diarias alcanzadas"
          />
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">Práctica por palabra</Text>
        {Object.values(user.wordProgress || {})
          .sort((first, second) => new Date(second.lastPracticedAt) - new Date(first.lastPracticedAt))
          .map((word) => (
            <View key={word.term.toLocaleLowerCase()} style={styles.wordCard}>
              <View style={styles.wordHeading}>
                <Text style={styles.wordTerm}>{word.term}</Text>
                {!!word.translation && <Text style={styles.wordTranslation}>{word.translation}</Text>}
              </View>
              <Text style={styles.wordMetrics}>
                Aciertos: {word.correctAnswers} · Respuestas incorrectas: {word.mistakes} · Pistas usadas: {word.hints}
              </Text>
              <Text style={styles.wordDate}>
                Última práctica: {new Date(word.lastPracticedAt).toLocaleDateString()}
              </Text>
              <Text style={styles.wordDate}>
                Próximo repaso: {getNextReviewIntervalLabel(word)}
              </Text>
            </View>
          ))}
        {Object.keys(user.wordProgress || {}).length === 0 && (
          <Text style={styles.emptyWords}>Aquí verás tus aciertos, respuestas incorrectas, pistas usadas y última práctica de cada palabra.</Text>
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