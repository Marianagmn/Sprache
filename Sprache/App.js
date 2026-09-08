import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importación de pantallas
import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';
import BottomNavigation from './components/navigation/BottomNavigation';

const Stack = createNativeStackNavigator();

// Estructura principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainApp" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}