import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoalCompletion from '../common/GoalCompletion';
import ProgressBar from '../common/ProgressBar';
import { colors, radii, spacing, typography } from '../../theme';

export default function DailyGoalCard({ completedSeconds = 0, goal = 10, unit = 'min', encouragement }) {
	const completedMinutes = completedSeconds / 60;
	const progress = goal > 0 ? Math.min(Math.max(completedMinutes / goal, 0), 1) : 0;
	const formattedTime = completedSeconds >= 60
		? `${Math.floor(completedSeconds / 60)} min ${completedSeconds % 60} s`
		: `${completedSeconds} s`;
	const message = encouragement || (
		progress >= 1
			? '¡Objetivo cumplido! Buen trabajo.'
			: completedSeconds > 0
				? 'Buen trabajo, esos minutos cuentan.'
				: 'Tu ritmo está bien; practica cuando te venga bien.'
	);

	return (
		<View style={styles.card}>
			<Text style={styles.title} accessibilityRole="header">Tu objetivo de hoy</Text>
			<Text style={styles.goal}>{completedSeconds === 0 ? '0 s' : `${formattedTime} / ${goal} ${unit}`}</Text>
			<ProgressBar
				progress={progress * 100}
				color={colors.gold}
				backgroundColor="rgba(255,255,255,0.22)"
				accessibilityLabel="Progreso de tu objetivo diario"
				accessibilityValue={{ min: 0, max: goal * 60, now: Math.min(completedSeconds, goal * 60), text: `${Math.round(progress * 100)} por ciento` }}
				style={styles.progressBackground}
			/>
			<GoalCompletion completed={progress >= 1} message={message} color={colors.gold} />
			{progress < 1 && <Text style={styles.encouragement}>{message}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: colors.black, padding: 20, borderRadius: radii.lg, marginBottom: spacing.xl },
	title: { color: colors.white, fontSize: typography.small, fontWeight: typography.semibold, marginBottom: spacing.sm },
	goal: { color: colors.gold, fontSize: typography.title, fontWeight: typography.bold, marginBottom: spacing.lg },
	progressBackground: { height: 8, borderRadius: 4, marginBottom: spacing.md },
	encouragement: { color: colors.gold, fontSize: typography.small, fontWeight: typography.semibold }
});
