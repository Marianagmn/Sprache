import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LessonHeader({ title, currentQuestion, totalQuestions, onClose }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Cerrar lección">
        <Ionicons name="close" size={24} color="#111827" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.counter}>{currentQuestion} de {totalQuestions}</Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  closeButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  titleContainer: { alignItems: 'center' },
  title: { color: '#111827', fontSize: 17, fontWeight: '700' },
  counter: { color: '#6B7280', fontSize: 13, marginTop: 2 },
  placeholder: { width: 40 },
});
