import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressBar from '../common/ProgressBar';

export default function LessonProgress({ current, total }) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>Progreso</Text>
        <Text style={styles.value}>{current}/{total}</Text>
      </View>
      <ProgressBar progress={progress} color="#10B981" height={7} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#6B7280', fontSize: 13, fontWeight: '600' },
  value: { color: '#1E3A8A', fontSize: 13, fontWeight: '800' },
});
