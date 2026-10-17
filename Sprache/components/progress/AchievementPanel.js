import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAchievements, getExperience, getWeeklyChallenges } from '../../services/achievementService.js';
import { colors, elevation, radii, spacing, typography } from '../../theme';

export default function AchievementPanel({ sessions = [], compact = false }) {
  const experience = getExperience(sessions);
  const challenges = getWeeklyChallenges(sessions);
  const achievements = getAchievements(sessions);
  const shownChallenges = compact ? challenges.slice(0, 2) : challenges;
  const shownBadges = compact ? achievements.filter((badge) => badge.earned).slice(0, 3) : achievements;

  return (
    <View style={styles.container}>
      <View style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <View>
            <Text style={styles.xpEyebrow}>Experiencia</Text>
            <Text style={styles.xpValue}>{experience.xp} XP</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelLabel}>Nivel</Text>
            <Text style={styles.levelValue}>{experience.level}</Text>
          </View>
        </View>
        <View
          style={styles.progressTrack}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Progreso al siguiente nivel de experiencia"
          accessibilityValue={{ min: 0, max: experience.nextLevelXp, now: experience.progressToNextLevel, text: `${experience.progressToNextLevel} de ${experience.nextLevelXp} XP` }}
        >
          <View style={[styles.progressFill, { width: `${experience.progressToNextLevel}%` }]} />
        </View>
        <Text style={styles.helperText}>
          {experience.nextLevelXp - experience.progressToNextLevel} XP para el siguiente nivel · sumas XP al completar, dedicar tiempo y acertar
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Retos de esta semana</Text>
      {shownChallenges.map((challenge) => {
        const percentage = (challenge.progress / challenge.target) * 100;
        return (
          <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeHeading}>
              <View style={styles.challengeCopy}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
              </View>
              <Text style={styles.challengeCount}>
                {challenge.progress}/{challenge.target}{challenge.completed ? ' ✓' : ''}
              </Text>
            </View>
            <View
              style={styles.challengeTrack}
              accessible
              accessibilityRole="progressbar"
              accessibilityLabel={challenge.title}
              accessibilityValue={{ min: 0, max: challenge.target, now: challenge.progress }}
            >
              <View style={[styles.challengeFill, { width: `${percentage}%` }]} />
            </View>
          </View>
        );
      })}

      <Text style={styles.sectionTitle}>Insignias</Text>
      {shownBadges.length > 0 ? (
        <View style={styles.badgesGrid}>
          {shownBadges.map((badge) => (
            <View
                key={badge.id}
                style={[styles.badgeCard, !badge.earned && styles.badgeLocked]}
                accessible
                accessibilityRole="text"
                accessibilityLabel={`${badge.title}. ${badge.description} ${badge.earned ? 'Conseguida' : 'Por conseguir'}.`}
              >
                <Ionicons accessible={false} name={badge.icon} size={24} color={badge.earned ? colors.black : colors.muted} />
                <Text style={[styles.badgeTitle, !badge.earned && styles.lockedText]} accessible={false}>{badge.title}</Text>
                {!compact && <Text style={styles.badgeDescription} accessible={false}>{badge.description}</Text>}
                <Text style={styles.badgeState} accessible={false}>{badge.earned ? 'Conseguida' : 'Por conseguir'}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.helperText}>Completa una práctica para conseguir tu primera insignia.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
  xpCard: { backgroundColor: colors.black, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.lg },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  xpEyebrow: { color: colors.white, fontSize: typography.small, fontWeight: typography.semibold },
  xpValue: { color: colors.gold, fontSize: typography.title, fontWeight: typography.heavy, marginTop: 2 },
  levelBadge: { alignItems: 'center', backgroundColor: colors.gold, borderRadius: radii.md, minWidth: 64, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  levelLabel: { color: colors.black, fontSize: typography.caption, fontWeight: typography.semibold },
  levelValue: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.heavy },
  progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.24)', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 999 },
  helperText: { color: colors.muted, fontSize: typography.caption, lineHeight: 18, marginTop: spacing.sm },
  sectionTitle: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold, marginTop: spacing.sm, marginBottom: spacing.sm },
  challengeCard: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm, ...elevation.card },
  challengeHeading: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.sm },
  challengeCopy: { flex: 1, marginRight: spacing.sm },
  challengeTitle: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold },
  challengeDescription: { color: colors.muted, fontSize: typography.caption, marginTop: 2 },
  challengeCount: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold },
  challengeTrack: { height: 7, backgroundColor: colors.border, borderRadius: 999, overflow: 'hidden' },
  challengeFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 999 },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 },
  badgeCard: { flexGrow: 1, flexBasis: '44%', minWidth: 132, alignItems: 'center', backgroundColor: colors.goldSoft, borderRadius: radii.md, padding: spacing.md, margin: 4 },
  badgeLocked: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
  badgeTitle: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold, textAlign: 'center', marginTop: spacing.xs },
  badgeDescription: { color: colors.muted, fontSize: typography.caption, lineHeight: 16, textAlign: 'center', marginTop: 3 },
  badgeState: { color: colors.muted, fontSize: typography.caption, marginTop: spacing.xs },
  lockedText: { color: colors.muted },
});