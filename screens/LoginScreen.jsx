import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

// const StyledScrollView = styled(ScrollView);

export default function LoginScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["rgba(197,228,108,1)", "rgba(79,164,58,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-between font-outfitregular">
        <View className="justify-center items-center mt-10">
          <View className="w-40 h-40 bg-white rounded-full overflow-hidden justify-center items-center">
            <Image
              source={require("../assets/images/logo.png")}
              className=" w-60 h-60"
            />
          </View>
          <Text className="text-white text-center text-[40px] font-outfitbold mt-4">
            NutriFit
          </Text>

          {/* Slogan */}
          <Text className="text-white text-center text-[16px] mb-4 font-outfitregular">
            A Nutritionist within your reach
          </Text>
        </View>
        <KeyboardAvoidingView
          // className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className=" w-[100%] bg-[#ECEDEC] rounded-t-[28px]"
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20, gap: 20 }}
            keyboardShouldPersistTaps="handled"
            className="h-[550px] flex gap-[20px]"
          >
            <Text className="text-[34px] text-[#161716] font-outfitsemibold text-center my-[25px] mt-16">
              Sign in
            </Text>
            <TextInput
              placeholder="email"
              className="border-[1px] border-[#C5E46C] bg-white rounded-md  h-[50px] w-[368px] mx-auto font-outfitregular"
            />
            <TextInput
              secureTextEntry={true}
              placeholder="password"
              className="border-[1px] border-[#C5E46C] bg-white rounded-md h-[50px] w-[368px] mx-auto font-outfitregular"
            />
            <TouchableOpacity className="flex gap-2 w-[368px] mx-auto">
              <Text className="inline">
                Forgot password?
                <Text className="text-[#205A13] inline  underline">reset</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="mx-auto w-[368px] h-[60px] bg-[#205A13] rounded-[10px] text-center flex justify-center  mt-8">
              <Text className="text-white text-center text-[16px] font-outfitregular">
                Signin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              className="w-[368px] mx-auto"
            >
              <Text className="text-center font-outfitregular">
                Don't have an account?{" "}
                <Text className="text-[#205A13] underline font-outfitregular">
                  Signup
                </Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
