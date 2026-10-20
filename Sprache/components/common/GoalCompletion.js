import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useReduceMotion } from '../../context/MotionPreferencesContext';
import { colors, spacing, typography } from '../../theme';

export default function GoalCompletion({ completed, message, color = colors.success }) {
  const reduceMotion = useReduceMotion();
  const wasCompleted = useRef(completed);
  const iconScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    iconScale.stopAnimation();
    if (!completed || wasCompleted.current || reduceMotion) {
      iconScale.setValue(1);
      wasCompleted.current = completed;
      return undefined;
    }

    wasCompleted.current = true;
    iconScale.setValue(0.75);
    const animation = Animated.spring(iconScale, {
      toValue: 1,
      speed: 22,
      bounciness: 3,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [completed, iconScale, reduceMotion]);

  if (!completed) return null;

  return (
    <View style={styles.container} accessibilityRole="summary" accessibilityLiveRegion="polite">
      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        <Ionicons accessible={false} name="checkmark-circle" size={18} color={color} />
      </Animated.View>
      <Text style={[styles.message, { color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm },
  message: { fontSize: typography.caption, fontWeight: typography.semibold, marginLeft: spacing.xs },
});
