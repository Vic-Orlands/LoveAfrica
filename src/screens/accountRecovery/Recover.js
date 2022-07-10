//import liraries
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';

const Email = () => {
	return <MaterialIcons name="email" size={24} color="white" />;
};

const Recover = () => {
	const navigation = useNavigation();

	return (
		<View style={tw`flex-1 items-center`}>
			<View style={tw`flex-1 content-center items-center p-4`}>
				<View style={tw`mt-24`} />
				<View style={tw`pt-2`}>
					<Text style={tw`font-bold text-3xl text-center pb-4`}>Recover Your Account</Text>
				</View>
				<View style={tw`flex justify-center items-center`}>
					<Text style={tw`text-base`}>Unable to access your account?</Text>
					<Text style={tw`pt-1 text-base max-w-md`}>
						Click the button below to begin retrieving your account.
					</Text>
				</View>
				<View style={tw`mt-12 flex justify-center items-center`}>
					<TouchableOpacity
						onPress={() => navigation.navigate('EmailRecover')}
						style={[
							tw`flex flex-row justify-center items-center w-72 rounded-full py-4 `,
							{ backgroundColor: '#CC0000' }
						]}
					>
						<Email style={tw`text-left`} />
						<Text style={tw`text-white text-center font-bold text-base ml-2`}>Recover with Email</Text>
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
		backgroundColor: '#fff'
	}
});

export default Recover;
