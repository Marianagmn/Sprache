import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: ['home-outline', 'home'],
  Actividades: ['book-outline', 'book'],
  Progreso: ['bar-chart-outline', 'bar-chart'],
  Perfil: ['person-outline', 'person'],
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const [inactiveIcon, activeIcon] = tabIcons[route.name];
          return <Ionicons name={focused ? activeIcon : inactiveIcon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E3A8A',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          backgroundColor: '#FFFFFF',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Actividades" component={ActivitiesScreen} />
      <Tab.Screen name="Progreso" component={ProgressScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

