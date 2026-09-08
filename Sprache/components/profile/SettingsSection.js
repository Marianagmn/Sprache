import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsSection({ title, children }) {
	return (
		<>
			{title && <Text style={styles.title}>{title}</Text>}
			<View style={styles.group}>{children}</View>
		</>
	);
}

const styles = StyleSheet.create({
	title: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12, marginLeft: 4 },
	group: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 8, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }
});
