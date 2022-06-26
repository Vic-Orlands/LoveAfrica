import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';
import * as ImagePicker from 'expo-image-picker';
import tw from 'tailwind-react-native-classnames';

// create a component
const ChoosePhoto = () => {
	const navigation = useNavigation();
	const [ image, setImage ] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			quality: 1
		});
		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const handleContinueRegistration = async () => {
		try {
			const savedUser = await AsyncStorage.getItem('userDetails');
			const currentUser = JSON.parse(savedUser) || [];

			currentUser[0].image = image;
			await AsyncStorage.setItem('userDetails', JSON.stringify(currentUser));
			navigation.navigate('AlmostDone');
		} catch (error) {}
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl pb-4` ]}> Profile Photo</Text>
				</View>
				<View style={[ tw`flex items-center pt-4 rounded-xl pt-10 pb-4`, styles.rounded ]}>
					<Pressable onPress={pickImage}>
						<Image
							source={require('../../../assets/gallery.png')}
							style={{ width: 300, height: 150, resizeMode: 'contain' }}
						/>
					</Pressable>
				</View>

				<View style={tw`flex items-center`}>
					{image && (
						<Image
							source={{ uri: image }}
							style={{ width: 300, height: 250, resizeMode: 'contain', borderRadius: 7 }}
						/>
					)}
				</View>

				<View style={tw`mt-4`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						onPress={handleContinueRegistration}
						style={[
							tw`flex justify-center shadow items-center w-72 rounded-full py-3 `,
							{ backgroundColor: '#CC0000' }
						]}
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
	},
	rounded: {
		borderStyle: 'dashed'
	}
});

//make this component available to the app
export default ChoosePhoto;
