import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeHeader({ name, level, greeting = 'Guten Morgen', children }) {
	return (
		<View style={styles.header}>
			<View>
				<Text style={styles.greeting}>{greeting}, {name} 👋</Text>
				<Text style={styles.level}>{level}</Text>
			</View>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
	greeting: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
	level: { fontSize: 14, color: '#6B7280', marginTop: 4 }
});
