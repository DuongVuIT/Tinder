import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { generateId } from "@components/generateId";
import { db, timestamp } from "@config/firebase";
import useAuth from "@hooks/useAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_SCREEN, RootParamList } from "@type/navigation";
import "firebase/database";
import "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Swiper from "react-native-deck-swiper";
import { CardData } from "@type";

const HomeScreen = ({ navigation }: NativeStackScreenProps<RootParamList>) => {
  const { user, logout }: any = useAuth();
  const swipeRef = useRef<any>();
  const [profiles, setProfiles] = useState<any>();
  useLayoutEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((snapShot) => {
      if (!snapShot.exists()) {
        navigation.navigate(APP_SCREEN.MODAL);
      }
    });
  }, []);
  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      console.log(passes);
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["temp"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["temp"];
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    fetchCards();
    return unsub;
  }, []);
  const swipeLeft = (cardIndex: string | number) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex: string | number) => {
    try {
      if (!profiles[cardIndex]) {
        return;
      }

      const userSwiped = profiles[cardIndex];
      const loggedInProfile = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();

      console.log("loggedInProfile", loggedInProfile);

      getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
        (docSnap) => {
          if (docSnap.exists()) {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
            setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
              users: {
                [user.uid]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timestamp,
            });

            console.log(loggedInProfile, userSwiped);

            navigation.navigate(APP_SCREEN.MATCH, {
              loggedInProfile,
              userSwiped,
            });
          } else {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 6 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 20,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity onPress={logout}>
          <Image
            style={{
              borderRadius: 10,
              width: 40,
              height: 40,
            }}
            source={{
              uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(APP_SCREEN.MODAL)}>
          <Image
            style={{
              borderRadius: 10,
              width: 50,
              height: 50,
            }}
            source={require("@assets/logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(APP_SCREEN.CHAT)}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Swiper
          containerStyle={{
            backgroundColor: "transparent",
          }}
          ref={swipeRef}
          cards={profiles || []}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe Pass");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
            console.log("Swipe Match");
          }}
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card: CardData, index: number) => {
            return card ? (
              <View
                style={{
                  backgroundColor: "white",
                  height: "75%",
                  borderRadius: 20,
                  position: "relative",
                }}
                key={card.id}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: "100%",
                    borderRadius: 20,
                  }}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "white",
                    width: "100%",
                    height: 70,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    elevation: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    {card.age}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  position: "relative",
                  backgroundColor: "white",
                  height: "75%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  elevation: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                  No more profiles
                </Text>
                <Image
                  style={{ width: 80, height: 80 }}
                  height={100}
                  width={100}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            width: 64,
            height: 64,
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          }}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            width: 64,
            height: 64,
            backgroundColor: "rgba(0, 255, 0, 0.5)",
          }}
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
