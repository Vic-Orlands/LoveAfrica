//import liraries
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import FooterImg from '../../components/FooterImg';

// import react toastify module
import Toast from 'react-native-toast-message';

// Import the functions you need from the SDKs you need
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

// create a component
const Login = () => {
	const navigation = useNavigation();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const disable = !email || !password;

	const handleLogin = async () => {
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				Toast.show({
					type: 'success',
					position: 'top',
					text1: 'Sign in Successful!',
					visibilityTime: 2000,
					autoHide: true
				});
				navigation.navigate('Drawers');
			})
			.catch((error) => {
				const errorMessage = error.message.includes('auth/wrong-password')
					? 'Wrong password'
					: error.message.includes('auth/user-not-found') ? 'User does not exist' : errorMessage;

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
		success: (internalState) => (
			<View
				style={{
					height: 45,
					width: '80%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: 'green',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15,
					transform: [ { scaleX: 0.5 } ]
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		),
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
					borderRadius: 15,
					transform: [ { scaleX: 0.5 } ]
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		)
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={tw`flex-1 items-center p-4`}
		>
			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>

			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ tw`font-bold text-3xl text-center mt-10`, { zIndex: -3 } ]}>
						{' '}
						Login to your Account
					</Text>
					<Text style={tw`pl-3 flex items-center text-center text-lg w-72 pt-2`}>
						Enter your email and password to Login
					</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex`}>
					<TextInput
						placeholder="Enter email address"
						value={email}
						keyboardType="email-address"
						onChangeText={(text) => setEmail(text)}
						style={[
							tw` w-80 px-3 py-3 mb-4 rounded-xl text-center shadow`,
							{ backgroundColor: '#F0E0E0' }
						]}
						autoComplete="email"
					/>

					<TextInput
						placeholder="Enter password"
						value={password}
						keyboardType="visible-password"
						style={[
							tw` w-80 px-3 py-3 mb-4 rounded-xl text-center shadow`,
							{ backgroundColor: '#F0E0E0' }
						]}
						onChangeText={(text) => setPassword(text)}
						autoComplete="password"
					/>
				</View>

				<View style={tw`mt-4`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						disabled={disable}
						onPress={handleLogin}
						style={[
							tw`flex justify-center shadow items-center w-80 rounded-full py-3 `,
							{ backgroundColor: '#CC0000', zIndex: 9999 }
						]}
					>
						<Text style={tw`text-white text-center font-bold text-base flex items-center text-xl`}>
							Login
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<FooterImg />
		</KeyboardAvoidingView>
	);
};

//make this component available to the app
export default Login;
