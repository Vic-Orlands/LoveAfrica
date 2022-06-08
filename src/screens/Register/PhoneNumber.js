//import liraries
import React, { Component, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import FooterImg from '../../components/FooterImg';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native'; 


// create a component
const PhoneNumber = () => {


    const navigation = useNavigation(); 

    const [info, setInfo] = useState(''); 
 
    const setTheinfo = () => { 
            setInfo('You will receive an email to continue your account recovery.'); 
    }
    return (
        <View style={tw`flex-1 items-center p-4`}>
            <View style={tw`flex-1 content-center items-center p-4`}>
                <View style={tw`pt-2`}>
                    <Text style={tw`font-bold text-3xl text-center pb-4`}> Mobile Number</Text>
                </View>
                <View style={tw`mt-8`} />
                <View style={tw`flex items-center`}>
                    {/* <PhoneInput ref='phone'/> */}
                    <TextInput
                        placeholder="your@email.com"
                        keyboardType="email-address"
                        style={tw` w-72 px-3 py-3 rounded-full text-center border-2 border-green-700`}
                        autoComplete='email' 
                        onTextInput={setTheinfo}


                    />
                    <Text style={tw`pl-3 flex items-center w-72 pt-2`} onChange> 
                    {info}
                    </Text>

                </View>

                <View style={tw`mt-24`} />
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MobileVerification")}
                        style={[tw`flex justify-center items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}
                    >
                        <Text style={tw`text-white text-center font-bold text-base flex items-center text-xl`}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FooterImg />
        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});


export default PhoneNumber;

