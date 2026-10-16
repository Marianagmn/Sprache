import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function AppInput({ style, placeholderTextColor = colors.muted, ...props }) {
	return (
		<TextInput
			style={[styles.input, style]}
			placeholderTextColor={placeholderTextColor}
			selectionColor={colors.gold}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, padding: spacing.lg, fontSize: typography.body, color: colors.text, marginBottom: spacing.lg }
});
