import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LevelProgressCard({ level = 'Nivel A1', motivation = '', dailyGoal = 10, studiedMinutes = 0, learnedWords = 0 }) {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.level}>{level}</Text>
				<Text style={styles.xp}>{studiedMinutes} min de estudio</Text>
			</View>
			{motivation ? <Text style={styles.motivation}>Motivación: {motivation}</Text> : null}
			<Text style={styles.caption}>{dailyGoal} min diarios • {learnedWords} palabras aprendidas en tus sesiones</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
	level: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },
	xp: { fontSize: 16, fontWeight: '600', color: '#6B7280' },
	motivation: { color: '#1E3A8A', fontSize: 13, fontWeight: '600', marginBottom: 6 },
	caption: { color: '#6B7280', fontSize: 13 }
});
