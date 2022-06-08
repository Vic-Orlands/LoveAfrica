import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FooterImg from '../../../components/FooterImg';


// create a component
const SettingInfo = () => {

    const navigation = useNavigation();


    return (
        <SafeAreaView style={[styles.container, tw``]}>
            <View style={tw`flex-1`}>
                <View style={tw`flex`}>
                    <View style={[tw`px-6 flex-row items-center pt-3`]}>
                        <View>
                            <TouchableOpacity
                            //   onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="chevron-back" size={30} color="#cc0000" />
                            </TouchableOpacity>
                        </View>

                        <View style={tw`flex-grow`}>
                            <Text style={tw` pr-6 text-center text-2xl font-bold`}>
                                Settings
                            </Text>
                        </View>
                    </View>
                    <View style={tw`w-full`}>
                        <View style={tw`px-6 w-full`}>

                            <View style={tw`pb-4 mt-8 h-full`}>
                                <ScrollView style={tw`h-full `}>
                                    <View style={tw`w-full `}>
                                        <Text style={tw`font-bold text-xl`}>Legal.</Text>
                                        <View style={tw`w-full flex flex-row bg-gray-200 rounded-lg mt-1 `}>
                                            <TouchableOpacity
                                                style={tw`p-4  flex flex-row  w-full`}
                                            // onPress={() => navigation.navigate("Drawers")}

                                            >

                                                <View style={tw` w-48 flex-grow`}>
                                                    <Text style={tw`font-normal   text-base`}>
                                                        Terms of Service.
                                                    </Text>

                                                </View>


                                            </TouchableOpacity>

                                        </View>

                                        <View style={tw`w-full flex flex-row bg-gray-200 rounded-lg mt-3 `}>
                                            <TouchableOpacity
                                                style={tw`p-4  flex flex-row  w-full`}
                                            // onPress={() => navigation.navigate("Drawers")}

                                            >

                                                <View style={tw` w-48 flex-grow`}>
                                                    <Text style={tw`font-normal   text-base`}>
                                                        Privacy and Policy.
                                                    </Text>

                                                </View>


                                            </TouchableOpacity>

                                        </View>
                                    </View>





                                    <View style={tw`w-full mt-8`}>
                                        <Text style={tw`font-bold text-xl`}>Contact Us.</Text>
                                        <View style={tw`w-full flex flex-row bg-gray-200 rounded-lg mt-1 `}>
                                            <TouchableOpacity
                                                style={tw`p-4  flex flex-row  w-full`}
                                            // onPress={() => navigation.navigate("Drawers")}

                                            >

                                                <View style={tw` w-48 flex-grow`}>
                                                    <Text style={tw`font-normal   text-base`}>
                                                        Help and support.
                                                    </Text>

                                                </View>


                                            </TouchableOpacity>

                                        </View>

                                        <View style={tw`w-full flex flex-row bg-gray-200 rounded-lg mt-3 `}>
                                            <TouchableOpacity
                                                style={tw`p-4  flex flex-row  w-full`}
                                            // onPress={() => navigation.navigate("Drawers")}

                                            >

                                                <View style={tw` w-48 flex-grow`}>
                                                    <Text style={tw`font-normal   text-base`}>
                                                        About Us.
                                                    </Text>

                                                </View>


                                            </TouchableOpacity>

                                        </View>

                                        <View style={tw`w-full flex flex-row bg-gray-200 rounded-lg mt-3 `}>
                                            <TouchableOpacity
                                                style={tw`p-4  flex flex-row  w-full`}
                                            // onPress={() => navigation.navigate("Drawers")}

                                            >

                                                <View style={tw` w-48 flex-grow`}>
                                                    <Text style={tw`font-normal   text-base`}>
                                                        FAQs.
                                                    </Text>

                                                </View>


                                            </TouchableOpacity>

                                        </View>
                                    </View>




                                    <View style={tw`w-full mt-24 flex`}>
                                        <View style={[tw`w-full bg-gray-200 rounded-lg mt-1 `, { backgroundColor: '#cc0000' }]}>
                                            <TouchableOpacity
                                                style={tw`p-4 bottom-0 right-0   w-full`}
                                            // onPress={() => navigation.navigate("Drawers")}

                                            >

                                                <Text style={tw`font-normal text-center text-white font-bold text-base`}>
                                                    Delete my account.
                                                </Text>
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                </ScrollView>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <FooterImg />

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
        justifyContent: 'space-between',
    },

});



//make this component available to the app
export default SettingInfo;
