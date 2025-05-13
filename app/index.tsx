import { useNavigation } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Player } from '@/components/Player';

export default function Index() {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Manalytics',
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Player value={40} />
    </View>
  );
}
