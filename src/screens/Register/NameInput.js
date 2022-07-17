//import liraries
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import FooterImg from '../../components/FooterImg';

// create a component
const NameInput = () => {
	const [ info, setInfo ] = useState('');
	const navigation = useNavigation();
	const [ name, setName ] = useState('');

	const nullField = !name;

	const setTheinfo = () => {
		if (name.length <= 2) {
			setInfo('Name must be more than 2 letters');
			setTimeout(() => {
				setInfo('');
			}, 2000);
		} else {
			setInfo('This is what users will see. This will be public.');
		}
	};

	const handleContinueRegistration = async () => {
		try {
			// get local storage
			const savedUser = await AsyncStorage.getItem('userDetails');
			const currentUser = JSON.parse(savedUser) || [];

			currentUser[0].name = name;
			await AsyncStorage.setItem('userDetails', JSON.stringify(currentUser));
			navigation.navigate('DobInput');
			return userDetails;
		} catch (error) {}
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl  pb-4` ]}>My Name is</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center`}>
					<TextInput
						placeholder="Your Name"
						keyboardType="default"
						value={name}
						onChangeText={setName}
						style={[
							tw` w-72 px-3 py-3 rounded-xl text-center shadow`,
							{ backgroundColor: '#F0E0E0', fontFamily: 'Regular' }
						]}
						autoComplete="name-given"
						onTextInput={setTheinfo}
						maxLength={20}
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
								{ fontFamily: 'Regular' },
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

export default NameInput;
