import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ActivityCard({ title, description, time, iconName }) {
	return (
		<TouchableOpacity style={styles.card}>
			<View style={styles.iconContainer}>
				<Ionicons name={iconName} size={24} color="#1E3A8A" />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.cardTitle}>{title}</Text>
				<Text style={styles.cardDesc}>{description}</Text>
			</View>
			<Text style={styles.timeText}>{time} →</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	iconContainer: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 12, marginRight: 16 },
	textContainer: { flex: 1 },
	cardTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
	cardDesc: { fontSize: 14, color: '#6B7280' },
	timeText: { fontSize: 14, fontWeight: 'bold', color: '#10B981', marginLeft: 8 }
});
