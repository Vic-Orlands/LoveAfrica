//import liraries
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import TopNav from '../../components/TopNav';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import Cards from '../../components/Cards';
import splash from '../../../assets/splash.png';


// create a component
const ProfileInfo = () => {

    const navigation = useNavigation();

    const ImgCarousel = ({ fileName }) => {
        return (
            <View style={tw`border rounded-xl mr-4 border-gray-200`}>
                <Image
                    style={tw`h-32 w-32`}
                    source={fileName}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.container, tw``]}>
            {/* Top Navigation */}
            <TopNav 
            // OpenMenu={<AntDesign name="menu-unfold" size={26} color="#000000" />}
            />

            <ScrollView style={tw`h-full `}>
                <View style={tw`flex-1 px-4`}>
                    <View style={tw`mt-4`} />

                    {/* User Info Header */}
                    <View style={tw`flex items-center justify-center`}>
                        <View >
                            <Image source={splash} style={tw`h-20 w-20 rounded-full border `} />
                        </View>
                        <View style={tw`pt-1 `}>
                            <Text style={[ { fontFamily: 'Bold'},tw`text-xl  `]}>
                                Ozozemena bright, Age
                            </Text>
                            <Text style={[ { fontFamily: 'Light'},tw`italic text-xs font-bold text-center opacity-50 `]}>
                                34Km away
                            </Text>

                        </View>
                    </View>

                    {/* Icon actions. this should be removed later on */}
                    <View style={tw` pb-8 w-full `} >
                        <View style={tw`flex flex-row justify-evenly mx-5 items-center bottom-0  pt-4 `}>
                            <View style={[tw`flex justify-center items-center `]}>
                                <TouchableOpacity
                                    // onPress={} 
                                    style={[tw`  rounded-full `]}>
                                    <AntDesign name="message1" size={32} color="#cc0000" />

                                </TouchableOpacity>
                                <Text style={[ { fontFamily: 'Regular'},tw`text-xs text-center`]}>
                                    Message
                                </Text>
                            </View>

                            <View style={[tw`flex justify-center items-center `]}>
                                <TouchableOpacity
                                    // onPress={} 
                                    style={[tw`  rounded-full `]}>
                                    <MaterialIcons name="call" size={32} color="#cc0000" />

                                </TouchableOpacity>
                                <Text style={[ { fontFamily: 'Regular'},tw`text-xs text-center`]}>
                                    Call
                                </Text>
                            </View>

                            <View style={[tw`flex justify-center items-center `]}>
                                <TouchableOpacity
                                    // onPress={} 
                                    style={[tw`  rounded-full `]}>
                                    <Ionicons name="videocam" size={32} color="#cc0000" />
                                </TouchableOpacity>
                                <Text style={[ { fontFamily: 'Regular'},tw`text-xs text-center`]}>
                                    Video Call
                                </Text>
                            </View>


                        </View>
                    </View>

                    {/* About me */}
                    <View style={tw` pb-8 px-2 w-full `} >
                        <View>
                            <Text style={[ { fontFamily: 'Bold'}, tw` text-xl  text-red-600  `]}>
                                About Me.
                            </Text>
                        </View>

                        <View style={tw` `}>
                            <Text style={[{fontFamily: 'Regular', lineHeight: 23 }, tw` pt-3`]}>
                                About Me About MeAbout Me About Me About MeAbout Me About Me About MeAbout Me About Me About MeAbout Me About Me About MeAbout Me About Me About MeAbout Me About Me About MeAbout Me About Me About MeAbout Me
                            </Text>
                        </View>
                    </View>


                    {/* Passion and Interest */}
                    <View style={tw` px-2 pb-8 w-full `} >
                        <View>
                            <Text style={[ { fontFamily: 'Bold'}, tw` text-xl  text-red-600  `]}>
                                Passions & Interests.
                            </Text>
                        </View>

                        <View style={tw` w-full `}>

                            <View style={tw`w-full  items-start justify-start`}>

                                <Text style={[{ lineHeight: 40 }, tw`text-center  p-2`]}>
                                    <Pressable style={tw`border mb-3 border-gray-300 mx-2 p-2  flex justify-center  rounded-full`}>
                                        <Text style={[{fontFamily: 'Regular'},tw``]}>Fishing</Text>
                                    </Pressable>

                                    <Pressable style={tw`border border-gray-300 mx-2 p-2  flex justify-center  rounded-full`}>
                                        <Text style={[{fontFamily: 'Regular'},tw``]}>Surfing</Text>
                                    </Pressable>
                                </Text>

                            </View>

                        </View>
                    </View>

                    {/* Interest */}
                    <View style={tw`px-2 pb-8 w-full `}>
                        <Cards title='Interested In' slug='Women' />
                    </View>

                    {/* Socials. This should be removed later */}
                    <View style={tw` px-2 pb-8 w-full `} >
                        <View>
                            <Text style={[ { fontFamily: 'Bold'}, tw` text-xl  text-red-600  `]}>
                                Socials.
                            </Text>
                        </View>
                        <View style={tw` w-full `}>
                            <Cards title='Snapchat' yes='Women' />
                            <Cards title='Instagram' yes='Women' />
                        </View>
                    </View>

                    {/* Chat starter */}
                    <View style={tw` px-2 pb-8 w-full `} >
                        <View>
                            <Text style={[ { fontFamily: 'Bold'}, tw` text-xl  text-red-600  `]}>
                                Say Hello.
                            </Text>
                        </View>
                        <View style={tw` w-full `}>
                            <Cards
                                // action={}
                                title='Chat Starter' />
                        </View>
                    </View>


                    {/* Media Images */}
                    <View style={tw` px-2 pb-8 w-full `} >
                        <View>
                            <Text style={[ { fontFamily: 'Bold'}, tw` text-xl  text-red-600  `]}>
                                Media.
                            </Text>
                        </View>
                        <View style={tw` w-full `}>
                            <ScrollView
                                horizontal
                                disableIntervalMomentum={true}
                            >
                                <ImgCarousel fileName={splash} />
                            </ScrollView>
                        </View>
                    </View>



                    {/* Block And Report action. The report should be suspended for now */}
                    {/* <View style={tw`px-2 pb-8 w-full `}>
                        <Cards title='Report user' slug='Women' />
                    </View> */}

                    <View style={tw`px-2 pb-8 w-full `}>
                        <Cards title='Block User' yes={<FontAwesome name="toggle-off" size={28} color="#cc0000" />} />
                    </View>



                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    flex: {
        justifyContent: 'space-between',
    },
    wei: {
        fontWeight: 900
    }
});



export default ProfileInfo;
