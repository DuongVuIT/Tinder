import { getApp, getApps, initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat";
import "firebase/compat/storage";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyASYQEyxTjffqvFBjDQraTcbWeKfDGrD08",
  authDomain: "tinder-ad6be.firebaseapp.com",
  projectId: "tinder-ad6be",
  storageBucket: "tinder-ad6be.appspot.com",
  messagingSenderId: "364189126640",
  appId: "1:364189126640:web:5f83d87ff6d4dfb2199735",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const timestamp = serverTimestamp();
const provider = new EmailAuthProvider();

export { firebase, auth, provider, timestamp, db };
