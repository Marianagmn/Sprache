import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyActivity({ days = [] }) {
	const maxMinutes = Math.max(20, ...days.map((day) => day.minutes));

	return (
		<View style={styles.container}>
			{days.map((day) => (
				<View key={day.date} style={styles.dayColumn}>
					<Text style={styles.dayLabel}>{day.label}</Text>
					<View style={styles.barContainer}>
						<View style={[styles.dayBar, day.active ? styles.activeBar : styles.inactiveBar, { height: day.active ? Math.max(6, (day.minutes / maxMinutes) * 52) : 6 }]} />
					</View>
					<Text style={styles.minutes}>{day.minutes ? `${day.minutes}m` : '·'}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, minHeight: 118 },
	dayColumn: { alignItems: 'center', flex: 1 },
	dayLabel: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
	barContainer: { height: 56, justifyContent: 'flex-end' },
	dayBar: { width: 14, borderRadius: 7 },
	activeBar: { backgroundColor: '#10B981' },
	inactiveBar: { backgroundColor: '#E5E7EB' },
	minutes: { minHeight: 16, marginTop: 5, color: '#6B7280', fontSize: 10, fontWeight: '600' }
});
