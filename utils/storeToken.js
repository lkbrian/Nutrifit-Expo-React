import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
    console.log("Token stored successfully");
  } catch (error) {
    console.error("Error storing token:", error);
  }
};
