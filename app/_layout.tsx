import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const [loaded] = useFonts({
    CalSans: require('../assets/fonts/Cal Sans/CalSans-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerTitleStyle: { fontFamily: 'CalSans', fontSize: 28 },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Manalytics',
          headerTitleStyle: { fontFamily: 'CalSans', fontSize: 28 },
          headerRight: () => {
            return (
              <Link href="/settings">
                <Ionicons name="settings-outline" size={24} color="black" />
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: 'Settings',
          headerTitleStyle: { fontFamily: 'CalSans', fontSize: 22 },
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
