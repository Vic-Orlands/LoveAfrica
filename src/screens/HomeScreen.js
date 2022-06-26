import React, { Fragment } from 'react';
import { TouchableOpacity, Text, View, Image, SafeAreaView, Pressable, TextBase } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import loveImage from '../../assets/love_text_black.png';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Loading from '../components/Loading';

// import react toastify module
import Toast from 'react-native-toast-message';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import useAuth from '../auth/useAuth';

// const fadeAnim = React.useRef(new Animated.Value(0)).current;

// const fadeIn = () => {
//   // Will change fadeAnim value to 1 in 5 seconds
//   Animated.timing(fadeAnim, {
//     toValue: 1,
//     duration: 5000
//   }).start();
// };

const Email = () => {
	return <MaterialIcons name="email" size={24} color="red" />;
};
const Google = () => {
	return <AntDesign name="google" size={24} color="orange" />;
};
const Phone = () => {
	return <FontAwesome name="phone" size={24} color="black" />;
};

const HomeScreen = () => {
	const navigation = useNavigation();
	const { promptAsync, setLoading, loading } = useAuth();

	// style the toast messages
	const toastConfig = {
		success: (internalState) => (
			<View
				style={{
					height: 65,
					width: '90%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: '#fff',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15
				}}
			>
				<Text style={{ fontSize: 14 }}>{internalState.text1}</Text>
			</View>
		),
		error: (internalState) => (
			<View
				style={{
					height: 65,
					width: '90%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: 'red',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15
				}}
			>
				<Text style={{ fontSize: 20, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		)
	};

	const GoogleLogin = () => {
		setLoading(true);

		promptAsync()
			.then((res) => {
				if (res.type === 'success') {
					const { idToken, accessToken } = res.authentication;
					const auth = getAuth();
					const credential = GoogleAuthProvider.credential(idToken, accessToken);
					signInWithCredential(auth, credential);

					console.log(res);

					Toast.show({
						type: 'success',
						position: 'top',
						text1: 'Login successful!',
						visibilityTime: 2000,
						autoHide: true
					});

					setTimeout(() => {
						navigation.navigate('UpdateModal', {
							user: res
						});
					}, 2000);
				}
			})
			.catch((err) => {
				Toast.show({
					type: 'error',
					position: 'top',
					text1: 'Error logging in with Google!',
					visibilityTime: 2000,
					autoHide: true
				});
			})
			.finally(() => setLoading(false));
	};

	// let [Loaded] = useFonts({
	//   "NexaLight": require("../../assets/fonts/NexaLight.otf"),
	//   "NexaRegular": require("../../assets/fonts/NexaRegular.otf"),
	//   "NexaBold": require("../../assets/fonts/NexaBold.otf")
	// });

	// if(!Loaded) {
	//   return <Loading />;
	// }

	const Reuse = ({ iconText, text, linkTo }) => {
		return (
			<Fragment>
				<TouchableOpacity style={tw`bg-white w-72 rounded-full py-4 `} onPress={linkTo}>
					<View
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							flexDirection: 'row'
						}}
					>
						{iconText}
						<Text style={tw`font-bold pl-1`}>{text}</Text>
					</View>
				</TouchableOpacity>
				<View style={tw`mt-4`} />
			</Fragment>
		);
	};

	return (
		<SafeAreaView style={tw`h-full flex-1`}>
			<Toast
				config={toastConfig}
				refs={(innerRefs) => {
					Toast.setRef(innerRefs);
				}}
			/>
			<View style={tw` h-full flex-1 items-center`}>
				<View style={tw`mt-20`} />

				<Image source={loveImage} style={{ width: 250, height: 100, resizeMode: 'contain', zIndex: -3 }} />
				<View style={tw`mt-12`} />
				<View style={[ tw`rounded-t-3xl w-full h-full`, { backgroundColor: '#CC0000' } ]}>
					<View style={tw`mt-6 flex justify-center`}>
						<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl text-white text-center` ]}>Sign In</Text>
						{/* USer sign In */}
						<View style={tw`mt-8 flex justify-center items-center`}>
							{/* Phone reg */}
							<Reuse
								text="Sign up with Phone Number"
								iconText={<Phone />}
								linkTo={() => navigation.navigate('Phone')}
							/>

							{/* Google reg */}
							{loading ? (
								<View
									style={[
										tw`bg-white w-72 rounded-full py-4 mb-4 `,
										{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											textAlign: 'center',
											flexDirection: 'row'
										}
									]}
								>
									<Text style={tw`font-bold pl-1`}>Loading...</Text>
								</View>
							) : (
								<Reuse
									text="Sign up with Google"
									iconText={<Google style={tw`text-left`} />}
									linkTo={GoogleLogin}
								/>
							)}

							{/* Sign in/ Log in */}
							<Reuse
								text="Sign in with Email"
								iconText={<Email style={tw`text-left`} />}
								linkTo={() => navigation.navigate('Login')}
							/>
						</View>

						<View style={tw`mt-12`} />
						<Pressable onPress={() => navigation.navigate('RecoverScreen')}>
							<Text style={[ { fontFamily: 'Bold' }, tw`text-center text-white text-xl` ]}>
								Can't Login?
							</Text>
						</Pressable>

						{/* <Button title='Splash Screen' onPress={() => navigation.navigate("Splashscreen")} /> */}
						{/* Text for sign in here */}
						<View style={tw`mt-12 w-full border border-white`} />
						<View style={tw`pt-6`}>
							<Text style={[ { fontFamily: 'Bold' }, tw`text-white max-w-sm text-center px-4 ` ]}>
								By signing in, you have read and agreed with our
							</Text>
							<View>
								<Pressable
								// onPress={}
								>
									<Text style={[ { fontFamily: 'Bold' }, tw`text-center text-blue-200` ]}>
										Terms and condition
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
