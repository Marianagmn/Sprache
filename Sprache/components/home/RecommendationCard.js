import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MotionPressable from '../common/MotionPressable';
import { colors, elevation, radii, spacing, typography } from '../../theme';

export default function RecommendationCard({
	title = 'Vocabulario',
	description = 'Repasa palabras que has aprendido recientemente.',
	time = '5 min',
	iconName = 'library',
	onPress
}) {
	return (
		<MotionPressable
			style={styles.card}
			onPress={onPress}
			accessibilityRole="button"
			accessibilityLabel={`${title}. ${description}. Duración: ${time}`}
		>
			<View style={styles.icon}>
				<Ionicons name={iconName} size={24} color={colors.black} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
			<Text style={styles.time}>{time} →</Text>
		</MotionPressable>
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
