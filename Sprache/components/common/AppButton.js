import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
				<ActivityIndicator color={variant === 'secondary' ? '#1E3A8A' : '#FFFFFF'} />
			) : (
				<Text style={[styles.text, variant === 'secondary' && styles.secondaryText, textStyle]}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: { backgroundColor: '#1E3A8A', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
	secondaryButton: { backgroundColor: 'transparent' },
	disabledButton: { opacity: 0.5 },
	text: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
	secondaryText: { color: '#1E3A8A' }
});
