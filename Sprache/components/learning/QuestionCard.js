import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function QuestionCard({ question, prompt }) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Traduce y aprende</Text>
      <Text style={styles.word}>{question}</Text>
      <Text style={styles.prompt}>{prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  eyebrow: { color: '#10B981', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 18 },
  word: { color: '#1E3A8A', fontSize: 30, fontWeight: '800', marginBottom: 12 },
  prompt: { color: '#374151', fontSize: 17, lineHeight: 24 },
});
