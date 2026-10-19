import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { colors, radii, spacing, typography } from '../../theme';

function getGermanVoice(voices) {
  return voices.find((voice) => voice.language?.replace('_', '-').toLowerCase() === 'de-de') || null;
}

export default function GermanAudioButton({ text, label = 'Escuchar', compact = false }) {
  const [voice, setVoice] = useState(null);
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const playbackId = useRef(0);

  useEffect(() => {
    let active = true;
    Speech.getAvailableVoicesAsync()
      .then((voices) => {
        if (active) setVoice(getGermanVoice(voices));
      })
      .catch((speechError) => {
        console.error('No se pudieron consultar las voces alemanas disponibles.', speechError);
        if (active) setError('No se pudo comprobar si hay una voz alemana estándar disponible.');
      })
      .finally(() => {
        if (active) setVoiceLoaded(true);
      });

    return () => {
      active = false;
      playbackId.current += 1;
      Speech.stop().catch((speechError) => {
        console.error('No se pudo detener la pronunciación al cerrar el audio.', speechError);
      });
    };
  }, []);

  const play = async () => {
    if (isSpeaking) {
      playbackId.current += 1;
      setIsSpeaking(false);
      try {
        await Speech.stop();
      } catch (speechError) {
        console.error('No se pudo detener la pronunciación alemana.', speechError);
        setError('No se pudo detener el audio. Inténtalo de nuevo.');
      }
      return;
    }

    if (!text?.trim() || !voice) return;
    setError('');
    const currentPlaybackId = playbackId.current + 1;
    playbackId.current = currentPlaybackId;

    try {
      await Speech.stop();
      if (playbackId.current !== currentPlaybackId) return;
      setIsSpeaking(true);
      Speech.speak(text, {
        language: 'de-DE',
        voice: voice.identifier,
        rate: 0.9,
        onDone: () => {
          if (playbackId.current === currentPlaybackId) setIsSpeaking(false);
        },
        onStopped: () => {
          if (playbackId.current === currentPlaybackId) setIsSpeaking(false);
        },
        onError: (speechError) => {
          if (playbackId.current === currentPlaybackId) {
            setIsSpeaking(false);
            console.error('No se pudo reproducir la pronunciación alemana.', speechError);
            setError('No se pudo reproducir el audio en este dispositivo.');
          }
        },
      });
    } catch (speechError) {
      console.error('No se pudo iniciar la pronunciación alemana.', speechError);
      setIsSpeaking(false);
      setError('No se pudo iniciar el audio en este dispositivo.');
    }
  };

  if (!voiceLoaded) return null;

  if (!voice) {
    return (
      <Text style={styles.unavailable} accessibilityRole="text">
        {error || 'Instala o activa una voz alemana (Alemania) para escuchar la pronunciación.'}
      </Text>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.button, compact && styles.compact]}
        onPress={play}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`${isSpeaking ? 'Detener' : label}: ${text}`}
        accessibilityState={{ selected: isSpeaking }}
      >
        <Ionicons accessible={false} name={isSpeaking ? 'stop' : 'volume-medium'} size={compact ? 16 : 18} color={colors.black} />
        {!compact && <Text style={styles.label}>{isSpeaking ? 'Detener' : label}</Text>}
      </TouchableOpacity>
      {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 44, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.goldSoft },
  compact: { minWidth: 36, minHeight: 36, justifyContent: 'center', paddingHorizontal: spacing.sm },
  label: { color: colors.black, fontSize: typography.small, fontWeight: typography.bold, marginLeft: spacing.xs },
  unavailable: { color: colors.muted, fontSize: typography.caption, lineHeight: 18, marginVertical: spacing.xs },
  error: { color: colors.redText, fontSize: typography.caption, marginTop: spacing.xs },
});
