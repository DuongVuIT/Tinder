import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@components/Header";
import ChatList from "@components/ChatList";

const ChatScreen = () => {
  return (
    <View style={{ paddingTop: 40 }}>
      <Header title="Chat" />
      <ChatList />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
