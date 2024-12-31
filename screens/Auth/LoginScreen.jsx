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
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../utils/axiosSetup";

// const StyledScrollView = styled(ScrollView);

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [validationError, SetValidationError] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    Keyboard.dismiss();
    try {
      const res = await axiosInstance.post("/login", data);
      console.log("Response", res);
      console.log("Data", res.data);
      SetValidationError(null);
      navigation.navigate("home");
    } catch (error) {
      console.error("Error", error);
      SetValidationError(error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };
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
          className=" w-[100%] bg-[#ECEDEC] rounded-t-[28px] h-[550px] pt-2"
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
            <Text className="text-[34px] text-[#161716] font-outfitsemibold text-center mb-[2px] mt-16">
              Sign in
            </Text>
            {validationError && (
              <Text className="text-red-500 text-base mt-[-10px]">
                {validationError}
              </Text>
            )}
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
                  message: "Enter a valid email address",
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
              }}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-[-10px]">
                {errors.password.message}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate("forgot-password")}
              className="flex gap-2 mx-auto"
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("forgot-password")}
                className="flex flex-row font-outfitregular"
              >
                <Text className="inline">Forgot password? </Text>
                <Text className="text-[#205A13] inline underline">reset</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              className={`mx-auto w-full h-[60px] flex flex-row items-center justify-center gap-4 ${
                isLoading ? "bg-[#161716]" : "bg-[#205A13]"
              } rounded-[10px] flex justify-center`}
              disabled={isLoading}
            >
              <>
                {isLoading && (
                  <ActivityIndicator size="small" color="#205A13" />
                )}
              </>
              <Text className="text-white text-center text-[16px] font-outfitregular">
                {isLoading ? "Submitting..." : "Sign In"}
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              className="mx-auto pb-4"
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
