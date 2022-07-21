//import liraries
import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	StatusBar,
	StyleSheet,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	Pressable
} from 'react-native';
import Header from '../../components/Header';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

import { collection, getDocs, onSnapshot, where, query } from 'firebase/firestore';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import useAuth from '../../auth/useAuth';
import { db } from '../../../firebase';

// create a component
const Likes = () => {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ likes, setLikes ] = useState(true);
	const [ likedUsers, setLikedusers ] = useState([]);
	const [ matchedUsers, setMatchedusers ] = useState([]);

	useEffect(
		() => {
			let unsub;
			const fetchUsersProfiles = async () => {
				unsub = await getDocs(collection(db, 'users', user.uid, 'likes')).then((snapshot) =>
					setLikedusers(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data()
						}))
					)
				);
			};

			fetchUsersProfiles();
			return unsub;
		},
		[ db ]
	);

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'matches'), where('usersMatched', 'array-contains', user.uid)),
				(snapshot) =>
					setMatchedusers(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data()
						}))
					)
			),
		[ user ]
	);

	const Liked = ({ item, details, user }) => {
		const matchUsersInfo = !likes ? getMatchedUserInfo(details.users, user.uid) : null;

		return (
			<View style={tw`w-full`}>
				{likes ? (
					<View>
						<View
							style={[ tw`w-40 h-40 relative`, { borderRadius: 5, borderWidth: 2, borderColor: '#ddd' } ]}
						>
							<Pressable onPress={() => navigation.navigate('ProfileInfo', { user: item })}>
								<ImageBackground
									source={{ uri: item.image }}
									resizeMode="cover"
									style={tw`h-full w-full`}
								>
									<View style={tw`bg-black bg-opacity-25 w-full left-0 absolute bottom-0`}>
										<Text
											style={[
												{ fontFamily: 'Bold' },
												tw` text-white p-2 text-xs overflow-hidden  `
											]}
										>
											{item.name}
										</Text>
									</View>
								</ImageBackground>
							</Pressable>
						</View>
					</View>
				) : (
					<View>
						<View
							style={[ tw`w-40 h-40 relative`, { borderRadius: 5, borderWidth: 2, borderColor: '#ddd' } ]}
						>
							<Pressable onPress={() => navigation.navigate('ProfileInfo', { user: matchUsersInfo })}>
								<ImageBackground
									source={{ uri: matchUsersInfo.image }}
									resizeMode="cover"
									style={tw`h-full w-full`}
								>
									<View style={tw`bg-black bg-opacity-25 w-full left-0 absolute bottom-0`}>
										<Text
											style={[
												{ fontFamily: 'Bold' },
												tw` text-white p-2 text-xs overflow-hidden`
											]}
										>
											{matchUsersInfo.name}
										</Text>
									</View>
								</ImageBackground>
							</Pressable>
						</View>
					</View>
				)}
			</View>
		);
	};

	return (
		<SafeAreaView style={[ styles.container ]}>
			<View style={tw`mt-3 h-full`}>
				{/* Header */}
				<View>
					<Header activeLikes={tw`underline border-b-2 border-red-700  pb-1`} />
				</View>
				{/* Header */}

				<View style={tw`px-6 border-t border-b border-gray-200 mt-6 flex  flex-row w-full justify-around`}>
					<TouchableOpacity style={tw`p-2`} onPress={() => setLikes(true)}>
						<Text
							style={[
								likes
									? { fontFamily: 'Regular', opacity: 1, fontWeight: 'bold' }
									: { fontFamily: 'Regular', opacity: 0.4, fontWeight: 'bold' },
								tw`text-xl w-full`
							]}
						>
							My Likes
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={tw`p-2`} onPress={() => setLikes(false)}>
						<Text
							style={[
								!likes
									? { fontFamily: 'Regular', opacity: 1, fontWeight: 'bold' }
									: {
											fontFamily: 'Regular',
											opacity: 0.4,
											fontWeight: 'bold'
										},
								tw`text-xl w-full`
							]}
						>
							My Matches
						</Text>
					</TouchableOpacity>
				</View>

				<View style={tw`mt-5`} />
				{likes ? (
					<View style={tw`px-6 mb-6 w-full`}>
						{likedUsers.length > 0 ? (
							<View>
								<FlatList
									data={likedUsers}
									renderItem={Liked}
									extraData={likedUsers}
									keyExtractor={(item) => item.id}
									contentContainerStyle={{
										flexGrow: 1,
										justifyContent: 'space-between',
										flexDirection: 'row'
									}}
								/>
							</View>
						) : (
							<View style={tw`w-full flex flex-row justify-evenly items-center`}>
								<Text style={[ { fontFamily: 'Bold', fontSize: 20 }, tw` text-black p-2` ]}>
									You haven't liked anybody yet
								</Text>
							</View>
						)}
					</View>
				) : (
					<View style={tw`px-6 mb-6 w-full`}>
						{matchedUsers.length > 0 ? (
							<View style={tw``}>
								<FlatList
									data={matchedUsers}
									extraData={matchedUsers}
									keyExtractor={(item) => item.id}
									renderItem={({ item }) => <Liked details={item} user={user} />}
									contentContainerStyle={{
										flexGrow: 1,
										justifyContent: 'space-between',
										flexDirection: 'row'
									}}
								/>
							</View>
						) : (
							<View style={tw`w-full flex flex-row justify-evenly items-center`}>
								<Text style={[ { fontFamily: 'Bold', fontSize: 20 }, tw` text-black p-2` ]}>
									You haven't matched with anybody yet
								</Text>
							</View>
						)}
					</View>
				)}
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

//make this component available to the app
export default Likes;
