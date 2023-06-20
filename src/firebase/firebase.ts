// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJGVyoK95e5fpOkz4JSp4fDnyRuKh02SY",
  authDomain: "currencyconverter-io.firebaseapp.com",
  projectId: "currencyconverter-io",
  storageBucket: "currencyconverter-io.appspot.com",
  messagingSenderId: "334944570037",
  appId: "1:334944570037:web:58d81ad15574df25fa0cfc",
  measurementId: "G-JK1B79HGTC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

export default app;
