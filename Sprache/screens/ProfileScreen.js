import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import GoalCard from '../components/profile/GoalCard';
import ProfileStats from '../components/profile/ProfileStats';
import SettingsSection from '../components/profile/SettingsSection';
import SettingsRow from '../components/profile/SettingsRow';

export default function ProfileScreen({ navigation }) {
  const { user, logoutUser } = useApp();

  const handleLogout = async () => {
    await logoutUser();
    navigation.navigate('Start');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <ProfileHeader name={user.name} level={user.level} />

        <GoalCard />

        <ProfileStats
          stats={[
            { iconName: 'flame', color: '#F59E0B', value: `${user.streak} días`, label: 'Racha' },
            { iconName: 'time', color: '#1E3A8A', value: `${user.studiedMinutes} min`, label: 'Estudiados' },
            { iconName: 'school', color: '#10B981', value: `${user.learnedWords}`, label: 'Palabras' },
          ]}
        />

        <SettingsSection title="Preferencias">
          <SettingsRow iconName="notifications-outline" title="Notificaciones" />
          <SettingsRow iconName="language-outline" title="Idioma" />
          <SettingsRow iconName="color-palette-outline" title="Apariencia" />
        </SettingsSection>

        <SettingsSection title="Cuenta">
          <SettingsRow iconName="settings-outline" title="Configuración" />
          <SettingsRow iconName="log-out-outline" title="Cerrar sesión" danger onPress={handleLogout} />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
});