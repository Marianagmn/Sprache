import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import ActivityList from '../components/activities/ActivityList';
import ScreenHeader from '../components/common/ScreenHeader';
import ActivityFilter from '../components/activities/ActivityFilter';
import { colors } from '../theme';

export default function ActivitiesScreen({ navigation }) {
  const { user } = useApp();
  const [activeLevel, setActiveLevel] = useState(user.placementAssessment?.recommendedLevel || 'A1');

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
          subtitle="Elige un nivel y explora las lecciones por tema."
        />
        <ActivityFilter activeFilter={activeLevel} onChange={setActiveLevel} />
        <ActivityList levelCode={activeLevel} onActivityPress={handleActivityPress} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
});