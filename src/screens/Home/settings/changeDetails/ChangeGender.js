import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopNav from '../../../../components/TopNav';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';

import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import useAuth from '../../../../auth/useAuth';
import { db } from '../../../../../firebase';

export default function ChangeGender() {
	const { user } = useAuth();
	const [ sex, setSex ] = useState();
	const navigation = useNavigation();
	const [ bgColor, setColor ] = useState('');
	const [ loading, setLoading ] = useState(false);

	// handle setting gender
	const handleSetGender = (props) => {
		setSex(props);
		setColor('#CC0000');
	};

	const handleUpdateGender = async () => {
		setLoading(true);
		await updateDoc(doc(db, 'users', user.uid), {
			sex: sex,
			timeStamp: serverTimestamp()
		})
			.then(() => {
				setLoading(false);

				Toast.show({
					type: 'success',
					position: 'top',
					text1: `Your gender has been changed successfully!`
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
		<View
			style={[
				tw`flex-1 items-center`,
				{
					marginTop: StatusBar.currentHeight
				}
			]}
		>
			<TopNav Title="Change Gender" />

			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>

			<View style={tw`mt-8`}>
				<Text style={[ { zIndex: -3 }, tw`text-xl text-center px-8 mt-8` ]}>
					Select a gender to change existing one
				</Text>
			</View>

			<Text style={tw`flex items-center mb-1 text-2xl`} />
			<View style={tw`flex flex-row`}>
				<TouchableOpacity
					style={[
						tw` w-24 h-16 rounded-xl pt-6 text-center shadow`,
						sex === 'Male'
							? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
							: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
					]}
					onPress={() => handleSetGender('Male')}
				>
					<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Male</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						tw` w-24 h-16 mx-4 rounded-xl pt-6 text-center shadow`,
						sex === 'Female'
							? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
							: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
					]}
					onPress={() => handleSetGender('Female')}
				>
					<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Female</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						tw` w-24 h-16 rounded-xl pt-6 text-center shadow`,
						sex === 'Prefer Not to say'
							? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
							: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
					]}
					onPress={() => handleSetGender('Prefer Not to say')}
				>
					<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Otherwise</Text>
				</TouchableOpacity>
			</View>

			<View style={tw`flex items-center mt-14 mb-24`}>
				<TouchableOpacity
					onPress={handleUpdateGender}
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
						{!loading ? 'Update Gender' : 'Updating...'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
