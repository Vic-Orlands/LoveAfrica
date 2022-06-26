// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDVoJe7LetSpCn9MAVkFVRVjGTZezeo6zM',
	authDomain: 'loveafrica.firebaseapp.com',
	projectId: 'loveafrica',
	storageBucket: 'loveafrica.appspot.com',
	messagingSenderId: '1024785618777',
	appId: '1:1024785618777:web:0975ce0772f419d3635e48',
	measurementId: 'G-GX97VW9SMJ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
