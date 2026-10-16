import React, { useMemo, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/common/AppButton';
import AppInput from '../components/common/AppInput';
import BrandLogo from '../components/common/BrandLogo';
import { useApp } from '../context/AppContext';
import { colors, elevation, radii, spacing, typography } from '../theme';

const steps = [
  { id: 'profile', title: 'Datos básicos', description: 'Cuéntanos quién eres' },
  { id: 'level', title: 'Tu nivel', description: 'Qué tan familiarizado estás con el alemán' },
  { id: 'motivation', title: '¿Por qué aprendes?', description: 'Esto nos ayudará a personalizar tu camino' },
  { id: 'goal', title: 'Tu meta diaria', description: 'Define un ritmo realista y sostenible' },
];

const levelOptions = [
  { value: 'Principiante', description: 'Estoy empezando desde cero' },
  { value: 'Básico', description: 'Entiendo frases sencillas' },
  { value: 'Intermedio', description: 'Puedo mantener conversaciones' },
  { value: 'Avanzado', description: 'Quiero perfeccionar fluidez y precisión' },
];

const motivationOptions = [
  { value: 'Viajar', description: 'Quiero comunicarme al viajar' },
  { value: 'Trabajo', description: 'Me ayuda en mi carrera o negocio' },
  { value: 'Estudios', description: 'Necesito alemán para estudiar' },
  { value: 'Familia y personas', description: 'Quiero conectar con otras personas' },
  { value: 'Examen', description: 'Busco certificarme o aprobar un examen' },
];

const goalOptions = [
  { value: '5 min', description: 'Para mantener la constancia' },
  { value: '10 min', description: 'Ritmo equilibrado y sostenible' },
  { value: '20 min', description: 'Avance más intenso' },
  { value: '30 min', description: 'Sesión profunda y enfocada' },
];

export default function RegisterScreen({ navigation }) {
  const { registerUser } = useApp();
  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState('Básico');
  const [motivation, setMotivation] = useState('Viajar');
  const [time, setTime] = useState('10 min');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const remainingSteps = steps.length - (stepIndex + 1);

  const nameValid = name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
  const profileReady = nameValid && emailValid && passwordValid;

  const selectedLevel = levelOptions.find((option) => option.value === level) ?? levelOptions[1];
  const selectedMotivation = motivationOptions.find((option) => option.value === motivation) ?? motivationOptions[0];
  const selectedGoal = goalOptions.find((option) => option.value === time) ?? goalOptions[1];

  const stepSummary = useMemo(() => {
    if (stepIndex === 0) return name.trim() || 'Tu nombre';
    if (stepIndex === 1) return selectedLevel.value;
    if (stepIndex === 2) return selectedMotivation.value;
    return selectedGoal.value;
  }, [name, selectedLevel, selectedMotivation, selectedGoal, stepIndex]);

  const validateCurrentStep = () => {
    if (currentStep.id === 'profile') {
      if (!nameValid) {
        setError('Usa un nombre con al menos 2 letras.');
        return false;
      }

      if (!emailValid) {
        setError('Introduce un correo válido.');
        return false;
      }

      if (!passwordValid) {
        setError('La contraseña necesita 8+ caracteres, letras y números.');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    if (!isLastStep) {
      Keyboard.dismiss();
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
        motivation,
        dailyGoal: Number.parseInt(time, 10),
      });
      navigation.replace('MainApp');
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setLoading(false);
    }
  };

  const renderProfileFields = () => (
    <View>
      <Text style={styles.sectionTitle}>¿Cómo te llamas?</Text>
      <AppInput
        accessibilityLabel="Nombre"
        accessibilityHint="Escribe el nombre que aparecerá en tu perfil."
        placeholder="Ej. Mariana"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      {name.length > 0 && !nameValid && <Text style={styles.helper}>Necesita al menos 2 caracteres.</Text>}

      <Text style={styles.sectionTitle}>Correo electrónico</Text>
      <AppInput
        accessibilityLabel="Correo electrónico"
        accessibilityHint="Usaremos este correo para iniciar sesión."
        placeholder="tu@correo.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {email.length > 0 && !emailValid && <Text style={styles.helper}>Usa un formato de correo válido.</Text>}

      <Text style={styles.sectionTitle}>Contraseña</Text>
      <View style={styles.passwordFieldWrapper}>
        <AppInput
          accessibilityLabel="Contraseña"
          accessibilityHint="Debe tener al menos 8 caracteres, letras y números."
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          style={styles.togglePassword}
          onPress={() => setShowPassword((previous) => !previous)}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          accessibilityState={{ expanded: showPassword }}
          hitSlop={8}
        >
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.muted} />
        </TouchableOpacity>
      </View>

      {password.length > 0 && !passwordValid && (
        <Text style={styles.helper}>La contraseña debe tener al menos 8 caracteres, incluir letras y números.</Text>
      )}
      {password.length > 0 && passwordValid && <Text style={styles.successText}>Contraseña segura y válida.</Text>}
    </View>
  );

  const renderStepContent = () => {
    if (currentStep.id === 'profile') {
      return renderProfileFields();
    }

    if (currentStep.id === 'level') {
      return (
        <View>
          <Text style={styles.sectionTitle}>¿Qué nivel tienes ahora?</Text>
          <View style={styles.optionsGrid}>
            {levelOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionCard, level === option.value && styles.optionCardActive]}
                onPress={() => setLevel(option.value)}
                accessibilityRole="radio"
                accessibilityLabel={`${option.value}. ${option.description}`}
                accessibilityState={{ selected: level === option.value }}
              >
                <Text style={[styles.optionTitle, level === option.value && styles.optionTitleActive]}>{option.value}</Text>
                <Text style={[styles.optionDescription, level === option.value && styles.optionDescriptionActive]}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    if (currentStep.id === 'motivation') {
      return (
        <View>
          <Text style={styles.sectionTitle}>¿Para qué quieres aprender alemán?</Text>
          <View style={styles.optionsGrid}>
            {motivationOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionCard, motivation === option.value && styles.optionCardActive]}
                onPress={() => setMotivation(option.value)}
                accessibilityRole="radio"
                accessibilityLabel={`${option.value}. ${option.description}`}
                accessibilityState={{ selected: motivation === option.value }}
              >
                <Text style={[styles.optionTitle, motivation === option.value && styles.optionTitleActive]}>{option.value}</Text>
                <Text style={[styles.optionDescription, motivation === option.value && styles.optionDescriptionActive]}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.sectionTitle}>¿Cuánto quieres practicar hoy?</Text>
        <Text style={styles.helperText}>Un ritmo realista hace que puedas mantenerlo en el tiempo.</Text>
        <View style={styles.optionsGrid}>
          {goalOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.optionCard, time === option.value && styles.optionCardActive]}
              onPress={() => setTime(option.value)}
              accessibilityRole="radio"
              accessibilityLabel={`${option.value}. ${option.description}`}
              accessibilityState={{ selected: time === option.value }}
            >
              <Text style={[styles.optionTitle, time === option.value && styles.optionTitleActive]}>{option.value}</Text>
              <Text style={[styles.optionDescription, time === option.value && styles.optionDescriptionActive]}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (stepIndex === 0 ? navigation.goBack() : setStepIndex((previous) => previous - 1))}
          accessibilityRole="button"
          accessibilityLabel="Volver al paso anterior"
          hitSlop={8}
          style={styles.backControl}
        >
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <BrandLogo variant="tab" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.progressHeader}>
          <Text style={styles.stepLabel} accessibilityRole="header" accessibilityLiveRegion="polite">Paso {stepIndex + 1} de {steps.length}</Text>
          <Text style={styles.remainingText}>
            {remainingSteps > 0 ? `Faltan ${remainingSteps} pasos` : 'Todo listo'}
          </Text>
        </View>

        <View
          style={styles.progressTrack}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Progreso del registro"
          accessibilityValue={{ min: 0, max: 100, now: progress, text: `Paso ${stepIndex + 1} de ${steps.length}` }}
        >
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel} accessibilityRole="header">{currentStep.title}</Text>
          <Text style={styles.cardDescription}>{currentStep.description}</Text>
          <Text style={styles.summary}>{stepSummary}</Text>
        </View>

        {renderStepContent()}
      <View style={styles.footer}>
        {!!error && <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">{error}</Text>}
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
            disabled={currentStep.id === 'profile' && !profileReady}
            style={[styles.primaryButton, stepIndex === 0 && styles.fullWidthButton]}
          />
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardArea: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backControl: { minWidth: 44, minHeight: 44, alignItems: 'flex-start', justifyContent: 'center' },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 24 },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepLabel: { fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.2, color: colors.black, textTransform: 'uppercase' },
  remainingText: { fontSize: typography.small, color: colors.muted, fontWeight: typography.semibold },
  progressTrack: {
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.gold,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 18,
    marginBottom: 24,
    ...elevation.card,
  },
  cardLabel: { fontSize: typography.subtitle, fontWeight: typography.bold, color: colors.black, marginBottom: 6 },
  cardDescription: { fontSize: typography.small, color: colors.muted, marginBottom: spacing.md },
  summary: { fontSize: 15, color: colors.black, fontWeight: typography.semibold },
  sectionTitle: { fontSize: 18, fontWeight: typography.semibold, color: colors.black, marginBottom: spacing.md, marginTop: spacing.sm },
  helperText: { fontSize: 13, color: colors.muted, marginBottom: spacing.md },
  helper: { fontSize: typography.caption, color: colors.red, marginTop: -8, marginBottom: spacing.md },
  successText: { fontSize: typography.caption, color: colors.success, marginTop: -8, marginBottom: spacing.md },
  passwordFieldWrapper: { position: 'relative', marginBottom: 8 },
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
  optionsGrid: { gap: 10 },
  optionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 16,
    marginBottom: 10,
  },
  optionCardActive: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  optionTitleActive: { color: colors.black },
  optionDescription: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  optionDescriptionActive: { color: colors.black },
  footer: { paddingHorizontal: 20, paddingBottom: 20 },
  error: { color: colors.red, fontSize: typography.small, marginBottom: spacing.md },
  actions: { flexDirection: 'row', alignItems: 'center' },
  backButton: { flex: 0.9, marginRight: 12 },
  primaryButton: { flex: 1 },
  fullWidthButton: { flex: 1 },
});