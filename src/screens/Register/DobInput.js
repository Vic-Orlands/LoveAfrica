//import liraries
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../../auth/useAuth';

// create a component
const DobInput = () => {
	const { user } = useAuth();
	const navigation = useNavigation();

	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');
	const [ show, setShow ] = useState(false);
	const [ mode, setMode ] = useState('date');
	const [ date, setDate ] = useState(new Date());
	const [ val, setVal ] = useState('MM / DD / YYYY');

	const nullField = !date;

	// set google user name and email
	useEffect(
		() => {
			let unsub = true;

			if (unsub && user) {
				let name = user.displayName;
				let email = user.email;
				setEmail(email);
				setName(name);
			}

			return () => (unsub = false);
		},
		[ user ]
	);

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

	const handleContinueRegistration = async () => {
		if (user) {
			const currentUser = [];

			let obj = {
				dob: date,
				name: name,
				email_address: email
			};
			currentUser.push(obj);
			await AsyncStorage.setItem('userDetails', JSON.stringify(currentUser));
			navigation.navigate('Gender');
		} else {
			const savedUser = await AsyncStorage.getItem('userDetails');
			const currentUser = JSON.parse(savedUser) || [];

			currentUser[0].dob = date;
			await AsyncStorage.setItem('userDetails', JSON.stringify(currentUser));
			navigation.navigate('Gender');
		}
	};

	return (
		<View style={tw`flex-1 items-center p-4`}>
			<View style={tw`flex-1 p-4`}>
				<View style={tw`pt-2`}>
					<Text style={[ { fontFamily: 'Bold' }, tw` text-3xl text-center pb-4` ]}> Date of Birth</Text>
				</View>
				<View style={tw`mt-8`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						onPress={showDatepicker}
						style={[ tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' } ]}
					>
						<Text style={[ { fontFamily: 'Bold' }, tw`   ` ]}>{val}</Text>
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

				<View style={tw`mt-24`} />
				<View style={tw`flex items-center`}>
					<TouchableOpacity
						onPress={handleContinueRegistration}
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
							Continue
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<FooterImg />
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

//make this component available to the app
export default DobInput;
