import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

import { AuthProvider, useAuth } from './src/lib/auth';
import RoleSelectScreen from './src/screens/RoleSelectScreen';
import AuthScreen from './src/screens/AuthScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import HowItWorksScreen from './src/screens/HowItWorksScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import BrandScreen from './src/screens/BrandScreen';
import WalletScreen from './src/screens/WalletScreen';

import BrandHubScreen from './src/screens/BrandHubScreen';
import BrandSignupScreen from './src/screens/BrandSignupScreen';
import BrandWalletScreen from './src/screens/BrandWalletScreen';

import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

function Root() {
  const { ready, user, role } = useAuth();

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.mint }}>
        <ActivityIndicator color={colors.crimson} />
      </View>
    );
  }

  const creatorHeader = {
    headerTitle: '',
    headerTintColor: colors.crimson,
    headerShadowVisible: false,
    headerStyle: { backgroundColor: colors.mint },
  };

  const brandHeader = {
    headerTitle: '',
    headerTintColor: colors.crimsonDark,
    headerShadowVisible: false,
    headerStyle: { backgroundColor: '#FADCE4' },
  };

  if (!role) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      </Stack.Navigator>
    );
  }

  if (role === 'brand') {
    return (
      <Stack.Navigator>
        <Stack.Screen name="BrandHub" component={BrandHubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BrandSignup" component={BrandSignupScreen} options={brandHeader} />
        <Stack.Screen name="BrandWallet" component={BrandWalletScreen} options={brandHeader} />
      </Stack.Navigator>
    );
  }

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={creatorHeader} />
        <Stack.Screen name="HowItWorks" component={HowItWorksScreen} options={creatorHeader} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Brand" component={BrandScreen} options={creatorHeader} />
      <Stack.Screen name="Wallet" component={WalletScreen} options={creatorHeader} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Root />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
