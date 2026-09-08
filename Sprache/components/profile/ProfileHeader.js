import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileHeader({ name = 'Usuario', level = '' }) {
	return (
		<View style={styles.container}>
			<View style={styles.avatar}>
				<Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
			</View>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.level}>{level}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { alignItems: 'center', marginBottom: 24, marginTop: 16 },
	avatar: { width: 80, height: 80, backgroundColor: '#1E3A8A', borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
	avatarText: { fontSize: 32, color: '#FFFFFF', fontWeight: 'bold' },
	name: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
	level: { fontSize: 16, color: '#6B7280', marginTop: 4 }
});
