import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import BrandLogo from './BrandLogo';
import { colors, spacing, typography } from '../../theme';

export default function ScreenHeader({ title, subtitle, style, titleStyle, subtitleStyle }) {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.titleRow}>
				<Text style={[styles.title, titleStyle]} accessibilityRole="header">{title}</Text>
				<BrandLogo variant="tab" />
			</View>
			{subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: spacing.xl },
	titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	title: { flex: 1, fontSize: typography.title, fontWeight: typography.bold, color: colors.black, marginBottom: 4 },
	subtitle: { fontSize: typography.body, color: colors.muted }
});
