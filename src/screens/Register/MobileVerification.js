//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import FooterImg from '../../components/FooterImg';

import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../../firebase';

// import react toastify module
import Toast from 'react-native-toast-message';

// create a component
const MobileVerification = ({ route }) => {
	const navigation = useNavigation();
	// gets the captcha verification id from the router params passed from phone number component
	const { verificationId } = route.params;
	const [ disable, setDisable ] = useState(true);
	const [ verificationCode, setVerificationCode ] = useState();

	// sets touchable opacity button to clickable when there's an input in the text area
	const setInfo = () => setDisable(false);

	// function to handle signing in...
	// it verifies the id of the captcha and the code sent to your mobile device and signs the user in on successful verification
	const handleConfirmOtp = async () => {
		try {
			const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
			await signInWithCredential(auth, credential).then((response) => {
				Toast.show({
					type: 'success',
					position: 'top',
					text1: 'Phone authentication successful 👍'
				});

				setTimeout(() => {
					navigation.navigate('PhoneSuccess');
				}, 2000);
			});
		} catch (err) {
			if (err.message.includes('auth/code-expired')) {
				Toast.show({
					type: 'error',
					position: 'top',
					text1: `Error: Otp expired`
				});
			} else {
				Toast.show({
					type: 'error',
					position: 'top',
					text1: `Error: Invalid or Wrong Otp`
				});
			}
		}
	};

	// style the toast messages modal
	const toastConfig = {
		success: (internalState) => (
			<View
				style={{
					height: 65,
					width: '90%',
					marginTop: -15,
					zIndex: 9999,
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
					zIndex: 9999,
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

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<Toast
				config={toastConfig}
				refs={(ref) => {
					Toast.setRef(ref);
				}}
			/>
			<View style={tw`flex-1 content-center items-center p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold', zIndex: -3 }, tw` text-3xl text-center pb-4` ]}>
						{' '}
						Verification Code
					</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center`}>
					<TextInput
						placeholder="Enter Code"
						keyboardType="numeric"
						style={[
							tw` w-72 px-3 py-3 rounded-xl text-center shadow`,
							{ fontFamily: 'Regular', backgroundColor: '#F0E0E0' }
						]}
						editable={!!verificationId}
						onChangeText={setVerificationCode}
						onTextInput={setInfo}
						autoComplete="sms-otp"
					/>
					<Text style={[ { fontFamily: 'Light' }, tw`pl-3 flex items-center w-72 pt-2` ]}>
						Please enter the verification code that was sent to your phone.
					</Text>
				</View>

				<View style={tw`mt-24`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						disabled={disable}
						onPress={handleConfirmOtp}
						style={[
							tw`flex justify-center shadow items-center w-72 rounded-full py-3 `,
							{ backgroundColor: '#CC0000' }
						]}
					>
						<Text
							style={[
								{ fontFamily: 'Bold' },
								tw`text-white text-center  text-base flex items-center text-xl`
							]}
						>
							Verify
						</Text>
					</TouchableOpacity>

					<View style={tw`pt-24`} />
					<View>
						<Text style={[ { fontFamily: 'Regular' }, tw`pl-3 flex items-center pt-2` ]}>
							Didn’t receive any code?
						</Text>
					</View>
					<View>
						<Pressable>
							<Text
								style={[
									{ fontFamily: 'Bold' },
									tw`pl-3 flex items-center text-base font-bold underline pt-2`
								]}
							>
								RESEND
							</Text>
						</Pressable>
					</View>
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
		alignItems: 'center'
	}
});

//make this component available to the app
export default MobileVerification;
