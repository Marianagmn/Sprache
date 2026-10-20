import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MASCOT_ACCESSORIES } from '../../services/mascotRewardsService';
import MascotAvatar from './MascotAvatar';
import AppButton from '../common/AppButton';
import MotionPressable from '../common/MotionPressable';
import { colors, radii, spacing, typography } from '../../theme';

const SLOT_LABELS = {
  head: 'Gorros',
  eyes: 'Gafas',
  shirt: 'Camisetas',
  neck: 'Pañuelos',
  back: 'Mochilas',
  charm: 'Otros detalles',
};

export default function MascotCustomization({
  totalLearningDays = 0,
  longestStreak = 0,
  currentStreak = 0,
  mascot = {},
  reduceMotion = false,
  onSelectAccessory,
  onDismissReward,
}) {
  const [saveError, setSaveError] = useState('');
  const scale = useRef(new Animated.Value(1)).current;
  const unlockedIds = new Set(mascot.unlockedAccessoryIds || []);
  const selected = mascot.selectedAccessories || {};
  const newRewards = MASCOT_ACCESSORIES.filter((item) => (
    (mascot.newlyUnlockedAccessoryIds || []).includes(item.id)
  ));

  useEffect(() => {
    if (!newRewards.length || reduceMotion) return;
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.08, speed: 20, useNativeDriver: false }),
      Animated.spring(scale, { toValue: 1, speed: 20, useNativeDriver: false }),
    ]).start();
  }, [newRewards.length, reduceMotion, scale]);

  const updateAccessory = async (slot, accessoryId) => {
    setSaveError('');
    try {
      await onSelectAccessory(slot, accessoryId);
    } catch (error) {
      console.error('No se pudo guardar la personalización de la mascota.', error);
      setSaveError('No se pudo guardar el accesorio. Inténtalo de nuevo.');
    }
  };

  const dismissReward = async () => {
    setSaveError('');
    try {
      await onDismissReward();
    } catch (error) {
      console.error('No se pudo guardar la notificación de recompensa.', error);
      setSaveError('No se pudo guardar este aviso. Puedes volver a intentarlo.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title} accessibilityRole="header">Mascota</Text>
      <Text style={styles.description}>
        Cada racha te ayuda a descubrir accesorios. Los que desbloquees se quedan en tu colección; descansar no te los quita.
      </Text>

      <View style={styles.mascotStage}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <MascotAvatar mascot={mascot} />
        </Animated.View>
        <Text style={styles.mascotCaption}>¡Aquí para acompañarte a tu ritmo!</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{currentStreak}</Text>
          <Text style={styles.statLabel}>Racha actual</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalLearningDays}</Text>
          <Text style={styles.statLabel}>Días aprendidos</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{longestStreak}</Text>
          <Text style={styles.statLabel}>Mejor racha</Text>
        </View>
      </View>

      {newRewards.length > 0 && (
        <View style={styles.rewardNotice} accessibilityLiveRegion="polite">
          <Text style={styles.rewardTitle}>¡Un detalle nuevo para el osito!</Text>
          <Text style={styles.rewardText}>
            {newRewards.map((item) => `${item.emoji} ${item.label}`).join(' · ')} ya está en tu colección. ¡Gracias por dedicarte este tiempo!
          </Text>
          <AppButton title="¡Qué bien!" onPress={dismissReward} style={styles.noticeButton} />
        </View>
      )}

      <Text style={styles.sectionTitle}>Personaliza al osito</Text>
      {Object.entries(SLOT_LABELS).map(([slot, label]) => {
        const accessories = MASCOT_ACCESSORIES.filter((item) => item.slot === slot);
        const selectedId = selected[slot] || null;
        return (
          <View key={slot} style={styles.slot}>
            <Text style={styles.slotTitle}>{label}</Text>
            <View style={styles.options}>
              <MotionPressable
                onPress={() => updateAccessory(slot, null)}
                style={[styles.option, selectedId === null && styles.selectedOption]}
                accessibilityRole="button"
                accessibilityLabel={`${label}: sin accesorio`}
                accessibilityState={{ selected: selectedId === null }}
              >
                <Text style={styles.optionEmoji}>—</Text>
                <Text style={styles.optionText}>Ninguno</Text>
              </MotionPressable>
              {accessories.map((item) => {
                const unlocked = unlockedIds.has(item.id);
                return (
                  <MotionPressable
                    key={item.id}
                    onPress={() => unlocked && updateAccessory(slot, item.id)}
                    disabled={!unlocked}
                    style={[styles.option, selectedId === item.id && styles.selectedOption, !unlocked && styles.lockedOption]}
                    accessibilityRole="button"
                    accessibilityLabel={unlocked
                      ? `${item.label}, obtenido tras una racha de ${item.streakDays} ${item.streakDays === 1 ? 'día' : 'días'}`
                      : `${item.label}, disponible al alcanzar una racha de ${item.streakDays} ${item.streakDays === 1 ? 'día' : 'días'}`}
                    accessibilityState={{ selected: selectedId === item.id, disabled: !unlocked }}
                  >
                    <Text style={styles.optionEmoji}>{unlocked ? item.emoji : '🔒'}</Text>
                    <Text style={styles.optionText}>{item.label}</Text>
                    <Text style={styles.milestone}>
                      {unlocked ? 'En tu colección' : `${item.streakDays} ${item.streakDays === 1 ? 'día seguido' : 'días seguidos'}`}
                    </Text>
                  </MotionPressable>
                );
              })}
            </View>
          </View>
        );
      })}

      <Text style={styles.restNote}>Cada día cuenta, y también está bien hacer pausas. Tu osito y todo lo que has conseguido te esperan cuando vuelvas.</Text>
      {!!saveError && <Text style={styles.error} accessibilityRole="alert">{saveError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl },
  title: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.bold, marginBottom: spacing.xs },
  description: { color: colors.muted, fontSize: typography.small, lineHeight: 21 },
  mascotStage: { alignItems: 'center', paddingVertical: spacing.lg },
  mascotCaption: { color: colors.muted, fontSize: typography.caption, marginTop: spacing.sm },
  stats: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: spacing.md, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  stat: { alignItems: 'center', paddingHorizontal: spacing.xs },
  statValue: { color: colors.black, fontSize: typography.subtitle, fontWeight: typography.bold },
  statLabel: { color: colors.muted, fontSize: typography.caption, textAlign: 'center', marginTop: spacing.xs },
  rewardNotice: { backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md, marginTop: spacing.md },
  rewardTitle: { color: colors.success, fontSize: typography.body, fontWeight: typography.bold },
  rewardText: { color: colors.text, fontSize: typography.small, lineHeight: 21, marginTop: spacing.xs },
  noticeButton: { marginTop: spacing.md },
  sectionTitle: { color: colors.black, fontSize: typography.body, fontWeight: typography.bold, marginTop: spacing.lg, marginBottom: spacing.md },
  slot: { marginBottom: spacing.md },
  slotTitle: { color: colors.black, fontSize: typography.small, fontWeight: typography.semibold, marginBottom: spacing.xs },
  options: { flexDirection: 'row', flexWrap: 'wrap' },
  option: { minWidth: 88, alignItems: 'center', padding: spacing.sm, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, marginRight: spacing.xs, marginBottom: spacing.xs },
  selectedOption: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  lockedOption: { opacity: 0.55 },
  optionEmoji: { color: colors.black, fontSize: 25 },
  optionText: { color: colors.text, fontSize: typography.caption, textAlign: 'center', marginTop: 2 },
  milestone: { color: colors.muted, fontSize: 10, textAlign: 'center', marginTop: 3 },
  restNote: { color: colors.muted, fontSize: typography.caption, lineHeight: 19, marginTop: spacing.sm },
  error: { color: colors.redText, fontSize: typography.small, marginTop: spacing.sm },
});
