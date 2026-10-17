import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, elevation, radii } from '../../theme';

export default function WeeklyActivity({ days = [] }) {
	const maxSeconds = Math.max(60, ...days.map((day) => day.seconds || 0));
	const weekdayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

	return (
		<View style={styles.container}>
			{days.map((day) => (
				<View
					key={day.date}
					style={styles.dayColumn}
					accessible
					accessibilityRole="text"
					accessibilityLabel={`${weekdayNames[new Date(`${day.date}T12:00:00`).getDay()]}, ${day.sessions ? `${day.sessions} ${day.sessions === 1 ? 'práctica' : 'prácticas'}, ${day.seconds ? `${Math.floor(day.seconds / 60)} min${day.seconds % 60 ? ` ${day.seconds % 60} s` : ''}` : 'sin tiempo medido'}` : 'sin práctica'}`}
				>
					<Text style={styles.dayLabel} accessible={false}>{day.label}</Text>
					<View style={styles.barContainer}>
						<View accessible={false} style={[styles.dayBar, day.active ? styles.activeBar : styles.inactiveBar, { height: day.active ? Math.max(6, ((day.seconds || 0) / maxSeconds) * 52) : 6 }]} />
					</View>
						<Text style={styles.minutes} accessible={false}>
							{day.sessions
								? day.seconds > 0
									? (day.seconds >= 60 ? `${Math.floor(day.seconds / 60)}m` : `${day.seconds}s`)
									: `${day.sessions} ses.`
								: '·'}
						</Text>
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
	minutes: { minHeight: 20, marginTop: 5, color: colors.muted, fontSize: 12, fontWeight: '600' }
});
