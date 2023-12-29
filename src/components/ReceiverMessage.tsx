import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
const ReceiverMessage = ({ message }: any) => {
  return (
    <View style={[styles.container, { alignSelf: "flex-start" }]}>
      <Image
        source={{ uri: message.photoURL }}
        style={{
          height: 60,
          width: 60,
          position: "absolute",
          left: -60,
          top: 0,
          borderRadius: 50,
        }}
      />
      <Text style={{ color: "white", marginTop: 5 }}>{message.message}</Text>
    </View>
  );
};
export default ReceiverMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 12,
    marginLeft: 60,
  },
});
