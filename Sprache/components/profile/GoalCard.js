import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
						accessibilityRole="button"
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
	card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	label: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
	value: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
	goalOptions: { flexDirection: 'row', marginBottom: 12 },
	goalOption: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 18, paddingVertical: 7, paddingHorizontal: 14, marginHorizontal: 4 },
	selectedGoal: { backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' },
	goalText: { color: '#4B5563', fontSize: 13, fontWeight: '600' },
	selectedGoalText: { color: '#FFFFFF' },
	badge: { backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
	badgeText: { color: '#D97706', fontWeight: '600', fontSize: 12 }
});
