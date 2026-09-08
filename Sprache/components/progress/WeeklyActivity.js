import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyActivity() {
	const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
	const activeDays = [true, true, true, true, false, false, false];

	return (
		<View style={styles.container}>
			{weekDays.map((day, index) => (
				<View key={day} style={styles.dayColumn}>
					<Text style={styles.dayLabel}>{day}</Text>
					<View style={[styles.dayDot, activeDays[index] ? styles.activeDot : styles.inactiveDot]} />
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	dayColumn: { alignItems: 'center' },
	dayLabel: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
	dayDot: { width: 12, height: 12, borderRadius: 6 },
	activeDot: { backgroundColor: '#10B981' },
	inactiveDot: { backgroundColor: '#E5E7EB' }
});
