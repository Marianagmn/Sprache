import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function FeedbackMessage({ correct, message }) {
  return (
    <View style={[styles.container, correct ? styles.success : styles.error]}>
      <Ionicons name={correct ? 'checkmark-circle' : 'information-circle'} size={22} color={correct ? '#047857' : '#B91C1C'} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: correct ? '#047857' : '#B91C1C' }]}>{correct ? '¡Muy bien!' : 'Casi lo tienes'}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 12, marginTop: 4, marginBottom: 16 },
  success: { backgroundColor: '#ECFDF5' },
  error: { backgroundColor: '#FEF2F2' },
  textContainer: { flex: 1, marginLeft: 10 },
  title: { fontSize: 15, fontWeight: '800', marginBottom: 3 },
  message: { color: '#4B5563', fontSize: 14, lineHeight: 20 },
});
