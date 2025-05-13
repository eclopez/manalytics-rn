import { useFocusEffect } from '@react-navigation/native';
import { Pressable, StyleSheet, Text } from 'react-native';
import * as React from 'react';
import { CURRENT_LIFE_KEY, STARTING_LIFE_KEY } from '@/lib/constants';
import { Storage } from '@/lib/storage';

const LONG_PRESS_DELAY = 600;

const clearIntervalRef = (intervalRef: React.RefObject<number | null>) => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
};

function Player() {
  const [currentLife, setCurrentLife] = React.useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const loadStartingLife = async () => {
        const startLifeValue = await Storage.getItem(STARTING_LIFE_KEY);
        const currentLifeValue = await Storage.getItem(CURRENT_LIFE_KEY);

        console.log(currentLifeValue ?? startLifeValue ?? 40);

        setCurrentLife(Number(currentLifeValue ?? startLifeValue ?? 40));
        setIsInitialLoad(false);
      };

      loadStartingLife();
    }, []),
  );

  const intervalRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const setCurrentLifeValue = async () => {
      await Storage.setItem(CURRENT_LIFE_KEY, currentLife);
    };

    if (!isInitialLoad) {
      setCurrentLifeValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLife]);

  const handleIncrementCurrentLife = async (delta: number = 1) => {
    setCurrentLife((prev) => prev + delta);
  };

  const handleDecrementCurrentLife = (delta: number = 1) => {
    setCurrentLife((prev) => prev - delta);
  };

  const handleLongPressIncrementCurrentLife = () => {
    clearIntervalRef(intervalRef);

    intervalRef.current = setInterval(() => {
      handleIncrementCurrentLife(5);
    }, LONG_PRESS_DELAY);
  };

  const handleLongPressDecrementCurrentLife = () => {
    clearIntervalRef(intervalRef);

    intervalRef.current = setInterval(() => {
      handleDecrementCurrentLife(5);
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
        onLongPress={handleLongPressIncrementCurrentLife}
        onPress={() => handleIncrementCurrentLife()}
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
        onLongPress={handleLongPressDecrementCurrentLife}
        onPress={() => handleDecrementCurrentLife()}
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
        {currentLife}
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
