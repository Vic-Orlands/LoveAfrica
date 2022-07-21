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

	// google login
	const [ request, response, promptAsync ] = Google.useAuthRequest({
		iosClientId: '911987219804-cv2td9j08n82mc0dd8fske16h0d36tvm.apps.googleusercontent.com',
		webClientId: '911987219804-dsovtrvgq7beku6pom08t0lsdg0kq4gn.apps.googleusercontent.com',
		expoClientId: '911987219804-e58b29rflumud86pmvmfhnp1tpreein3.apps.googleusercontent.com',
		androidClientId: '911987219804-aeoqfrbi2v4ulerh8nebeg5ka418baif.apps.googleusercontent.com'
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
			handleSignOut,
			setLoadingInitial
		}),
		[ user, request, response ]
	);

	return <AuthContext.Provider value={memoizedValue}>{!loadingInitial && children}</AuthContext.Provider>;
};

export default function useAuth() {
	return useContext(AuthContext);
}
