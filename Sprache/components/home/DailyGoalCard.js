import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DailyGoalCard() {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>Tu objetivo de hoy</Text>
			<Text style={styles.goal}>7 / 10 min</Text>
			<View style={styles.progressBackground}>
				<View style={styles.progressFill} />
			</View>
			<Text style={styles.encouragement}>¡Ya casi terminas!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: '#1E3A8A', padding: 20, borderRadius: 16, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
	title: { color: '#D1D5DB', fontSize: 14, fontWeight: '600', marginBottom: 8 },
	goal: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
	progressBackground: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginBottom: 12 },
	progressFill: { height: 8, width: '70%', backgroundColor: '#10B981', borderRadius: 4 },
	encouragement: { color: '#10B981', fontSize: 14, fontWeight: '600' }
});
