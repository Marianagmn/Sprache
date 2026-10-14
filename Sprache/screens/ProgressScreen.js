import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import LevelProgressCard from '../components/progress/LevelProgressCard';
import WeeklyActivity from '../components/progress/WeeklyActivity';
import ProgressStat from '../components/progress/ProgressStat';

export default function ProgressScreen() {
  const { user } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>Tu Progreso</Text>
        
        <LevelProgressCard />

        <Text style={styles.sectionTitle}>Actividad semanal</Text>
        <WeeklyActivity />

        <View style={styles.statsGrid}>
          <ProgressStat iconName="flame" color="#F59E0B" value={`${user.streak} días`} label="Racha actual" />
          <ProgressStat iconName="time" color="#1E3A8A" value={`${user.studiedMinutes} min`} label="Estudiados" />
          <ProgressStat iconName="school" color="#10B981" value={`${user.learnedWords}`} label="Palabras" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' }
});