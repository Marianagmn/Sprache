import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function FeedbackMessage({ correct, message }) {
  return (
    <View
      style={[styles.container, correct ? styles.success : styles.error]}
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
    </View>
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
