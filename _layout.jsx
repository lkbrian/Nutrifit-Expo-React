import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ChartNoAxesCombined,
  ChefHat,
  CircleUserRound,
  House,
  Lightbulb,
} from "lucide-react-native";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import SplashScreen from "./screens/Auth/SplashScreen";
import VerificationScreen from "./screens/Auth/VerificationScreen";
import Details from "./screens/Boarding/Details";
import Diet from "./screens/Boarding/Diet";
import Goals from "./screens/Boarding/Goals";
import Nutrition from "./screens/Boarding/Nutrition";
import HomeScreen from "./screens/Main/HomeScreen";
import ProfileScreen from "./screens/Main/ProfileScreen";
import ProgressScreen from "./screens/Main/ProgressScreen";
import RecipeScreen from "./screens/Main/RecipeScreen";
import SuggestionsScreen from "./screens/Main/SuggestionsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS = {
  Home: House,
  Progress: ChartNoAxesCombined,
  Suggestions: Lightbulb,
  Recipe: ChefHat,
  Profile: CircleUserRound,
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const LucideIcon = ICONS[route.name];
          return <LucideIcon size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4caf50",
        tabBarInactiveTintColor: "#161716",
        tabBarStyle: { backgroundColor: "#fff" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Suggestions"
        component={SuggestionsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function Layout() {
  const screens = [
    {
      name: "splash",
      component: SplashScreen,
      options: { headerShown: false },
    },
    { name: "login", component: LoginScreen, options: { headerShown: false } },
    {
      name: "register",
      component: RegisterScreen,
      options: { headerShown: false },
    },
    {
      name: "forgot-password",
      component: ForgotPasswordScreen,
      options: { headerShown: false },
    },
    {
      name: "verification",
      component: VerificationScreen,
      options: { headerShown: false },
    },
    { name: "goals", component: Goals, options: { headerShown: false } },
    { name: "details", component: Details, options: { headerShown: false } },
    { name: "diet", component: Diet, options: { headerShown: false } },
    {
      name: "nutrition",
      component: Nutrition,
      options: { headerShown: false },
    },
    { name: "home", component: BottomTabs, options: { headerShown: false } },
  ];
  return (
    <Stack.Navigator initialRouteName="home">
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
}
