import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const Splashscreen = () => {
	const navigation = useNavigation();

	return (
		<View>
			<Text style={tw`text-red-600`}>Splashscreen Here</Text>
			<Button title="Go to Home Screen" onPress={() => navigation.navigate('Home')} />
		</View>
	);
};

export default Splashscreen;
