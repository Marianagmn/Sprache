import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MotionPressable from '../common/MotionPressable';
import { colors, elevation, radii, spacing } from '../../theme';

export default function ActivityCard({
    title,
    description,
    time,
    iconName,
    levelCode,
    category,
    onPress
}) {
    return (
        <MotionPressable
            style={styles.card}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${title}. ${description}. Duración: ${time}. Nivel: ${levelCode}`}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={iconName || 'play-outline'} size={24} color={colors.black} />
            </View>

            <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    {levelCode && (
                        <View style={[styles.levelBadge, getLevelColor(levelCode)]}>
                            <Text style={styles.levelText}>{levelCode}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.cardDesc}>{description}</Text>
            </View>

            <View style={styles.actionContainer}>
                <Text style={styles.timeText}>{time}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </View>
        </MotionPressable>
    );
}

function getLevelColor(level) {
    switch (level) {
        case 'A1':
            return { backgroundColor: '#4CAF50' };
        case 'A2':
            return { backgroundColor: '#8BC34A' };
        case 'B1':
            return { backgroundColor: '#FF9800' };
        case 'B2':
            return { backgroundColor: '#FF5722' };
        default:
            return { backgroundColor: colors.gold };
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        ...elevation.card
    },
    iconContainer: {
        backgroundColor: colors.goldSoft,
        padding: 12,
        borderRadius: 12,
        marginRight: 16
    },
    textContainer: {
        flex: 1
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        marginRight: 8
    },
    levelBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    levelText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'white',
    },
    cardDesc: {
        fontSize: 14,
        color: colors.muted
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    timeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.black,
        marginRight: 4
    }
});