import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileStats({ stats = [] }) {
	if (stats.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			{stats.map((stat, index) => (
				<View key={`${stat.label}-${index}`} style={styles.stat}>
					<Ionicons name={stat.iconName} size={24} color={stat.color || '#1E3A8A'} />
					<Text style={styles.value}>{stat.value}</Text>
					<Text style={styles.label}>{stat.label}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
	stat: { backgroundColor: '#FFFFFF', flex: 1, padding: 16, borderRadius: 16, alignItems: 'center', marginHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	value: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginTop: 8 },
	label: { fontSize: 12, color: '#6B7280', marginTop: 4, textAlign: 'center' }
});
