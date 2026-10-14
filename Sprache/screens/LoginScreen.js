import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/common/AppButton';
import AppInput from '../components/common/AppInput';
import { useApp } from '../context/AppContext';

export default function LoginScreen({ navigation }) {
  const { loginUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <Text style={styles.title}>Qué bueno verte</Text>
        <Text style={styles.subtitle}>Continúa tu rutina de alemán.</Text>
        <Text style={styles.localNotice}>
          Esta demo guarda tu cuenta y progreso únicamente en este dispositivo. Si aún no tienes una cuenta, crea una primero.
        </Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <AppInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

        <Text style={styles.label}>Contraseña</Text>
        <AppInput value={password} onChangeText={setPassword} secureTextEntry />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <AppButton title="Iniciar sesión" onPress={handleLogin} loading={loading} disabled={!email.trim() || !password} style={styles.button} />
        <AppButton title="Crear una cuenta" variant="secondary" onPress={() => navigation.navigate('Register')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  content: { flex: 1, justifyContent: 'center' },
  title: { color: '#111827', fontSize: 30, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#6B7280', fontSize: 16, marginBottom: 32 },
  localNotice: { color: '#4B5563', fontSize: 14, lineHeight: 20, backgroundColor: '#EFF6FF', padding: 14, borderRadius: 12, marginBottom: 24 },
  label: { color: '#374151', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  error: { color: '#B91C1C', fontSize: 14, marginBottom: 16 },
  button: { marginTop: 8, marginBottom: 8 },
});
