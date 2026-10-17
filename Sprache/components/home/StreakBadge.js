import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../theme';

export default function StreakBadge({ days = 0 }) {
	return (
		<View style={styles.container} accessible accessibilityRole="text" accessibilityLabel={`Racha actual: ${days} ${days === 1 ? 'día' : 'días'}`}>
			<Ionicons accessible={false} name="flame" size={20} color={colors.red} />
			<Text style={styles.text} accessible={false}>{days}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.goldSoft, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill },
	text: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginLeft: 4 }
});
