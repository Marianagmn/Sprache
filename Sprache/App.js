import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import Loading from './components/common/Loading';
import { colors } from './theme';

// Importación de pantallas
import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LessonScreen from './screens/LessonScreen';
import MainTabs from './components/navigation/MainTabs';

const Stack = createNativeStackNavigator();
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.gold,
  },
};

function RootNavigation() {
  const { user, isLoading } = useApp();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loading}>
        <StatusBar style="dark" backgroundColor={colors.background} />
        <Loading message="Cargando tu cuenta local..." />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack.Navigator initialRouteName={user ? 'MainApp' : 'Start'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <RootNavigation />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', backgroundColor: colors.background },
});