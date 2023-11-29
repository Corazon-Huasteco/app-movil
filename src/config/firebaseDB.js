// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXR191n7jFL7ZUvltSgLnWgd-DlO2n_yo",
  authDomain: "corazon-huasteco-bfbcc.firebaseapp.com",
  projectId: "corazon-huasteco-bfbcc",
  storageBucket: "corazon-huasteco-bfbcc.appspot.com",
  messagingSenderId: "636785870470",
  appId: "1:636785870470:web:8003e1a5c0f7eb157b3307",
  measurementId: "G-9CWJ2R8N32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage= getStorage();
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});