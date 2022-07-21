import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import ActionButton from '../../../components/ActionButton';
import FooterImg from '../../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';
import TopNav from '../../../components/TopNav';
import Cards from '../../../components/Cards';
import DeleteUser from './DeleteUser';

// create a component
const SettingInfo = () => {
	const [ modalVisible, setModalVisible ] = useState(false);

	const handleOpenModal = () => {
		setModalVisible(!modalVisible);
	};

	const handleCloseModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<SafeAreaView style={[ styles.container, tw`` ]}>
			<View style={tw`flex-1`}>
				<View style={tw`flex`}>
					<TopNav Title="Settings" />
					<View style={tw`w-full`}>
						<View style={tw`px-6 w-full`}>
							<View style={tw`pb-4 mt-8 h-full`}>
								<ScrollView style={tw`h-full `}>
									<View style={tw`w-full `}>
										<Text style={[ { fontFamily: 'Bold' }, tw` text-xl` ]}> Legal.</Text>

										<Cards title=" Terms of Service." />
										{/* action={() => navigation.navigate("EditProfile")} */}

										<Cards title=" Privacy and Policy." />
										{/* // action={() => navigation.navigate("EditProfile")} */}
									</View>

									<View style={tw`w-full mt-8`}>
										<Text style={[ { fontFamily: 'Bold' }, tw`text-xl` ]}>Contact Us.</Text>
										<Cards title="  Help and support." />
										{/* // action={() => navigation.navigate("EditProfile")} */}

										<Cards title=" About Us." />
										{/* // action={() => navigation.navigate("EditProfile")} */}

										<Cards title="FAQs." />
										{/* // action={() => navigation.navigate("EditProfile")} */}
									</View>

									<View style={tw`w-full mt-24 flex`}>
										<ActionButton InfoText="Delete my account." action={handleOpenModal} />
									</View>
								</ScrollView>
							</View>
						</View>
					</View>
				</View>

				<DeleteUser visible={modalVisible} closeModal={handleCloseModal} />
			</View>
			<FooterImg />
		</SafeAreaView>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	},
	flex: {
		justifyContent: 'space-between'
	}
});

//make this component available to the app
export default SettingInfo;
