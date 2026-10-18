import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';

export default function FillBlanks({ sentence, blankIndex, value, onChangeText, answered, isCorrect, correctAnswer }) {
  const parts = sentence.split('___');
  const blankBorderColor = answered ? (isCorrect ? colors.success : colors.red) : colors.gold;
  const blankBackgroundColor = answered ? (isCorrect ? colors.successSoft : colors.redSoft) : colors.goldSoft;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Completa la frase:</Text>
      <View style={styles.sentence}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text style={styles.text}>{part}</Text>
            {index < parts.length - 1 && (
              <TextInput
                style={[styles.blank, { borderColor: blankBorderColor, backgroundColor: blankBackgroundColor }]}
                value={index === blankIndex ? value : ''}
                onChangeText={index === blankIndex ? onChangeText : undefined}
                placeholder="..."
                placeholderTextColor={colors.muted}
                editable={!answered && index === blankIndex}
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel={`Espacio en blanco ${index + 1}`}
              />
            )}
          </React.Fragment>
        ))}
      </View>
      {answered && !isCorrect && (
        <Text style={styles.correctAnswer}>Respuesta correcta: {correctAnswer}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: { color: colors.text, fontSize: typography.body, fontWeight: typography.semibold, marginBottom: spacing.sm },
  sentence: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginVertical: spacing.md },
  text: { color: colors.black, fontSize: 18, lineHeight: 28 },
  blank: {
    minWidth: 80,
    height: 36,
    paddingHorizontal: spacing.sm,
    marginHorizontal: spacing.xs,
    borderWidth: 2,
    borderRadius: radii.sm,
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
  },
  correctAnswer: { color: colors.success, fontSize: typography.small, fontWeight: typography.semibold, marginTop: spacing.sm },
});
