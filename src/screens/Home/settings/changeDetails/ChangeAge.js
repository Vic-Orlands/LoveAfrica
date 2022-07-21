import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopNav from '../../../../components/TopNav';
import tw from 'tailwind-react-native-classnames';
import Toast from 'react-native-toast-message';

import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import useAuth from '../../../../auth/useAuth';
import { db } from '../../../../../firebase';

export default function ChangeAge() {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ show, setShow ] = useState(false);
	const [ mode, setMode ] = useState('date');
	const [ loading, setLoading ] = useState(false);
	const [ date, setDate ] = useState(new Date());
	const [ val, setVal ] = useState('MM / DD / YYYY');

	const nullField = !date;

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
		let tempDate = new Date(currentDate);
		let fDate = tempDate.getMonth() + 1 + ' / ' + tempDate.getDate() + ' / ' + tempDate.getFullYear();
		setVal(fDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const handleUpdateAge = async () => {
		setLoading(true);
		await updateDoc(doc(db, 'users', user.uid), {
			dob: date.toString(),
			timeStamp: serverTimestamp()
		})
			.then(() => {
				setLoading(false);

				Toast.show({
					type: 'success',
					position: 'top',
					text1: `Your age has been changed successfully!`
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
			<TopNav Title="Change Age" />

			<Toast
				config={toastConfig}
				innerRef={(res) => {
					Toast.setRef(res);
				}}
			/>

			<View style={tw`flex-1 p-4`}>
				<View style={tw`mt-14`} />
				<View style={tw`pt-2 mb-2`}>
					<Text style={[ tw` text-2xl text-center font-bold` ]}> Date of Birth</Text>
				</View>
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						onPress={showDatepicker}
						style={[ tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' } ]}
					>
						<Text style={[ { fontFamily: 'Bold' }, tw`` ]}>{val}</Text>
					</TouchableOpacity>

					<Text style={[ { fontFamily: 'Light' }, tw`pl-3 flex items-center text-xs w-72 pt-2` ]}>
						Your Age will be public.
					</Text>
				</View>
				<View>
					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							onChange={onChange}
						/>
					)}
				</View>

				<View style={tw`mt-14`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						onPress={handleUpdateAge}
						style={[
							tw`flex justify-center shadow items-center w-72 rounded-full py-3 `,
							{ backgroundColor: '#CC0000' }
						]}
						disabled={nullField}
					>
						<Text
							style={[
								{ fontFamily: 'Bold' },
								tw`text-white text-center  text-base flex items-center text-xl`
							]}
						>
							{!loading ? 'Update Age' : 'Updating...'}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
