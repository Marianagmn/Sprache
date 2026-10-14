import React from 'react'; 

import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

import StartScreen from '../screens/StartScreen'; 

import RegisterScreen from '../screens/RegisterScreen'; 

import LoginScreen from '../screens/LoginScreen'; 

import LessonScreen from '../screens/LessonScreen'; 

import MainTabNavigator from './MainTabNavigator'; 

 

const Stack = createNativeStackNavigator(); 

 

export default function AppNavigator() { 

  return ( 

    <Stack.Navigator screenOptions={{ headerShown: false }}> 

      <Stack.Screen name="Start" component={StartScreen} /> 

      <Stack.Screen name="Register" component={RegisterScreen} /> 

      <Stack.Screen name="Login" component={LoginScreen} /> 

      <Stack.Screen name="MainApp" component={MainTabNavigator} /> 

      <Stack.Screen name="Lesson" component={LessonScreen} /> 

    </Stack.Navigator> 

  ); 

} 