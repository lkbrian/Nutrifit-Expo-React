import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axiosInstance from "../utils/axiosSetup";
import Toast from "react-native-toast-message";

const OtpModal = ({ modalVisible, setModalVisible, payload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);

  useEffect(() => {
    if (modalVisible && pin1Ref.current) {
      pin1Ref.current.focus();
    }
  }, [modalVisible]);
  const move = (e, nextRef, prevRef, currentRef) => {
    console.log(e.nativeEvent.key);
    if (e.nativeEvent.key !== "Backspace") {
      nextRef?.current?.focus();
    } else {
      prevRef?.current?.focus();
    }
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    const { pin1, pin2, pin3, pin4, pin5 } = data;
    const token = `${pin1}${pin2}${pin3}${pin4}${pin5}`;
    const { confirm_password, new_password } = payload;

    console.log("Request Payload:", { token, new_password, confirm_password });

    try {
      const res = await axiosInstance.post("/reset_password", {
        token,
        new_password,
        confirm_password,
      });

      console.log("Response Data:", res.data);
      Toast.show({
        type: "success",
        text1: `${res.data.msg}`,
        text2: "You will proceed to login after logout",
        visibilityTime: 3000,
      });

      setTimeout(() => {
        setModalVisible(!modalVisible);
        reset();
      }, 12000);
    } catch (error) {
      console.error("Error Response:", error);
      console.log("Error Message:", error.response?.data?.msg);
      setServerError(error.response?.data?.msg || "Failed to reset password.");
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      presentationStyle="overFullScreen"
    >
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="w-[90%] h-[383px] items-center justify-between bg-white rounded-xl p-1 shadow-md shadow-black">
          <View className="pt-[8px]">
            <Text className="mt-4 text-center text-[24px] font-outfitsemibold">
              Otp Verification{" "}
            </Text>
            <Ionicons
              name="close-circle-outline"
              size={35}
              onPress={() => setModalVisible(!modalVisible)}
              className="absolute right-0"
            />
            <Text className="text-center text-[16px] font-outfitregular mt-2">
              We've just sent a OTP to the email address you provided. Enter the
              code below to reset your password.
            </Text>
          </View>

          <View className="flex flex-row gap-4 my-[20px] mx-auto">
            <View>
              <Controller
                control={control}
                name="pin1"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    maxLength={1}
                    value={value}
                    onChangeText={onChange}
                    ref={pin1Ref}
                    onKeyPress={(e) => move(e, pin2Ref, null, pin1Ref)}
                    className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
                  />
                )}
                rules={{
                  required: "__",
                }}
              />
              {errors.pin1 && <Text>{errors.pin1.message}</Text>}
            </View>

            <View>
              <Controller
                control={control}
                name="pin2"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    maxLength={1}
                    value={value}
                    onChangeText={onChange}
                    ref={pin2Ref}
                    onKeyPress={(e) => move(e, pin3Ref, pin1Ref, pin2Ref)}
                    className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
                  />
                )}
                rules={{
                  required: "__",
                }}
              />
              {errors.pin2 && <Text>{errors.pin2.message}</Text>}
            </View>
            <View>
              <Controller
                control={control}
                name="pin3"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    maxLength={1}
                    ref={pin3Ref}
                    value={value}
                    onChangeText={onChange}
                    onKeyPress={(e) => move(e, pin4Ref, pin2Ref, pin3Ref)}
                    className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
                  />
                )}
                rules={{
                  required: "__",
                }}
              />
              {errors.pin3 && <Text>{errors.pin3.message}</Text>}
            </View>
            <View>
              <Controller
                control={control}
                name="pin4"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    maxLength={1}
                    value={value}
                    onChangeText={onChange}
                    ref={pin4Ref}
                    onKeyPress={(e) => move(e, pin5Ref, pin3Ref, pin4Ref)}
                    className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
                  />
                )}
                rules={{
                  required: "__",
                }}
              />
              {errors.pin4 && <Text>{errors.pin4.message}</Text>}
            </View>

            <View>
              <Controller
                control={control}
                name="pin5"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    maxLength={1}
                    ref={pin5Ref}
                    value={value}
                    onChangeText={onChange}
                    onKeyPress={(e) => move(e, null, pin4Ref, pin5Ref)}
                    className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
                  />
                )}
                rules={{
                  required: "__",
                }}
              />
              {errors.pin5 && <Text>{errors.pin5.message}</Text>}
            </View>
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className={`mx-auto w-full h-[60px] flex flex-row items-center justify-center ${
              isLoading ? "bg-[#161716]" : "bg-[#205A13]"
            } rounded-[10px] `}
            disabled={isLoading}
          >
            <Text className="text-white text-center text-[16px] font-outfitregular">
              {isLoading ? "Submitting..." : "Confirm"}
            </Text>
          </Pressable>

          <Text className="font-outfitregular p-2">
            Note: Once you close this modal, the initial code will be rendered
            useless, and a new one will be generated on the next reopen.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default OtpModal;
