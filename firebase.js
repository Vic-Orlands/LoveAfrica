// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBiHM9AUVgZA4kw8g-sox5mNDMyX5nxScI',
	authDomain: 'loveafrica-46a25.firebaseapp.com',
	projectId: 'loveafrica-46a25',
	storageBucket: 'loveafrica-46a25.appspot.com',
	messagingSenderId: '911987219804',
	appId: '1:911987219804:web:8e668d8a37f5db590ef599',
	measurementId: 'G-B2PVV9RSBD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
