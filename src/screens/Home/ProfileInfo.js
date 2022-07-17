//import liraries
import React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	StatusBar,
	Image,
	TouchableOpacity,
	Pressable
} from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import TopNav from '../../components/TopNav';
import Cards from '../../components/Cards';

// create a component
const ProfileInfo = ({ route }) => {
	//calculate age from returned dob
	const calculateAge = (dateString) => {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age
	};

	const ImgCarousel = ({ fileName }) => {
		return (
			<View style={tw`border rounded-xl mr-4 border-gray-200`}>
				<Image style={tw`h-32 w-32`} source={fileName} />
			</View>
		);
	};

	return (
		<SafeAreaView style={[ styles.container, tw`` ]}>
			{/* Top Navigation */}
			<TopNav />

			<ScrollView style={tw`h-full `}>
				<View style={tw`flex-1 px-4`}>
					<View style={tw`mt-4`} />

					{/* User Info Header */}
					<View style={tw`flex items-center justify-center`}>
						<View>
							<Image
								source={{ uri: route.params.user.image }}
								style={tw`h-20 w-20 rounded-full border `}
							/>
						</View>
						<View style={tw`pt-1 `}>
							<Text style={[ { fontFamily: 'Bold' }, tw`text-xl  ` ]}>
								{route.params.user.name}, {calculateAge(route.params.user.dob)}{' '}
							</Text>
							<Text
								style={[
									{ fontFamily: 'Light' },
									tw`italic text-xs font-bold text-center opacity-50 `
								]}
							>
								34Km away
							</Text>
						</View>
					</View>

					{/* Icon actions. this should be removed later on */}
					<View style={tw` pb-8 w-full `}>
						<View style={tw`flex flex-row justify-evenly mx-5 items-center bottom-0  pt-4 `}>
							<View style={[ tw`flex justify-center items-center ` ]}>
								<TouchableOpacity style={[ tw`  rounded-full ` ]}>
									<AntDesign name="message1" size={32} color="#cc0000" />
								</TouchableOpacity>
								<Text style={[ { fontFamily: 'Regular' }, tw`text-xs text-center` ]}>Message</Text>
							</View>

							<View style={[ tw`flex justify-center items-center ` ]}>
								<TouchableOpacity style={[ tw`  rounded-full ` ]}>
									<MaterialIcons name="call" size={32} color="#cc0000" />
								</TouchableOpacity>
								<Text style={[ { fontFamily: 'Regular' }, tw`text-xs text-center` ]}>Call</Text>
							</View>

							<View style={[ tw`flex justify-center items-center ` ]}>
								<TouchableOpacity style={[ tw`  rounded-full ` ]}>
									<Ionicons name="videocam" size={32} color="#cc0000" />
								</TouchableOpacity>
								<Text style={[ { fontFamily: 'Regular' }, tw`text-xs text-center` ]}>Video Call</Text>
							</View>
						</View>
					</View>

					{/* About me */}
					<View style={tw` pb-8 px-2 w-full `}>
						<View>
							<Text style={[ { fontFamily: 'Bold' }, tw` text-xl  text-red-600  ` ]}>About Me.</Text>
						</View>

						<View style={tw` `}>
							<Text style={[ { fontFamily: 'Regular', lineHeight: 23 }, tw` pt-3` ]}>
								{route.params.user.email_address}
							</Text>
						</View>
					</View>

					{/* Passion and Interest */}
					<View style={tw` px-2 pb-8 w-full `}>
						<View>
							<Text style={[ { fontFamily: 'Bold' }, tw` text-xl  text-red-600  ` ]}>
								Passions & Interests.
							</Text>
						</View>

						<View style={tw` w-full `}>
							<View style={tw`w-full flex-row items-start justify-start flex-wrap`}>
								{route.params.user.hobbies.map((hobb) => (
									<Pressable
										style={tw`border mt-2 border-gray-300 p-2 mx-1 flex justify-center  rounded-full`}
									>
										<Text style={[ { fontFamily: 'Regular' }, tw`` ]}>{hobb}</Text>
									</Pressable>
								))}
							</View>
						</View>
					</View>

					{/* Interest */}
					<View style={tw`px-2 pb-8 w-full `}>
						<Cards title="Interested In" slug={route.params.user.interested_in} />
					</View>

					{/* Socials. This should be removed later */}
					<View style={tw` px-2 pb-8 w-full `}>
						<View>
							<Text style={[ { fontFamily: 'Bold' }, tw` text-xl  text-red-600  ` ]}>Socials.</Text>
						</View>
						<View style={tw` w-full `}>
							<Cards title="Snapchat" yes="Women" />
							<Cards title="Instagram" yes="Women" />
						</View>
					</View>

					{/* Chat starter */}
					<View style={tw` px-2 pb-8 w-full `}>
						<View>
							<Text style={[ { fontFamily: 'Bold' }, tw` text-xl  text-red-600  ` ]}>Say Hello.</Text>
						</View>
						{/* <View style={tw` w-full`}><Cards title="Chat Starter" /></View> */}
					</View>

					{/* Media Images */}
					<View style={tw` px-2 pb-8 w-full `}>
						<View>
							<Text style={[ { fontFamily: 'Bold' }, tw` text-xl  text-red-600  ` ]}>Media.</Text>
						</View>
						<View style={tw` w-full `}>
							<ScrollView horizontal disableIntervalMomentum={true}>
								<ImgCarousel fileName={{ uri: route.params.user.image }} />
							</ScrollView>
						</View>
					</View>

					<View style={tw`px-2 pb-8 w-full `}>
						<Cards title="Block User" yes={<FontAwesome name="toggle-off" size={28} color="#cc0000" />} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	},
	flex: {
		justifyContent: 'space-between'
	},
	wei: {
		fontWeight: 900
	}
});

export default ProfileInfo;
