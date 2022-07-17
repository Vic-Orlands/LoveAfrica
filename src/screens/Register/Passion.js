//import liraries
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import FooterImg from '../../components/FooterImg';

// import react toastify module
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import useAuth from '../../auth/useAuth';
import { db } from '../../../firebase';

// create a component
const Passion = () => {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ bgColor, setColor ] = useState('');
	const [ passion, setPassion ] = useState([]);
	const [ Modals, setModals ] = useState(false);

	const handlePassion = (props) => {
		if (passion.includes(props)) {
			Toast.show({
				type: 'success',
				position: 'top',
				text1: `${props} has been removed 😔. Add one more!`,
				visibilityTime: 2000,
				autoHide: true
			});

			let propIndex = passion.indexOf(props);
			passion.splice(propIndex, 1);
		} else if (passion.length === 5) {
			Toast.show({
				type: 'success',
				position: 'top',
				text1: 'You can select only five hobbies!',
				visibilityTime: 2000,
				autoHide: true
			});
		} else {
			setPassion((otherPassions) => [ ...otherPassions, `${props}` ]);
			setColor('#CC0000');
		}
	};

	const handleRegistration = async () => {
		const savedUser = await AsyncStorage.getItem('userDetails');
		const currentUser = JSON.parse(savedUser) || [];

		currentUser[0].hobbies = passion;
		currentUser[0].id = user.uid;
		currentUser[0].timeStamp = serverTimestamp();

		// convert the array to an object because setDoc only accepts objects
		const newObj = currentUser.reduce((obj, idx) => {
			return obj[idx];
		});

		await setDoc(doc(db, 'users', user.uid), newObj)
			.then((response) => {
				Toast.show({
					type: 'success',
					position: 'top',
					text1: 'Registration completed successfully! 👍',
					visibilityTime: 2000,
					autoHide: true
				});
				AsyncStorage.setItem('loggedIn', JSON.stringify(response));
				setTimeout(() => {
					navigation.navigate('Drawers');
				}, 1000);
			})
			.catch((error) => {
				Toast.show({
					type: 'error',
					position: 'top',
					text1: error,
					visibilityTime: 2000,
					autoHide: true
				});
			});
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
					backgroundColor: '#fff',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#105d6e',
					borderRadius: 15
				}}
			>
				<Text style={{ fontSize: 14 }}>{internalState.text1}</Text>
			</View>
		),
		error: (internalState) => (
			<View
				style={{
					height: 65,
					width: '90%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: 'red',
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

	const Threes = () => {
		return (
			<View style={tw`flex-row mt-4`}>
				<TouchableOpacity
					style={[
						tw`mr-2 flex  rounded-full `,
						passion.includes('Board Games')
							? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
							: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
					]}
					onPress={() => handlePassion('Board Games')}
				>
					<Text style={tw`text-center p-3`}> Board Games</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						tw`mr-2 flex  rounded-full`,
						passion.includes('Swimming')
							? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
							: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
					]}
					onPress={() => handlePassion('Swimming')}
				>
					<Text style={tw`text-center p-3`}>Swimming</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						tw`mr-2 flex  rounded-full `,
						passion.includes('Hiking')
							? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
							: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
					]}
					onPress={() => handlePassion('Hiking')}
				>
					<Text style={tw`text-center p-3`}>Hiking</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<Modal visible={Modals} transparent>
				<View style={styles.modal}>
					<View style={tw`flex justify-center content-center bg-gray-200 items-center rounded-xl p-4 `}>
						<Text style={[ { fontFamily: 'Bold' }, tw`text-center text-xl` ]}>Done!</Text>
						<View>
							<Text style={[ { fontFamily: 'Regular' }, tw`text-center text-base pt-4` ]}>
								Your Profile has been created!
							</Text>
						</View>
						<TouchableOpacity
							onPress={handleRegistration}
							style={[
								tw`flex mb-2 justify-center shadow items-center px-24 rounded-full mt-6 py-3 `,
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
			</Modal>

			<Toast
				config={toastConfig}
				refs={(innerRefs) => {
					Toast.setRef(innerRefs);
				}}
			/>

			<ScrollView style={{ zIndex: -3 }}>
				<View style={tw`flex-1 `}>
					<View>
						<Text style={[ { fontFamily: 'Bold' }, tw` text-2xl pb-4` ]}> Passion</Text>
					</View>
					<View style={tw`px-4`}>
						<Text style={[ { fontFamily: 'Regular' }, tw`w-72` ]}>
							Let everyone know what you’re passionate about.{' '}
							<Text style={[ tw`opacity-25 text-xs` ]}>(Choose Five).</Text>
						</Text>
					</View>
					<View style={[ tw`pt-8 rounded-xl` ]}>
						<Threes />

						<View style={tw`flex-row mt-4`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Tea')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Tea')}
							>
								<Text style={tw`text-center p-3`}>Tea</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Working out')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Working out')}
							>
								<Text style={tw`text-center p-3`}>Working out</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Astrology')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Astrology')}
							>
								<Text style={tw`text-center p-3`}>Astrology</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Cat')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Cat')}
							>
								<Text style={tw`text-center p-3`}>Cat</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Working')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Working')}
							>
								<Text style={tw`text-center p-3`}>Working</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Fishing')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Fishing')}
							>
								<Text style={tw`text-center p-3`}>Fishing</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Animals')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Animals')}
							>
								<Text style={tw`text-center p-3`}>Animals</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex rounded-full `,
									passion.includes('Comedy')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Comedy')}
							>
								<Text style={tw`text-center p-3`}>Comedy</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Drawings')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Drawings')}
							>
								<Text style={tw`text-center p-3`}>Drawings</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Blogging')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Blogging')}
							>
								<Text style={tw`text-center p-3`}>Blogging</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Vlogging')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Vlogging')}
							>
								<Text style={tw`text-center p-3`}>Vlogging</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Law')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Law')}
							>
								<Text style={tw`text-center p-3`}>Law</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Photography')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Photography')}
							>
								<Text style={tw`text-center p-3`}>Photography</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Excursion')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Excursion')}
							>
								<Text style={tw`text-center p-3`}>Excursion</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Travel')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Travel')}
							>
								<Text style={tw`text-center p-3`}>Travel</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Journaling')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Journaling')}
							>
								<Text style={tw`text-center p-3`}>Journaling</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Eating Healthy')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Eating Healthy')}
							>
								<Text style={tw`text-center p-3`}>Eating Healthy</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Spirituality')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Spirituality')}
							>
								<Text style={tw`text-center p-3`}>Spirituality</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('NetFlix')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('NetFlix')}
							>
								<Text style={tw`text-center p-3`}>NetFlix</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Dance')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Dance')}
							>
								<Text style={tw`text-center p-3`}>Dance</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Sports')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Sports')}
							>
								<Text style={tw`text-center p-3`}>Sports</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Gamer')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Gamer')}
							>
								<Text style={tw`text-center p-3`}>Gamer</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Learning new skills')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Learning new skills')}
							>
								<Text style={tw`text-center p-3`}>Learning new skills</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Cleaning')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Cleaning')}
							>
								<Text style={tw`text-center p-3`}>Cleaning</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Cycling')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Cycling')}
							>
								<Text style={tw`text-center p-3`}>Cycling</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Knitting/crocheting')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Knitting/crocheting')}
							>
								<Text style={tw`text-center p-3`}>Knitting/crocheting</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Technology')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Technology')}
							>
								<Text style={tw`text-center p-3`}>Technology</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Yoga')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Yoga')}
							>
								<Text style={tw`text-center p-3`}>Yoga</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Snapchat')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Snapchat')}
							>
								<Text style={tw`text-center p-3`}>Snapchat</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Instagram')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Instagram')}
							>
								<Text style={tw`text-center p-3`}>Instagram</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Facebook')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Facebook')}
							>
								<Text style={tw`text-center p-3`}>Facebook</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Cooking')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Cooking')}
							>
								<Text style={tw`text-center p-3`}>Cooking</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Instrument')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Instrument')}
							>
								<Text style={tw`text-center p-3`}>Instrument</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Wine')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Wine')}
							>
								<Text style={tw`text-center p-3`}>Wine</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Painting')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Painting')}
							>
								<Text style={tw`text-center p-3`}>Painting</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Coffee')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Coffee')}
							>
								<Text style={tw`text-center p-3`}>Coffee</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Brunch')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Brunch')}
							>
								<Text style={tw`text-center p-3`}>Brunch</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Organizing')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Organizing')}
							>
								<Text style={tw`text-center p-3`}>Organizing</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Lunch')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Lunch')}
							>
								<Text style={tw`text-center p-3`}>Lunch</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Volunteering')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Volunteering')}
							>
								<Text style={tw`text-center p-3`}>Volunteering</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Self Care')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Self Care')}
							>
								<Text style={tw`text-center p-3`}>Self Care</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Shopping')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Shopping')}
							>
								<Text style={tw`text-center p-3`}>Shopping</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Politics')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Politics')}
							>
								<Text style={tw`text-center p-3`}>Politics</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Finance')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Finance')}
							>
								<Text style={tw`text-center p-3`}>Finance</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Reading')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Reading')}
							>
								<Text style={tw`text-center p-3`}>Reading</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Museum')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Museum')}
							>
								<Text style={tw`text-center p-3`}>Museum</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Entrepreneurship')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Entrepreneurship')}
							>
								<Text style={tw`text-center p-3`}>Entrepreneurship</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Writing')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Writing')}
							>
								<Text style={tw`text-center p-3`}>Writing</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Self Defense')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Self Defense')}
							>
								<Text style={tw`text-center p-3`}>Self Defense</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Running')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Running')}
							>
								<Text style={tw`text-center p-3`}>Running</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Designing')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Designing')}
							>
								<Text style={tw`text-center p-3`}>Designing</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Dinner')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Dinner')}
							>
								<Text style={tw`text-center p-3`}>Dinner</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Medicine')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Medicine')}
							>
								<Text style={tw`text-center p-3`}>Medicine</Text>
							</TouchableOpacity>
						</View>

						<View style={tw`mt-3 flex-row`}>
							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Sleeping')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Sleeping')}
							>
								<Text style={tw`text-center p-3`}>Sleeping</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`mr-2 flex  rounded-full `,
									passion.includes('Parenthood')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Parenthood')}
							>
								<Text style={tw`text-center p-3`}>Parenthood</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw`flex  rounded-full `,
									passion.includes('Breakfast')
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlePassion('Breakfast')}
							>
								<Text style={tw`text-center p-3`}>Breakfast</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={tw`mt-24`} />
				</View>
			</ScrollView>
			<View style={tw`flex items-center`}>
				<TouchableOpacity
					onPress={() => {
						setModals(true);
					}}
					style={[
						tw`flex mb-2 justify-center shadow items-center w-72 rounded-full py-3 `,
						{ backgroundColor: '#CC0000' }
					]}
				>
					<Text
						style={[
							{ fontFamily: 'Bold' },
							tw`text-white text-center  text-base flex items-center text-xl`
						]}
					>
						Continue
					</Text>
				</TouchableOpacity>
			</View>
			<FooterImg />
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalview: {
		width: 300,
		height: 200
	}
});

//make this component available to the app
export default Passion;
