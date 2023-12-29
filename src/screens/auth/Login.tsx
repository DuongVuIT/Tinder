import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const Login = () => {
  const [type, setType] = useState<number>(1);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  useEffect(() => {
    setName("");
    setPassword("");
    setEmail("");
  }, [type]);

  const signIn = () => {
    if (!email || email.trim() === "" || !password || password.trim() === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }

    signInWithEmailAndPassword(firebase.auth(), email!, password)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUp = async () => {
    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }

    createUserWithEmailAndPassword(firebase.auth(), email!, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("@assets/bg.png")}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {type === 1 ? (
            <View style={styles.container}>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>Sign in</Text>

              <View style={{ width: "100%", padding: 5 }}>
                <Text style={styles.textTitle}>Email</Text>
                <TextInput
                  keyboardType="email-address"
                  style={styles.textInput}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.textTitle}>Password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.textInput}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.Button} onPress={signIn}>
                  <Text style={styles.textButton}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType(2)}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      paddingTop: 6,
                    }}
                  >
                    Don't have an accout ?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>Sign up</Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                Create a new account
              </Text>
              <View style={{ width: "100%", padding: 5 }}>
                <Text style={styles.textTitle}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
                <Text style={styles.textTitle}>Email</Text>
                <TextInput
                  keyboardType="email-address"
                  style={styles.textInput}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.textTitle}>Password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.textInput}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={signUp} style={styles.Button}>
                  <Text style={styles.textButton}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType(1)}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      paddingTop: 5,
                    }}
                  >
                    Already have an account ?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: { color: "white", paddingBottom: 5, fontSize: 20 },
  textInput: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    maxWidth: "100%",
    borderColor: "#ccc",
    color: "#333",
    fontSize: 14,
    borderRadius: 8,
    width: "100%",
    padding: 10,
    marginBottom: 15,
  },
  Button: {
    width: "100%",
    marginTop: 8,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
  },
  textButton: { textAlign: "center", color: "white", fontSize: 20 },
});
