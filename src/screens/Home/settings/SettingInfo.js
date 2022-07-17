import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
// import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../../components/FooterImg';
import TopNav from '../../../components/TopNav';
import Cards from '../../../components/Cards';
import ActionButton from '../../../components/ActionButton';
import { deleteUser } from 'firebase/auth';
import useAuth from '../../../auth/useAuth';

// create a component
const SettingInfo = () => {
	const { user } = useAuth();
	// const navigation = useNavigation();

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
										<ActionButton InfoText="Delete my account." action={() => deleteUser(user)} />
									</View>
								</ScrollView>
							</View>
						</View>
					</View>
				</View>
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
