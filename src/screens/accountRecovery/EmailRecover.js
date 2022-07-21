//import liraries
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';
import { auth } from '../../../firebase';

const EmailRecover = () => {
	const navigation = useNavigation();
	const [ info, setInfo ] = useState('');
	const [ email, setEmail ] = useState('');

	const disable = !email;

	const setTheinfo = () => {
		setInfo('You will receive an email to continue your account recovery.');
	};

	const sendRecoveryEmail = async () => {
		await sendPasswordResetEmail(auth, email)
			.then((response) => {
				navigation.navigate('EmailSent');
			})
			.catch((error) => {
				console.log(error.code);
				const errorMessage = error.code.includes('auth/user-not-found')
					? 'User does not exist'
					: error.code.replace(/\bauth\b/g, '').replace(/[^\w\s]/gi, ' ');
				Toast.show({
					type: 'error',
					position: 'top',
					text1: `Error Message: ${errorMessage}`,
					visibilityTime: 3000,
					autoHide: true
				});
			});
	};

	// style the toast messages
	const toastConfig = {
		error: (internalState) => (
			<View
				style={{
					height: 45,
					width: '80%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: '#cc0000',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>{internalState.text1}</Text>
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
				<View style={[ tw`pt-6`, { zIndex: -3 } ]}>
					<Text style={tw`font-bold text-3xl text-center pb-4`}> Enter Email address</Text>
				</View>
				<View style={tw`flex items-center`}>
					<TextInput
						value={email}
						autoComplete="email"
						onTextInput={setTheinfo}
						onChangeText={setEmail}
						keyboardType="email-address"
						placeholder="your@email.com"
						style={tw` w-72 px-3 py-3 rounded-full text-center border-2 border-green-700`}
					/>
					<Text style={tw`pl-3 flex items-center w-72`}>{info}</Text>
				</View>

				<View style={tw`mt-24`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						disabled={disable}
						onPress={sendRecoveryEmail}
						style={[
							tw`flex justify-center items-center w-72 rounded-full py-4 `,
							{ backgroundColor: '#CC0000' }
						]}
					>
						<Text style={tw`text-white text-center font-bold text-base flex items-center`}>
							Send Email Link
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<FooterImg />
		</View>
	);
};

export default EmailRecover;
