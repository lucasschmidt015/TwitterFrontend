import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GeneralContextProvider from '@/context/GeneralContext';
import AuthContextProvider from '@/context/AuthContext';
import TweetsApiContextProvider from '@/lib/api/tweets';

const client = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GeneralContextProvider>
      <AuthContextProvider>
        <TweetsApiContextProvider>
          <QueryClientProvider client={client}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                <Stack.Screen name="new-tweet" options={{ title: 'New Tweet', headerShown: false }}/>

                <Stack.Screen name="(auth)/signIn" options={{ title: 'Sign In', headerShown: false }} />
                <Stack.Screen name="(auth)/signUp" options={{ title: 'Create Account', headerShown: false }} />
                <Stack.Screen name="(auth)/authenticate" options={{ title: 'Confirm', headerShown: false }} />
              </Stack>
            </ThemeProvider>
          </QueryClientProvider>
        </TweetsApiContextProvider>
      </AuthContextProvider>
    </GeneralContextProvider>
  );
}
