import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LevelProgressCard({ level = 'Nivel A1', studiedMinutes = 0, learnedWords = 0 }) {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.level}>{level}</Text>
				<Text style={styles.xp}>{studiedMinutes} min de estudio</Text>
			</View>
			<Text style={styles.caption}>{learnedWords} palabras aprendidas en tus sesiones</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
	level: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },
	xp: { fontSize: 16, fontWeight: '600', color: '#6B7280' },
	caption: { color: '#6B7280', fontSize: 13 }
});
