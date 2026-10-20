import React, { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useReduceMotion } from '../../context/MotionPreferencesContext';
import { colors, radii, spacing, typography } from '../../theme';

export default function FeedbackMessage({ correct, message }) {
  const reduceMotion = useReduceMotion();
  const entrance = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    entrance.stopAnimation();
    if (reduceMotion) {
      entrance.setValue(1);
      return undefined;
    }

    entrance.setValue(0);
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 160,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [entrance, reduceMotion]);

  return (
    <Animated.View
      style={[
        styles.container,
        correct ? styles.success : styles.error,
        {
          opacity: entrance,
          transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [5, 0] }) }],
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Ionicons accessible={false} name={correct ? 'checkmark-circle' : 'information-circle'} size={22} color={correct ? colors.success : colors.redText} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: correct ? colors.success : colors.redText }]}>
          {correct ? '¡Bien hecho!' : 'Vamos a repasarlo'}
        </Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: radii.md, marginTop: 4, marginBottom: spacing.lg },
  success: { backgroundColor: colors.successSoft },
  error: { backgroundColor: colors.redSoft },
  textContainer: { flex: 1, marginLeft: 10 },
  title: { fontSize: 15, fontWeight: '800', marginBottom: 3 },
  message: { color: colors.muted, fontSize: typography.small, lineHeight: 20 },
});
