import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { View, Text, TouchableOpacity } from 'react-native';

const ActionButton = ({ InfoText, InfoIcon, action }) => {
	return (
		<View style={tw`w-full mt-4 flex`}>
			<View style={[ tw`w-full bg-gray-200 rounded-lg mt-1`, { backgroundColor: '#cc0000' } ]}>
				<TouchableOpacity style={tw`p-4 bottom-0 right-0 flex-row justify-center w-full`} onPress={action}>
					{InfoIcon}
					<Text
						style={[
							{ fontFamily: 'Bold' },
							tw` ml-4 text-center flex justify-center  text-white  text-base`
						]}
					>
						{InfoText}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ActionButton;
