import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AppButton from '../components/common/AppButton';
import WelcomeHeader from '../components/home/WelcomeHeader';
import StreakBadge from '../components/home/StreakBadge';
import DailyGoalCard from '../components/home/DailyGoalCard';
import RecommendationCard from '../components/home/RecommendationCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <WelcomeHeader name="Mariana" level="Nivel A2" greeting="Guten Morgen">
          <StreakBadge days={4} />
        </WelcomeHeader>

        <DailyGoalCard completed={7} goal={10} unit="min" />

        <Text style={styles.sectionTitle}>Recomendado para ti</Text>
        <RecommendationCard
          title="Vocabulario"
          description="Repasa palabras que has aprendido recientemente."
          time="5 min"
        />

        <AppButton title="Continuar práctica" style={styles.mainActionBtn} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#111827', marginBottom: 16 },
  mainActionBtn: { marginTop: 0 }
});