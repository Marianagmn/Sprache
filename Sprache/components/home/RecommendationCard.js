import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, elevation, radii, spacing, typography } from '../../theme';

export default function RecommendationCard({
	title = 'Vocabulario',
	description = 'Repasa palabras que has aprendido recientemente.',
	time = '5 min',
	iconName = 'library',
	onPress
}) {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
			<View style={styles.icon}>
				<Ionicons name={iconName} size={24} color={colors.black} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
			<Text style={styles.time}>{time} →</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg, flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl, ...elevation.card },
	icon: { backgroundColor: colors.goldSoft, padding: spacing.md, borderRadius: radii.md, marginRight: spacing.lg },
	textContainer: { flex: 1 },
	title: { fontSize: typography.body, fontWeight: typography.semibold, color: colors.black, marginBottom: 4 },
	description: { fontSize: typography.small, color: colors.muted },
	time: { fontSize: typography.small, fontWeight: typography.bold, color: colors.black, marginLeft: spacing.sm }
});
