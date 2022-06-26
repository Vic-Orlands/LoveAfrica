import React, { useState, useEffect, createRef } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-phone-number-input';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import FooterImg from '../../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';

// import react toastify module
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import useAuth from '../../../auth/useAuth';
import { db } from '../../../../firebase';

const UpdateProfile = () => {
	const { user } = useAuth();
	const phoneInput = createRef(null);
	const navigation = useNavigation();

	const [ bgColor, setColor ] = useState('');
	const [ show, setShow ] = useState(false);
	const [ mode, setMode ] = useState('date');
	const [ val, setVal ] = useState('MM / DD / YYYY');

	const [ sex, setSex ] = useState();
	const [ email, setEmail ] = useState('');
	const [ info, setInfo ] = useState(false);
	const [ name, setName ] = useState('');
	const [ image, setImage ] = useState(null);
	const [ password, setPassword ] = useState('');
	const [ date, setDate ] = useState(new Date());
	const [ interestedIn, setInterestedIn ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	// set google user name and email
	useEffect(
		() => {
			let unsub = true;

			if (unsub) {
				let name = user.displayName;
				let email = user.email;
				setEmail(email);
				setName(name);
			}

			return () => (unsub = false);
		},
		[ user ]
	);

	// image function to get images from local device
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			quality: 1
		});
		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	// onChange function to get date of birth
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
		let tempDate = new Date(currentDate);
		let fDate = tempDate.getMonth() + 1 + ' / ' + tempDate.getDate() + ' / ' + tempDate.getFullYear();
		setVal(fDate);
	};

	// show dob after selection
	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	// handle setting gender
	const handleSetGender = (props) => {
		setSex(props);
		setColor('#CC0000');
	};

	// handle setting interest or preference
	const handlesetPreference = (props) => {
		setInterestedIn(props);
		setColor('#CC0000');
	};

	// check if passord matches
	const checkPasswordmatch = () => {
		if (password !== confirmPassword) {
			setInfo(true);
		} else {
			setInfo(false);
		}
	};

	//handle to update profile
	const handleUpdateProfile = async () => {
		setDoc(doc(db, 'users', user.uid), {
			sex: sex,
			dob: date,
			name: name,
			image: image,
			password: password,
			email_address: email,
			interested_in: interestedIn,
			phone_number: phoneNumber,
			confirm_password: confirmPassword,
			timestamp: serverTimestamp()
		})
			.then(() => {
				navigation.navigate('Feeds');
			})
			.catch((error) => {
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
					backgroundColor: '#fff',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#ccc',
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

	return (
		<ScrollView>
			<View style={tw`flex-1 items-center p-4`}>
				<Toast
					config={toastConfig}
					innerRef={(res) => {
						Toast.setRef(res);
					}}
				/>
				<View style={tw`flex-1 content-center items-center`}>
					<View style={tw`pt-2`}>
						<Text
							style={[
								{ fontFamily: 'Bold', zIndex: -3, fontWeight: 'bold' },
								tw`text-4xl text-center pb-4`
							]}
						>
							Update Profile
						</Text>
					</View>

					<View style={tw`flex items-center mt-4`}>
						<Text style={tw`flex items-center mt-4`}>Phone Number</Text>
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

						<Text style={tw`flex items-center mt-4`}>Email address</Text>
						<TextInput
							keyboardType="email-address"
							value={email}
							editable={false}
							style={[
								tw`w-80 px-3 py-4 rounded-xl text-center shadow`,
								{ backgroundColor: '#F0E0E0', fontFamily: 'Light', color: '#000' }
							]}
						/>

						<Text style={tw`flex items-center mt-4`}>Password</Text>
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

						<Text style={tw`flex items-center mt-4`}>Confirm Password</Text>
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

						<Text style={tw`flex items-center mt-4`}>Full Name</Text>
						<TextInput
							keyboardType="default"
							value={name}
							editable={false}
							style={[
								tw` w-80 px-3 py-4 rounded-xl text-center shadow`,
								{ backgroundColor: '#F0E0E0', fontFamily: 'Regular' }
							]}
						/>

						<Text style={tw`flex items-center mt-4`}>Gender</Text>
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

						<Text style={tw`flex items-center mt-4`}>Interested In</Text>
						<View style={tw`flex flex-row`}>
							<TouchableOpacity
								style={[
									tw` w-24 h-16 rounded-xl pt-6 text-center shadow`,
									interestedIn === 'Male'
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlesetPreference('Male')}
							>
								<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Male</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw` w-24 h-16 mx-4 rounded-xl pt-6 text-center shadow`,
									interestedIn === 'Female'
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlesetPreference('Female')}
							>
								<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Female</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									tw` w-24 h-16 rounded-xl pt-6 text-center shadow`,
									interestedIn === 'Both'
										? { borderColor: bgColor, backgroundColor: '#F0E0E0', borderWidth: 3 }
										: { backgroundColor: '#F0E0E0', borderWidth: 3, borderColor: '#F0E0E0' }
								]}
								onPress={() => handlesetPreference('Both')}
							>
								<Text style={[ { fontFamily: 'Regular' }, tw`text-center` ]}>Both</Text>
							</TouchableOpacity>
						</View>

						<Text style={tw`flex items-center mt-8`}>Choose Photo</Text>
						<View style={[ tw`flex items-center rounded-xl pb-4`, styles.rounded ]}>
							<Pressable onPress={pickImage}>
								<Image
									source={require('../../../../assets/gallery.png')}
									style={{ width: 300, height: 150, resizeMode: 'contain' }}
								/>
							</Pressable>
						</View>

						<View style={tw`flex items-center`}>
							{image && (
								<Image
									source={{ uri: image }}
									style={{ width: 300, height: 250, resizeMode: 'contain', borderRadius: 7 }}
								/>
							)}
						</View>

						<Text style={tw`flex items-center mt-4`}>Date of Birth</Text>
						<View style={tw`flex items-center`}>
							<TouchableOpacity
								onPress={showDatepicker}
								style={[
									tw` w-72 px-5 py-5 rounded-xl text-center shadow`,
									{ backgroundColor: '#F0E0E0' }
								]}
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
					</View>

					<View style={tw`flex items-center mt-14 mb-24`}>
						<TouchableOpacity
							onPress={handleUpdateProfile}
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
								Update Profile
							</Text>
						</TouchableOpacity>
					</View>

					<FooterImg />
				</View>
			</View>
		</ScrollView>
	);
};

// define your styles
const styles = StyleSheet.create({
	rounded: {
		borderStyle: 'dashed'
	}
});

export default UpdateProfile;
