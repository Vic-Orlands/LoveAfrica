//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import myImg from '../../../assets/splash.png'
import LikesHeader from '../../components/LikesHeader';
import { Entypo } from '@expo/vector-icons';



// create a component
const Likes = () => {
    return (
        <SafeAreaView style={[styles.container, tw``]}>
            <View style={tw`mt-3   h-full`}>
                {/* Header */}
                <View>
                    <LikesHeader />
                </View>
                {/* Header */}

                <View style={tw`px-6 border-t border-b border-gray-200 mt-6 flex  flex-row w-full justify-around`}>

                    {/* FUNCTION TO CHECK AND ADD OPACITY IF "YOUR LIKES OR YOUR MATCHES IS SELECTED" */}
                    <Pressable
                        style={tw`p-2`}
                    >
                        <Text style={tw`text-xl w-full opacity-25`}>Your Likes</Text>
                    </Pressable>
                    <Pressable
                        style={tw`p-2`}
                    >
                        <Text style={tw`text-xl w-full`} >Your Matches</Text>
                    </Pressable>
                </View>

                <View style={tw`mt-5`} />
                <ScrollView>
                    <View style={tw`px-6 mb-6 w-full`}>

                        <View style={tw`w-full flex flex-row  justify-evenly items-center`}>
                            <View style={tw`w-1/2  justify-center `}>
                                <View style={tw`flex justify-evenly items-center`}>

                                    <View style={tw`w-32 h-32 relative rounded-xl `}>
                                        <ImageBackground
                                            source={myImg}
                                            resizeMode="cover"
                                            style={tw`h-full w-full rounded-xl`}  >

                                            <View style={tw`bg-black bg-opacity-25 w-full rounded-b-xl left-0 absolute bottom-0 flex-row items-center`}>
                                                <View>
                                                    <Text style={tw` text-white p-2 text-xs w-24 overflow-hidden  `}>
                                                        sdsdsss
                                                    </Text>
                                                </View>
                                                <View>
                                                    <TouchableOpacity

                                                    >
                                                        <Entypo name="info-with-circle" size={20} color="#cc0000" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </ImageBackground>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`w-1/2  justify-center `}>
                                <View style={tw`flex justify-evenly items-center`}>

                                    <View style={tw`w-32 h-32 relative rounded-xl `}>
                                        <ImageBackground
                                            source={myImg}
                                            resizeMode="cover"
                                            style={tw`h-full w-full rounded-xl`}  >

                                            <View style={tw`bg-black bg-opacity-25 w-full rounded-b-xl left-0 absolute bottom-0 flex-row items-center`}>
                                                <View>
                                                    <Text style={tw` text-white p-2 text-xs w-24 overflow-hidden  `}>
                                                        sdsdsss
                                                    </Text>
                                                </View>
                                                <View>
                                                    <TouchableOpacity

                                                    >
                                                        <Entypo name="info-with-circle" size={20} color="#cc0000" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </ImageBackground>
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                </ScrollView>


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
export default Likes;
