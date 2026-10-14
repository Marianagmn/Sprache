import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActivityCard from './ActivityCard';
import { getActivities } from '../../services/activityService';

export default function ActivityList({ onActivityPress }) {
    const activities = getActivities();

    return (
        <View style={styles.container}>
            {activities.map((activity) => (
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