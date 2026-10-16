import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLearningPath } from '../../services/learningPathService';
import { colors, elevation, radii, spacing, typography } from '../../theme';

export default function LearningPath({ sessions, placementAssessment, onStartLesson }) {
  const path = getLearningPath(sessions, placementAssessment);

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        {placementAssessment?.source === 'assessment'
          ? `La evaluación sugiere empezar en ${path.recommendedLevel}. Es una orientación, no un examen de certificación.`
          : `Tu ruta empieza en ${path.recommendedLevel}. Puedes ajustar el ritmo y repasar niveles anteriores cuando quieras.`}
      </Text>
      {path.levels.map((level) => (
        <View key={level.code} style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelHeading}>
              <Text style={styles.levelCode}>{level.code}</Text>
              <View style={styles.levelTitles}>
                <Text style={styles.levelTitle}>{level.title}</Text>
                <Text style={styles.levelDescription}>{level.description}</Text>
              </View>
            </View>
            <Text style={styles.levelCount}>{level.completedLessons}/{level.totalLessons}</Text>
          </View>
          <View style={styles.progressTrack} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <View style={[styles.progressFill, { width: `${(level.completedLessons / level.totalLessons) * 100}%` }]} />
          </View>
          <Text style={styles.levelStatus}>
            {level.status === 'completed'
              ? 'Nivel completado'
              : level.status === 'locked'
                ? 'Se abre al completar el nivel anterior'
                : level.status === 'review'
                  ? 'Disponible para repasar'
                  : 'En curso'}
          </Text>
          {level.lessons.map((lesson) => {
            const disabled = !lesson.unlocked;
            const icon = lesson.completed ? 'checkmark-circle' : disabled ? 'lock-closed' : 'play-circle-outline';
            const actionLabel = lesson.completed ? 'Repasar' : disabled ? 'Bloqueada' : 'Empezar';
            return (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonRow, disabled && styles.lessonDisabled]}
                onPress={() => onStartLesson?.(lesson.id)}
                disabled={disabled}
                accessibilityRole="button"
                accessibilityLabel={`${lesson.title}. ${actionLabel}${lesson.time ? `. ${lesson.time}` : ''}`}
                accessibilityState={{ disabled, selected: lesson.completed }}
              >
                <Ionicons name={icon} size={20} color={lesson.completed ? colors.success : disabled ? colors.muted : colors.black} />
                <Text style={[styles.lessonTitle, disabled && styles.disabledText]}>{lesson.title}</Text>
                <Text style={[styles.lessonAction, disabled && styles.disabledText]}>{lesson.time || actionLabel}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
      <Text style={styles.futureNote}>Por ahora, la ruta incluye contenido A1 y A2. Los niveles siguientes se añadirán cuando haya lecciones disponibles.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
  intro: { color: colors.muted, fontSize: typography.small, lineHeight: 21, marginBottom: spacing.md },
  levelCard: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md, ...elevation.card },
  levelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  levelHeading: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  levelCode: { color: colors.black, backgroundColor: colors.goldSoft, borderRadius: radii.md, paddingHorizontal: 10, paddingVertical: 8, fontSize: typography.body, fontWeight: typography.bold, marginRight: spacing.md },
  levelTitles: { flex: 1 },
  levelTitle: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold },
  levelDescription: { color: colors.muted, fontSize: typography.caption, lineHeight: 17, marginTop: 3 },
  levelCount: { color: colors.muted, fontSize: typography.small, fontWeight: typography.semibold, marginLeft: spacing.sm },
  progressTrack: { height: 8, backgroundColor: colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 999 },
  levelStatus: { color: colors.muted, fontSize: typography.caption, marginTop: spacing.sm, marginBottom: spacing.sm },
  lessonRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.sm },
  lessonDisabled: { opacity: 0.65 },
  lessonTitle: { flex: 1, color: colors.black, fontSize: typography.small, marginHorizontal: spacing.sm },
  lessonAction: { color: colors.muted, fontSize: typography.caption, fontWeight: typography.semibold },
  disabledText: { color: colors.muted },
  futureNote: { color: colors.muted, fontSize: typography.caption, lineHeight: 18, marginTop: 2 },
});
