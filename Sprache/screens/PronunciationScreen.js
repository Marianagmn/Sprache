import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { readingLessons } from '../data/readingLessons';
import { theoryModules } from '../data/theoryModules';
import GermanAudioButton from '../components/learning/GermanAudioButton';
import ScreenHeader from '../components/common/ScreenHeader';
import { colors, radii, spacing, typography } from '../theme';

const levels = ['A1', 'A2', 'B1', 'B2'];

export default function PronunciationScreen() {
  const { user, saveLearningProgress } = useApp();
  const [level, setLevel] = useState('A1');
  const reading = readingLessons.find((lesson) => lesson.level === level);
  const module = theoryModules.filter((item) => item.level === level);
  const recordings = [
    { id: `${reading.id}-text`, text: reading.text, label: 'Lectura completa' },
    ...reading.vocabulary.map((item) => ({ id: `${reading.id}-${item.word}`, text: item.word, label: `${item.word} · ${item.meaning}` })),
    ...module.flatMap((item) => item.lessons.flatMap((lesson) => lesson.examples.map((example, index) => ({
      id: `${lesson.id}-example-${index}`,
      text: example.german,
      label: `${example.german} — ${example.spanish}`,
    })))),
  ];

  const markPlayed = (id) => {
    const playCount = user.learningProgress?.pronunciation?.[id]?.playCount || 0;
    void saveLearningProgress('pronunciation', id, {
      playCount: playCount + 1,
      lastPlayedAt: new Date().toISOString(),
    }).catch((error) => {
      console.error('No se pudo guardar el progreso de pronunciación.', error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Practica la pronunciación" subtitle="Voz alemana estándar (Alemania). Reproduce palabras, ejemplos y lecturas tantas veces como necesites." />
        <View style={styles.levels}>
          {levels.map((item) => (
            <TouchableOpacity key={item} onPress={() => setLevel(item)} style={[styles.level, item === level && styles.selectedLevel]} accessibilityRole="button" accessibilityState={{ selected: item === level }}>
              <Text style={[styles.levelText, item === level && styles.selectedLevelText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.notice}>
          <Text style={styles.noticeText}>El audio usa una voz de alemán (Alemania) instalada en tu dispositivo. Si no hay una disponible, no se mostrarán controles de reproducción.</Text>
        </View>
        {recordings.map((recording) => (
          <View key={recording.id} style={styles.recording}>
            <View style={styles.recordingText}>
              <Text style={styles.title}>{recording.label}</Text>
              {recording.label !== recording.text && <Text style={styles.german}>{recording.text}</Text>}
              <Text style={styles.count}>Reproducciones: {user.learningProgress?.pronunciation?.[recording.id]?.playCount || 0}</Text>
            </View>
            <GermanAudioButton
              text={recording.text}
              compact
              label={`Escuchar ${recording.text}`}
              onPlaybackStart={() => markPlayed(recording.id)}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl },
  levels: { flexDirection: 'row', marginBottom: spacing.md },
  level: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.pill, marginRight: spacing.sm },
  levelText: { color: colors.muted, fontSize: typography.small, fontWeight: typography.semibold },
  selectedLevel: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  selectedLevelText: { color: colors.black },
  notice: { padding: spacing.md, backgroundColor: colors.goldSoft, borderRadius: radii.md, marginBottom: spacing.md },
  noticeText: { color: colors.black, fontSize: typography.caption, lineHeight: 19 },
  recording: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  recordingText: { flex: 1, marginRight: spacing.sm },
  title: { color: colors.black, fontSize: typography.small, fontWeight: typography.semibold, lineHeight: 20 },
  german: { color: colors.text, fontSize: typography.caption, lineHeight: 18, marginTop: spacing.xs },
  count: { color: colors.muted, fontSize: typography.caption, marginTop: spacing.xs },
});
