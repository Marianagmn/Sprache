import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ActivityList from '../components/activities/ActivityList';
import ScreenHeader from '../components/common/ScreenHeader';
import ActivityFilter from '../components/activities/ActivityFilter';
import { colors } from '../theme';


export default function ActivitiesScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const handleActivityPress = (activity) => {
    navigation.navigate('Lesson', { activityId: activity.id });
  };

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
        <ActivityFilter activeFilter={activeFilter} onChange={setActiveFilter} />
        <ActivityList category={activeFilter} onActivityPress={handleActivityPress} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  headerSubtitle: { fontSize: 16, color: '#6B7280', marginBottom: 24 },
});