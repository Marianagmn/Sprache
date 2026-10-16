import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, elevation, radii } from '../../theme';

export default function SettingsSection({ title, children }) {
	return (
		<>
			{title && <Text style={styles.title}>{title}</Text>}
			<View style={styles.group}>{children}</View>
		</>
	);
}

const styles = StyleSheet.create({
	title: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 12, marginLeft: 4 },
	group: { backgroundColor: colors.surface, borderRadius: radii.lg, paddingVertical: 8, marginBottom: 24, ...elevation.card }
});
