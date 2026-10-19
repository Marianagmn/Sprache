import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function WriteResponse({ value, onChangeText, placeholder, answered, isCorrect }) {
  const borderColor = answered ? (isCorrect ? colors.success : colors.red) : colors.border;
  const backgroundColor = answered ? (isCorrect ? colors.successSoft : colors.redSoft) : colors.surface;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escribe tu respuesta:</Text>
      <TextInput
        style={[styles.input, { borderColor, backgroundColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        editable={!answered}
        multiline
        autoCapitalize="sentences"
        autoCorrect={true}
        accessibilityLabel="Campo de texto para respuesta escrita"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: { color: colors.text, fontSize: typography.body, fontWeight: typography.semibold, marginBottom: spacing.sm },
  input: {
    minHeight: 100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderRadius: radii.md,
    fontSize: typography.body,
    color: colors.black,
    textAlignVertical: 'top',
  },
});
