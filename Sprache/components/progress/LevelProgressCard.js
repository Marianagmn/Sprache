import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, elevation, radii, spacing, typography } from '../../theme';

function formatStudiedTime(studiedSeconds) {
  if (studiedSeconds >= 3600) {
    const hours = Math.floor(studiedSeconds / 3600);
    const minutes = Math.floor((studiedSeconds % 3600) / 60);
    return `${hours} h ${minutes} min`;
  }

  if (studiedSeconds >= 60) {
    return `${Math.floor(studiedSeconds / 60)} min`;
  }

  return `${studiedSeconds} s`;
}

export default function LevelProgressCard({ level = 'Nivel A1', studiedSeconds = 0, learnedWords = 0, totalSessions = 0 }) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Tu nivel</Text>
      <Text style={styles.level}>{level}</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.value}>{formatStudiedTime(studiedSeconds)}</Text>
          <Text style={styles.label}>Tiempo practicado</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.value}>{learnedWords}</Text>
          <Text style={styles.label}>Palabras aprendidas</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.value}>{totalSessions}</Text>
          <Text style={styles.label}>Prácticas</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: radii.lg, marginBottom: spacing.xl, ...elevation.card },
  eyebrow: { color: colors.muted, fontSize: typography.small, fontWeight: typography.semibold },
  level: { color: colors.black, fontSize: typography.title, fontWeight: typography.heavy, marginTop: 2, marginBottom: spacing.lg },
  stats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stat: { flex: 1, alignItems: 'center', paddingHorizontal: spacing.xs },
  value: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold, textAlign: 'center' },
  label: { color: colors.muted, fontSize: typography.caption, textAlign: 'center', marginTop: spacing.xs },
  divider: { width: 1, height: 32, backgroundColor: colors.border },
});
