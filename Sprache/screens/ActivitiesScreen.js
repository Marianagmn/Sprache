import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActivityCard = ({ title, description, time, iconName }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.iconContainer}>
      <Ionicons name={iconName} size={24} color="#1E3A8A" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{description}</Text>
    </View>
    <Text style={styles.timeText}>{time} →</Text>
  </TouchableOpacity>
);

export default function ActivitiesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>Actividades</Text>
        <Text style={styles.headerSubtitle}>¿Qué te gustaría practicar hoy?</Text>

        <ActivityCard 
          title="Vocabulario" 
          description="Amplía y repasa palabras." 
          time="5 min" 
          iconName="file-tray-stacked" 
        />
        <ActivityCard 
          title="Comprensión auditiva" 
          description="Entrena tu comprensión." 
          time="10 min" 
          iconName="headset" 
        />
        <ActivityCard 
          title="Pronunciación" 
          description="Practica sonidos." 
          time="5 min" 
          iconName="mic" 
        />
        <ActivityCard 
          title="Gramática" 
          description="Refuerza tus estructuras." 
          time="15 min" 
          iconName="construct" 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  headerSubtitle: { fontSize: 16, color: '#6B7280', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  iconContainer: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 12, marginRight: 16 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#6B7280' },
  timeText: { fontSize: 14, fontWeight: 'bold', color: '#10B981', marginLeft: 8 }
});