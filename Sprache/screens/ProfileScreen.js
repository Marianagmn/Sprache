import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ProfileHeader from '../components/profile/ProfileHeader';
import GoalCard from '../components/profile/GoalCard';
import SettingsSection from '../components/profile/SettingsSection';
import SettingsRow from '../components/profile/SettingsRow';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <ProfileHeader name="Mariana" level="Nivel A2" />

        <GoalCard />

        <SettingsSection title="Preferencias">
          <SettingsRow iconName="notifications-outline" title="Notificaciones" />
          <SettingsRow iconName="language-outline" title="Idioma" />
          <SettingsRow iconName="color-palette-outline" title="Apariencia" />
        </SettingsSection>

        <SettingsSection title="Cuenta">
          <SettingsRow iconName="settings-outline" title="Configuración" />
          <SettingsRow iconName="log-out-outline" title="Cerrar sesión" danger onPress={() => navigation.navigate('Start')} />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
});