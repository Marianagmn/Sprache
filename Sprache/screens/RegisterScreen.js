import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('A2');
  const [time, setTime] = useState('10 min');

  const levels = ['A1', 'A2', 'B1'];
  const times = ['5 min', '10 min', '20 min'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Crea tu perfil</Text>
        <Text style={styles.subtitle}>Empecemos a personalizar tu aprendizaje.</Text>

        <Text style={styles.sectionTitle}>¿Cómo te llamas?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. Mariana" 
          value={name} 
          onChangeText={setName} 
        />

        <Text style={styles.sectionTitle}>Nivel actual</Text>
        <View style={styles.row}>
          {levels.map(l => (
            <TouchableOpacity 
              key={l} 
              style={[styles.pill, level === l && styles.pillActive]}
              onPress={() => setLevel(l)}
            >
              <Text style={[styles.pillText, level === l && styles.pillTextActive]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Objetivo diario</Text>
        <View style={styles.row}>
          {times.map(t => (
            <TouchableOpacity 
              key={t} 
              style={[styles.pill, time === t && styles.pillActive]}
              onPress={() => setTime(t)}
            >
              <Text style={[styles.pillText, time === t && styles.pillTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('MainApp')}
        >
          <Text style={styles.primaryButtonText}>Crear perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 20 },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 12, marginTop: 16 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  pill: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
  pillActive: { backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' },
  pillText: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  pillTextActive: { color: '#FFFFFF' },
  footer: { padding: 20 },
  primaryButton: { backgroundColor: '#1E3A8A', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' }
});