import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function DailyGoalCard({ completed = 0, goal = 10, unit = 'min', encouragement }) {
	const progress = goal > 0 ? Math.min(Math.max(completed / goal, 0), 1) : 0;
	const message = encouragement || (
		progress >= 1
			? '¡Objetivo cumplido! Buen trabajo.'
			: completed > 0
				? 'Buen trabajo, esos minutos cuentan.'
				: 'Tu ritmo está bien; practica cuando te venga bien.'
	);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>Tu objetivo de hoy</Text>
			<Text style={styles.goal}>{completed} / {goal} {unit}</Text>
			<View style={styles.progressBackground}>
				<View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
			</View>
			<Text style={styles.encouragement}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: colors.black, padding: 20, borderRadius: radii.lg, marginBottom: spacing.xl },
	title: { color: colors.white, fontSize: typography.small, fontWeight: typography.semibold, marginBottom: spacing.sm },
	goal: { color: colors.gold, fontSize: typography.title, fontWeight: typography.bold, marginBottom: spacing.lg },
	progressBackground: { height: 8, backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 4, marginBottom: spacing.md },
	progressFill: { height: 8, width: '70%', backgroundColor: colors.gold, borderRadius: 4 },
	encouragement: { color: colors.gold, fontSize: typography.small, fontWeight: typography.semibold }
});
