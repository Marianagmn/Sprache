import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function AnswerOption({ label, selected, correct, incorrect, disabled, onPress }) {
  const stateStyle = correct ? styles.correct : incorrect ? styles.incorrect : selected ? styles.selected : null;
  const icon = correct ? 'checkmark-circle' : incorrect ? 'close-circle' : selected ? 'radio-button-on' : 'radio-button-off';
  const iconColor = correct ? colors.success : incorrect ? colors.red : selected ? colors.black : colors.muted;
  const statusLabel = correct ? 'Correcta' : incorrect ? 'Incorrecta' : null;
  const accessibilityLabel = [label, correct && 'respuesta correcta', incorrect && 'tu respuesta, incorrecta']
    .filter(Boolean)
    .join(', ');

  return (
    <TouchableOpacity style={[styles.option, stateStyle]} onPress={onPress} disabled={disabled} activeOpacity={0.8} accessibilityRole="radio" accessibilityLabel={accessibilityLabel} accessibilityState={{ selected, disabled }}>
      <Text style={[styles.label, (correct || incorrect) && styles.stateLabel]} accessible={false}>{label}</Text>
      <View style={styles.status}>
        <Ionicons accessible={false} name={icon} size={23} color={iconColor} />
        {!!statusLabel && <Text style={[styles.statusLabel, correct ? styles.correctLabel : styles.incorrectLabel]} accessible={false}>{statusLabel}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: { minHeight: 56, paddingHorizontal: 18, paddingVertical: 14, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  selected: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  correct: { borderColor: colors.success, backgroundColor: colors.successSoft },
  incorrect: { borderColor: colors.red, backgroundColor: colors.redSoft },
  label: { flex: 1, color: colors.text, fontSize: typography.body, fontWeight: typography.semibold },
  stateLabel: { color: colors.black },
  status: { flexDirection: 'row', alignItems: 'center', marginLeft: spacing.sm },
  statusLabel: { fontSize: typography.caption, fontWeight: typography.bold, marginLeft: spacing.xs },
  correctLabel: { color: colors.success },
  incorrectLabel: { color: colors.redText },
});
