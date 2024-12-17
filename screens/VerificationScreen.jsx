import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
const VerificationScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["rgba(197,228,108,1)", "rgba(79,164,58,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-between font-outfitregular">
        <View className="justify-center items-center mt-[80px]">
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
            className="h-[500px] flex gap-[20px]"
          >
            <Text className="text-[34px] text-[#161716] font-outfitsemibold text-center my-[15px] mt-16">
              Account verification
            </Text>
            <Text className="p-4 tracking-wide text-[1.15rem] text-center font-outfitregular">
              We've just sent a confirmation link to the email address you
              provided. Please check your inbox and click on the link to verify
              your email and complete your account setup.
            </Text>
            <View>
              <Pressable
                onPress={() => navigation.navigate("login")}
                className="mx-auto w-[368px] h-[60px] bg-[#205A13] rounded-[10px] text-center flex justify-center  mt-2"
              >
                <Text className="text-white text-center text-[16px] font-outfitregular">
                  Continue
                </Text>
              </Pressable>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="w-[368px] mx-auto mt-2"
              >
                <Text className="text-[#205A13] text-center underline font-outfitregular">
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default VerificationScreen;
