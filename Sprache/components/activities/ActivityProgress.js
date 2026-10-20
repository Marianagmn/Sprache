import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from '../common/ProgressBar';
import { colors } from '../../theme';

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
			<ProgressBar progress={progressPercentage} accessibilityLabel="Progreso de la actividad" style={styles.progressBackground} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { width: '100%' },
	labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
	label: { fontSize: 14, fontWeight: '600', color: colors.black },
	count: { fontSize: 14, color: colors.muted },
	progressBackground: { height: 8, borderRadius: 4 }
});
