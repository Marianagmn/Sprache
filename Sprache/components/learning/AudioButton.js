import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AudioButton({ label = 'Escuchar pronunciación' }) {
  const [playing, setPlaying] = useState(false);

  const handlePress = () => {
    setPlaying((current) => !current);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel={label}>
      <Ionicons name={playing ? 'pause' : 'volume-medium'} size={18} color="#1E3A8A" />
      <Text style={styles.label}>{playing ? 'Reproduciendo...' : label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#EFF6FF', marginBottom: 20 },
  label: { color: '#1E3A8A', fontSize: 13, fontWeight: '700', marginLeft: 7 },
});
