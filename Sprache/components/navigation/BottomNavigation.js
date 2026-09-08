import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import ActivitiesScreen from '../../screens/ActivitiesScreen';
import ProgressScreen from '../../screens/ProgressScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
					else if (route.name === 'Actividades') iconName = focused ? 'book' : 'book-outline';
					else if (route.name === 'Progreso') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
					else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: '#1E3A8A',
				tabBarInactiveTintColor: '#6B7280',
				headerShown: false,
				tabBarStyle: {
					paddingBottom: 5,
					paddingTop: 5,
					height: 60,
					backgroundColor: '#FFFFFF'
				}
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Actividades" component={ActivitiesScreen} />
			<Tab.Screen name="Progreso" component={ProgressScreen} />
			<Tab.Screen name="Perfil" component={ProfileScreen} />
		</Tab.Navigator>
	);
}
