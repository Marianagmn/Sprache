import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecommendationCard({
	title = 'Vocabulario',
	description = 'Repasa palabras que has aprendido recientemente.',
	time = '5 min',
	iconName = 'library',
	onPress
}) {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
			<View style={styles.icon}>
				<Ionicons name={iconName} size={24} color="#1E3A8A" />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
			<Text style={styles.time}>{time} →</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	icon: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 12, marginRight: 16 },
	textContainer: { flex: 1 },
	title: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
	description: { fontSize: 14, color: '#6B7280' },
	time: { fontSize: 14, fontWeight: 'bold', color: '#1E3A8A', marginLeft: 8 }
});
