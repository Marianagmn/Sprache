import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, elevation, radii } from '../../theme';

export default function ProgressStat({ iconName, color, value, label }) {
	return (
		<View style={styles.container} accessible accessibilityRole="text" accessibilityLabel={`${label}: ${value}`}>
			<Ionicons accessible={false} name={iconName} size={28} color={color} />
			<Text style={styles.value} accessible={false}>{value}</Text>
			<Text style={styles.label} accessible={false}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { backgroundColor: colors.surface, flex: 1, padding: 16, borderRadius: radii.lg, alignItems: 'center', marginHorizontal: 4, ...elevation.card },
	value: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginTop: 8 },
	label: { fontSize: 14, color: colors.muted, marginTop: 4, textAlign: 'center' }
});
