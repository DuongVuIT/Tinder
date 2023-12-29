import { db } from "@config/firebase";
import useAuth from "@hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [match, setMatch] = useState<any>();
  const { user }: any = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapShot) =>
        setMatch(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
    return unsubscribe;
  }, [user]);
  console.log(JSON.stringify(match, null, 5));
  return match?.length > 0 ? (
    <FlatList
      style={{ height: "100%" }}
      data={match}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={{ padding: 5 }}>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        No matches at the moment
      </Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
