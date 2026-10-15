import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AppButton from '../components/common/AppButton';

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandCard}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.title}>SPRACHE</Text>
          <Text style={styles.subtitle}>Aprende alemán en minutos cada día.</Text>
        </View>

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
          title="Crear cuenta"
          onPress={() => navigation.navigate('Register')}
          style={styles.primaryButton}
        />
        <AppButton
          title="Iniciar sesión"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
          style={styles.secondaryButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  brandCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    width: 94,
    height: 94,
    backgroundColor: '#1E3A8A',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: { fontSize: 44, color: '#FFFFFF', fontWeight: 'bold' },
  title: { fontSize: 34, fontWeight: '800', color: '#111827', marginBottom: 8 },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 360,
    marginBottom: 20,
  },
  benefits: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
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
    marginRight: 8,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  footer: { paddingHorizontal: 20, paddingBottom: 20, width: '100%' },
  primaryButton: { marginBottom: 12 },
  secondaryButton: { paddingVertical: 16, alignItems: 'center' },
});