import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function AppInput({ style, placeholderTextColor = '#9CA3AF', ...props }) {
	return (
		<TextInput
			style={[styles.input, style]}
			placeholderTextColor={placeholderTextColor}
			selectionColor="#1E3A8A"
			accessibilityRole="text"
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 16 }
});
