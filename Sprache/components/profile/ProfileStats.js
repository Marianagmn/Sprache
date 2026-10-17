import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, elevation, radii } from '../../theme';

export default function ProfileStats({ stats = [] }) {
	if (stats.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			{stats.map((stat, index) => (
				<View key={`${stat.label}-${index}`} style={styles.stat} accessible accessibilityRole="text" accessibilityLabel={`${stat.label}: ${stat.value}`}>
					<Ionicons accessible={false} name={stat.iconName} size={24} color={stat.color || colors.black} />
					<Text style={styles.value} accessible={false}>{stat.value}</Text>
					<Text style={styles.label} accessible={false}>{stat.label}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
	stat: { backgroundColor: colors.surface, flex: 1, padding: 16, borderRadius: radii.lg, alignItems: 'center', marginHorizontal: 4, ...elevation.card },
	value: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginTop: 8 },
	label: { fontSize: 12, color: colors.muted, marginTop: 4, textAlign: 'center' }
});
