import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function CelebrationNotice({ title, message, icon = 'sparkles' }) {
  return (
    <View style={styles.notice} accessibilityRole="summary" accessibilityLiveRegion="polite">
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color={colors.black} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.goldSoft, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.gold },
  iconWrap: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.gold, borderRadius: radii.pill, marginRight: spacing.md },
  copy: { flex: 1 },
  title: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold },
  message: { color: colors.text, fontSize: typography.caption, lineHeight: 18, marginTop: 2 },
});