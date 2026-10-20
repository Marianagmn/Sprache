import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useReduceMotion } from '../../context/MotionPreferencesContext';
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
	const reduceMotion = useReduceMotion();
	const animatedProgress = useRef(new Animated.Value(progressPercentage)).current;

	useEffect(() => {
		animatedProgress.stopAnimation();
		if (reduceMotion) {
			animatedProgress.setValue(progressPercentage);
			return undefined;
		}

		const animation = Animated.timing(animatedProgress, {
			toValue: progressPercentage,
			duration: 220,
			useNativeDriver: false,
		});
		animation.start();
		return () => animation.stop();
	}, [animatedProgress, progressPercentage, reduceMotion]);

	return (
		<View
			style={[styles.background, { backgroundColor, height, borderRadius: height / 2 }, style]}
			accessible
			accessibilityRole="progressbar"
			accessibilityLabel={accessibilityLabel}
			accessibilityValue={accessibilityValue || { min: 0, max: 100, now: progressPercentage, text: `${Math.round(progressPercentage)} por ciento` }}
		>
			<Animated.View
				style={[
					styles.fill,
					{
						backgroundColor: color,
						width: animatedProgress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
						borderRadius: height / 2,
					}
				]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	background: { overflow: 'hidden', width: '100%' },
	fill: { height: '100%' }
});
