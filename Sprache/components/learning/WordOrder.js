import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';

export default function WordOrder({ words, orderedWords, onWordPress, onReset, answered, isCorrect }) {
  const unplacedWords = words.filter((word) => !orderedWords.includes(word));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ordena las palabras para formar la frase:</Text>
      <View style={styles.answerArea}>
        {orderedWords.length === 0 ? (
          <Text style={styles.placeholder}>Toca las palabras para ordenarlas</Text>
        ) : (
          orderedWords.map((word, index) => (
            <TouchableOpacity
              key={`${word}-${index}`}
              style={[styles.word, styles.placedWord]}
              onPress={() => onWordPress(word)}
              disabled={answered}
            >
              <Text style={styles.wordText}>{word}</Text>
              <Ionicons name="close-circle" size={16} color={colors.muted} />
            </TouchableOpacity>
          ))
        )}
      </View>
      <View style={styles.wordBank}>
        {unplacedWords.map((word) => (
          <TouchableOpacity
            key={word}
            style={[styles.word, styles.bankWord]}
            onPress={() => onWordPress(word)}
            disabled={answered}
          >
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {!answered && orderedWords.length > 0 && (
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetText}>Reiniciar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: { color: colors.text, fontSize: typography.body, fontWeight: typography.semibold, marginBottom: spacing.sm },
  answerArea: {
    minHeight: 60,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: radii.md,
    backgroundColor: colors.goldSoft,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  placeholder: { color: colors.muted, fontSize: typography.small, fontStyle: 'italic' },
  wordBank: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  word: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    margin: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placedWord: { backgroundColor: colors.goldSoft, borderColor: colors.gold },
  bankWord: { backgroundColor: colors.surface },
  wordText: { color: colors.black, fontSize: 15, fontWeight: typography.semibold, marginRight: spacing.xs },
  resetButton: { alignSelf: 'flex-start', marginBottom: spacing.sm },
  resetText: { color: colors.redText, fontSize: typography.small, fontWeight: typography.semibold },
});
