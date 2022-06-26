//import liraries
import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	Image,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	FlatList,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Entypo, AntDesign, FontAwesome, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import img from '../../../assets/splash.png';
import useAuth from '../../auth/useAuth';
// import SenderMessage from '../../components/ReceiverMessage';
// import ReceiverMessage from '../../components/SenderMessage';

const Msg = [
	{
		id: 1,
		mes: 'Hello there'
	},
	{
		id: 2,
		mes: 'hey there'
	},
	{
		id: 3,
		mes: "Hello how're you doing there"
	},
	{
		id: 4,
		mes: 'hey, im fine there'
	}
];
// The Entire code is just for testing. Implement the main chat. the Video call and voice call ia agora based

// create a component
const Chat = () => {
	const { user } = useAuth();
	const navigation = useNavigation();

	const [ IsFocused, setIsFocused ] = useState(false);
	const [ sender, setSender ] = useState(true);
	const [ text, onChangeText ] = useState('');
	const [ showMe, setshowMe ] = useState(false);
	// const [sendMessage, setsendMessage] = useState('');

	const sendMessage = () => {};

	useEffect(
		() => {
			if (text !== null) {
				setshowMe(true);
			}
		},
		[ text ]
	);

	const Icons = () => {
		return (
			<View style={tw`flex-row flex-grow  justify-evenly `}>
				{/* <TouchableOpacity style={tw` items-center   `}>
                    <Entypo name="emoji-happy" size={26} color="#cdaa35" />
                </TouchableOpacity> */}

				<TouchableOpacity onPress={() => navigation.navigate('ChatStarter')} style={tw` items-center   `}>
					<Entypo name="new-message" size={26} color="#cc0000" />
				</TouchableOpacity>

				<TouchableOpacity style={tw`  items-center   `}>
					<MaterialCommunityIcons name="paperclip" size={26} color="#cc0000" />
				</TouchableOpacity>

				<TouchableOpacity style={tw`  items-center   `}>
					<FontAwesome name="microphone" size={26} color="#cc0000" />
				</TouchableOpacity>
			</View>
		);
	};

	const NotFocus = () => {
		return (
			<View style={tw`flex flex-row h-16 w-full rounded-full bg-gray-200 bg-opacity-50   items-center     `}>
				<View style={tw`flex text-center w-3/6  items-center px-2 rounded-l-full  `}>
					<TextInput
						placeholder="Type Something..."
						style={tw` h-full w-full`}
						onFocus={() => setIsFocused(true)}
					/>
				</View>
				<View style={tw`flex-row  w-3/6 pr-2 `}>
					<Icons />
				</View>
			</View>
		);
	};

	const Focused = () => {
		return (
			<View style={tw`flex flex-row h-16 w-full rounded-full  bg-gray-200 bg-opacity-50   items-center     `}>
				<View style={tw`flex text-center w-full  border border-gray-300 items-center px-2 rounded-full  `}>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						style={tw`flex-1`}
						keyboardVerticalOffset={10}
					>
						<FlatList />
					</KeyboardAvoidingView>
					<TextInput
						placeholder="Type Something..."
						style={tw` h-full w-full  `}
						autoFocus={true}
						autoCorrect
						value={text}
						// onChange={(e) => onChangeText(e.target.value)}
						onSubmitEditing={sendMessage}
						onChangeText={onChangeText}
					/>
				</View>

				{showMe ? <Text>x</Text> : <Text>z</Text>}
			</View>
		);
	};

	const Rule = () => {};

	return (
		<SafeAreaView style={[ styles.container, tw` ` ]}>
			<View style={tw` w-full h-full`}>
				{/* Header */}
				<View style={[ styles.flex, tw` bg-white shadow py-5` ]}>
					<View style={tw`px-6  flex-row items-center `}>
						<View style={tw``}>
							<TouchableOpacity onPress={() => navigation.goBack(null)}>
								<Ionicons name="chevron-back" size={30} color="#cc0000" />
							</TouchableOpacity>
						</View>

						<View style={tw`ml-3`}>
							<TouchableOpacity
								style={tw`w-full flex flex-row`}
								// onPress={() => navigation.navigate("Drawers")}
							>
								<View style={tw`flex items-center rounded-full `}>
									<Image source={img} style={tw`h-8 w-8 rounded-full  `} />
								</View>
								<View style={tw`pl-2  flex justify-center  `}>
									<Text style={[ { fontFamily: 'Bold' }, tw`  text-base` ]}>Ozoemana Bright</Text>
									<Text style={[ { fontFamily: 'Regular' }, tw`text-xs` ]}>Online</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={tw`flex  flex-grow flex-row justify-center items-center justify-around`}>
							<View style={tw`flex `}>
								<TouchableOpacity style={tw`px-1   `}>
									<MaterialIcons name="call" size={32} color="#cc0000" />
								</TouchableOpacity>
							</View>
							<View style={tw`flex `}>
								<TouchableOpacity style={tw`pl-1 `}>
									<Ionicons name="videocam" size={32} color="#cc0000" />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				{/* Header */}

				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					{/* <FlatList
						data={Msg}
						keyExtractor={(item) => item.id}
						renderItem={({ item: Msg }) =>
							sender ? (
								<ReceiverMessage key={Msg.id} message={Msg.mes} />
							) : (
								<SenderMessage key={Msg.id} message={Msg.mes} />
							)}
					/> */}
				</TouchableWithoutFeedback>

				{/* Alt Card */}
				<View style={tw`bottom-0 absolute  bg-transparent w-full h-24`}>
					<View style={tw`px-2 flex mb-8`}>{IsFocused ? <Focused /> : <NotFocus />}</View>
				</View>
				{/* Alt Card */}
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
		// justifyContent: 'space-between',
		// boxShadow: 10
	},
	div: {
		flexWrap: 'wrap'
	}
});

//make this component available to the app
export default Chat;
