import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCheckbox from "../../components/CustomCheckbox";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../utils/axiosSetup";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: "all" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCpass, setShowCpass] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      //const response = await axiosInstance.post("/create_account", data, {});
      //console.log("Response:", response.data);
      Alert.alert("Success", "Form submitted successfully!");
      reset();
      navigation.navigate("verification");
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        error.response?.data?.msg || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar backgroundColor="#161716" barStyle="light-content" />
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
                source={require("../../assets/images/_logo.png")}
                style={{ width: 100, height: 100, resizeMode: "contain" }}
              />
            </View>
            <Text className="text-white text-center text-[40px] font-outfitbold mt-4">
              NutriFit
            </Text>
            <Text className="text-white text-center text-[16px] mb-4 font-outfitregular">
              A Nutritionist within your reach
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            className=" w-[100%] bg-[#ECEDEC] rounded-t-[28px]"
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
                gap: 20,
              }}
              keyboardShouldPersistTaps="handled"
              enableAutomaticScroll
              extraHeight={150}
            >
              <Text className="text-[34px] text-[#161716] fixed font-outfitsemibold text-center my-[12px]">
                Sign up
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    className="border-[1px] border-[#C5E46C] bg-white rounded-md h-[50px] px-4 font-outfitregular"
                  />
                )}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email address",
                  },
                }}
              />
              {errors.email && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.email.message}
                </Text>
              )}

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View className="border-[1px] border-[#C5E46C] bg-white rounded-md">
                    <TextInput
                      secureTextEntry={showPass ? false : true}
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      className="h-[50px] px-4 font-outfitregular"
                    />
                    {showPass ? (
                      <Ionicons
                        name="eye-off-outline"
                        size={25}
                        onPress={() => setShowPass(!showPass)}
                        className="absolute right-[6px] top-[25%]"
                      />
                    ) : (
                      <Ionicons
                        name="eye-outline"
                        size={25}
                        onPress={() => setShowPass(!showPass)}
                        className="absolute right-[6px] top-[25%]"
                      />
                    )}
                  </View>
                )}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
              />
              {errors.password && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.password.message}
                </Text>
              )}

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View className="border-[1px] border-[#C5E46C] bg-white rounded-md">
                    <TextInput
                      secureTextEntry={showCpass ? false : true}
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      className="h-[50px] px-4 font-outfitregular"
                    />
                    {showCpass ? (
                      <Ionicons
                        name="eye-off-outline"
                        size={25}
                        onPress={() => setShowCpass(!showCpass)}
                        className="absolute right-[6px] top-[25%]"
                      />
                    ) : (
                      <Ionicons
                        name="eye-outline"
                        size={25}
                        onPress={() => setShowCpass(!showCpass)}
                        className="absolute right-[6px] top-[25%]"
                      />
                    )}
                  </View>
                )}
                name="confirmPassword"
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                }}
              />
              {errors.confirmPassword && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.confirmPassword.message}
                </Text>
              )}

              <Controller
                control={control}
                name="termsAccepted"
                rules={{
                  required: "You must agree to the terms to continue",
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomCheckbox
                    label="I agree to the Terms of Use, Privacy Policy & Data Processing Agreement"
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.termsAccepted && (
                <Text className="text-red-500 text-xs mt-[-10px]">
                  {errors.termsAccepted.message}
                </Text>
              )}

              <Pressable
                onPress={handleSubmit(onSubmit)}
                className={`mx-auto w-full h-[60px] ${
                  isLoading ? "bg-[#161716]" : "bg-[#205A13]"
                } rounded-[10px] flex justify-center`}
                disabled={isLoading}
              >
                <Text className="text-white text-center text-[16px] font-outfitregular">
                  {isLoading ? "Submitting..." : "Create an account"}
                </Text>
              </Pressable>

              <TouchableOpacity
                onPress={() => navigation.navigate("login")}
                className="mt-2"
              >
                <Text className="text-center font-outfitregular">
                  Already have an account?{" "}
                  <Text className="text-[#205A13] underline font-outfitregular">
                    Signin
                  </Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaView>
  );
}
