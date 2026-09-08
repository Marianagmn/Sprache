import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsRow({ iconName, title, onPress, danger = false }) {
	return (
		<TouchableOpacity style={styles.row} onPress={onPress}>
			<View style={styles.iconTitle}>
				<Ionicons name={iconName} size={20} color={danger ? '#EF4444' : '#6B7280'} style={styles.icon} />
				<Text style={[styles.text, danger && styles.dangerText]}>{title}</Text>
			</View>
			{!danger && <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
	iconTitle: { flexDirection: 'row', alignItems: 'center' },
	icon: { marginRight: 12 },
	text: { fontSize: 16, color: '#111827' },
	dangerText: { color: '#EF4444' }
});
