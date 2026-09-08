import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
				<TouchableOpacity style={styles.button} onPress={onAction}>
					<Text style={styles.buttonText}>{actionLabel}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { alignItems: 'center', justifyContent: 'center', padding: 24 },
	icon: { color: '#9CA3AF', fontSize: 40, marginBottom: 12 },
	title: { color: '#111827', fontSize: 18, fontWeight: '600', textAlign: 'center' },
	message: { color: '#6B7280', fontSize: 14, marginTop: 8, textAlign: 'center' },
	button: { backgroundColor: '#1E3A8A', borderRadius: 12, marginTop: 16, paddingHorizontal: 20, paddingVertical: 12 },
	buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' }
});
