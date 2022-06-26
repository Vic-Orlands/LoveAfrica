import React, { useState, useEffect, useMemo, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext({});

import { signOut } from 'firebase/auth';
import { app, auth } from '../../firebase';
app;

export const AuthProvider = ({ children }) => {
	const [ user, setUser ] = useState(null);
	const [ loadingInitial, setLoadingInitial ] = useState(true);

	const [ request, response, promptAsync ] = Google.useAuthRequest({
		androidClientId: '1024785618777-vb67kl0h6rbonm5oorj802sk28t8897m.apps.googleusercontent.com',
		iosClientId: '1024785618777-slsotm39cnul0i0frn0fqhbq8jjrr7m8.apps.googleusercontent.com',
		expoClientId: '1024785618777-bshccmhmvh5gpc3s3p0hep2th144egc1.apps.googleusercontent.com',
		webClientId: '1024785618777-gindhl44j3drvtt2crn6mht2fknq4dc6.apps.googleusercontent.com'
	});

	// check if user is logged in and keep user logged in
	useEffect(
		() =>
			auth.onAuthStateChanged((user) => {
				if (user) {
					setUser(user);
				}
				setLoadingInitial(null);
			}),
		[]
	);

	// function to checkout user or sign user out
	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				setUser(null);
				AsyncStorage.clear();
			})
			.catch((error) => console.error(error));
	};

	// memoize the values
	const memoizedValue = useMemo(
		() => ({
			user,
			request,
			response,
			promptAsync,
			handleSignOut
		}),
		[ user, request, response ]
	);

	return <AuthContext.Provider value={memoizedValue}>{!loadingInitial && children}</AuthContext.Provider>;
};

export default function useAuth() {
	return useContext(AuthContext);
}
