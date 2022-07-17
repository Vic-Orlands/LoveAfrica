//import liraries
import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	Pressable,
	ImageBackground,
	SafeAreaView
} from 'react-native';
import { Ionicons, AntDesign, FontAwesome, FontAwesome5, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../../components/FooterImg';
import ImageView from 'react-native-image-viewing';
import Slider from '@react-native-community/slider';
// import * as MediaLibrary from 'expo-media-library';
import tw from 'tailwind-react-native-classnames';
import TopNav from '../../../components/TopNav';
import myImgs from '../../../../assets/splash.png';
import Cards from '../../../components/Cards';

// create a component
const EditProfile = () => {
	const navigation = useNavigation();
	const [ Age, setAge ] = useState(30);
	const [ Miles, setMiles ] = useState(0);
	const [ image, setImage ] = useState([]);

	//select images
	// const imagesCallback = (callback) => {
	// 	const { navigation } = this.props;
	// 	this.props.navigation.setOptions({
	// 		headerRight: () => this._getHeaderLoader()
	// 	});

	// 	callback
	// 		.then(async (photos) => {
	// 			const cPhotos = [];
	// 			for (let photo of photos) {
	// 				const pPhoto = await _processImageAsync(photo.uri);
	// 				cPhotos.push({
	// 					uri: pPhoto.uri,
	// 					name: photo.filename,
	// 					type: 'image/jpg'
	// 				});
	// 			}
	// 			navigation.navigate('Main', { photos: cPhotos });
	// 		})
	// 		.catch((e) => console.log(e));
	// };

	// const _processImageAsync = async (uri) => {
	// 	const file = await ImageManipulator.manipulateAsync(uri, [ { resize: { width: 1000 } } ], {
	// 		compress: 0.8,
	// 		format: ImageManipulator.SaveFormat.JPEG
	// 	});
	// 	return file;
	// };

	// const updateHandler = (count, onSubmit) => {
	// 	this.props.navigation.setOptions({
	// 		title: `Selected ${count} files`,
	// 		headerRight: () => this._renderDoneButton(count, onSubmit)
	// 	});
	// };

	const Photo = ({ ImageHere, icon }) => {
		return (
			<React.Fragment>
				<View>
					<View style={tw`w-24 h-24 relative rounded-xl `}>
						<ImageBackground source={ImageHere} resizeMode="cover" style={tw`h-full w-full rounded-xl`}>
							<View
								style={[
									{ backgroundColor: '#cc0000' },
									tw` rounded-full right-0 absolute bottom-0 flex-row items-center`
								]}
							>
								<View>
									<TouchableOpacity>{icon}</TouchableOpacity>
								</View>
							</View>
						</ImageBackground>
					</View>
				</View>
			</React.Fragment>
		);
	};

	const AddImage = () => {
		return (
			<React.Fragment>
				<View style={tw`mb-6 flex-row justify-evenly`}>
					<Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
					<Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
					<Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
				</View>

				<View style={tw`mb-6 flex-row justify-evenly`}>
					<Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
					<Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
					<Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
				</View>

				<View style={[ tw`w-full bg-gray-200 rounded-lg mt-1`, { backgroundColor: '#cc0000' } ]}>
					<TouchableOpacity
						style={tw`p-4 bottom-0 right-0 flex-row justify-center w-full`}
						// onPress={pickImage}
					>
						<AntDesign name="plussquare" size={24} color="white" />
						<Text
							style={[
								{ fontFamily: 'Bold' },
								tw` ml-4 text-center flex justify-center  text-white  text-base`
							]}
						>
							Add to Gallery
						</Text>
					</TouchableOpacity>
				</View>

				{/* <View style={[ tw`w-full bg-gray-200 rounded-lg mt-1`, { backgroundColor: '#cc0000' } ]}>
					<ImageBrowser max={4} onChange={updateHandler} callback={imagesCallback} />
				</View> */}

				{/* <ImageView images={image} imageIndex={0} visible={visible} onRequestClose={() => setIsVisible(false)} /> */}
			</React.Fragment>
		);
	};

	const SettingMyProfile = () => {
		return (
			<React.Fragment>
				<View style={tw`w-full `}>
					{/* Add Profile Images */}
					<AddImage />
					{/*  */}
					<View style={tw`mt-12`} />
					<Text style={[ { fontFamily: 'Bold' }, tw` text-xl` ]}>My Settings</Text>

					<Cards
						title="Phone Number"
						slug="+1234567890"
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
					/>
					<Cards
						title="Allow User to call"
						yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />}
					/>
					<Cards title="Change Password" yes={<Ionicons name="key-sharp" size={24} color="#cc0000" />} />
					<Cards
						title="Enable push Notifications"
						yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />}
					/>
					<Cards
						title="Show my socials to the public."
						yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />}
					/>
					<Cards
						title="Snapchat"
						slug={<FontAwesome name="snapchat" size={24} color="yellow" />}
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
					/>
				</View>
			</React.Fragment>
		);
	};

	const MyProfilePreference = () => {
		return (
			<React.Fragment>
				<View style={tw`w-full mt-8`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-xl` ]}>My Preferences (Show Me).</Text>
					<Cards title="Men" yes={<Feather name="toggle-left" size={28} color="#cc0000" />} />
					<Cards
						title=" Nigeria"
						slug={<Feather name="flag" size={20} color="#cc0000" />}
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
					/>

					<Text style={tw`mt-5 pl-1`}>Age</Text>
					<Cards
						title={
							<Slider
								minimumValue={18}
								maximumValue={70}
								value={Age}
								minimumTrackTintColor="#cc0000"
								maximumTrackTintColor="gray"
								onValueChange={(value) => setAge(Math.floor(value))}
								style={[ { width: 150 }, tw`` ]}
								thumbTintColor="#cc0000"
							/>
						}
						yes="18 - "
						no={Math.floor(Age)}
					/>

					<Text style={tw`mt-5 pl-1`}>Distance</Text>
					<Cards
						title={
							<Slider
								minimumValue={0}
								maximumValue={5}
								value={Miles}
								minimumTrackTintColor="#cc0000"
								maximumTrackTintColor="gray"
								onValueChange={(value) => setMiles(Math.floor(value))}
								style={[ { width: 150 }, tw`` ]}
								thumbTintColor="#cc0000"
							/>
						}
						no="mi"
						yes={Math.floor(Miles)}
					/>

					<Cards title="Clear cache" yes={<FontAwesome5 name="database" size={24} color="#cc0000" />} />
				</View>
			</React.Fragment>
		);
	};

	return (
		<SafeAreaView style={[ styles.container, tw`` ]}>
			{/* Top Navigation */}
			<TopNav Title="Edit Profile" />

			<ScrollView style={tw`h-full `}>
				<View style={tw`flex-1`}>
					<View style={tw`flex`}>
						<View style={tw`w-full`}>
							<View style={tw`px-6 w-full`}>
								<View style={tw`pb-4 mt-8 h-full`}>
									{/* PROFILE SETUP */}
									<SettingMyProfile />
									{/* PROFILE SETUP */}

									<MyProfilePreference />
								</View>
							</View>
						</View>
					</View>
				</View>
				<View style={tw`my-6 `} />
				<FooterImg />
			</ScrollView>
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
export default EditProfile;
