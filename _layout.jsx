import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/Auth/SplashScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
import VerificationScreen from "./screens/Auth/VerificationScreen";
import Dashboard from "./screens/Main/Dashboard";
import Onboarding from "./screens/Main/Onboarding";
import Goals from "./screens/Boarding/Goals";
import Details from "./screens/Boarding/Details";
import Diet from "./screens/Boarding/Diet";
import Nutrition from "./screens/Boarding/Nutrition";

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator initialRouteName="splash">
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
      <Stack.Screen
        name="forgot-password"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="verification"
        component={VerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="goals"
        component={Goals}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="diet"
        component={Diet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="nutrition"
        component={Nutrition}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
