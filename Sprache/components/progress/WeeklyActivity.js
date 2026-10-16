import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, elevation, radii } from '../../theme';

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
	container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', backgroundColor: colors.surface, padding: 20, borderRadius: radii.lg, marginBottom: 32, ...elevation.card, minHeight: 118 },
	dayColumn: { alignItems: 'center', flex: 1 },
	dayLabel: { fontSize: 14, color: colors.muted, marginBottom: 8 },
	barContainer: { height: 56, justifyContent: 'flex-end' },
	dayBar: { width: 14, borderRadius: 7 },
	activeBar: { backgroundColor: colors.gold },
	inactiveBar: { backgroundColor: colors.border },
	minutes: { minHeight: 16, marginTop: 5, color: colors.muted, fontSize: 10, fontWeight: '600' }
});
