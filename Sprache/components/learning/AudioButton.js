import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function AudioButton({ label = 'Escuchar pronunciación' }) {
  const [playing, setPlaying] = useState(false);

  const handlePress = () => {
    setPlaying((current) => !current);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel={label}>
      <Ionicons name={playing ? 'pause' : 'volume-medium'} size={18} color={colors.black} />
      <Text style={styles.label}>{playing ? 'Reproduciendo...' : label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.goldSoft, marginBottom: spacing.xl },
  label: { color: colors.black, fontSize: 13, fontWeight: typography.bold, marginLeft: 7 },
});
