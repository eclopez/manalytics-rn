import { Pressable, StyleSheet, Text } from 'react-native';
import * as React from 'react';

const LONG_PRESS_DELAY = 600;

interface PlayerProps {
  value: number;
}

const clearIntervalRef = (intervalRef: React.RefObject<number | null>) => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
};

function Player(props: PlayerProps) {
  const { value } = props;

  const [count, setCount] = React.useState<number>(value);
  const intervalRef = React.useRef<number | null>(null);

  const handleIncrementCount = (delta: number = 1) => {
    setCount((prev) => prev + delta);
  };

  const handleDecrementCount = (delta: number = 1) => {
    setCount((prev) => prev - delta);
  };

  const handleLongPressIncrementCount = () => {
    clearIntervalRef(intervalRef);

    intervalRef.current = setInterval(() => {
      handleIncrementCount(5);
    }, LONG_PRESS_DELAY);
  };

  const handleLongPressDecrementCount = () => {
    clearIntervalRef(intervalRef);

    intervalRef.current = setInterval(() => {
      handleDecrementCount(5);
    }, LONG_PRESS_DELAY);
  };

  const handlePressOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <>
      <Pressable
        delayLongPress={LONG_PRESS_DELAY}
        onLongPress={handleLongPressIncrementCount}
        onPress={() => handleIncrementCount()}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.button,
          {
            top: 0,
            backgroundColor: pressed
              ? 'rgba(130, 130, 130, 0.4)'
              : 'transparent',
          },
        ]}
      />
      <Pressable
        delayLongPress={LONG_PRESS_DELAY}
        onLongPress={handleLongPressDecrementCount}
        onPress={() => handleDecrementCount()}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.button,
          {
            bottom: 0,
            backgroundColor: pressed
              ? 'rgba(130, 130, 130, 0.4)'
              : 'transparent',
          },
        ]}
      />
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={styles.counter}
      >
        {count}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  counter: {
    fontFamily: 'CalSans',
    fontSize: 195,
    width: '100%',
    textAlign: 'center',
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: '100%',
    height: '50%',
    zIndex: 10,
  },
});

export { Player };
export type { PlayerProps };
