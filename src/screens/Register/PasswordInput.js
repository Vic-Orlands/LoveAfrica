import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

// create a component
const PasswordInput = () => {
	const navigation = useNavigation();
	const [ info, setInfo ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	// disable button untill there is an input on the text inputs
	const nullField = !password || !confirmPassword;

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
					borderRadius: 15,
					transform: [ { scaleX: 0.5 } ]
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		)
	};

	const handleContinueRegistration = async () => {
		if (password.length <= 5) {
			setInfo(true);
			setTimeout(() => {
				setInfo('');
			}, 2000);
		} else if (password === confirmPassword) {
			const savedUser = await AsyncStorage.getItem('userDetails');
			const currentUser = JSON.parse(savedUser) || [];

			// get local storage
			currentUser[0].password = password;
			currentUser[0].confirm_password = confirmPassword;
			await createUserWithEmailAndPassword(auth, currentUser[0].email_address, currentUser[0].password)
				.then((res) => {
					AsyncStorage.setItem('userDetails', JSON.stringify(currentUser));
					navigation.navigate('NameInput');
				})
				.catch((error) => {
					if (error.message.includes('Error (auth/email-already-in-use).')) {
						Toast.show({
							type: 'error',
							position: 'top',
							text1: `Error: Email is already registered`
						});
					}
				});
			return currentUser;
		} else {
			setError(true);
			setTimeout(() => {
				setError('');
			}, 3500);
		}
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>
			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Regular', zIndex: -3 }, tw` text-3xl  pb-4` ]}>Password</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center`}>
					<Text style={[ { fontFamily: 'Regular' }, tw`text-sm w-72 pt-2` ]}>Password</Text>
					<TextInput
						placeholder="************"
						keyboardType="default"
						value={password}
						onChangeText={setPassword}
						style={[ tw` w-72 px-3 py-3 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' } ]}
						returnKeyType="done"
						autoComplete="password"
						secureTextEntry={true}
					/>
				</View>

				<View style={tw`flex items-center pt-4`}>
					<Text style={[ { fontFamily: 'Regular' }, tw`text-sm w-72 pt-2` ]}>Re-enter password</Text>
					<TextInput
						placeholder="************"
						keyboardType="default"
						value={confirmPassword}
						style={[ tw` w-72 px-3 py-3 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' } ]}
						returnKeyType="done"
						onChangeText={setConfirmPassword}
						autoComplete="password"
						secureTextEntry={true}
					/>
					{info ? <Text>Password must be greater than 6 characters</Text> : null}
					{error ? <Text>Password does not match</Text> : null}
				</View>

				<View style={tw`mt-24`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						onPress={handleContinueRegistration}
						style={[
							tw`flex justify-center shadow items-center w-72 rounded-full py-3 `,
							{ backgroundColor: '#CC0000' }
						]}
						disabled={nullField}
					>
						<Text
							style={[
								{ fontFamily: 'Bold' },
								tw`text-white text-center  text-base flex items-center text-xl`
							]}
						>
							Continue
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<FooterImg />
		</View>
	);
};

//make this component available to the app
export default PasswordInput;
