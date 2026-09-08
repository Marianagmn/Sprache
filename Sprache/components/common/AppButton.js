import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AppButton({ title, onPress, variant = 'primary', style }) {
	return (
		<TouchableOpacity
			style={[styles.button, variant === 'secondary' && styles.secondaryButton, style]}
			onPress={onPress}
		>
			<Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: { backgroundColor: '#1E3A8A', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
	secondaryButton: { backgroundColor: 'transparent' },
	text: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
	secondaryText: { color: '#1E3A8A' }
});
