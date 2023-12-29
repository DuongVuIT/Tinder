import { db } from "@config/firebase";
import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { APP_SCREEN } from "@type/navigation";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import getMatchedUserInfo from "./getMatchedUserInfo";

const ChatRow = ({ matchDetails }: any) => {
  const navigation: any = useNavigation();
  const { user }: any = useAuth();
  const [matchUserInfo, setMatcheUserInfo] = useState<any>();
  const [lastMessage, setLastMessage] = useState<any>();
  useEffect(() => {
    setMatcheUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, []);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc"),
        limit(1)
      ),
      (snapShot) => setLastMessage(snapShot.docs[0]?.data()?.message)
    );
  }, [matchDetails]);
  console.log(matchUserInfo);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        padding: 3,
        paddingLeft: 20,
        paddingHorizontal: 20,
        marginVertical: 12,
        marginHorizontal: 4,
        borderRadius: 50,
      }}
      onPress={() => navigation.navigate(APP_SCREEN.MESSAGE, { matchDetails })}
    >
      <Image
        style={{ borderRadius: 50, height: 80, width: 80, marginRight: 4 }}
        source={{ uri: matchUserInfo?.photoURL }}
      />
      <View>
        <Text style={{ fontSize: 20 }}>{matchUserInfo?.displayName}</Text>
        <Text style={{ marginLeft: 10, marginTop: 10 }}>
          {lastMessage || "Say Hi"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
