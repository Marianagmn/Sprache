import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActivityCard from './ActivityCard';

const activities = [
    { id: '1', title: 'Vocabulario', description: 'Amplía y repasa palabras.', time: '5 min', iconName: 'file-tray-stacked' },
    { id: '2', title: 'Comprensión auditiva', description: 'Entrena tu comprensión.', time: '10 min', iconName: 'headset' },
    { id: '3', title: 'Pronunciación', description: 'Practica sonidos.', time: '5 min', iconName: 'mic' },
    { id: '4', title: 'Gramática', description: 'Refuerza tus estructuras.', time: '15 min', iconName: 'construct' }
];

export default function ActivityList() {
    return (
        <View style={styles.container}>
            {activities.map((activity) => (
                <ActivityCard 
                    key={activity.id} 
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                    iconName={activity.iconName}
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