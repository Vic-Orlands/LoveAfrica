import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../../auth/useAuth';

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from "../../../firebase"

const ChatScroll = ({ matchedDetails }) => {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [ lastMessage, setLastMessage ] = useState("")
	const [ matchedUserInfo, setMatchedUserInfo ] = useState(null);

	useEffect(
		() => {
			setMatchedUserInfo(getMatchedUserInfo(matchedDetails.users, user.uid));
		},
		[ matchedDetails, user ]
	);

	useEffect(() => onSnapshot(query(collection(db, "matches", matchedDetails.id, "messages"), orderBy("timestamp", "desc")), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message))
	, [matchedDetails, db ])

	return (
		<View>
			<View style={tw`w-full flex flex-row bg-gray-200 h-16 rounded-lg mt-3 `}>
				<TouchableOpacity
					style={tw`p-4 flex flex-row w-full`}
					onPress={() =>
						navigation.navigate('Chat', {
							matchedDetails
						})}
				>
					<View style={tw`flex items-center`}>
						<Image source={{ uri: matchedUserInfo?.image }} style={tw`h-10 w-10 rounded-full `} />
					</View>
					<View style={tw`pl-3 w-48 flex-grow`}>
						<Text style={[ { fontFamily: 'Bold' }, tw`text-base` ]}>{matchedUserInfo?.name}</Text>
						<Text style={[ { fontFamily: 'Regular' }, tw`text-xs overflow-hidden flex-grow pb-4` ]}>
							{lastMessage || "Say Hi"}
						</Text>
					</View>

					<View style={tw`flex-grow`}>
						<Text style={[ { fontFamily: 'Light' }, tw`text-xs text-right` ]}>{matchedUserInfo?.time}</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ChatScroll;
