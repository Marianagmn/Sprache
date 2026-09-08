import React from 'react';
import ActivityCard from './ActivityCard';

const activities = [
	{ title: 'Vocabulario', description: 'Amplía y repasa palabras.', time: '5 min', iconName: 'file-tray-stacked' },
	{ title: 'Comprensión auditiva', description: 'Entrena tu comprensión.', time: '10 min', iconName: 'headset' },
	{ title: 'Pronunciación', description: 'Practica sonidos.', time: '5 min', iconName: 'mic' },
	{ title: 'Gramática', description: 'Refuerza tus estructuras.', time: '15 min', iconName: 'construct' }
];

export default function ActivityList() {
	return (
		<>
			{activities.map((activity) => (
				<ActivityCard key={activity.title} {...activity} />
			))}
		</>
	);
}
