import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { DARK_MODE_KEY, STARTING_LIFE_KEY } from '@/lib/constants';
import { Storage } from '@/lib/storage';

export default function RootLayout() {
  const [delay, setDelay] = React.useState<boolean>(true);
  const [loaded] = useFonts({
    CalSans: require('../assets/fonts/Cal Sans/CalSans-Regular.ttf'),
  });

  React.useEffect(() => {
    const initializeStorage = async () => {
      if (Storage.getItem(DARK_MODE_KEY) === null) {
        await Storage.setItem(DARK_MODE_KEY, false);
      }

      if (Storage.getItem(STARTING_LIFE_KEY) === null) {
        await Storage.setItem(STARTING_LIFE_KEY, 40);
      }
    };

    initializeStorage();
  });

  React.useEffect(() => {
    setTimeout(() => setDelay(false), 100);
  }, []);

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
            return delay ? null : (
              <Link href="/settings">
                <Ionicons name="settings-outline" size={26} color="black" />
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
