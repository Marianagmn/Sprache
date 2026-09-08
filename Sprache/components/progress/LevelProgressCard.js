import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LevelProgressCard() {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.level}>Nivel A2</Text>
				<Text style={styles.xp}>320 / 500 XP</Text>
			</View>
			<View style={styles.progressBackground}>
				<View style={styles.progressFill} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
	level: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },
	xp: { fontSize: 16, fontWeight: '600', color: '#6B7280' },
	progressBackground: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5 },
	progressFill: { height: 10, width: '64%', backgroundColor: '#F59E0B', borderRadius: 5 }
});
