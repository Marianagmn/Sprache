import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalCard({ label = 'Tu objetivo', value = '10 minutos al día', badge = '🔥 Mantener una rutina' }) {
	return (
		<View style={styles.card}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
			<View style={styles.badge}>
				<Text style={styles.badgeText}>{badge}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	label: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
	value: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
	badge: { backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
	badgeText: { color: '#D97706', fontWeight: '600', fontSize: 12 }
});
