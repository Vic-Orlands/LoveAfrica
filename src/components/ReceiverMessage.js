import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const ReceiverMessage = ({ message }) => {
	return (
		<View style={tw`flex flex-row mx-3 my-1`}>
			<Image source={{ uri: message.image }} style={tw`h-12 w-12 rounded-full mr-2`} />
			<Text style={tw`text-white px-4 pt-3 bg-gray-600 rounded-xl rounded-tl-none`}>{message.message}</Text>
		</View>
	);
};

export default ReceiverMessage;
