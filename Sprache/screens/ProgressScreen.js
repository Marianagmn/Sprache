import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressScreen() {
  const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const activeDays = [true, true, true, true, false, false, false];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>Tu Progreso</Text>
        
        <View style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.levelText}>Nivel A2</Text>
            <Text style={styles.xpText}>320 / 500 XP</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Actividad semanal</Text>
        <View style={styles.weekContainer}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayCol}>
              <Text style={styles.dayLabel}>{day}</Text>
              <View style={[styles.dayDot, activeDays[index] ? styles.dotActive : styles.dotInactive]} />
            </View>
          ))}
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Ionicons name="flame" size={28} color="#F59E0B" />
            <Text style={styles.statValue}>4 días</Text>
            <Text style={styles.statLabel}>Racha actual</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="time" size={28} color="#1E3A8A" />
            <Text style={styles.statValue}>42 min</Text>
            <Text style={styles.statLabel}>Estudiados</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="school" size={28} color="#10B981" />
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>Palabras</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 24 },
  xpCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  levelText: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },
  xpText: { fontSize: 16, fontWeight: '600', color: '#6B7280' },
  progressBarBg: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5 },
  progressBarFill: { height: 10, width: '64%', backgroundColor: '#F59E0B', borderRadius: 5 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 },
  weekContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  dayCol: { alignItems: 'center' },
  dayLabel: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  dayDot: { width: 12, height: 12, borderRadius: 6 },
  dotActive: { backgroundColor: '#10B981' },
  dotInactive: { backgroundColor: '#E5E7EB' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { backgroundColor: '#FFFFFF', flex: 1, padding: 16, borderRadius: 16, alignItems: 'center', marginHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 }
});