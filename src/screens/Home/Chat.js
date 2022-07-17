import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	Platform,
	TextInput,
	Keyboard,
	StatusBar,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback
} from 'react-native';
import img from '../../../assets/splash.png';
import tw from 'tailwind-react-native-classnames';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import ReceiverMessage from '../../components/SenderMessage';
import SenderMessage from '../../components/ReceiverMessage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, FontAwesome, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { db } from '../../../firebase';
import ChatStarter from './ChatStarter';
import useAuth from '../../auth/useAuth';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';

// create a component
const Chat = () => {
	const { user } = useAuth();
	const { params } = useRoute();
	const navigation = useNavigation();
	const { matchedDetails } = params;

	const [ input, setInput ] = useState('');
	const [ messages, setMessages ] = useState([]);
	const [ IsFocused, setIsFocused ] = useState(false);
	const [ modalVisible, setModalVisible ] = useState(false);

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'matches', matchedDetails.id, 'messages'), orderBy('timestamp', 'desc')),
				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data()
						}))
					)
			),
		[ matchedDetails, db ]
	);

	const sendMessage = () => {
		addDoc(collection(db, 'matches', matchedDetails.id, 'messages'), {
			timestamp: serverTimestamp(),
			userId: user.uid,
			name: getMatchedUserInfo(matchedDetails.users, user.uid).name,
			image: matchedDetails.users[user.uid].image,
			message: input
		});

		// clear keyboard input after sending a message
		setInput('');
	};

	// function to open up chat starter modal
	const handleOpenModal = () => {
		setModalVisible(!modalVisible);
	};

	// close modal without sending any message
	// this is for when you want to close the modal and you didn't select any chat starter
	const handleCloseModalWithoutSendingMessage = () => {
		setModalVisible(!modalVisible);
	};

	// select a chat starter and send the message
	// on send, close the modal too
	const handleCloseModal = (event) => {
		setModalVisible(!modalVisible);

		addDoc(collection(db, 'matches', matchedDetails.id, 'messages'), {
			timestamp: serverTimestamp(),
			userId: user.uid,
			name: getMatchedUserInfo(matchedDetails.users, user.uid).name,
			image: matchedDetails.users[user.uid].image,
			message: event
		});
	};

	const Icons = () => {
		return (
			<View style={tw`flex-row flex-grow justify-between`}>
				<TouchableOpacity onPress={handleOpenModal} style={tw`items-center`}>
					<Entypo name="new-message" size={20} color="#cc0000" />
				</TouchableOpacity>

				<TouchableOpacity style={tw`items-center px-7`}>
					<MaterialCommunityIcons name="paperclip" size={20} color="#cc0000" />
				</TouchableOpacity>

				<TouchableOpacity style={tw`items-center pr-2`}>
					<FontAwesome name="microphone" size={20} color="#cc0000" />
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<SafeAreaView style={[ styles.container ]}>
			<View style={tw`w-full h-full`}>
				{/* Header */}
				<View style={[ styles.flex, tw` bg-white shadow py-5 mb-2` ]}>
					<View style={tw`px-6  flex-row items-center`}>
						<View>
							<TouchableOpacity onPress={() => navigation.goBack(null)}>
								<Ionicons name="chevron-back" size={30} color="#cc0000" />
							</TouchableOpacity>
						</View>

						<View style={tw`ml-3`}>
							<TouchableOpacity style={tw`w-full flex flex-row`}>
								<View style={tw`flex items-center rounded-full`}>
									<Image source={img} style={tw`h-8 w-8 rounded-full`} />
								</View>
								<View style={tw`pl-2  flex justify-center`}>
									<Text style={[ { fontFamily: 'Bold' }, tw`text-base` ]}>
										{getMatchedUserInfo(matchedDetails.users, user.uid).name}
									</Text>
									<Text style={[ { fontFamily: 'Regular' }, tw`text-xs` ]}>Online</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={tw`flex flex-grow flex-row justify-center items-center justify-around`}>
							<View style={tw`flex`}>
								<TouchableOpacity style={tw`px-1 pl-14`}>
									<MaterialIcons name="call" size={24} color="#cc0000" />
								</TouchableOpacity>
							</View>
							<View style={tw`flex`}>
								<TouchableOpacity style={tw`pl-1`}>
									<Ionicons name="videocam" size={24} color="#cc0000" />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>

				{/* // message boards show up here */}
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={tw`flex-1`}
					keyboardVerticalOffset={10}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<FlatList
							data={messages}
							inverted={-1}
							keyExtractor={(item) => item.id}
							renderItem={({ item: message }) =>
								message.userId === user.uid ? (
									<ReceiverMessage key={message.id} message={message} />
								) : (
									<SenderMessage key={message.id} message={message} />
								)}
						/>
					</TouchableWithoutFeedback>

					<View
						style={[
							tw`flex flex-row rounded-full bg-gray-200 items-center h-12 w-full px-4 mb-2 mt-2`,
							{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								maxWidth: '100%',
							}
						]}
					>
						<View style={IsFocused ? { width: '90%' } : { width: '65%' }}>
							<TextInput
								placeholder="Send Message..."
								style={tw`h-full w-full text-lg`}
								value={input}
								onChangeText={setInput}
								onSubmitEditing={sendMessage}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
						</View>

						<View>
							{IsFocused ? (
								<View style={tw`w-6/6`}>
									<TouchableOpacity onPress={sendMessage}>
										<Text style={{ color: '#ff5864', fontSize: 18 }}>Send</Text>
									</TouchableOpacity>
								</View>
							) : (
								<View style={[ tw` flex-row`, { width: '40%' } ]}>
									<Icons />
								</View>
							)}
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>

			{/* The chat starter modal */}
			<ChatStarter
				visible={modalVisible}
				onCloseAndSend={handleCloseModal}
				onCloseWithoutSending={handleCloseModalWithoutSendingMessage}
			/>
		</SafeAreaView>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	},
	div: {
		flexWrap: 'wrap'
	}
});

//make this component available to the app
export default Chat;
