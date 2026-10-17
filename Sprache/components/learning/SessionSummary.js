import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../common/AppButton';
import { calculateSessionSummary } from '../../services/lessonProgressService';
import { colors, radii, spacing, typography } from '../../theme';

export default function SessionSummary({ correctAnswers, totalQuestions, earnedXp = correctAnswers * 10, onFinish }) {
  const summary = calculateSessionSummary(correctAnswers, totalQuestions);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="trophy" size={42} color={colors.black} />
      </View>
      <Text style={styles.title}>¡Sesión lista!</Text>
      <Text style={styles.subtitle}>Gracias por practicar. Cada sesión suma experiencia; puedes volver cuando te venga bien.</Text>
      <View style={styles.score}>
        <Text style={styles.scoreValue}>{summary.percentage}%</Text>
        <Text style={styles.scoreLabel}>Respuestas correctas: {summary.correctAnswers} de {summary.totalQuestions}</Text>
        <Text style={styles.xpEarned}>+{earnedXp} XP por esta práctica</Text>
        {summary.correctAnswers < summary.totalQuestions && (
          <Text style={styles.reviewNote}>Si quieres, puedes repasar las respuestas que hoy costaron más.</Text>
        )}
      </View>
      <AppButton title="Volver a actividades" onPress={onFinish} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconContainer: { width: 88, height: 88, borderRadius: radii.pill, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  title: { color: colors.black, fontSize: 26, fontWeight: typography.heavy, textAlign: 'center', marginBottom: 10 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 320, marginBottom: spacing.xl },
  score: { alignItems: 'center', marginBottom: 28 },
  scoreValue: { color: colors.black, fontSize: 38, fontWeight: typography.heavy },
  scoreLabel: { color: colors.muted, fontSize: 14, marginTop: 4 },
  xpEarned: { color: colors.black, backgroundColor: colors.goldSoft, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 8, fontSize: 15, fontWeight: typography.bold, marginTop: 12 },
  reviewNote: { color: colors.muted, fontSize: 14, lineHeight: 20, textAlign: 'center', maxWidth: 300, marginTop: 12 },
  button: { width: '100%' },
});
