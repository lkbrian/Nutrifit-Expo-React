import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreItem = async (name, item) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(item));
    console.log("Item stored successfully");
  } catch (error) {
    console.error("Error storing item:", error);
  }
};

export const RetrieveItem = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return JSON.parse(value); // Item found
    } else {
      return null; // Item not found
    }
  } catch (error) {
    console.error("Error retrieving item:", error);
    return null; // In case of error, return null
  }
};
