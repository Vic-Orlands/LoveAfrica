import React, { useState, createRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import TopNav from '../../../../components/TopNav';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';

import { onSnapshot, query, collection, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import useAuth from '../../../../auth/useAuth';
import { db } from '../../../../../firebase';

export default function ChangePhoneNumber() {
	const { user } = useAuth();
	const navigation = useNavigation();
	const phoneInput = createRef(null);
	const [ profile, setProfile ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ phoneNumber, setPhoneNumber ] = useState('');

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

	//handle to update phone number
	const handleUpdatePhoneNumber = async () => {
		setLoading(true)
		await updateDoc(doc(db, 'users', user.uid), {
			phone_number: phoneNumber,
			timeStamp: serverTimestamp()
		})
			.then(() => {
				setLoading(false)
				Toast.show({
					type: 'success',
					position: 'top',
					text1: `Your phone number has been changed successfully!`
				});

				setTimeout(() => {
					navigation.navigate('EditProfile');
				}, 1500);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error);
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
					backgroundColor: 'green',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15
				}}
			>
				<Text style={{ fontSize: 14, color: '#fff' }}>{internalState.text1}</Text>
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
	return (
		<View style={[ tw`flex-1 items-center`, { marginTop: StatusBar.currentHeight } ]}>
			<TopNav Title="Change Password" />

			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>

			<View style={tw`flex-1 content-center items-center`}>
				{!profile[0]?.phone_number ? (
					<View style={tw`flex-1 justify-center pb-14`}>
						<Text style={[ { zIndex: -3 }, tw`text-xl text-center px-8` ]}>
							You can't change your phone number because you are using google login
						</Text>
					</View>
				) : (
					<View>
						<View style={tw`content-center items-center mt-8`}>
							<Text style={tw`flex items-center mt-4 mb-1 text-base`}>Enter New Phone Number</Text>
							<PhoneInput
								ref={phoneInput}
								defaultCode="NG"
								layout="first"
								onChangeFormattedText={setPhoneNumber}
								textContainerStyle={[
									tw` rounded-r-xl`,
									{ fontFamily: 'Regular', backgroundColor: '#F0E0E0' }
								]}
								containerStyle={[
									tw`rounded-xl  shadow w-80`,
									{ fontFamily: 'Regular', backgroundColor: '#F0E0E0' }
								]}
								withShadow
								autoFocus
							/>
						</View>

						<View style={tw`flex items-center mt-14`}>
							<TouchableOpacity
								onPress={handleUpdatePhoneNumber}
								style={[
									tw`flex justify-center items-center w-72 rounded-full py-3 `,
									{ backgroundColor: '#CC0000' }
								]}
							>
								<Text
									style={[
										{ fontFamily: 'Bold' },
										tw`text-white text-center  text-base flex items-center text-xl`
									]}
								>
										{!loading ? 'Update Number' : 'Updating...'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</View>
	);
}
