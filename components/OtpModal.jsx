import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const OtpModal = ({ modalVisible, setModalVisible }) => {
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
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              ref={pin1Ref}
              onKeyPress={(e) => move(e, pin2Ref, null, pin1Ref)}
              className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              ref={pin2Ref}
              onKeyPress={(e) => move(e, pin3Ref, pin1Ref, pin2Ref)}
              className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              ref={pin3Ref}
              onKeyPress={(e) => move(e, pin4Ref, pin2Ref, pin3Ref)}
              className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              ref={pin4Ref}
              onKeyPress={(e) => move(e, pin5Ref, pin3Ref, pin4Ref)}
              className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              ref={pin5Ref}
              onKeyPress={(e) => move(e, null, pin4Ref, pin5Ref)}
              className="text-center border-[1px] text-[30px] border-[#C5E46C] bg-white rounded-md h-[60px] w-[55px] font-outfitbold"
            />
          </View>

          <Pressable
            className="rounded-[10px] mx-auto w-[70%] h-[50px] bg-[#205A13] py-2 flex items-center justify-center px-4"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="text-white text-center text-[16px] font-outfitregular">
              Confirm
            </Text>
          </Pressable>

          <Text className="font-outfitregular p-2">
            Note: Once you close this modal, the initial code will be rendered
            useless, and a new one will be generated.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default OtpModal;
