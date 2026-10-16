import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../theme';

export default function SettingsRow({ iconName, title, onPress, danger = false }) {
	return (
		<TouchableOpacity style={[styles.row, !onPress && styles.disabledRow]} onPress={onPress} disabled={!onPress} accessibilityRole="button" accessibilityState={{ disabled: !onPress }}>
			<View style={styles.iconTitle}>
				<Ionicons name={iconName} size={20} color={danger ? colors.red : colors.muted} style={styles.icon} />
				<Text style={[styles.text, danger && styles.dangerText]}>{title}</Text>
			</View>
			{!danger && <Ionicons name="chevron-forward" size={20} color={colors.border} />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
	iconTitle: { flexDirection: 'row', alignItems: 'center' },
	icon: { marginRight: 12 },
	text: { fontSize: 16, color: colors.black, fontWeight: typography.medium },
	dangerText: { color: colors.red },
	disabledRow: { opacity: 0.55 }
});
