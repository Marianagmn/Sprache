import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function ScreenHeader({ title, subtitle }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: 24 },
	title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
	subtitle: { fontSize: 16, color: '#6B7280' }
});
