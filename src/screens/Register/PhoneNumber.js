//import liraries
import React, { useState, useEffect, createRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';

// Import the functions you need from the SDKs you need
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider } from 'firebase/auth';
import { app, auth } from '../../../firebase';

// import react toastify module
import Toast from 'react-native-toast-message';
import useAuth from '../../auth/useAuth';

// create a component
const PhoneNumber = () => {
	const [ info, setInfo ] = useState('');
	const phoneInput = createRef(null);
	const navigation = useNavigation();
	const recaptchaVerifier = createRef(null);
	const firebaseConfig = app ? app.options : undefined;
	const [ phoneNumber, setPhoneNumber ] = useState();

	// useEffect(
	// 	() => {
	// 		if (user && user.email) {
	// 			const googleLoggedInUser = {
	// 				email_address: user.email,
	// 				name: user.displayName,
	// 				image: user.photoURL
	// 			};
	// 			setNewUser(googleLoggedInUser);
	// 		}
	// 	},
	// 	[ user ]
	// );

	// style the toast messages
	const toastConfig = {
		success: (internalState) => (
			<View
				style={{
					height: 65,
					width: '90%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: 'green',
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

	const handleSignIn = async () => {
		const phoneProvider = new PhoneAuthProvider(auth);
		await phoneProvider
			.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
			.then(async (response) => {
				let obj = {
					phone_number: phoneNumber
				};
				const stringObj = JSON.stringify(obj);
				await AsyncStorage.setItem('userDetails', stringObj);

				Toast.show({
					type: 'success',
					position: 'top',
					text1: 'Verification code has been sent to your phone'
				});

				// navigate to mobille verification page after toast message has displayed
				setTimeout(() => {
					navigation.navigate('MobileVerification', {
						verificationId: response
					});
				}, 2000);
			})
			.catch((err) => {
				const errorMessage = err.message.includes('auth/invalid-phone-number)')
					? 'Invalid phone number '
					: err.message.includes('Cancelled by user')
						? 'You cancelled the verification'
						: 'Oops!, too many trials. Try again later';

				Toast.show({
					type: 'error',
					position: 'top',
					text1: `Error: ${errorMessage}`
				});
			});
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>
			<View style={tw`flex-1 content-center items-center p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold', zIndex: -3 }, tw`text-3xl text-center pb-4` ]}>
						{' '}
						Mobile Number
					</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center`}>
					<FirebaseRecaptchaVerifierModal
						ref={recaptchaVerifier}
						firebaseConfig={firebaseConfig}
						title="Prove you are human!"
						// attemptInvisibleVerification={true}
						cancelLabel="Close"
					/>

					<PhoneInput
						ref={phoneInput}
						defaultCode="NG"
						layout="first"
						onChangeText={() => {
							setInfo('A one-time code will be sent to this number.');
						}}
						onChangeFormattedText={setPhoneNumber}
						textContainerStyle={[
							tw` rounded-r-xl`,
							{ fontFamily: 'Regular', backgroundColor: '#F0E0E0' }
						]}
						containerStyle={[
							tw`rounded-xl  shadow`,
							{ fontFamily: 'Regular', backgroundColor: '#F0E0E0' }
						]}
						withShadow
						autoFocus
					/>

					<Text style={[ { fontFamily: 'Light' }, tw`pl-3 text-xs flex items-center w-72 pt-2` ]} onChange>
						{info}
					</Text>
				</View>

				<View style={tw`mt-24`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						disabled={!phoneNumber}
						onPress={handleSignIn}
						style={[
							tw`flex justify-center items-center w-72 rounded-full py-3 `,
							{ backgroundColor: '#CC0000' }
						]}
					>
						<Text
							style={[
								{ fontFamily: 'Bold' },
								tw`text-white text-center  text-base flex items-center text-xl`
							]}
						>
							Proceed
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<FooterImg />
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50'
	}
});

export default PhoneNumber;
