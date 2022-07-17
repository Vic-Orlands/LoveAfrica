import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import {
	Entypo,
	MaterialCommunityIcons,
	SimpleLineIcons,
	MaterialIcons,
	FontAwesome5
} from '@expo/vector-icons';
import ActionButton from './ActionButton';
import { collection, onSnapshot, query } from 'firebase/firestore';
import useAuth from '../auth/useAuth';
import { db } from '../../firebase';

const MyDrawers = (props) => {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ profile, setProfile ] = useState([]);

	useEffect(
		() => {
			let unsub;
			const fetchUsersProfiles = async () => {
				unsub = onSnapshot(query(collection(db, 'users')), (snapshot) => {
					setProfile(
						snapshot.docs.filter((doc) => doc.id === user.uid).map((doc) => ({
							id: doc.id,
							...doc.data()
						}))
					);
				});
			};

			fetchUsersProfiles();
			return unsub;
		},
		[ db ]
	);

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

	const UsableCard = ({ theText, theIcon, goTo }) => {
		return (
			<TouchableOpacity style={tw`w-full flex flex-row bg-gray-200 rounded-lg mt-3`} onPress={goTo}>
				<View style={tw`p-3  flex flex-row items-center justify-center w-full`}>
					<View style={tw` w-full flex flex-row items-center justify-center`}>
						<View style={tw`w-3/4 flex`}>
							<Text style={[ { fontFamily: 'Bold' }, tw` text-base` ]}>{theText}</Text>
						</View>
						<View style={tw`w-1/4  flex  items-end`}>{theIcon}</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<DrawerContentScrollView {...props} style={{ marginTop: -30 }}>
				<View style={tw`w-full flex items-center justify-center`}>
					<View style={[ { borderRadius: 40 }, tw`flex rounded-full border border-gray-200 p-1` ]}>
						<View
							style={[
								{ height: 80, width: 80, borderRadius: 40 },
								tw`flex rounded-full border border-gray-200`
							]}
						>
							<Image
								source={{ uri: profile[0]?.image }}
								style={[ { height: 80, width: 80, borderRadius: 40 }, tw`border border-2 p-6`]}
							/>
						</View>
					</View>
					<View style={tw`flex-row mt-1`}>
						<Entypo name="info-with-circle" size={20} color="#cc0000" onPress={() => navigation.navigate('ProfileInfo', { user: profile[0] })}  />
						<Text style={[ { fontFamily: 'Bold' }, tw`pl-2 text-base`]}>
							{profile[0]?.name}, {calculateAge(profile[0]?.dob)}
						</Text>
					</View>
					<Text style={[ { fontFamily: 'Regular' }, tw`text-sm` ]}>Not Verified</Text>
				</View>

				<View style={tw`px-4`}>
					<UsableCard
						theIcon={<FontAwesome5 name="user-edit" size={26} color="#CC0000" />}
						theText="Edit Profile"
						goTo={() => navigation.navigate('EditProfile')}
					/>
					<UsableCard
						theIcon={<MaterialCommunityIcons name="party-popper" size={28} color="#CC0000" />}
						theText="Explore"
					/>
					<UsableCard
						theIcon={<MaterialIcons name="verified" size={28} color="#cc0000" />}
						theText="Verify your Account"
					/>
					<UsableCard
						theIcon={<FontAwesome5 name="user-cog" size={26} color="#CC0000" />}
						theText="Settings"
						goTo={() => navigation.navigate('SettingInfo')}
					/>
					<UsableCard
						theIcon={<FontAwesome5 name="ad" size={28} color="#CC0000" />}
						theText="My Ad Preference"
					/>
					<UsableCard
						theIcon={<MaterialIcons name="support" size={28} color="#CC0000" />}
						theText="Help & Support"
						goTo={() => navigation.navigate('SettingInfo')}
					/>
				</View>
			</DrawerContentScrollView>
			<View style={[ { bottom: 0 }, tw`px-4 pb-3` ]}>
				<ActionButton InfoText="Log Out" InfoIcon={<SimpleLineIcons name="logout" size={24} color="white" />} />
			</View>
		</SafeAreaView>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	}
});

export default MyDrawers;
