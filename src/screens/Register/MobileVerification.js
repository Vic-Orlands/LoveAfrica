//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import FooterImg from '../../components/FooterImg';

// create a component
const MobileVerification = () => {

    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 items-center p-4`}>
            <View style={tw`flex-1 content-center items-center p-4`}>
                <View style={tw`pt-2`}>
                    <Text style={[{ fontFamily: 'Bold'}, tw` text-3xl text-center pb-4`]}> Verification Code</Text>
                </View>
                <View style={tw`mt-8`} />
                <View style={tw`flex items-center`}>

                    <TextInput
                        placeholder="Enter  Code"
                        keyboardType="email-address"
                        style={[tw` w-72 px-3 py-3 rounded-xl text-center shadow`, { fontFamily: 'Regular', backgroundColor: '#F0E0E0' }]}
                        autoComplete='sms-otp'


                    />
                    <Text style={[{ fontFamily: 'Light' }, tw`pl-3 flex items-center w-72 pt-2`]} >
                        Please enter the verification code that was sent to your phone.
                    </Text>

                </View>

                <View style={tw`mt-24`} />
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PhoneSuccess")}
                        style={[tw`flex justify-center shadow items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}

                    >
                        <Text style={[{ fontFamily: 'Bold' }, tw`text-white text-center  text-base flex items-center text-xl`]}>Verify</Text>
                    </TouchableOpacity>

                    <View style={tw`pt-24`} />
                    <View>
                        <Text style={[{ fontFamily: 'Regular' }, tw`pl-3 flex items-center pt-2`]} >
                            Didn’t receive any code?
                        </Text>
                    </View>
                    <View>
                        <Pressable>
                            <Text style={[{ fontFamily: 'Bold' }, tw`pl-3 flex items-center text-base font-bold underline pt-2`]} >
                                RESEND
                            </Text>
                        </Pressable>
                    </View>

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
        alignItems: 'center',
    },
});

//make this component available to the app
export default MobileVerification;
