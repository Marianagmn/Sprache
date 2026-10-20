import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MASCOT_ACCESSORIES } from '../../services/mascotRewardsService';
import { colors } from '../../theme';

const ACCESSORY_POSITIONS = {
  head: { top: '2%', left: '39%' },
  eyes: { top: '27%', left: '39%' },
  shirt: { top: '57%', left: '40%' },
  neck: { top: '50%', left: '61%' },
  back: { top: '45%', left: '11%' },
  charm: { top: '72%', left: '66%' },
};

export default function MascotAvatar({ mascot = {}, compact = false, style }) {
  const unlockedIds = new Set(mascot.unlockedAccessoryIds || []);
  const selected = mascot.selectedAccessories || {};
  const stageStyle = compact ? styles.compactStage : styles.stage;
  const bearStyle = compact ? styles.compactBear : styles.bear;
  const accessoryStyle = compact ? styles.compactAccessory : styles.accessory;

  return (
    <View style={[styles.stageBase, stageStyle, style]} accessibilityLabel="Osito Sprache de cuerpo completo">
      <Text style={[styles.bearBase, bearStyle]} accessible={false}>🧸</Text>
      {Object.entries(selected).map(([slot, accessoryId]) => {
        const item = MASCOT_ACCESSORIES.find((accessory) => accessory.id === accessoryId);
        if (!item || !unlockedIds.has(item.id)) return null;

        return (
          <Text
            key={slot}
            style={[styles.accessoryBase, accessoryStyle, ACCESSORY_POSITIONS[slot]]}
            accessible={false}
          >
            {item.emoji}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  stageBase: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.goldSoft,
    position: 'relative',
  },
  stage: { width: 168, height: 176, borderRadius: 84 },
  compactStage: { width: 68, height: 72, borderRadius: 36 },
  bearBase: { textAlign: 'center' },
  bear: { fontSize: 132, lineHeight: 154 },
  compactBear: { fontSize: 58, lineHeight: 68 },
  accessoryBase: { position: 'absolute', zIndex: 1 },
  accessory: { fontSize: 28 },
  compactAccessory: { fontSize: 15 },
});
