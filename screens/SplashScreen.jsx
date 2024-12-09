import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: "OutfitRegular" };

const SplashScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["rgba(197,228,108,1)", "rgba(79,164,58,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <View className="flex-1 justify-center items-center gap-2 font-outfitregular">
        <Image
          source={require("../assets/images/splash_logo.png")}
          // className="w-60 h-60"
        />
        {/* </View> */}

        {/* App Name */}
        <Text className="text-white text-center text-[40px] font-outfitbold ">
          NutriFit
        </Text>

        {/* Slogan */}
        <Text className="text-white text-center text-xl font-outfitregular">
          A Nutritionist within your reach
        </Text>

        <View className="flex flex-col gap-2">
          <View className="justify-center items-center mt-[30px]">
            <TouchableOpacity
              onPress={() => navigation.navigate("login")}
              className="bg-white py-4 px-6 px-auto shadow-lg text-center rounded-[0.4rem] w-[350px]"
            >
              <Text className=" text-[#016239] m-auto text-center text-[17px] font-outfitmedium">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("register")}
            className=" "
          >
            <Text className="text-white text-center text-[16px] font-outfitregular">
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
    </LinearGradient>
  );
};

export default SplashScreen;
