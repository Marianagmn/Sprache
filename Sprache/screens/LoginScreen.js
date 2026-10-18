import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/common/AppButton';
import AppInput from '../components/common/AppInput';
import BrandLogo from '../components/common/BrandLogo';
import { useApp } from '../context/AppContext';
import { colors, elevation, radii, spacing, typography } from '../theme';

export default function LoginScreen({ navigation }) {
  const { loginUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await loginUser({ email, password });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
        <View style={styles.headerCard}>
          <BrandLogo variant="screen" style={styles.brandLogo} />
          <Text style={styles.title} accessibilityRole="header">Qué bueno verte</Text>
          <Text style={styles.subtitle}>Continúa tu rutina de alemán.</Text>
        </View>

        <View style={styles.noticeBox}>
          <Ionicons accessible={false} name="information-circle-outline" size={18} color={colors.black} style={styles.noticeIcon} />
          <Text style={styles.localNotice}>
            Esta demo guarda tu cuenta y progreso solo en este dispositivo.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <AppInput
            accessibilityLabel="Correo electrónico"
            accessibilityHint="Introduce el correo asociado a tu cuenta."
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordFieldWrapper}>
            <AppInput
              accessibilityLabel="Contraseña"
              accessibilityHint="Introduce la contraseña de tu cuenta."
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              returnKeyType="go"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity
              style={styles.togglePassword}
              onPress={() => setShowPassword((previous) => !previous)}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              accessibilityState={{ expanded: showPassword }}
              hitSlop={8}
            >
              <Ionicons accessible={false} name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.muted} />
            </TouchableOpacity>
          </View>

          {!!error && <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">{error}</Text>}

          <AppButton
            title="Iniciar sesión"
            onPress={handleLogin}
            loading={loading}
            disabled={!email.trim() || !password}
            style={styles.button}
          />

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <AppButton
            title="Crear una cuenta"
            variant="secondary"
            onPress={() => navigation.navigate('Register')}
            style={styles.secondaryButton}
          />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardArea: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    ...elevation.card,
  },
  brandLogo: { marginBottom: spacing.md },
  title: { color: colors.black, fontSize: typography.title, fontWeight: typography.heavy, marginBottom: 6 },
  subtitle: { color: colors.muted, fontSize: typography.body, fontWeight: typography.medium, textAlign: 'center' },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.goldSoft,
    borderRadius: radii.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  noticeIcon: { marginRight: 8 },
  localNotice: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 18 },
  form: { width: '100%' },
  label: { color: colors.text, fontSize: typography.small, fontWeight: typography.bold, marginBottom: spacing.sm },
  passwordFieldWrapper: { position: 'relative' },
  passwordInput: { paddingRight: 46 },
  togglePassword: {
    position: 'absolute',
    right: 12,
    top: 14,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { color: colors.red, fontSize: typography.small, marginTop: spacing.sm, marginBottom: spacing.md },
  button: { marginTop: 8, marginBottom: 8 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  secondaryButton: { marginTop: 4 },
});
