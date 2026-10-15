import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/common/AppButton';
import AppInput from '../components/common/AppInput';
import { useApp } from '../context/AppContext';

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
      navigation.replace('MainApp');
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerCard}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.title}>Qué bueno verte</Text>
          <Text style={styles.subtitle}>Continúa tu rutina de alemán.</Text>
        </View>

        <View style={styles.noticeBox}>
          <Ionicons name="information-circle-outline" size={18} color="#1E3A8A" style={styles.noticeIcon} />
          <Text style={styles.localNotice}>
            Esta demo guarda tu cuenta y progreso solo en este dispositivo.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <AppInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordFieldWrapper}>
            <AppInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.togglePassword}
              onPress={() => setShowPassword((previous) => !previous)}
              accessibilityRole="button"
            >
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {!!error && <Text style={styles.error}>{error}</Text>}

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    width: 74,
    height: 74,
    backgroundColor: '#1E3A8A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: { fontSize: 36, color: '#FFFFFF', fontWeight: 'bold' },
  title: { color: '#111827', fontSize: 28, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#6B7280', fontSize: 16, fontWeight: '500', textAlign: 'center' },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  noticeIcon: { marginRight: 8 },
  localNotice: { flex: 1, color: '#374151', fontSize: 13, lineHeight: 18 },
  form: { width: '100%' },
  label: { color: '#374151', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  passwordFieldWrapper: { position: 'relative' },
  passwordInput: { paddingRight: 46 },
  togglePassword: {
    position: 'absolute',
    right: 12,
    top: 14,
    padding: 4,
  },
  error: { color: '#B91C1C', fontSize: 14, marginTop: 8, marginBottom: 12 },
  button: { marginTop: 8, marginBottom: 8 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  secondaryButton: { marginTop: 4 },
});
