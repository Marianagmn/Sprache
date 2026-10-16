import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, elevation, radii } from '../../theme';

export default function LevelProgressCard({ level = 'Nivel A1', motivation = '', dailyGoal = 10, studiedSeconds = 0, learnedWords = 0 }) {
	const studiedTime = studiedSeconds >= 60
		? `${Math.floor(studiedSeconds / 60)} min ${studiedSeconds % 60} s`
		: `${studiedSeconds} s`;
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.level}>Nivel de partida: {level}</Text>
				<Text style={styles.xp}>{studiedTime} de práctica</Text>
			</View>
			{motivation ? <Text style={styles.motivation}>Motivación: {motivation}</Text> : null}
			<Text style={styles.caption}>{dailyGoal} min diarios • {learnedWords} palabras aprendidas en tus sesiones</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: colors.surface, padding: 20, borderRadius: radii.lg, marginBottom: 32, ...elevation.card },
	header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
	level: { fontSize: 18, fontWeight: 'bold', color: colors.black },
	xp: { fontSize: 16, fontWeight: '600', color: colors.muted },
	motivation: { color: colors.muted, fontSize: 13, fontWeight: '600', marginBottom: 6 },
	caption: { color: colors.muted, fontSize: 13 }
});
