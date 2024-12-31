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
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OtpModal from "../../components/OtpModal";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../utils/axiosSetup";

const ForgotPasswordScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNpass, setShowNpass] = useState(false);
  const [showCpass, setShowCpass] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    const { new_password, confirm_password, email } = data;
    console.log({ email });
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/forgot_password", data, {});
      setModalVisible(true);
      console.log("Response:", response.data);
      reset();
    } catch (error) {
      setError(error);
      console.log(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
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
                source={require("../../assets/images/logo.png")}
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
            className=" w-[100%] h-[550px] bg-[#ECEDEC] rounded-t-[28px]"
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
              <Text className="text-[34px] text-[#161716] font-outfitsemibold text-center my-[15px] mt-16">
                Forgot password
              </Text>
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="email"
                      value={value}
                      onChangeText={onChange}
                      className="border-[1px] border-[#C5E46C] bg-white rounded-md  h-[50px] w-full mx-auto font-outfitregular"
                    />
                  )}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Please enter a valid email address",
                    },
                  }}
                />
                {errors.email && (
                  <Text className="text-red-500 text-xs">
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  name="new_password"
                  render={({ field: { onChange, value } }) => (
                    <View className="border-[1px] border-[#C5E46C] bg-white rounded-md h-[50px] pr-2 w-full mx-auto flex-row items-center justify-between">
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={showNpass ? false : true}
                        placeholder="new password"
                        className=" font-outfitregular flex-1"
                      />
                      {showNpass ? (
                        <Ionicons
                          name="eye-off-outline"
                          size={20}
                          onPress={() => setShowNpass(!showNpass)}
                        />
                      ) : (
                        <Ionicons
                          name="eye-outline"
                          size={20}
                          onPress={() => setShowNpass(!showNpass)}
                        />
                      )}
                    </View>
                  )}
                  rules={{
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message:
                        "New password must be atleast six characters long",
                    },
                  }}
                />
                {errors.new_password && (
                  <Text className="text-red-500 text-xs">
                    {errors.new_password.message}
                  </Text>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  name="confirm_password"
                  render={({ field: { onChange, value } }) => (
                    <View className="border-[1px] border-[#C5E46C] bg-white rounded-md h-[50px] pr-2 w-full mx-auto flex-row items-center justify-between">
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={showCpass ? false : true}
                        placeholder="confirm password"
                        className=" font-outfitregular flex-1"
                      />
                      {showCpass ? (
                        <Ionicons
                          name="eye-off-outline"
                          size={20}
                          onPress={() => setShowCpass(!showCpass)}
                        />
                      ) : (
                        <Ionicons
                          name="eye-outline"
                          size={20}
                          onPress={() => setShowCpass(!showCpass)}
                        />
                      )}
                    </View>
                  )}
                  rules={{
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues("new_password") ||
                      "Passwords do not match",
                  }}
                />
                {errors.confirm_password && (
                  <Text className="text-red-500 text-xs">
                    {errors.confirm_password.message}
                  </Text>
                )}
              </View>

              <View>
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className={`mx-auto w-full h-[60px] flex flex-row items-center justify-center ${
                    isLoading ? "bg-[#161716]" : "bg-[#205A13]"
                  } rounded-[10px] `}
                  disabled={isLoading}
                >
                  <Text className="text-white text-center text-[16px] font-outfitregular">
                    {isLoading ? "Submitting..." : "Reset"}
                  </Text>
                  <>
                    {isLoading && (
                      <ActivityIndicator size="small" color="#205A13" />
                    )}
                  </>
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
        <OtpModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};
export default ForgotPasswordScreen;
