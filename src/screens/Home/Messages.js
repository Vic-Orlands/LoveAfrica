//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import MsgHeader from '../../components/MsgHeader';
import { ScrollView } from 'react-native-gesture-handler';
import img from '../../../assets/splash.png'
import { NavigationContainer } from '@react-navigation/native';


const msgData = [
    {
        id: 1,
        name: 'Ozoemena bright f',
        text: 'My name is lorem ipsum dioor cac ddsd',
        time: 'Time',
        image: img
    },
    // {
    //     id: 2,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 3,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 4,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 5,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 6,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 7,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 8,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    {
        id: 9,
        name: 'Ozoemena bright f',
        text: 'My name is lorem ipsum dioor cac ddsd',
        time: 'Time',
        image: img
    },
    // {
    //     id: 10,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 11,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
    // {
    //     id: 12,
    //     name: 'Ozoemena bright f',
    //     text: 'My name is lorem ipsum dioor cac ddsd',
    //     time: 'Time',
    //     image: img
    // },
];




const Messages = () => {
    const navigation = useNavigation();

    const ScrollViews = () => {
        return (
            <View>
                <FlatList
                    data={msgData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (

                        <View style={tw`w-full flex flex-row bg-gray-200 h-16  rounded-lg mt-3 `}>
                            <TouchableOpacity
                                style={tw`p-4 flex flex-row  w-full`}
                                // onPress={() => navigation.navigate("Gifted")}
                                onPress={() => navigation.navigate("Chat")}

                            >
                                <View style={tw`flex items-center`}>
                                    <Image
                                        source={item.image}
                                        style={tw`h-8 w-8 rounded-full `}
                                    />
                                </View>
                                <View style={tw`pl-3 w-48 flex-grow`}>
                                    <Text style={tw`font-bold   text-base`}>
                                        {item.name}
                                    </Text>
                                    <Text style={tw`text-xs  overflow-hidden flex-grow pb-4`}>
                                        {item.text}
                                    </Text>
                                </View>

                                <View style={tw`flex-grow `}>
                                    <Text style={tw`text-xs text-right`}>
                                        {item.time}
                                    </Text>
                                </View>

                            </TouchableOpacity>

                        </View>

                    )}

                />




            </View >
        )
    }


    return (
        <SafeAreaView style={[styles.container, tw``]}>
            <View style={tw`mt-2`}>
                <MsgHeader />
                <View style={tw`px-6 w-full`}>
                    <View>
                        <Text style={tw`font-bold text-2xl pt-4`}>
                            Messages
                        </Text>
                    </View>
                    <View style={tw`pb-4`}>
                        <View style={tw`w-full mb-24`}>
                            <FlatList
                                data={msgData}
                                keyExtractor={item => item.id}
                                // renderItem={({ item }) => (

                                //     <View style={tw`w-full flex flex-row bg-gray-200 h-16  rounded-lg mt-3 `}>
                                //         <TouchableOpacity
                                //             style={tw`p-4 flex flex-row  w-full`}
                                //             // onPress={() => navigation.navigate("Gifted")}
                                //             onPress={() => navigation.navigate("Chat")}

                                //         >
                                //             <View style={tw`flex items-center`}>
                                //                 <Image
                                //                     source={item.image}
                                //                     style={tw`h-8 w-8 rounded-full `}
                                //                 />
                                //             </View>
                                //             <View style={tw`pl-3 w-48 flex-grow`}>
                                //                 <Text style={tw`font-bold   text-base`}>
                                //                     {item.name}
                                //                 </Text>
                                //                 <Text style={tw`text-xs  overflow-hidden flex-grow pb-4`}>
                                //                     {item.text}
                                //                 </Text>
                                //             </View>

                                //             <View style={tw`flex-grow `}>
                                //                 <Text style={tw`text-xs text-right`}>
                                //                     {item.time}
                                //                 </Text>
                                //             </View>

                                //         </TouchableOpacity>

                                //     </View>


                                // )}
                                ListFooterComponent={<ScrollViews />}

                            />



                        </View>
                    </View>
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
    },
});

//make this component available to the app
export default Messages;
