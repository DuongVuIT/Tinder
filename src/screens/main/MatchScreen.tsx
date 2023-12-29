import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_SCREEN, RootParamList } from "@type/navigation";

const MatchScreen = ({ navigation }: NativeStackScreenProps<RootParamList>) => {
  const route = useRoute();
  const { loggedInProfile, userSwiped }: any = route.params;
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "red",
        paddingTop: 40,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: 10,
          paddingTop: 40,
        }}
      >
        <Image
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
          style={{ height: 80, width: "100%" }}
        />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 10,
            fontSize: 16,
          }}
        >
          You and {userSwiped.displayName} have liked each other
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Image
            style={{ height: 128, width: 128, borderRadius: 80 }}
            source={{
              uri: loggedInProfile.photoURL,
            }}
          />
          <Image
            style={{ height: 128, width: 128, borderRadius: 80 }}
            source={{
              uri: userSwiped.photoURL,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          margin: 5,
          alignSelf: "center",
          paddingHorizontal: 50,
          paddingVertical: 30,
          borderRadius: 80,
          marginTop: 20,
        }}
        onPress={() => {
          navigation.goBack();
          navigation.navigate(APP_SCREEN.CHAT);
        }}
      >
        <Text style={{ textAlign: "center" }}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f00",
    paddingTop: 50,
    opacity: 0.89,
  },
  innerContainer: {
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  image: {
    height: 80,
    width: "100%",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  profileImage: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  button: {
    backgroundColor: "#fff",
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
  },
});
