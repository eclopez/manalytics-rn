import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * A simple wrapper around AsyncStorage to handle JSON data.
 */
const Storage = {
  /**
   * Sets an item in storage.
   *
   * @param {string} key - The key under which to store the value.
   * @param {number | string | object} value - The value to store
   */
  async setItem(key: string, value: number | string | boolean | object) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Error saving data', e);
    }
  },
  /**
   * Retrieves an item from storage.
   *
   * @param {string} key
   * @returns {number | string | object} The JSON string value stored under the key, or null if not found.
   */
  async getItem(
    key: string,
  ): Promise<number | string | object | boolean | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error retrieving data', e);
      return null;
    }
  },
  /**
   * Removes an item from storage.
   *
   * @param key The key to remove
   */
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data', e);
    }
  },
  /**
   * Clears all items from storage.
   */
  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Error clearing storage', e);
    }
  },
  /**
   * Gets all keys from storage.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of all keys in storage.
   */
  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error('Error getting all keys', e);
    }
  },
};

export { Storage };
