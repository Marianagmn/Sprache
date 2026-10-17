import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, elevation, radii, spacing, typography } from '../../theme';

export default function QuestionCard({ question, prompt }) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow} accessibilityRole="header">Traduce y aprende</Text>
      <Text style={styles.word} accessibilityRole="header">{question}</Text>
      <Text style={styles.prompt}>{prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.xl, marginBottom: 20, ...elevation.card },
  eyebrow: { color: colors.red, fontSize: typography.caption, fontWeight: typography.bold, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 18 },
  word: { color: colors.black, fontSize: 30, fontWeight: typography.heavy, marginBottom: spacing.md },
  prompt: { color: colors.text, fontSize: 17, lineHeight: 24 },
});
