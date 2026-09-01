import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.title}>SPRACHE</Text>
        <Text style={styles.subtitle}>Aprende alemán a tu propio ritmo.</Text>
        <Text style={styles.description}>
          Practica de forma dinámica y construye una rutina que se adapte a ti.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.primaryButtonText}>Comenzar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Ya tengo una cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logoContainer: { width: 100, height: 100, backgroundColor: '#1E3A8A', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  logoText: { fontSize: 48, color: '#FFFFFF', fontWeight: 'bold' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#1E3A8A', textAlign: 'center', marginBottom: 12 },
  description: { fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 24 },
  footer: { paddingBottom: 20 },
  primaryButton: { backgroundColor: '#1E3A8A', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  secondaryButton: { paddingVertical: 16, alignItems: 'center' },
  secondaryButtonText: { color: '#1E3A8A', fontSize: 16, fontWeight: '600' }
});