import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Modal from 'react-native-modal';

// import react toastify module
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import useAuth from '../../../auth/useAuth';

const UpdateProfile = ({ visible, closeModal }) => {
	const { user } = useAuth();
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);

	// disable button untill there is an input on the text inputs
	const nullField = !password;

	//handle delete account
	const handleDeleteUser = async () => {
		const credential = EmailAuthProvider.credential(user.email, password);
		try {
			await reauthenticateWithCredential(user, credential);
			await deleteUser(user);
		} catch (error) {
			let errorMessage = error.message.includes('Firebase: Error (auth/wrong-password).')
				? 'Incorrect password'
				: error.code.replace('auth/', '').replace(/[^a-zA-Z0-9 ]/g, ' ');
			setLoading(false);
			Toast.show({
				type: 'error',
				position: 'top',
				text1: errorMessage
			});
		}
	};

	// style the toast messages
	const toastConfig = {
		success: (internalState) => (
			<View
				style={{
					height: 45,
					width: '90%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: 'green',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15,
					transform: [ { scaleX: 0.5 } ]
				}}
			>
				<Text style={{ fontSize: 14, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		),
		error: (internalState) => (
			<View
				style={{
					height: 45,
					width: '90%',
					marginTop: -15,
					zIndex: 2,
					backgroundColor: 'red',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 15,
					transform: [ { scaleX: 0.5 } ]
				}}
			>
				<Text style={{ fontSize: 20, color: '#fff' }}>{internalState.text1}</Text>
			</View>
		)
	};

	return (
		<Modal
			isVisible={visible}
			animationIn="fadeIn"
			swipeDirection="down"
			useNativeDriver={true}
			backdropOpacity={0.5}
			animationOut="fadeOut"
			onBackdropPress={closeModal}
			onSwipeComplete={closeModal}
			backdropColor="rgba(0, 0, 0, 0.7)"
			hideModalContentWhileAnimating
			onBackButtonPress={closeModal}
			style={{ justifyContent: 'flex-end', margin: 0 }}
		>
			<View style={[ tw`pt-28`, styles.parent ]}>
				<Toast
					config={toastConfig}
					innerRef={(res) => {
						Toast.setRef(res);
					}}
				/>
				<View style={[ styles.child, tw`items-center` ]}>
					<View style={tw`pt-2`}>
						<Text style={[ { fontFamily: 'Regular', zIndex: -3 }, tw`text-white text-2xl pb-4` ]}>
							Enter password to continue
						</Text>
					</View>
					<View style={tw`mt-8`} />
					<View style={tw`flex items-center`}>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-xl w-72 pt-2 text-white` ]}>Password</Text>
						<TextInput
							placeholder="************"
							keyboardType="default"
							value={password}
							onChangeText={setPassword}
							style={[ tw` w-72 px-3 py-3 rounded-xl text-xl shadow`, { backgroundColor: '#F0E0E0' } ]}
							returnKeyType="done"
							autoComplete="password"
							secureTextEntry={true}
						/>
					</View>

					<View style={tw`flex items-center mt-14`}>
						<TouchableOpacity
							disabled={nullField}
							onPress={handleDeleteUser}
							style={
								!nullField ? (
									tw`flex justify-center items-center w-72 rounded-full py-3 bg-white`
								) : (
									tw`flex justify-center items-center w-72 rounded-full py-3 bg-gray-300`
								)
							}
						>
							<Text
								style={[
									{ fontFamily: 'Bold' },
									!nullField
										? tw`text-red-500 text-center text-base flex items-center text-xl`
										: tw`text-red-400 text-center text-base flex items-center text-xl`
								]}
							>
								{loading ? 'Delete Account' : 'Deleting user...'}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	parent: {
		height: '60%',
		width: '100%',
		transform: [ { scaleX: 2 } ],
		borderTopStartRadius: 200,
		borderTopEndRadius: 200,
		marginTop: 'auto',
		backgroundColor: '#CC0000'
	},
	child: {
		transform: [ { scaleX: 0.5 } ],
		justifyContent: 'center',
		zIndex: -3
	}
});

export default UpdateProfile;
