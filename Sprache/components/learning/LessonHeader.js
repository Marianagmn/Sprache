import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BrandLogo from '../common/BrandLogo';
import { colors } from '../../theme';

export default function LessonHeader({ title, currentQuestion, totalQuestions, onClose }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Cerrar lección" hitSlop={4}>
        <Ionicons accessible={false} name="close" size={24} color={colors.black} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title} accessibilityRole="header">{title}</Text>
        <Text style={styles.counter} accessibilityLiveRegion="polite">Pregunta {currentQuestion} de {totalQuestions}</Text>
      </View>
      <BrandLogo variant="tab" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  closeButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  titleContainer: { flex: 1, alignItems: 'center', marginHorizontal: 8 },
  title: { color: colors.black, fontSize: 17, fontWeight: '700' },
  counter: { color: colors.muted, fontSize: 13, marginTop: 2 },
});
