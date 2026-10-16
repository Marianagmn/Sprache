import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export default function ProfileHeader({ name = 'Usuario', level = '', motivation = '' }) {
	return (
		<View style={styles.container}>
			<View style={styles.avatar}>
				<Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
			</View>
			<Text style={styles.name}>{name}</Text>
			{level ? <Text style={styles.level}>{level}</Text> : null}
			{motivation ? <Text style={styles.motivation}>Motivación: {motivation}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { alignItems: 'center', marginBottom: 24, marginTop: 16 },
	avatar: { width: 80, height: 80, backgroundColor: colors.gold, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
	avatarText: { fontSize: 32, color: colors.black, fontWeight: 'bold' },
	name: { fontSize: 24, fontWeight: 'bold', color: colors.black },
	level: { fontSize: 16, color: colors.muted, marginTop: 4 },
	motivation: { fontSize: 14, color: colors.black, marginTop: 4, fontWeight: typography.semibold }
});
