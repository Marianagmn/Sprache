import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressBar from '../common/ProgressBar';
import { colors } from '../../theme';

export default function LessonProgress({ current, total }) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View
      style={styles.container}
    >
      <View style={styles.labels}>
        <Text style={styles.label}>Progreso de la lección</Text>
        <Text style={styles.value} accessibilityLiveRegion="polite">Pregunta {current} de {total}</Text>
      </View>
      <ProgressBar
        progress={progress}
        color={colors.gold}
        height={7}
        accessibilityLabel="Progreso de la lección"
        accessibilityValue={{ min: 0, max: total, now: current, text: `Pregunta ${current} de ${total}` }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  value: { color: colors.black, fontSize: 13, fontWeight: '800' },
});
