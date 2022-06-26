import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import FooterImg from '../../components/FooterImg';

const InterestedIn = () => {
	const navigation = useNavigation();

	const [ bgColor, setColor ] = useState('');
	const [ interestedIn, setInterestedIn ] = useState('');

	const nullField = !interestedIn;
	const handleInterest = (props) => {
		setInterestedIn(props);
		setColor('#CC0000');
	};

	const handleContinueRegistration = async () => {
		try {
			const savedUser = await AsyncStorage.getItem('userDetails');
			const currentUser = JSON.parse(savedUser) || [];

			currentUser[0].interested_in = interestedIn;
			await AsyncStorage.setItem('userDetails', JSON.stringify(currentUser));
			navigation.navigate('ChoosePhoto');
		} catch (error) {}
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl text-center pb-4` ]}>Interested In</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center pt-4`}>
					<TouchableOpacity
						style={[
							tw` w-72 px-3 py-4 rounded-xl text-center shadow`,
							interestedIn === 'Male'
								? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
								: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
						]}
						onPress={() => handleInterest('Male')}
					>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Male</Text>
					</TouchableOpacity>
				</View>

				<View style={tw`flex items-center pt-4`}>
					<TouchableOpacity
						style={[
							tw` w-72 px-3 py-4 rounded-xl text-center shadow`,
							interestedIn === 'Female'
								? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
								: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
						]}
						onPress={() => handleInterest('Female')}
					>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Female</Text>
					</TouchableOpacity>
				</View>

				<View style={tw`flex items-center pt-4`}>
					<TouchableOpacity
						style={[
							tw` w-72 px-3 py-4 rounded-xl text-center shadow`,
							interestedIn === 'Both'
								? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
								: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
						]}
						onPress={() => handleInterest('Both')}
					>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Both</Text>
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
								tw`text-white text-center text-base flex items-center text-xl`
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

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50'
	}
});

//make this component available to the app
export default InterestedIn;
