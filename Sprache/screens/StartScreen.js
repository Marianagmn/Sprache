import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AppButton from '../components/common/AppButton';
import BrandLogo from '../components/common/BrandLogo';
import { colors, elevation, radii, spacing, typography } from '../theme';

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandCard}>
          <BrandLogo variant="splash" style={styles.brandLogo} />
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
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  brandCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    marginBottom: 18,
    ...elevation.card,
  },
  brandLogo: { marginBottom: spacing.md },
  subtitle: {
    fontSize: typography.subtitle,
    fontWeight: typography.semibold,
    color: colors.black,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.body,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 360,
    marginBottom: 20,
  },
  benefits: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
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
    color: colors.red,
    marginRight: 8,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  footer: { paddingHorizontal: 20, paddingBottom: 20, width: '100%' },
  primaryButton: { marginBottom: 12 },
  secondaryButton: { paddingVertical: 16, alignItems: 'center' },
});