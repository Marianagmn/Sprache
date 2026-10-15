import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeHeader({ name, level, motivation = '', greeting = 'Guten Morgen', children }) {
	return (
		<View style={styles.header}>
			<View>
				<Text style={styles.greeting}>{greeting}, {name} 👋</Text>
				<Text style={styles.meta}>{level}{motivation ? ` • ${motivation}` : ''}</Text>
			</View>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
	greeting: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
	meta: { fontSize: 14, color: '#6B7280', marginTop: 4 }
});
