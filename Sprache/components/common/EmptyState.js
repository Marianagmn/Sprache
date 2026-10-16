import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function EmptyState({
	title = 'No hay contenido',
	message,
	actionLabel,
	onAction,
	style
}) {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.icon}>-</Text>
			<Text style={styles.title}>{title}</Text>
			{message && <Text style={styles.message}>{message}</Text>}
			{actionLabel && onAction && (
				<TouchableOpacity style={styles.button} onPress={onAction} accessibilityRole="button" accessibilityLabel={actionLabel}>
					<Text style={styles.buttonText}>{actionLabel}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { alignItems: 'center', justifyContent: 'center', padding: 24 },
	icon: { color: colors.gold, fontSize: 40, marginBottom: spacing.md },
	title: { color: colors.black, fontSize: 18, fontWeight: typography.semibold, textAlign: 'center' },
	message: { color: colors.muted, fontSize: typography.small, marginTop: spacing.sm, textAlign: 'center' },
	button: { backgroundColor: colors.gold, borderRadius: radii.md, marginTop: spacing.lg, paddingHorizontal: 20, paddingVertical: spacing.md },
	buttonText: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold }
});
