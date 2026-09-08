import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StreakBadge({ days }) {
	return (
		<View style={styles.container}>
			<Ionicons name="flame" size={20} color="#F59E0B" />
			<Text style={styles.text}>{days}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
	text: { fontSize: 16, fontWeight: 'bold', color: '#D97706', marginLeft: 4 }
});
