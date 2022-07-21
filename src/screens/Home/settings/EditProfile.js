//import liraries
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StatusBar,
	ScrollView,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import { Ionicons, AntDesign, FontAwesome, FontAwesome5, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../../components/FooterImg';
import * as ImagePicker from 'expo-image-picker';
import tw from 'tailwind-react-native-classnames';
import TopNav from '../../../components/TopNav';
import myImgs from '../../../../assets/splash.png';
import Cards from '../../../components/Cards';

// import react toastify module
import { onSnapshot, query, collection, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import useAuth from '../../../auth/useAuth';
import { db } from '../../../../firebase';

// create a component
const EditProfile = () => {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ profile, setProfile ] = useState([]);
	const [ image, setImage ] = useState(null);
	const [ loading, setLoading ] = useState(false);

	useEffect(
		() =>
			onSnapshot(query(collection(db, 'users')), (snapshot) => {
				setProfile(
					snapshot.docs.filter((doc) => doc.id === user.uid).map((doc) => ({
						id: doc.id,
						...doc.data()
					}))
				);
			}),
		[]
	);

	//select images
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

	//calculate age from returned dob
	const calculateAge = (dateString) => {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	const handleSaveImage = async () => {
		setLoading(true);
		await updateDoc(doc(db, 'users', user.uid), {
			image: image,
			timeStamp: serverTimestamp()
		})
			.then(() => {
				setLoading(false);

				Toast.show({
					type: 'success',
					position: 'top',
					text1: `Image has been saved successfully!`
				});

				setTimeout(() => {
					navigation.navigate('Feeds');
				}, 2000);
			})
			.catch((error) => {
				setLoading(false);
				Toast.show({
					type: 'error',
					position: 'top',
					text1: error.code,
					text2: 'Reset password or try again later'
				});
			});
	}

	const Photo = ({ ImageHere, icon }) => {
		return (
			<React.Fragment>
				<View>
					{image ? (
						<View style={tw`w-24 h-24 relative rounded-3xl`}>
							<ImageBackground source={{ uri: image }} resizeMode="cover" style={tw`h-full w-full`}>
								<View
									style={[
										{ backgroundColor: '#cc0000'},
										tw` rounded-full right-0 absolute bottom-0 flex-row items-center`
									]}
								>
									<View>
										<TouchableOpacity onPress={() => setImage(null)}>{icon}</TouchableOpacity>
									</View>
								</View>
							</ImageBackground>
						</View>
					) : (
						<View style={tw`w-24 h-24 relative rounded-xl`}>
							<ImageBackground source={ImageHere} resizeMode="cover" style={tw`h-full w-full`}>
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
					)}
				</View>
			</React.Fragment>
		);
	};

	const AddImage = () => {
		return (
			<React.Fragment>
				<View style={tw`mb-6 flex-row justify-evenly`}>
					<Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
				</View>

				<View style={[ tw`w-full bg-gray-200 rounded-lg mt-1`, { backgroundColor: '#cc0000' } ]}>
				{!image ? <TouchableOpacity
						style={tw`p-4 bottom-0 right-0 flex-row justify-center w-full`}
						onPress={pickImage}
					>
						<AntDesign name="plussquare" size={24} color="white" />
						<Text
							style={[
								{ fontFamily: 'Bold' },
								tw` ml-4 text-center flex justify-center  text-white text-base`
							]}
						>
							Change Avatar
						</Text>
					</TouchableOpacity> : 
					<TouchableOpacity
					style={tw`p-4 bottom-0 right-0 flex-row justify-center w-full`}
					onPress={handleSaveImage}
				>
					<AntDesign name="plussquare" size={24} color="white" />
					<Text
						style={[
							{ fontFamily: 'Bold' },
							tw` ml-4 text-center flex justify-center  text-white  text-base`
						]}
					>
						{ !loading ? "Update Avatar" : "Updating..."}
					</Text>
				</TouchableOpacity>
					}
				</View>
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
						title="Profile Name"
						slug={profile[0]?.name}
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
						action={() => navigation.navigate('ChangeName')}
					/>

					<Cards
						title="Phone Number"
						slug={profile[0]?.phone_number}
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
						action={() => navigation.navigate('ChangePhoneNumber')}
					/>
					{/* <Cards
						title="Allow User to call"
						yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />}
					/> */}

					<Cards
						title="Change Password"
						action={() => navigation.navigate('ChangePassword')}
						yes={<Ionicons name="key-sharp" size={24} color="#cc0000" />}
					/>

					{/* <Cards
						title="Enable push Notifications"
						yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />}
					/> */}
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
					<Text style={[ { fontFamily: 'Bold' }, tw` text-xl` ]}>My Preferences</Text>
					<Cards
						title={profile[0]?.interested_in === "Male" ? "Men" : profile[0]?.interested_in === "Female" ? "Women" : "Both Men and Female" }
						action={() => navigation.navigate('ChangeInterest')}
						 yes={<Feather name="toggle-left" size={28} color="#cc0000" />}
					/>

					<Cards
						title=" Nigeria"
						slug={<Feather name="flag" size={20} color="#cc0000" />}
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
					/>

					<Text style={tw`mt-5 pl-1`}>Age</Text>
					<Cards
						title="Age"
						slug={calculateAge(profile[0]?.dob)}
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
						action={() => navigation.navigate('ChangeAge')}
					/>

					<Text style={tw`mt-5 pl-1`}>Gender</Text>
					<Cards
						title="Gender"
						slug={profile[0]?.sex}
						yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />}
						action={() => navigation.navigate('ChangeGender')}
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
