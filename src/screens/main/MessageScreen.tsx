import Header from "@components/Header";
import ReceiverMessage from "@components/ReceiverMessage";
import SenderMessage from "@components/SenderMessage";
import getMatchedUserInfo from "@components/getMatchedUserInfo";
import { db, timestamp } from "@config/firebase";
import useAuth from "@hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const MessageScreen = () => {
  const route = useRoute();
  const [input, setInput] = useState<any>();
  const { user }: any = useAuth();
  const { matchDetails }: any = route.params;
  const [messages, setMessages] = useState<any>();
  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp,
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapShot) =>
        setMessages(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );

    return unsubscribe;
  }, [matchDetails]);
  return (
    <SafeAreaView style={{ paddingTop: 40, flex: 1 }}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={{ paddingLeft: 4 }}
            keyExtractor={(item) => item.id}
            inverted={true}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderTopWidth: 1,
            marginTop: 10,
            borderTopColor: "#E5E5E5",
            paddingHorizontal: 5,
            paddingVertical: 2,
          }}
        >
          <TextInput
            style={{ height: 40, fontSize: 16 }}
            placeholder="Send messsage ...."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
