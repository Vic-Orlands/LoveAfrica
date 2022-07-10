import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SenderMessage = ({ message }) => {
	return (
		<View
			style={[
				tw`bg-red-500 rounded-xl rounded-tr-none px-4 py-3 mx-3 my-1`,
				{ alignSelf: 'flex-start', marginLeft: 'auto' }
			]}
		>
			<Text style={tw`text-white`}>{message.message}</Text>
		</View>
	);
};

export default SenderMessage;
