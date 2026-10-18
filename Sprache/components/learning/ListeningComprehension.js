import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

export default function ListeningComprehension({ scenario, questions, answered, selectedAnswer, onSelectAnswer, isCorrect }) {
  return (
    <View style={styles.container}>
      <View style={styles.scenarioCard}>
        <Ionicons name="headset" size={24} color={colors.gold} />
        <Text style={styles.scenarioTitle}>Escenario de escucha</Text>
        <Text style={styles.scenarioText}>{scenario}</Text>
        <Text style={styles.instruction}>Escucha el audio y responde a la pregunta</Text>
      </View>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionBlock}>
          <Text style={styles.questionText}>{question.text}</Text>
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            const isWrongSelection = answered && isSelected && !isCorrectOption;

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  isSelected && styles.selectedOption,
                  answered && isCorrectOption && styles.correctOption,
                  isWrongSelection && styles.incorrectOption,
                ]}
                onPress={() => !answered && onSelectAnswer(option)}
                disabled={answered}
              >
                <Text style={[
                  styles.optionText,
                  (isSelected || (answered && isCorrectOption)) && styles.selectedText,
                  isWrongSelection && styles.incorrectText,
                ]}>
                  {option}
                </Text>
                {answered && isCorrectOption && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                )}
                {isWrongSelection && (
                  <Ionicons name="close-circle" size={20} color={colors.red} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  scenarioCard: {
    backgroundColor: colors.goldSoft,
    padding: spacing.lg,
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  scenarioTitle: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold, marginTop: spacing.sm },
  scenarioText: { color: colors.text, fontSize: 16, marginTop: spacing.sm, textAlign: 'center' },
  instruction: { color: colors.muted, fontSize: typography.small, marginTop: spacing.sm, fontStyle: 'italic' },
  questionBlock: { marginBottom: spacing.lg },
  questionText: { color: colors.black, fontSize: 17, fontWeight: typography.semibold, marginBottom: spacing.md },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  selectedOption: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  correctOption: { borderColor: colors.success, backgroundColor: colors.successSoft },
  incorrectOption: { borderColor: colors.red, backgroundColor: colors.redSoft },
  optionText: { flex: 1, color: colors.text, fontSize: typography.body },
  selectedText: { color: colors.black, fontWeight: typography.semibold },
  incorrectText: { color: colors.redText },
});
