import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';

// create a component
const Phone = () => {
	const navigation = useNavigation();
	return (
		<View style={tw`flex-1 items-center`}>
			<View style={tw`flex-1 content-center items-center p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl text-center pb-4` ]}>Phone Verification</Text>
				</View>
				<View style={tw`flex justify-center items-center`}>
					<Text style={[ { fontFamily: 'Regular' }, tw`text-base max-w-xs px-4 pt-8` ]}>
						LOVEAFRICA needs you to verify your identity. Please enter your phone number to receive a text
						message with a verification code.
					</Text>
				</View>
				<View style={tw`mt-24`} />
				<View style={tw` flex justify-center items-center`}>
					<Text style={[ { fontFamily: 'Light' }, tw`max-w-xs text-xs pb-12 opacity-50` ]}>
						Your Number will not be shared with anyone.
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate('PhoneNumber')}
						style={[
							tw`flex justify-center items-center w-72 rounded-full py-4 `,
							{ backgroundColor: '#CC0000' }
						]}
					>
						<Text
							style={[ { fontFamily: 'Bold' }, tw`text-white text-center  text-base flex items-center` ]}
						>
							Verify Now
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<FooterImg />
			</View>
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
export default Phone;
