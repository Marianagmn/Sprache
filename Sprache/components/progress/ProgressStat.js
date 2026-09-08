import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressStat({ iconName, color, value, label }) {
	return (
		<View style={styles.container}>
			<Ionicons name={iconName} size={28} color={color} />
			<Text style={styles.value}>{value}</Text>
			<Text style={styles.label}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { backgroundColor: '#FFFFFF', flex: 1, padding: 16, borderRadius: 16, alignItems: 'center', marginHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
	value: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginTop: 8 },
	label: { fontSize: 12, color: '#6B7280', marginTop: 4 }
});
