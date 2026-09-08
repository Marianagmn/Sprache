import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading({ message = 'Cargando...', color = '#1E3A8A', size = 'large', style }) {
	return (
		<View style={[styles.container, style]}>
			<ActivityIndicator color={color} size={size} />
			{message && <Text style={styles.message}>{message}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { alignItems: 'center', justifyContent: 'center', padding: 24 },
	message: { color: '#6B7280', fontSize: 14, marginTop: 12 }
});
