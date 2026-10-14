import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function HintButton({ visible, hint, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8} accessibilityRole="button">
      <Ionicons name="bulb-outline" size={18} color="#D97706" />
      <Text style={styles.label}>{visible ? hint : 'Necesito una pista'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 8, marginBottom: 12 },
  label: { color: '#B45309', fontSize: 14, fontWeight: '700', marginLeft: 7 },
});
