import { View } from 'react-native';
import * as React from 'react';
import { Settings } from '@/components/Settings';

function SettingsModal() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Settings />
    </View>
  );
}

export default SettingsModal;
