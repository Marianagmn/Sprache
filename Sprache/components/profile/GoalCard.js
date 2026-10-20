import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MotionPressable from '../common/MotionPressable';
import ProgressBar from '../common/ProgressBar';
import { colors, elevation, radii, typography } from '../../theme';

const goals = [5, 10, 20, 30];

export default function GoalCard({ dailyGoal = 10, completedSeconds = 0, onGoalChange, label = 'Tu objetivo' }) {
	const progress = dailyGoal > 0 ? Math.min(completedSeconds / (dailyGoal * 60), 1) : 0;
	const remainingSeconds = Math.max(0, dailyGoal * 60 - completedSeconds);
	const remainingText = remainingSeconds >= 60
		? `${Math.floor(remainingSeconds / 60)} min restantes hoy`
		: `${remainingSeconds} s restantes hoy`;
	const practicedText = completedSeconds >= 60
		? `${Math.floor(completedSeconds / 60)} min ${completedSeconds % 60} s practicados hoy`
		: `${completedSeconds} s practicados hoy`;
	return (
		<View style={styles.card}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{dailyGoal} minutos al día</Text>
			<Text style={styles.progressText}>{practicedText}</Text>
			<ProgressBar
				progress={progress * 100}
				accessibilityLabel="Avance de la meta diaria"
				accessibilityValue={{ min: 0, max: dailyGoal * 60, now: Math.min(completedSeconds, dailyGoal * 60), text: `${Math.round(progress * 100)} por ciento` }}
				style={styles.progressBackground}
			/>
			<Text style={styles.remainingText}>
				{progress >= 1 ? '¡Meta de hoy alcanzada!' : remainingText}
			</Text>
			<View style={styles.goalOptions}>
				{goals.map((goal) => (
					<MotionPressable
						key={goal}
						accessibilityRole="radio"
						accessibilityLabel={`${goal} minutos al día`}
						accessibilityState={{ selected: dailyGoal === goal }}
						onPress={() => onGoalChange?.(goal)}
						style={[styles.goalOption, dailyGoal === goal && styles.selectedGoal]}
					>
						<Text style={[styles.goalText, dailyGoal === goal && styles.selectedGoalText]}>{goal} min</Text>
					</MotionPressable>
				))}
			</View>
			<Text style={styles.badgeText}>Elige el ritmo que te venga bien</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: colors.surface, padding: 20, borderRadius: radii.lg, alignItems: 'stretch', marginBottom: 32, ...elevation.card },
	label: { fontSize: 14, color: colors.muted, marginBottom: 4 },
	value: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 12, textAlign: 'center' },
	progressText: { fontSize: 14, color: colors.muted, marginBottom: 8, textAlign: 'center' },
	progressBackground: { height: 10, borderRadius: 999 },
	remainingText: { fontSize: 13, color: colors.muted, marginTop: 8, marginBottom: 16, textAlign: 'center' },
	goalOptions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 },
	goalOption: { minHeight: 44, justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radii.pill, paddingVertical: 7, paddingHorizontal: 14, marginHorizontal: 4, marginBottom: 6 },
	selectedGoal: { backgroundColor: colors.gold, borderColor: colors.gold },
	goalText: { color: colors.muted, fontSize: 13, fontWeight: typography.semibold },
	selectedGoalText: { color: colors.black },
	badgeText: { color: colors.muted, fontWeight: typography.semibold, fontSize: 12, textAlign: 'center' }
});
