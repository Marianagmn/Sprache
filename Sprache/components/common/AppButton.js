import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function AppButton({
	title,
	onPress,
	variant = 'primary',
	loading = false,
	disabled = false,
	style,
	textStyle,
	...props
}) {
	const isDisabled = disabled || loading;

	return (
		<TouchableOpacity
			style={[
				styles.button,
				variant === 'secondary' && styles.secondaryButton,
				isDisabled && styles.disabledButton,
				style
			]}
			onPress={onPress}
			disabled={isDisabled}
			activeOpacity={0.8}
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			{...props}
		>
			{loading ? (
				<ActivityIndicator color={colors.black} />
			) : (
				<Text style={[styles.text, variant === 'secondary' && styles.secondaryText, textStyle]}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: { backgroundColor: colors.gold, paddingVertical: spacing.lg, borderRadius: radii.md, alignItems: 'center', borderWidth: 1, borderColor: colors.gold },
	secondaryButton: { backgroundColor: colors.surface, borderColor: colors.border },
	disabledButton: { opacity: 0.5 },
	text: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold },
	secondaryText: { color: colors.black }
});
