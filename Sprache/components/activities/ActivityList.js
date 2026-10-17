import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ActivityCard from './ActivityCard';
import { filterActivitiesByLevel, getActivities } from '../../services/activityService';
import EmptyState from '../common/EmptyState';
import { colors, spacing, typography } from '../../theme';

export default function ActivityList({ onActivityPress, levelCode = 'Todos' }) {
    const activities = filterActivitiesByLevel(getActivities(), levelCode);
    const activitiesByLevel = activities.reduce((groups, activity) => {
        const level = activity.levelCode || 'Otros';
        groups[level] = groups[level] || {};
        const topic = activity.topic || 'Otros';
        groups[level][topic] = [...(groups[level][topic] || []), activity];
        return groups;
    }, {});
    const levelLabels = { A1: 'A1 · Inicial', A2: 'A2 · Elemental' };

    return (
        <View style={styles.container}>
            {activities.length === 0 ? (
                <EmptyState
                    title="No hay lecciones en este nivel"
                    message="Puedes elegir otro nivel para seguir explorando."
                />
            ) : Object.entries(activitiesByLevel).map(([level, topics]) => (
                <View key={level}>
                    {levelCode === 'Todos' && (
                        <Text style={styles.levelTitle} accessibilityRole="header">
                            {levelLabels[level] || level}
                        </Text>
                    )}
                    {Object.entries(topics).map(([topic, topicActivities]) => (
                        <View key={`${level}-${topic}`}>
                            <Text style={styles.topicTitle} accessibilityRole="header">{topic}</Text>
                            {topicActivities.map((activity) => (
                                <ActivityCard
                                    key={activity.id}
                                    title={activity.title}
                                    description={activity.description}
                                    time={activity.time}
                                    iconName={activity.iconName}
                                    onPress={() => onActivityPress?.(activity)}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: spacing.xl,
    },
    levelTitle: {
        color: colors.black,
        fontSize: typography.title,
        fontWeight: typography.bold,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    topicTitle: {
        color: colors.black,
        fontSize: typography.subtitle,
        fontWeight: typography.semibold,
        marginTop: spacing.md,
        marginBottom: spacing.md,
    },
});