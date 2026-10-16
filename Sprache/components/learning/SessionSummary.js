import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../common/AppButton';
import { calculateSessionSummary } from '../../services/lessonProgressService';
import { colors, radii, spacing, typography } from '../../theme';

export default function SessionSummary({ correctAnswers, totalQuestions, onFinish }) {
  const summary = calculateSessionSummary(correctAnswers, totalQuestions);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="trophy" size={42} color={colors.black} />
      </View>
      <Text style={styles.title}>Sesión completada</Text>
      <Text style={styles.subtitle}>Has practicado vocabulario y sumado una nueva sesión a tu progreso.</Text>
      <View style={styles.score}>
        <Text style={styles.scoreValue}>{summary.percentage}%</Text>
        <Text style={styles.scoreLabel}>{summary.correctAnswers} de {summary.totalQuestions} respuestas correctas</Text>
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
  button: { width: '100%' },
});
