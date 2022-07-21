//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';

// create a component
const Gender = () => {
	const navigation = useNavigation();

	const [ bgColor, setColor ] = useState('');
	const [ gender, setGender ] = useState('');

	const nullField = !gender;
	const handleSetGender = (props) => {
		setGender(props);
		setColor('#CC0000');
	};

	const handleContinueRegistration = async () => {
		try {
			// get local storage
			const savedUser = await AsyncStorage.getItem('userDetails');
			const currentUser = JSON.parse(savedUser) || [];

			currentUser[0].sex = gender;
			await AsyncStorage.setItem('userDetails', JSON.stringify(currentUser));
			navigation.navigate('InterestedIn');
		} catch (error) {}
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl text-center pb-4` ]}>Gender</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center pt-4`}>
					<TouchableOpacity
						style={[
							tw` w-72 px-3 py-4 rounded-xl text-center shadow`,
							gender === 'Male'
								? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
								: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
						]}
						onPress={() => handleSetGender('Male')}
					>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Male</Text>
					</TouchableOpacity>
				</View>

				<View style={tw`flex items-center pt-4`}>
					<TouchableOpacity
						style={[
							tw` w-72 px-3 py-4 rounded-xl text-center shadow`,
							gender === 'Female'
								? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
								: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
						]}
						onPress={() => handleSetGender('Female')}
					>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Female</Text>
					</TouchableOpacity>
				</View>

				<View style={tw`flex items-center pt-4`}>
					<TouchableOpacity
						style={[
							tw` w-72 px-3 py-4 rounded-xl text-center shadow`,
							gender === 'Prefer Not to say'
								? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
								: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
						]}
						onPress={() => handleSetGender('Prefer Not to say')}
					>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Prefer Not to say</Text>
					</TouchableOpacity>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Gender;
