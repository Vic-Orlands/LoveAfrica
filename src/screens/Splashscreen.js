import { Text, View, StyleSheet, Button } from 'react-native';
import React from 'react';
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

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50'
	}
});

export default Splashscreen;
