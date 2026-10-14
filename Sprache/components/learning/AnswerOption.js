import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AnswerOption({ label, selected, correct, incorrect, disabled, onPress }) {
  const stateStyle = correct ? styles.correct : incorrect ? styles.incorrect : selected ? styles.selected : null;
  const icon = correct ? 'checkmark-circle' : incorrect ? 'close-circle' : selected ? 'radio-button-on' : 'radio-button-off';
  const iconColor = correct ? '#047857' : incorrect ? '#B91C1C' : selected ? '#1E3A8A' : '#9CA3AF';

  return (
    <TouchableOpacity style={[styles.option, stateStyle]} onPress={onPress} disabled={disabled} activeOpacity={0.8} accessibilityRole="radio" accessibilityState={{ selected, disabled }}>
      <Text style={[styles.label, (correct || incorrect) && styles.stateLabel]}>{label}</Text>
      <Ionicons name={icon} size={23} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: { minHeight: 56, paddingHorizontal: 18, paddingVertical: 14, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  selected: { borderColor: '#1E3A8A', backgroundColor: '#EFF6FF' },
  correct: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  incorrect: { borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
  label: { color: '#374151', fontSize: 16, fontWeight: '600' },
  stateLabel: { color: '#111827' },
});
