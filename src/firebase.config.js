// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKNsclSCkHH3GkwNkL0Jey5wdp8rFeMqI",
  authDomain: "house-marketplace-app-69552.firebaseapp.com",
  projectId: "house-marketplace-app-69552",
  storageBucket: "house-marketplace-app-69552.appspot.com",
  messagingSenderId: "952108341058",
  appId: "1:952108341058:web:4fefeab098aecb826c9adb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
