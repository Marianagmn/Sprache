import React, { useState } from 'react';
import { Alert, Modal, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { useApp } from '../context/AppContext';
import AppButton from '../components/common/AppButton';
import ProfileHeader from '../components/profile/ProfileHeader';
import GoalCard from '../components/profile/GoalCard';
import ProfileStats from '../components/profile/ProfileStats';
import SettingsSection from '../components/profile/SettingsSection';
import SettingsRow from '../components/profile/SettingsRow';

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
        
        <ProfileHeader name={user.name} level={user.level} motivation={user.motivation} />

        <GoalCard dailyGoal={user.dailyGoal} onGoalChange={handleGoalChange} />

        <ProfileStats
          stats={[
            { iconName: 'flame', color: '#F59E0B', value: `${user.streak} días`, label: 'Racha' },
            { iconName: 'time', color: '#1E3A8A', value: `${user.studiedMinutes} min`, label: 'Estudiados' },
            { iconName: 'school', color: '#10B981', value: `${user.learnedWords}`, label: 'Palabras' },
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
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  modalBackdrop: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(17, 24, 39, 0.45)' },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 22 },
  modalTitle: { color: '#111827', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  nameInput: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 16 },
  modalButton: { marginBottom: 8 },
});