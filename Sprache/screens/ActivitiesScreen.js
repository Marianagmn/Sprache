import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ActivityList from '../components/activities/ActivityList';

export default function ActivitiesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>Actividades</Text>
        <Text style={styles.headerSubtitle}>¿Qué te gustaría practicar hoy?</Text>

        <ActivityList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  headerSubtitle: { fontSize: 16, color: '#6B7280', marginBottom: 24 },
});