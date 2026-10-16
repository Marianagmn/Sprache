import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import ActivitiesScreen from '../../screens/ActivitiesScreen';
import ProgressScreen from '../../screens/ProgressScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { colors } from '../../theme';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Actividades: focused ? 'book' : 'book-outline',
            Progreso: focused ? 'bar-chart' : 'bar-chart-outline',
            Perfil: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.muted,
        headerShown: false,
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60, backgroundColor: colors.surface, borderTopColor: colors.border },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Actividades" component={ActivitiesScreen} />
      <Tab.Screen name="Progreso" component={ProgressScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
