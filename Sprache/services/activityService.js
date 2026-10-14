const activities = [
  { id: '1', title: 'Vocabulario', description: 'Amplía y repasa palabras.', time: '5 min', iconName: 'file-tray-stacked' },
  { id: '2', title: 'Comprensión auditiva', description: 'Entrena tu comprensión.', time: '10 min', iconName: 'headset' },
  { id: '3', title: 'Pronunciación', description: 'Practica sonidos.', time: '5 min', iconName: 'mic' },
  { id: '4', title: 'Gramática', description: 'Refuerza tus estructuras.', time: '15 min', iconName: 'construct' },
];

export function getActivities() {
  return activities;
}
