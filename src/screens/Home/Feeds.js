//import liraries
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header';
import Swiper from 'react-native-deck-swiper';
import {
	doc,
	collection,
	onSnapshot,
	getDocs,
	getDoc,
	setDoc,
	query,
	where,
	serverTimestamp
} from 'firebase/firestore';
import generateId from '../../lib/generateID';
import useAuth from '../../auth/useAuth';
import { db } from '../../../firebase';

// create a component
const Feeds = () => {
	const { user } = useAuth();
	const swipeRef = useRef(null);
	const navigation = useNavigation();
	const [ profiles, setProfiles ] = useState([]);

	useLayoutEffect(
		() =>
			onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
				if (!snapshot.exists()) {
					navigation.navigate('DobInput');
				}
			}),
		[]
	);

	useEffect(
		() => {
			let unsub;
			const fetchUsersProfiles = async () => {
				const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then((snapshot) =>
					snapshot.docs.map((doc) => doc.id)
				);

				const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then((snapshot) =>
					snapshot.docs.map((doc) => doc.id)
				);

				const passedUserIds = passes.length > 0 ? passes : [ 'check' ];
				const swipedUserIds = swipes.length > 0 ? passes : [ 'check' ];

				unsub = onSnapshot(
					query(collection(db, 'users'), where('id', 'not-in', [ ...passedUserIds, ...swipedUserIds ])),
					(snapshot) => {
						setProfiles(
							snapshot.docs.filter((doc) => doc.id !== user.uid).map((doc) => ({
								id: doc.id,
								...doc.data()
							}))
						);
					}
				);
			};

			fetchUsersProfiles();
			return unsub;
		},
		[ db ]
	);

	const swipeLeft = async (cardIndex) => {
		if (!profiles[cardIndex]) return;
		const userSwiped = profiles[cardIndex];
		setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped);
	};

	const swipeBottom = async (cardIndex) => {
		if (!profiles[cardIndex]) return;
		const userSwiped = profiles[cardIndex];

		Toast.show({
			type: 'success',
			position: 'top',
			text1: `You liked ${userSwiped.name} ☺️`
		});
		setDoc(doc(db, 'users', user.uid, 'likes', userSwiped.id), userSwiped);
	};

	const swipeRight = async (cardIndex) => {
		if (!profiles[cardIndex]) return;

		const userSwiped = profiles[cardIndex];
		const loggedInProfile = await (await getDoc(doc(db, 'users', user.uid))).data();

		getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then((documentSnapshot) => {
			if (documentSnapshot.exists()) {
				setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);

				setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
					users: {
						[user.uid]: loggedInProfile,
						[userSwiped.id]: userSwiped
					},
					usersMatched: [ user.uid, userSwiped.id ],
					timestamp: serverTimestamp()
				});

				navigation.navigate('MatchScreen', { loggedInProfile, userSwiped });
			} else {
				console.log(`You swiped "I LIKE" on ${userSwiped.name}`);
			}
			setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
		});
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

	// style the toast messages
	const toastConfig = {
		success: (internalState) => (
			<View
				style={{
					height: 65,
					width: '90%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: 'green',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15
				}}
			>
				<Text style={{ fontSize: 20, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		)
	};

	// like component for right swiping
	const Like = () => {
		return (
			<View style={tw`flex items-center`}>
				<View style={[ { backgroundColor: '#4CD964' }, tw`p-3 mb-3 rounded-full ` ]}>
					<AntDesign name="heart" size={30} color="white" />
				</View>
				<Text
					style={[
						{ fontFamily: 'Bold', color: '#4CD964', borderColor: '#4CD964' },
						tw` text-base border rounded-xl px-3 pt-1`
					]}
				>
					LIKE
				</Text>
			</View>
		);
	};

	// nope component for left swiping
	const Nope = () => {
		return (
			<View style={tw`flex items-center`}>
				<View style={[ { backgroundColor: '#cc0000' }, tw`p-3 mb-3 rounded-full ` ]}>
					<Entypo name="cross" size={34} color="white" />
				</View>
				<Text
					style={[
						{ fontFamily: 'Bold', color: '#cc0000', borderColor: '#cc0000' },
						tw` text-base border rounded-xl px-3 pt-1`
					]}
				>
					NOPE
				</Text>
			</View>
		);
	};

	return (
		<SafeAreaView style={[ styles.container, tw`` ]}>
			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>

			<View style={tw`mt-3   h-full`}>
				{/* Header */}
				<Header activeHome={tw`underline border-b-2 border-red-700  pb-1`} />
				{/* Header */}

				{/* Cards */}
				<View style={tw` flex w-full rounded-xl`}>
					<Swiper
						ref={swipeRef}
						containerStyle={{ backgroundColor: 'transparent' }}
						stackSize={3}
						cardIndex={0}
						onSwipedLeft={(cardIndex) => {
							swipeLeft(cardIndex);
						}}
						onSwipedRight={(cardIndex) => {
							swipeRight(cardIndex);
						}}
						onSwipedBottom={(cardIndex) => {
							swipeBottom(cardIndex);
						}}
						overlayLabels={{
							left: {
								element: <Nope />,
								title: 'NOPE',
								style: {
									label: {
										backgroundColor: '#cc0000',
										borderColor: '#cc0000',
										color: '#fff',
										borderWidth: 1
									},
									wrapper: {
										flexDirection: 'column',
										alignItems: 'flex-end',
										justifyContent: 'flex-start',
										marginTop: 30,
										marginLeft: -30
									}
								}
							},
							right: {
								element: <Like />,
								title: 'LIKE',
								style: {
									label: {
										backgroundColor: 'white',
										borderColor: '#4ded30',
										color: '#4ded30',
										borderWidth: 1
									},
									wrapper: {
										flexDirection: 'column',
										alignItems: 'flex-start',
										justifyContent: 'flex-start',
										marginTop: 30,
										marginLeft: 30
									}
								}
							}
						}}
						animateCardOpacity
						verticalSwipe={false}
						cards={profiles}
						renderCard={(card) =>
							card ? (
								<View key={card.id} style={tw` bg-white h-3/4 rounded-xl`}>
									<Image style={tw`h-full w-full rounded-xl top-0 `} source={{ uri: card.image }} />

									<View
										style={tw`flex-row items-center justify-center absolute bottom-0 bg-white w-full h-16 bg-opacity-10 rounded-b-xl`}
									>
										<View style={tw`flex items-center justify-center `}>
											<Text style={[ { fontFamily: 'Bold' }, tw` pt-3 text-base text-white ` ]}>
												{card.name}, {calculateAge(card.dob)}
											</Text>
										</View>
										<View style={tw`flex items-center justify-center pl-2`}>
											<Pressable
												onPress={() => navigation.navigate('ProfileInfo', { user: card })}
											>
												<Entypo name="info-with-circle" size={20} color="#cc0000" />
											</Pressable>
										</View>
									</View>
								</View>
							) : (
								<View style={tw` bg-white h-3/4 rounded-xl justify-center items-center  pb-5 shadow`}>
									<Text style={tw`text-2xl `}>No more users...</Text>
									<Text style={{ fontSize: 50 }}> &#x2639; </Text>
								</View>
							)}
					/>
				</View>

				{/* Alt Card */}
				<View style={tw`bottom-0 pb-20 absolute w-full `}>
					<View style={tw`flex flex-row justify-evenly mx-5 items-center bottom-0 px-4 pt-4 `}>
						<View>
							<TouchableOpacity
								onPress={() => swipeRef.current.swipeLeft()}
								style={[ { backgroundColor: '#cc0000' }, tw`p-3 mb-3 rounded-full ` ]}
							>
								<Entypo name="cross" size={30} color="white" />
							</TouchableOpacity>
						</View>

						<View>
							<TouchableOpacity
								onPress={() => swipeRef.current.swipeBottom()}
								style={[ { backgroundColor: '#E89528' }, tw`p-3 mb-3 rounded-full ` ]}
							>
								<AntDesign name="star" size={30} color="white" />
							</TouchableOpacity>
						</View>

						<View>
							<TouchableOpacity
								onPress={() => swipeRef.current.swipeRight()}
								style={[ { backgroundColor: '#4CD964' }, tw`p-3 mb-3 rounded-full ` ]}
							>
								<AntDesign name="heart" size={30} color="white" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
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
export default Feeds;
