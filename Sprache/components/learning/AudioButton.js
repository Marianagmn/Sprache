import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Speech from 'expo-speech';
import { colors, radii, spacing, typography } from '../../theme';

const SPEEDS = [
  { label: 'Lenta', rate: 0.75 },
  { label: 'Normal', rate: 1 },
  { label: 'Rápida', rate: 1.25 },
];
const REPETITIONS = [1, 2, 3];

function getSpeechErrorMessage(error) {
  const detail = typeof error?.message === 'string' ? error.message.trim() : '';
  return detail || 'El navegador o dispositivo no pudo generar una voz alemana.';
}

export default function AudioButton({ wordText, phraseText }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedText, setSelectedText] = useState('word');
  const [speed, setSpeed] = useState(1);
  const [repetitions, setRepetitions] = useState(1);
  const [speechError, setSpeechError] = useState('');
  const sequenceId = useRef(0);
  const hasPhrase = Boolean(phraseText && phraseText !== wordText);
  const text = selectedText === 'phrase' && hasPhrase ? phraseText : wordText;

  useEffect(() => () => {
    sequenceId.current += 1;
    Speech.stop().catch((error) => {
      console.error('No se pudo detener la pronunciación al cerrar la lección.', error);
    });
  }, []);

  const speakRepeatedly = (remaining, currentSequence, phrase, rate) => {
    Speech.speak(phrase, {
      language: 'de-DE',
      rate,
      onStart: () => setIsSpeaking(true),
      onDone: () => {
        if (sequenceId.current !== currentSequence) return;
        if (remaining > 1) {
          speakRepeatedly(remaining - 1, currentSequence, phrase, rate);
        } else {
          setIsSpeaking(false);
        }
      },
      onStopped: () => {
        if (sequenceId.current === currentSequence) {
          setIsSpeaking(false);
        }
      },
      onError: (error) => {
        sequenceId.current += 1;
        setIsSpeaking(false);
        setSpeechError(`No se pudo reproducir el audio. ${getSpeechErrorMessage(error)}`);
      },
    });
  };

  const handlePress = async () => {
    if (isSpeaking) {
      sequenceId.current += 1;
      setIsSpeaking(false);
      try {
        await Speech.stop();
      } catch (error) {
        setSpeechError(`No se pudo detener el audio. ${getSpeechErrorMessage(error)}`);
      }
      return;
    }

    if (!text) {
      setSpeechError('Esta palabra todavía no tiene texto para pronunciar.');
      return;
    }

    setSpeechError('');
    const currentSequence = sequenceId.current + 1;
    sequenceId.current = currentSequence;
    setIsSpeaking(true);

    try {
      await Speech.stop();
      if (sequenceId.current === currentSequence) {
        speakRepeatedly(repetitions, currentSequence, text, speed);
      }
    } catch (error) {
      setIsSpeaking(false);
      setSpeechError(`No se pudo iniciar el audio. ${getSpeechErrorMessage(error)}`);
    }
  };

  return (
    <View style={styles.container}>
      {hasPhrase && (
        <View style={styles.row}>
          {[
            { value: 'word', label: 'Palabra' },
            { value: 'phrase', label: 'Frase' },
          ].map((option) => {
            const selected = selectedText === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.choice, selected && styles.selectedChoice]}
                onPress={() => setSelectedText(option.value)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
              >
                <Text style={[styles.choiceLabel, selected && styles.selectedLabel]}>{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={isSpeaking ? 'Detener pronunciación' : `Escuchar ${selectedText === 'phrase' ? 'frase' : 'palabra'}`}
        accessibilityState={{ selected: isSpeaking }}
      >
        <Ionicons accessible={false} name={isSpeaking ? 'stop' : 'volume-medium'} size={18} color={colors.black} />
        <Text style={styles.playLabel}>{isSpeaking ? 'Detener' : `Escuchar ${selectedText === 'phrase' ? 'frase' : 'palabra'}`}</Text>
      </TouchableOpacity>
      <View style={styles.controls}>
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Velocidad</Text>
          <View style={styles.row}>
            {SPEEDS.map((option) => {
              const selected = speed === option.rate;
              return (
                <TouchableOpacity
                  key={option.rate}
                  style={[styles.smallChoice, selected && styles.selectedChoice]}
                  onPress={() => setSpeed(option.rate)}
                  accessibilityRole="radio"
                  accessibilityLabel={`Velocidad ${option.label.toLowerCase()}`}
                  accessibilityState={{ selected }}
                >
                  <Text style={[styles.smallChoiceLabel, selected && styles.selectedLabel]}>{option.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Repeticiones</Text>
          <View style={styles.row}>
            {REPETITIONS.map((count) => {
              const selected = repetitions === count;
              return (
                <TouchableOpacity
                  key={count}
                  style={[styles.smallChoice, selected && styles.selectedChoice]}
                  onPress={() => setRepetitions(count)}
                  accessibilityRole="radio"
                  accessibilityLabel={`${count} ${count === 1 ? 'repetición' : 'repeticiones'}`}
                  accessibilityState={{ selected }}
                >
                  <Text style={[styles.smallChoiceLabel, selected && styles.selectedLabel]}>{count}×</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      {!!speechError && <Text style={styles.error} accessibilityRole="alert">{speechError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: 'stretch', marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  choice: { minHeight: 36, justifyContent: 'center', paddingHorizontal: spacing.md, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm, marginBottom: spacing.sm },
  selectedChoice: { backgroundColor: colors.goldSoft, borderColor: colors.gold },
  choiceLabel: { color: colors.muted, fontSize: typography.small },
  selectedLabel: { color: colors.black, fontWeight: typography.semibold },
  playButton: { minHeight: 44, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.goldSoft },
  playLabel: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold, marginLeft: 7 },
  controls: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.md },
  controlGroup: { marginRight: spacing.xl, marginBottom: spacing.sm },
  controlLabel: { color: colors.muted, fontSize: typography.caption, marginBottom: spacing.xs },
  smallChoice: { minHeight: 36, minWidth: 44, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.sm, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, marginRight: spacing.xs },
  smallChoiceLabel: { color: colors.muted, fontSize: typography.caption },
  error: { color: colors.redText, fontSize: typography.small, marginTop: spacing.xs },
});
