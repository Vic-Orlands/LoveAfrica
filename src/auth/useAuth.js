import React, { useState, useEffect, useMemo, useContext, createContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';

import { signOut } from 'firebase/auth';
import { app, auth } from '../../firebase';
app;

const AuthContext = createContext({});
WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
	const navigation = useNavigation();
	const [ user, setUser ] = useState(null);
	const [ loadingInitial, setLoadingInitial ] = useState(true);
	const [ loading, setLoading ] = useState(false);

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
				} else {
					setUser(null);
				}
				setLoadingInitial(null);
			}),
		[]
	);

	// function to checkout user or sign user out
	const handleSignOut = () => {
		setLoading(true);
		signOut(auth).catch((error) => console.error(error)).finally(() => setLoading(false));
	};

	// memoize the values
	const memoizedValue = useMemo(
		() => ({
			user,
			request,
			response,
			loading,
			setLoading,
			promptAsync,
			handleSignOut
		}),
		[ user, request, response, loading ]
	);

	return <AuthContext.Provider value={memoizedValue}>{!loadingInitial && children}</AuthContext.Provider>;
};

export default function useAuth() {
	return useContext(AuthContext);
}
