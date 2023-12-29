import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db, firebase, timestamp } from "@config/firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import "firebase/database";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import useAuth from "@hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_SCREEN, RootParamList } from "@type/navigation";
import { doc, setDoc } from "firebase/firestore";
const ModalScreen = ({ navigation }: NativeStackScreenProps<RootParamList>) => {
  const [image, setImage] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [imageURLs, setImageURLs] = useState<any[]>([]);
  const { user }: any = useAuth();
  const [job, setJob] = useState<string>();
  const [age, setAge] = useState<any>();
  const incompleteForm = !image || !age || !job;
  const pickImage = async () => {
    let result: string | any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };
    console.log(source);
    setImage(source);
  };

  console.log(imageURLs);
  const upload = async () => {
    setUploading(true);

    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
      const snapshot = await ref.put(blob);
      const downloadURL = await snapshot.ref.getDownloadURL();
      setDoc(doc(db, "/users", user.uid), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: downloadURL,
        job,
        age,
        timestamp,
      })
        .then(() => {
          navigation.navigate(APP_SCREEN.HOME);
        })
        .catch((err) => {
          Alert.alert("Error", err.message);
        });

      setUploading(false);
      Alert.alert("Photo uploaded!");
      setImage(null);
    } catch (error) {
      console.log(error);
      setUploading(false);
      Alert.alert("Failed to upload photo!");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={100}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flex: 1, alignItems: "center", paddingTop: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 80, width: "80%" }}
            resizeMode="contain"
            source={require("../../assets/text-logo.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 10, marginRight: 10 }}
          >
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 20,
            color: "black",
            padding: 2,
            fontWeight: "bold",
          }}
        >
          Welcome {user.displayName}
        </Text>
        <Text
          style={{
            textAlign: "center",
            padding: 4,
            fontWeight: "bold",
            fontSize: 14,
            color: "red",
            marginTop: 10,
          }}
        >
          Step 1: Choose your picture
        </Text>
        <TouchableOpacity onPress={pickImage}>
          <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 20 }}>
            Choose your Image
          </Text>
        </TouchableOpacity>
        <View>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ alignItems: "center", width: 300, height: 300 }}
            />
          )}
        </View>
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            padding: 4,
            fontWeight: "bold",
            fontSize: 14,
            color: "red",
          }}
        >
          Step 2: Enter your job
        </Text>
        <TextInput
          placeholder="Enter your job"
          value={job}
          onChangeText={setJob}
          style={{ textAlign: "center", fontSize: 20, paddingBottom: 2 }}
        />
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            padding: 4,
            fontWeight: "bold",
            fontSize: 14,
            color: "red",
          }}
        >
          Step 2: Enter your age
        </Text>
        <TextInput
          placeholder="Enter your age"
          style={{ textAlign: "center", fontSize: 20, paddingBottom: 2 }}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          maxLength={2}
        />
        <TouchableOpacity
          onPress={upload}
          disabled={incompleteForm}
          style={[styles.button, incompleteForm && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 3,
    borderRadius: 20,
    position: "absolute",
    marginBottom: 10,
    bottom: 10,
    backgroundColor: "#FF6347",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
