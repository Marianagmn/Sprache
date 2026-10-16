import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../theme';

export default function HintButton({ visible, hint, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={visible ? `Pista: ${hint}` : 'Mostrar pista'}
      accessibilityState={{ expanded: visible }}
    >
      <Ionicons name="bulb-outline" size={18} color={colors.black} />
      <Text style={styles.label}>{visible ? hint : 'Necesito una pista'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 8, marginBottom: 12 },
  label: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold, marginLeft: 7 },
});
