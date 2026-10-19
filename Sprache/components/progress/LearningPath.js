import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLearningPath } from '../../services/learningPathService';
import { colors, elevation, radii, spacing, typography } from '../../theme';

export default function LearningPath({ sessions, placementAssessment, onStartLesson }) {
  const path = getLearningPath(sessions, placementAssessment);
  const [expandedLevel, setExpandedLevel] = useState(null);

  return (
    <View style={styles.container}>
      {path.levels.map((level) => (
        <View key={level.code} style={styles.levelCard}>
          <TouchableOpacity
            style={styles.levelHeader}
            onPress={() => setExpandedLevel((current) => current === level.code ? null : level.code)}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityState={{ expanded: expandedLevel === level.code }}
            accessibilityLabel={`${level.code}, ${level.completedLessons} de ${level.totalLessons} lecciones completadas`}
          >
            <View style={styles.levelHeading}>
              <Text style={styles.levelCode}>{level.code}</Text>
              <View style={styles.levelTitles}>
                <Text style={styles.levelTitle} accessibilityRole="header">{level.title}</Text>
                <Text style={styles.levelDescription}>{level.status === 'locked'
                  ? 'Completa el nivel anterior para continuar'
                  : `${level.completedLessons} de ${level.totalLessons} lecciones completadas`}</Text>
              </View>
            </View>
            <Ionicons
              accessible={false}
              name={expandedLevel === level.code ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.muted}
            />
          </TouchableOpacity>
          <View style={styles.progressTrack} accessible={false}>
            <View style={[styles.progressFill, { width: `${(level.completedLessons / level.totalLessons) * 100}%` }]} />
          </View>
          {expandedLevel === level.code && level.lessons.map((lesson) => {
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
                <Ionicons accessible={false} name={icon} size={20} color={lesson.completed ? colors.success : disabled ? colors.muted : colors.black} />
                <Text style={[styles.lessonTitle, disabled && styles.disabledText]} accessible={false}>{lesson.title}</Text>
                <Text style={[styles.lessonAction, disabled && styles.disabledText]} accessible={false}>{lesson.time || actionLabel}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
  levelCard: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.md, ...elevation.card },
  levelHeader: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  levelHeading: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  levelCode: { color: colors.black, backgroundColor: colors.goldSoft, borderRadius: radii.md, paddingHorizontal: 10, paddingVertical: 8, fontSize: typography.body, fontWeight: typography.bold, marginRight: spacing.md },
  levelTitles: { flex: 1 },
  levelTitle: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold },
  levelDescription: { color: colors.muted, fontSize: typography.caption, lineHeight: 17, marginTop: 3, marginRight: spacing.sm },
  progressTrack: { height: 8, backgroundColor: colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 999 },
  lessonRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.sm },
  lessonDisabled: { opacity: 0.65 },
  lessonTitle: { flex: 1, color: colors.black, fontSize: typography.small, marginHorizontal: spacing.sm },
  lessonAction: { color: colors.muted, fontSize: typography.caption, fontWeight: typography.semibold },
  disabledText: { color: colors.muted },
});
