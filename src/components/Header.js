//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import img from '../../assets/splash.png';
import { AntDesign } from '@expo/vector-icons';

//!!!!!!!!!!!!!!!!!!!PLEASE CHECK THE ERROR IT POPS onNavigate  TO ANOTHER SCREEN!!!!!!!!!!!!!!!!!!!!!!

// create a component
const Header = ({ activeHome, activeLikes }) => {
	const navigation = useNavigation();

	return (
		<View style={[ styles.flex, tw`px-6 flex-row items-center pt-3` ]}>
			<TouchableOpacity onPress={() => navigation.openDrawer()}>
				<AntDesign name="menu-unfold" size={26} color="#000000" />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Feeds');
				}}
				style={activeHome}
			>
				<Image source={img} style={tw`h-6 w-6`} />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Likes');
				}}
				style={activeLikes}
			>
				<AntDesign name="star" size={26} color="#cc0000" />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Messages');
				}}
			>
				<AntDesign name="message1" size={26} color="#cc0000" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: {
		justifyContent: 'space-between'
	}
});

//make this component available to the app
export default Header;
