import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, elevation, radii, typography } from '../../theme';

const goals = [5, 10, 20];

export default function GoalCard({ dailyGoal = 10, onGoalChange, label = 'Tu objetivo' }) {
	return (
		<View style={styles.card}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{dailyGoal} minutos al día</Text>
			<View style={styles.goalOptions}>
				{goals.map((goal) => (
					<TouchableOpacity
						key={goal}
						accessibilityRole="radio"
						accessibilityLabel={`${goal} minutos al día`}
						accessibilityState={{ selected: dailyGoal === goal }}
						onPress={() => onGoalChange?.(goal)}
						style={[styles.goalOption, dailyGoal === goal && styles.selectedGoal]}
					>
						<Text style={[styles.goalText, dailyGoal === goal && styles.selectedGoalText]}>{goal} min</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={styles.badge}>
				<Text style={styles.badgeText}>Ajusta tu meta diaria</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: colors.surface, padding: 20, borderRadius: radii.lg, alignItems: 'center', marginBottom: 32, ...elevation.card },
	label: { fontSize: 14, color: colors.muted, marginBottom: 4 },
	value: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 12 },
	goalOptions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 },
	goalOption: { borderWidth: 1, borderColor: colors.border, borderRadius: radii.pill, paddingVertical: 7, paddingHorizontal: 14, marginHorizontal: 4 },
	selectedGoal: { backgroundColor: colors.gold, borderColor: colors.gold },
	goalText: { color: colors.muted, fontSize: 13, fontWeight: typography.semibold },
	selectedGoalText: { color: colors.black },
	badge: { backgroundColor: colors.goldSoft, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill },
	badgeText: { color: colors.black, fontWeight: typography.semibold, fontSize: 12 }
});
