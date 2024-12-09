import { StatusBar } from "expo-status-bar";
import { Image, Text, StyleSheet, View, Button, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Expo's LinearGradient
import SplashScreen from "./screens/SplashScreen";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

ExpoSplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: "OutfitRegular" };

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = { fontFamily: "OutfitRegular" };

export default function App() {
  const [fontsLoaded, error] = useFonts({
    OutfitLight: require("./assets/fonts/outfit_light.ttf"),
    OutfitRegular: require("./assets/fonts/outfit_regular.ttf"),
    OutfitMedium: require("./assets/fonts/outfit_medium.ttf"),
    OutfitSemibold: require("./assets/fonts/outfit_semibold.ttf"),
    OutfitBold: require("./assets/fonts/outfit_bold.ttf"),
    OutfitExtraBold: require("./assets/fonts/outfit_extrabold.ttf"),
    OutfitBlack: require("./assets/fonts/outfit_black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !error) {
    return null; // Return nothing while fonts are loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="register">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
