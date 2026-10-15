import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/common/AppButton';
import AppInput from '../components/common/AppInput';
import { useApp } from '../context/AppContext';

const steps = [
  { id: 'profile', title: 'Datos básicos', description: 'Cuéntanos quién eres' },
  { id: 'level', title: 'Tu nivel', description: 'Elige tu punto de partida' },
  { id: 'goal', title: 'Meta diaria', description: 'Define tu ritmo ideal' },
];

const levels = ['A1', 'A2', 'B1'];
const times = ['5 min', '10 min', '20 min'];

export default function RegisterScreen({ navigation }) {
  const { registerUser } = useApp();
  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('A2');
  const [time, setTime] = useState('10 min');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const remainingSteps = steps.length - (stepIndex + 1);

  const stepSummary = useMemo(() => {
    if (stepIndex === 0) return name.trim() || 'Tu nombre';
    if (stepIndex === 1) return `Nivel ${level}`;
    return `Meta ${time}`;
  }, [name, level, time, stepIndex]);

  const validateCurrentStep = () => {
    if (currentStep.id === 'profile') {
      if (!name.trim()) {
        setError('Añade tu nombre para continuar.');
        return false;
      }

      if (!email.trim()) {
        setError('Ingresa tu correo electrónico.');
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Introduce un correo válido.');
        return false;
      }

      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    if (!isLastStep) {
      setStepIndex((previous) => previous + 1);
      return;
    }

    handleRegister();
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
        level,
        dailyGoal: Number.parseInt(time, 10),
      });
      navigation.replace('MainApp');
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    if (currentStep.id === 'profile') {
      return (
        <View>
          <Text style={styles.sectionTitle}>¿Cómo te llamas?</Text>
          <AppInput placeholder="Ej. Mariana" value={name} onChangeText={setName} />

          <Text style={styles.sectionTitle}>Correo electrónico</Text>
          <AppInput
            placeholder="tu@correo.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.sectionTitle}>Contraseña</Text>
          <AppInput
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      );
    }

    if (currentStep.id === 'level') {
      return (
        <View>
          <Text style={styles.sectionTitle}>¿Qué nivel tienes ahora?</Text>
          <View style={styles.row}>
            {levels.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.pill, level === option && styles.pillActive]}
                onPress={() => setLevel(option)}
              >
                <Text style={[styles.pillText, level === option && styles.pillTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.sectionTitle}>¿Cuánto quieres practicar hoy?</Text>
        <View style={styles.row}>
          {times.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.pill, time === option && styles.pillActive]}
              onPress={() => setTime(option)}
            >
              <Text style={[styles.pillText, time === option && styles.pillTextActive]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (stepIndex === 0 ? navigation.goBack() : setStepIndex((previous) => previous - 1))}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.progressHeader}>
          <Text style={styles.stepLabel}>Paso {stepIndex + 1} de {steps.length}</Text>
          <Text style={styles.remainingText}>
            {remainingSteps > 0 ? `Faltan ${remainingSteps} pasos` : 'Todo listo'}
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{currentStep.title}</Text>
          <Text style={styles.cardDescription}>{currentStep.description}</Text>
          <Text style={styles.summary}>{stepSummary}</Text>
        </View>

        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        {!!error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.actions}>
          {stepIndex > 0 && (
            <AppButton
              title="Atrás"
              variant="secondary"
              onPress={() => setStepIndex((previous) => previous - 1)}
              style={styles.backButton}
            />
          )}
          <AppButton
            title={isLastStep ? 'Crear perfil' : 'Continuar'}
            onPress={handleNextStep}
            loading={loading}
            style={[styles.primaryButton, stepIndex === 0 && styles.fullWidthButton]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1.2, color: '#1E3A8A', textTransform: 'uppercase' },
  remainingText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  progressTrack: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#1E3A8A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 6 },
  cardDescription: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  summary: { fontSize: 15, color: '#1E3A8A', fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 12, marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  pill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pillActive: { backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' },
  pillText: { fontSize: 16, color: '#6B7280', fontWeight: '600' },
  pillTextActive: { color: '#FFFFFF' },
  footer: { paddingHorizontal: 20, paddingBottom: 20 },
  error: { color: '#B91C1C', fontSize: 14, marginBottom: 12 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  backButton: { flex: 0.9, marginRight: 12 },
  primaryButton: { flex: 1 },
  fullWidthButton: { flex: 1 },
});