import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingRow = ({ iconName, title }) => (
  <TouchableOpacity style={styles.settingRow}>
    <View style={styles.settingIconTitle}>
      <Ionicons name={iconName} size={20} color="#6B7280" style={styles.settingIcon} />
      <Text style={styles.settingText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.name}>Mariana</Text>
          <Text style={styles.level}>Nivel A2</Text>
        </View>

        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>Tu objetivo</Text>
          <Text style={styles.goalValue}>10 minutos al día</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🔥 Mantener una rutina</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.settingsGroup}>
          <SettingRow iconName="notifications-outline" title="Notificaciones" />
          <SettingRow iconName="language-outline" title="Idioma" />
          <SettingRow iconName="color-palette-outline" title="Apariencia" />
        </View>

        <Text style={styles.sectionTitle}>Cuenta</Text>
        <View style={styles.settingsGroup}>
          <SettingRow iconName="settings-outline" title="Configuración" />
          <TouchableOpacity 
            style={styles.settingRow} 
            onPress={() => navigation.navigate('Start')}
          >
            <View style={styles.settingIconTitle}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: '#EF4444' }]}>Cerrar sesión</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 24, marginTop: 16 },
  avatar: { width: 80, height: 80, backgroundColor: '#1E3A8A', borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, color: '#FFFFFF', fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  level: { fontSize: 16, color: '#6B7280', marginTop: 4 },
  goalCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  goalLabel: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  goalValue: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  badge: { backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#D97706', fontWeight: '600', fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12, marginLeft: 4 },
  settingsGroup: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 8, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  settingIconTitle: { flexDirection: 'row', alignItems: 'center' },
  settingIcon: { marginRight: 12 },
  settingText: { fontSize: 16, color: '#111827' }
});