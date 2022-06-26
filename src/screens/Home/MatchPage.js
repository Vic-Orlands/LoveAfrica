import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const MatchPage = () => {
	const navigation = useNavigation();
	const { params } = useRoute();
	const { loggedInProfile, userSwiped } = params;

	return (
		<View style={[ tw`h-full bg-red-500 pt-20`, { opacity: 0.89 } ]}>
			<View style={tw`justify-center px-10 pt-20`}>
				<Text style={[ tw`text-white text-center mt-5 font-bold`, { fontSize: 60 } ]}>Perfect!</Text>
				<Text style={[ tw`text-white text-center font-bold`, { fontSize: 60 } ]}>It's a Match</Text>
				<Text style={tw`text-white text-center text-lg mt-2`}>
					You and {userSwiped.name} have liked each other
				</Text>
			</View>

			<View style={tw`flex-row justify-evenly mt-5`}>
				<Image style={tw`h-40 w-40 rounded-full`} source={{ uri: loggedInProfile.image }} />
				<Image style={tw`h-40 w-40 rounded-full`} source={{ uri: userSwiped.image }} />
			</View>

			<TouchableOpacity
				style={tw`bg-white m-5 px-8 py-4 rounded-full mt-20`}
				onPress={() => navigation.navigate('Messages')}
			>
				<Text style={tw`text-center text-xl font-bold`}>Send a message</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MatchPage;
