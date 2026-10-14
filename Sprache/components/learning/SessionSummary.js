import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../common/AppButton';

export default function SessionSummary({ correctAnswers, totalQuestions, onFinish }) {
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="trophy" size={42} color="#D97706" />
      </View>
      <Text style={styles.title}>Sesión completada</Text>
      <Text style={styles.subtitle}>Has practicado vocabulario y sumado una nueva sesión a tu progreso.</Text>
      <View style={styles.score}>
        <Text style={styles.scoreValue}>{percentage}%</Text>
        <Text style={styles.scoreLabel}>{correctAnswers} de {totalQuestions} respuestas correctas</Text>
      </View>
      <AppButton title="Volver a actividades" onPress={onFinish} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconContainer: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { color: '#111827', fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
  subtitle: { color: '#6B7280', fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 320, marginBottom: 24 },
  score: { alignItems: 'center', marginBottom: 28 },
  scoreValue: { color: '#1E3A8A', fontSize: 38, fontWeight: '800' },
  scoreLabel: { color: '#4B5563', fontSize: 14, marginTop: 4 },
  button: { width: '100%' },
});
