import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function AnswerOption({ label, selected, correct, incorrect, disabled, onPress }) {
  const stateStyle = correct ? styles.correct : incorrect ? styles.incorrect : selected ? styles.selected : null;
  const icon = correct ? 'checkmark-circle' : incorrect ? 'close-circle' : selected ? 'radio-button-on' : 'radio-button-off';
  const iconColor = correct ? colors.success : incorrect ? colors.red : selected ? colors.black : colors.muted;

  return (
    <TouchableOpacity style={[styles.option, stateStyle]} onPress={onPress} disabled={disabled} activeOpacity={0.8} accessibilityRole="radio" accessibilityLabel={label} accessibilityState={{ selected, disabled }}>
      <Text style={[styles.label, (correct || incorrect) && styles.stateLabel]} accessible={false}>{label}</Text>
      <Ionicons accessible={false} name={icon} size={23} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: { minHeight: 56, paddingHorizontal: 18, paddingVertical: 14, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  selected: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  correct: { borderColor: colors.success, backgroundColor: colors.successSoft },
  incorrect: { borderColor: colors.red, backgroundColor: colors.redSoft },
  label: { color: colors.text, fontSize: typography.body, fontWeight: typography.semibold },
  stateLabel: { color: colors.black },
});
