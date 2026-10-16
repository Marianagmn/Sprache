import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActivityCard from './ActivityCard';
import { filterActivities, getActivities } from '../../services/activityService';
import EmptyState from '../common/EmptyState';

export default function ActivityList({ onActivityPress, category = 'Todos' }) {
    const activities = filterActivities(getActivities(), category);

    return (
        <View style={styles.container}>
            {activities.length === 0 ? (
                <EmptyState
                    title="No hay actividades en esta categoría"
                    message="Puedes elegir otra categoría para seguir explorando."
                />
            ) : activities.map((activity) => (
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
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20, 
    }
});