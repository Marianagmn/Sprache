import React, { useState } from 'react';
import { Alert, Modal, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { useApp } from '../context/AppContext';
import AppButton from '../components/common/AppButton';
import ProfileHeader from '../components/profile/ProfileHeader';
import BrandLogo from '../components/common/BrandLogo';
import GoalCard from '../components/profile/GoalCard';
import ProfileStats from '../components/profile/ProfileStats';
import SettingsSection from '../components/profile/SettingsSection';
import SettingsRow from '../components/profile/SettingsRow';
import { colors, radii, spacing, typography } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { user, editProfile, logoutUser, resetUserProgress } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const handleLogout = async () => {
    await logoutUser();
    navigation.navigate('Start');
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      return;
    }
    await editProfile({ name });
    setIsEditing(false);
  };

  const handleResetProgress = () => {
    Alert.alert('Reiniciar progreso', 'Se borrarán tus sesiones y estadísticas de este dispositivo. Tu perfil y objetivo diario se conservarán.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: resetUserProgress },
    ]);
  };

  const handleGoalChange = async (dailyGoal) => {
    await editProfile({ dailyGoal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.brandHeader}>
          <Text style={styles.brandTitle}>Tu Perfil</Text>
          <BrandLogo variant="tab" />
        </View>

        <ProfileHeader name={user.name} level={user.level} motivation={user.motivation} />

        <GoalCard dailyGoal={user.dailyGoal} onGoalChange={handleGoalChange} />

        <ProfileStats
          stats={[
            { iconName: 'flame', color: colors.red, value: `${user.streak} días`, label: 'Racha' },
            { iconName: 'time', color: colors.black, value: `${user.studiedMinutes} min`, label: 'Estudiados' },
            { iconName: 'school', color: colors.gold, value: `${user.learnedWords}`, label: 'Palabras' },
          ]}
        />

        <SettingsSection title="Ajustes de la cuenta">
          <SettingsRow iconName="person-outline" title="Editar nombre" onPress={() => { setName(user.name); setIsEditing(true); }} />
          <SettingsRow iconName="refresh-outline" title="Reiniciar progreso local" onPress={handleResetProgress} />
          <SettingsRow iconName="log-out-outline" title="Cerrar sesión" danger onPress={handleLogout} />
        </SettingsSection>
      </ScrollView>

      <Modal visible={isEditing} transparent animationType="fade" onRequestClose={() => setIsEditing(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Editar perfil</Text>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              autoCapitalize="words"
              accessibilityLabel="Nombre del perfil"
            />
            <AppButton title="Guardar" onPress={handleSaveProfile} disabled={!name.trim()} style={styles.modalButton} />
            <AppButton title="Cancelar" variant="secondary" onPress={() => setIsEditing(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  brandHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  brandTitle: { color: colors.black, fontSize: typography.title, fontWeight: typography.bold },
  modalBackdrop: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(0, 0, 0, 0.45)' },
  modalCard: { backgroundColor: colors.surface, borderRadius: radii.xl, padding: 22 },
  modalTitle: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.bold, marginBottom: spacing.lg },
  nameInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, padding: 14, fontSize: typography.body, color: colors.black, marginBottom: spacing.lg },
  modalButton: { marginBottom: spacing.sm },
});