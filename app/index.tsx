import * as React from 'react';
import { View } from 'react-native';
import { Player } from '@/components/Player';

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Player />
    </View>
  );
}

export default Index;
