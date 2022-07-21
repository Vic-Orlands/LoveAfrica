import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';
import TopNav from '../../../../components/TopNav';

import { doc, onSnapshot, query, collection, updateDoc, serverTimestamp } from 'firebase/firestore';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import useAuth from '../../../../auth/useAuth';
import { db } from '../../../../../firebase';

export default function ChangePassword() {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ info, setInfo ] = useState(false);
	const [ profile, setProfile ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ oldPassword, setOldPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

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

	// check if passord matches
	const checkPasswordmatch = () => {
		if (password !== confirmPassword) {
			setInfo(true);
		} else {
			setInfo(false);
		}
	};

	//handle to update password
	const handleUpdatePassword = async () => {
		setLoading(true)
		//verify old password first
		const credential = EmailAuthProvider.credential(user.email, oldPassword);

		try {
			await reauthenticateWithCredential(user, credential);

			// User entered correct credentials
			// Update password
			await updatePassword(user, password);

			//update it on database after successful update
			await updateDoc(doc(db, 'users', user.uid), {
				password: password,
				confirm_password: confirmPassword,
				timeStamp: serverTimestamp()
			});
			setLoading(false)

			Toast.show({
				type: 'success',
				position: 'top',
				text1: `Your password has been changed successfully!`
			});

			setTimeout(() => {
				navigation.navigate('EditProfile');
			}, 2000);
		} catch (error) {
			const errorMessage = error.message.includes('Firebase: Error (auth/wrong-password).')
				? 'Current password is not correct'
				: error.message.includes(
						'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
					)
					? 'Your account has been temporarily disabled due to too many failed attempts'
					: error.message;

			setLoading(false)

			Toast.show({
				type: 'error',
				position: 'top',
				text1: errorMessage,
				text2: 'Reset password or try again later'
			});
		}
	};

	// style the toast messages
	const toastConfig = {
		success: (internalState) => (
			<View
				style={{
					height: 45,
					width: '80%',
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
				<Text style={{ fontSize: 18, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		),
		error: (internalState) => (
			<View
				style={{
					height: 45,
					width: '80%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: '#cc0000',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>{internalState.text1}</Text>
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
				{!profile[0]?.password ? (
					<View style={tw`flex-1 justify-center pb-14`}>
						<Text style={[ { zIndex: -3 }, tw`text-xl text-center px-8` ]}>
							You can't change your password because you are using google login
						</Text>
					</View>
				) : (
					<View>
						<View style={tw`content-center items-center mt-8`}>
							<Text style={tw`flex items-center mt-4 text-base`}>Enter Current Password</Text>
							<TextInput
								placeholder="************"
								keyboardType="default"
								value={oldPassword}
								onChangeText={setOldPassword}
								style={[
									tw` w-80 px-3 py-4 rounded-xl text-center shadow`,
									{ backgroundColor: '#F0E0E0' }
								]}
								returnKeyType="done"
								autoComplete="password"
								secureTextEntry={true}
							/>

							<Text style={tw`flex items-center mt-4 text-base`}>Enter New Password</Text>
							<TextInput
								placeholder="************"
								keyboardType="default"
								value={password}
								onChangeText={setPassword}
								style={[
									tw` w-80 px-3 py-4 rounded-xl text-center shadow`,
									{ backgroundColor: '#F0E0E0' }
								]}
								returnKeyType="done"
								autoComplete="password"
								secureTextEntry={true}
							/>

							<Text style={tw`flex items-center mt-4 text-base`}>Confirm Password</Text>
							<TextInput
								placeholder="************"
								keyboardType="default"
								style={[
									tw` w-80 px-3 py-4 rounded-xl text-center shadow`,
									{ backgroundColor: '#F0E0E0' }
								]}
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								returnKeyType="done"
								autoComplete="password"
								secureTextEntry={true}
								onTextInput={checkPasswordmatch}
							/>
							{info ? <Text>Password does not match</Text> : null}
						</View>

						<View style={tw`flex items-center mt-14`}>
							<TouchableOpacity
								onPress={handleUpdatePassword}
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
										{!loading ? 'Update Password' : 'Updating...'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</View>
	);
}
