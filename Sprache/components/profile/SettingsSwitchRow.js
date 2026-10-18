import React from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export default function SettingsSwitchRow({ title, description, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {!!description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.gold }}
        thumbColor={colors.white}
        accessibilityLabel={title}
        accessibilityHint={description}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  copy: { flex: 1, marginRight: spacing.md },
  title: { color: colors.black, fontSize: typography.body, fontWeight: typography.medium },
  description: { color: colors.muted, fontSize: typography.caption, marginTop: spacing.xs },
});