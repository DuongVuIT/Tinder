import React from "react";
import { StyleSheet, Text, View } from "react-native";
const SenderMessage = ({ message }: any) => {
  return (
    <View
      style={{
        backgroundColor: "#8A2BE2",
        borderRadius: 20,
        paddingHorizontal: 16,
        alignSelf: "flex-start",
        paddingVertical: 12,
        marginHorizontal: 12,
        marginVertical: 12,
        marginLeft: "auto",
      }}
    >
      <Text style={{ color: "white" }}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({});
