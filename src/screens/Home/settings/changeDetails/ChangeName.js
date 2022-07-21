import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';
import TopNav from '../../../../components/TopNav';

import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import useAuth from '../../../../auth/useAuth';
import { db } from '../../../../../firebase';

export default function ChangeName() {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ info, setInfo ] = useState(false);
	const [ name, setName ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const nullField = !name;

	const setTheinfo = () => {
		if (name.length <= 2) {
			setInfo('Name must be more than 2 letters');
			setTimeout(() => {
				setInfo('');
			}, 2000);
		} else {
			setInfo('This is what users will see. This will be public.');
		}
	};

	//handle to update password
	const handleUpdateName = async () => {
		setLoading(true);

		await updateDoc(doc(db, 'users', user.uid), {
			name: name,
			timeStamp: serverTimestamp()
		})
			.then(() => {
				setLoading(false);

				Toast.show({
					type: 'success',
					position: 'top',
					text1: `Your name has been changed successfully!`
				});

				setTimeout(() => {
					navigation.navigate('EditProfile');
				}, 2000);
			})
			.catch((error) => {
				setLoading(false);
				Toast.show({
					type: 'error',
					position: 'top',
					text1: error.code
				});
			});
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
			<TopNav Title="Change Profile Name" />

			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>

			<View style={tw`flex-1 content-center items-center`}>
				<View>
					<View style={tw`content-center items-center mt-8`}>
						<Text style={tw`flex items-center mt-4 text-base`}>Enter New Name</Text>
						<TextInput
							placeholder="Your Name"
							keyboardType="default"
							value={name}
							onChangeText={setName}
							style={[
								tw` w-72 px-3 py-3 rounded-xl text-center shadow`,
								{ backgroundColor: '#F0E0E0', fontFamily: 'Regular' }
							]}
							autoComplete="name-given"
							onTextInput={setTheinfo}
							maxLength={20}
						/>
						<Text style={[ { fontFamily: 'Light' }, tw`pl-3 flex items-center text-xs w-72 pt-2` ]}>
							{info}
						</Text>
					</View>

					<View style={tw`flex items-center mt-14`}>
						<TouchableOpacity
							onPress={handleUpdateName}
							style={[
								tw`flex justify-center shadow items-center w-72 rounded-full py-3 `,
								{ backgroundColor: '#CC0000' }
							]}
							disabled={nullField}
						>
							<Text
								style={[
									{ fontFamily: 'Regular' },
									tw`text-white text-center  text-base flex items-center text-xl`
								]}
							>
								{!loading ? 'Update Name' : 'Updating...'}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}
