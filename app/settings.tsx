import * as Application from 'expo-application';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  CURRENT_LIFE_KEY,
  DARK_MODE_KEY,
  STARTING_LIFE_KEY,
} from '@/lib/constants';
import { Storage } from '@/lib/storage';

const lifeTotals = [
  { id: 0, title: '0 starting life' },
  { id: 20, title: '20 starting life' },
  { id: 40, title: '40 starting life' },
];

function SettingsModal() {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  const [startingLifeTotal, setStartingLifeTotal] = React.useState<number>(40);

  React.useEffect(() => {
    const loadPreferences = async () => {
      const darkModeValue = await Storage.getItem(DARK_MODE_KEY);
      setDarkMode(darkModeValue === true);

      const startingLife = await Storage.getItem(STARTING_LIFE_KEY);
      setStartingLifeTotal(
        Number(startingLife ?? lifeTotals[lifeTotals.length - 1].id),
      );
    };

    loadPreferences();
  }, []);

  const handleDarkModeChange = async (value: boolean) => {
    setDarkMode(value);
    await Storage.setItem(DARK_MODE_KEY, value);
  };

  const handleStartingLifeTotalChange = async (value: number) => {
    setStartingLifeTotal(value);
    await Storage.setItem(STARTING_LIFE_KEY, value);
  };

  const handleReset = async () => {
    await Storage.setItem(CURRENT_LIFE_KEY, startingLifeTotal);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.row}>
            <View style={[styles.rowIcon]}>
              <Ionicons name="moon" size={20} style={{ color: '#000000' }} />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(darkMode) => handleDarkModeChange(darkMode)}
              value={darkMode}
              trackColor={{ true: '#000000' }}
            />
          </View>

          <View style={styles.list}>
            {lifeTotals.map((item) => {
              const isSelected = item.id === startingLifeTotal;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleStartingLifeTotalChange(item.id)}
                  style={styles.listItem}
                >
                  <Text style={styles.rowLabel}>{item.title}</Text>
                  {isSelected && (
                    <>
                      <View style={styles.rowSpacer} />
                      <View>
                        <Ionicons name="checkmark" size={24} />
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity onPress={handleReset} style={styles.row}>
            <View style={[styles.rowIcon]}>
              <Ionicons name="refresh" size={20} style={{ color: '#000000' }} />
            </View>
            <Text style={styles.rowLabel}>Reset</Text>
            <View style={styles.rowSpacer} />
          </TouchableOpacity>
        </View>

        <View style={styles.app}>
          <View>
            <Text style={styles.appName}>Manalytics</Text>
            <Text style={styles.appVer}>
              ver. {Application.nativeApplicationVersion}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9c9c9c',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  list: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  app: {
    marginTop: 20,
  },
  appName: {
    fontFamily: 'CalSans',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  appVer: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SettingsModal;
