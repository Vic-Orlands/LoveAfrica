//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import MsgHeader from '../../components/MsgHeader';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../../auth/useAuth';
import ChatScroll from './ChatScroll';

// firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';

const Messages = () => {
	const { user } = useAuth();
	const [ matches, setMatches ] = useState([]);

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'matches'), where('usersMatched', 'array-contains', user.uid)),
				(snapshot) =>
					setMatches(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data()
						}))
					)
			),
		[ user ]
	);

	return (
		<SafeAreaView style={[ styles.container ]}>
			<View style={tw`mt-2`}>
				<MsgHeader />
				<View style={tw`px-6 w-full`}>
					<View>
						<Text style={[ { fontFamily: 'Bold' }, tw` text-2xl pt-4` ]}>Messages</Text>
					</View>

					{matches.length > 0 ? (
						<View style={tw`pb-4`}>
							<View style={tw`w-full mb-24`}>
								<FlatList
									data={matches}
									style={tw` mb-12`}
									keyExtractor={(item) => item.id}
									renderItem={({ item }) => <ChatScroll matchedDetails={item} />}
								/>
							</View>
						</View>
					) : (
						<View style={tw`pb-4 w-full mb-24`}>
							<Text>No matches at the moment</Text>
						</View>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	}
});

//make this component available to the app
export default Messages;
