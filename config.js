import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiEWlgI7p8FymcMheZG3mFztIyUk7ZXBw",
    authDomain: "loveafrica-test.firebaseapp.com",
    projectId: "loveafrica-test",
    storageBucket: "loveafrica-test.appspot.com",
    messagingSenderId: "438183029353",
    appId: "1:438183029353:web:30df0d00a39c924c5f10f8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { firebase };