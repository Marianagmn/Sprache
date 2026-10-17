import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme';

export default function ProgressBar({
	progress = 0,
	color = colors.gold,
	backgroundColor = colors.border,
	height = 8,
	accessibilityLabel = 'Progreso',
	accessibilityValue,
	style
}) {
	const progressPercentage = Math.min(Math.max(Number(progress) || 0, 0), 100);

	return (
		<View
			style={[styles.background, { backgroundColor, height, borderRadius: height / 2 }, style]}
			accessible
			accessibilityRole="progressbar"
			accessibilityLabel={accessibilityLabel}
			accessibilityValue={accessibilityValue || { min: 0, max: 100, now: progressPercentage, text: `${Math.round(progressPercentage)} por ciento` }}
		>
			<View
				style={[
					styles.fill,
					{ backgroundColor: color, width: `${progressPercentage}%`, borderRadius: height / 2 }
				]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	background: { overflow: 'hidden', width: '100%' },
	fill: { height: '100%' }
});
