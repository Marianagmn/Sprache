import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ActivityList from '../components/activities/ActivityList';
import ScreenHeader from '../components/common/ScreenHeader';
import ActivityFilter from '../components/activities/ActivityFilter';


export default function ActivitiesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scroll}
      >
        <ScreenHeader 
          title="Actividades" 
          subtitle="¿Qué te gustaría practicar hoy?" 
        />
        <ActivityFilter />
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