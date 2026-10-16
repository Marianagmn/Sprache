import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BrandLogo from '../common/BrandLogo';
import { colors, spacing, typography } from '../../theme';

export default function WelcomeHeader({ name, level, motivation = '', greeting = 'Hola', children }) {
	return (
		<View style={styles.header}>
			<View style={styles.identity}>
				<BrandLogo variant="header" />
				<View style={styles.greetingContainer}>
					<Text style={styles.greeting}>{greeting}, {name} 👋</Text>
					<Text style={styles.meta}>{level}{motivation ? ` • ${motivation}` : ''}</Text>
				</View>
			</View>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
	identity: { flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: spacing.sm },
	greetingContainer: { flex: 1, marginLeft: spacing.sm },
	greeting: { fontSize: typography.subtitle, fontWeight: typography.bold, color: colors.black },
	meta: { fontSize: typography.small, color: colors.muted, marginTop: 4 }
});
