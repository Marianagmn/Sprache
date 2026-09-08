import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActivityProgress({ progress = 0, completed, total }) {
	const progressPercentage = Math.min(Math.max(progress, 0), 100);

	return (
		<View style={styles.container}>
			{(completed !== undefined && total !== undefined) && (
				<View style={styles.labelRow}>
					<Text style={styles.label}>Progreso</Text>
					<Text style={styles.count}>{completed} / {total}</Text>
				</View>
			)}
			<View style={styles.progressBackground}>
				<View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { width: '100%' },
	labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
	label: { fontSize: 14, fontWeight: '600', color: '#111827' },
	count: { fontSize: 14, color: '#6B7280' },
	progressBackground: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
	progressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 }
});
