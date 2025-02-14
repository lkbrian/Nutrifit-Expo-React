// import { StatusBar } from "expo-status-bar";
// import { Image, Text, StyleSheet, View, Button, TextInput } from "react-native";
// import { LinearGradient } from "expo-linear-gradient"; // Expo's LinearGradient
// import SplashScreen from "./screens/Auth/SplashScreen";
// import "./global.css";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./screens/Auth/LoginScreen";
// import RegisterScreen from "./screens/Auth/RegisterScreen";
// import { SafeAreaView } from "react-native-safe-area-context";
// import * as ExpoSplashScreen from "expo-splash-screen";
// import { useFonts } from "expo-font";
// import { useEffect } from "react";
// import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
// import VerificationScreen from "./screens/Auth/VerificationScreen";
// import Dashboard from "./screens/Main/Dashboard";
// import Onboarding from "./screens/Main/Onboarding";
// import Layout from "./_layout";

// ExpoSplashScreen.preventAutoHideAsync();
// const Stack = createNativeStackNavigator();

// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.style = { fontFamily: "OutfitRegular" };

// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.style = { fontFamily: "OutfitRegular" };

// const MainStack = createNativeStackNavigator();
// const AuthStack = createNativeStackNavigator();
// const RootStack = createNativeStackNavigator();

// // Auth stack
// function AuthNavigator() {
//   return (
//     <AuthStack.Navigator screenOptions={{ headerShown: false }}>
//       <MainStack.Screen name="splash" component={SplashScreen} />
//       <AuthStack.Screen name="login" component={LoginScreen} />
//       <AuthStack.Screen name="register" component={RegisterScreen} />
//       <AuthStack.Screen
//         name="forgot-password"
//         component={ForgotPasswordScreen}
//       />
//       <AuthStack.Screen name="verification" component={VerificationScreen} />
//     </AuthStack.Navigator>
//   );
// }

// // Main stack
// function MainNavigator() {
//   return (
//     <MainStack.Navigator screenOptions={{ headerShown: false }}>
//       <MainStack.Screen name="home" component={Dashboard} />
//     </MainStack.Navigator>
//   );
// }
// export default function App() {
//   const [fontsLoaded, error] = useFonts({
//     OutfitLight: require("./assets/fonts/outfit_light.ttf"),
//     OutfitRegular: require("./assets/fonts/outfit_regular.ttf"),
//     OutfitMedium: require("./assets/fonts/outfit_medium.ttf"),
//     OutfitSemibold: require("./assets/fonts/outfit_semibold.ttf"),
//     OutfitBold: require("./assets/fonts/outfit_bold.ttf"),
//     OutfitExtraBold: require("./assets/fonts/outfit_extrabold.ttf"),
//     OutfitBlack: require("./assets/fonts/outfit_black.ttf"),
//   });

//   useEffect(() => {
//     if (fontsLoaded) {
//       ExpoSplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded && !error) {
//     return null; // Return nothing while fonts are loading
//   }

//   return (
//     <NavigationContainer>
//       <Layout />
//     </NavigationContainer>
//   );
// }

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import SplashScreen from "./screens/Auth/SplashScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
import VerificationScreen from "./screens/Auth/VerificationScreen";
import Dashboard from "./screens/Main/Dashboard";
import Onboarding from "./screens/Main/Onboarding";
import Layout from "./_layout";

// Prevent splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state
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
      <Layout />
    </NavigationContainer>
  );
}

// ✅ Bottom Tab Navigator
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Progress":
              iconName = "chart-line";
              break;
            case "Suggestions":
              iconName = "lightbulb";
              break;
            case "Recipe":
              iconName = "book-open";
              break;
            case "Profile":
              iconName = "account";
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4caf50",
        tabBarInactiveTintColor: "#161716",
        tabBarStyle: { backgroundColor: "#fff" },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Progress" component={Onboarding} />
      <Tab.Screen name="Suggestions" component={SplashScreen} />
      <Tab.Screen name="Recipe" component={RegisterScreen} />
      <Tab.Screen name="Profile" component={LoginScreen} />
    </Tab.Navigator>
  );
}
