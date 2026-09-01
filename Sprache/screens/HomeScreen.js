import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Guten Morgen, Mariana 👋</Text>
            <Text style={styles.level}>Nivel A2</Text>
          </View>
          <View style={styles.statsRow}>
            <Ionicons name="flame" size={20} color="#F59E0B" />
            <Text style={styles.streakText}>4</Text>
          </View>
        </View>

        <View style={styles.goalCard}>
          <Text style={styles.cardTitleWhite}>Tu objetivo de hoy</Text>
          <Text style={styles.goalText}>7 / 10 min</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.encouragementText}>¡Ya casi terminas!</Text>
        </View>

        <Text style={styles.sectionTitle}>Recomendado para ti</Text>
        <TouchableOpacity style={styles.recommendationCard}>
          <View style={styles.recommendationIcon}>
             <Ionicons name="library" size={24} color="#1E3A8A" />
          </View>
          <View style={styles.recommendationTextContainer}>
            <Text style={styles.recommendationTitle}>Vocabulario</Text>
            <Text style={styles.recommendationDesc}>Repasa palabras que has aprendido recientemente.</Text>
          </View>
          <Text style={styles.recommendationTime}>5 min →</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainActionBtn}>
          <Text style={styles.mainActionText}>Continuar práctica</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  level: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  streakText: { fontSize: 16, fontWeight: 'bold', color: '#D97706', marginLeft: 4 },
  goalCard: { backgroundColor: '#1E3A8A', padding: 20, borderRadius: 16, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardTitleWhite: { color: '#D1D5DB', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  goalText: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  progressBarBackground: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginBottom: 12 },
  progressBarFill: { height: 8, width: '70%', backgroundColor: '#10B981', borderRadius: 4 },
  encouragementText: { color: '#10B981', fontSize: 14, fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#111827', marginBottom: 16 },
  recommendationCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  recommendationIcon: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 12, marginRight: 16 },
  recommendationTextContainer: { flex: 1 },
  recommendationTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  recommendationDesc: { fontSize: 14, color: '#6B7280' },
  recommendationTime: { fontSize: 14, fontWeight: 'bold', color: '#1E3A8A', marginLeft: 8 },
  mainActionBtn: { backgroundColor: '#1E3A8A', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  mainActionText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' }
});