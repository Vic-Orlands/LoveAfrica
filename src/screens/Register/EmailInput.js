//import liraries
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import FooterImg from '../../components/FooterImg';

// create a component
const EmailInput = () => {
	const [ info, setInfo ] = useState('');
	const navigation = useNavigation();
	const [ email, setEmail ] = useState('');

	const handleContinueRegistration = async () => {
		try {
			const userDetails = [];
			// get local storage
			const savedUser = await AsyncStorage.getItem('userDetails');
			const currentUser = JSON.parse(savedUser);

			// spread current user in new obj
			const obj = {
				email_address: email,
				...currentUser
			};
			userDetails.push(obj);
			await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
			navigation.navigate('PasswordInput');
		} catch (error) {
			console.log(error);
			console.log('error code:'.error.code);
		}
	};

	const nullField = !email;

	const setTheinfo = () => {
		setInfo('We will send a message to this email if you need to restore access to your account.');
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl  pb-4` ]}> Email Account</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center`}>
					<TextInput
						placeholder="Your email"
						value={email}
						keyboardType="email-address"
						onChangeText={setEmail}
						style={[
							tw` w-72 px-3 py-3 rounded-xl text-center shadow`,
							{ backgroundColor: '#F0E0E0', fontFamily: 'Light' }
						]}
						autoComplete="email"
						onTextInput={setTheinfo}
					/>
					<Text style={[ { fontFamily: 'Light' }, tw`pl-3 flex items-center text-xs w-72 pt-2` ]}>
						{info}
					</Text>
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
export default EmailInput;
