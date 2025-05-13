import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

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
    />
  );
}
