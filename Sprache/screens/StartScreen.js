import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AppButton from '../components/common/AppButton';

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>S</Text>
        </View>

        <Text style={styles.title}>SPRACHE</Text>
        <Text style={styles.subtitle}>Aprende alemán en minutos cada día.</Text>

        <Text style={styles.description}>
          Combinamos vocabulario, lectura y gramática en lecciones cortas para que avances sin frustrarte y sigas tu progreso con facilidad.
        </Text>

        <View style={styles.benefits}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitDot}>•</Text>
            <Text style={styles.benefitText}>Lecciones rápidas</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitDot}>•</Text>
            <Text style={styles.benefitText}>Práctica real</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitDot}>•</Text>
            <Text style={styles.benefitText}>Progreso visible</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton
          title="Crear cuenta gratis"
          onPress={() => navigation.navigate('Register')}
          style={styles.primaryButton}
        />
        <AppButton
          title="Ya tengo una cuenta"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
          style={styles.secondaryButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#1E3A8A',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: { fontSize: 48, color: '#FFFFFF', fontWeight: 'bold' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  benefits: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  benefitDot: {
    fontSize: 20,
    color: '#10B981',
    marginRight: 10,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  footer: { paddingBottom: 20, width: '100%' },
  primaryButton: { marginBottom: 12 },
  secondaryButton: { paddingVertical: 16, alignItems: 'center' },
});