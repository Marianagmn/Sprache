import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useReduceMotion } from '../../context/MotionPreferencesContext';

export default function MotionPressable({ style, children, ...props }) {
  const reduceMotion = useReduceMotion();

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        typeof style === 'function' ? style({ pressed }) : style,
        pressed && (reduceMotion ? styles.pressedWithoutMotion : styles.pressed),
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.92, transform: [{ scale: 0.98 }] },
  pressedWithoutMotion: { opacity: 0.82 },
});
