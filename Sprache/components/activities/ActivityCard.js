import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, elevation, radii, spacing } from '../../theme';

export default function ActivityCard({ 
    title, 
    description, 
    time, 
    iconName, 
    onPress 
}) {
    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={onPress} 
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`${title}. ${description}. Duración: ${time}`}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={iconName || 'play-outline'} size={24} color={colors.black} />
            </View>
            
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDesc}>{description}</Text>
            </View>
            
            <View style={styles.actionContainer}>
                <Text style={styles.timeText}>{time}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </View>
        </TouchableOpacity>
    );
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
    cardTitle: { 
        fontSize: 16, 
        fontWeight: '600', 
        color: colors.black,
        marginBottom: 4 
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