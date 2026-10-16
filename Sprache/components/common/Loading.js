import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export default function Loading({ message = 'Cargando...', color = colors.gold, size = 'large', style }) {
	return (
		<View style={[styles.container, style]}>
			<ActivityIndicator color={color} size={size} />
			{message && <Text style={styles.message}>{message}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { alignItems: 'center', justifyContent: 'center', padding: 24 },
	message: { color: colors.muted, fontSize: typography.small, marginTop: spacing.md }
});
