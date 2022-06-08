//import liraries
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import FooterImg from '../../components/FooterImg';

// create a component
const EmailInput = () => {

    const navigation = useNavigation();

    const [info, setInfo] = useState('');

    const setTheinfo = () => {
        setInfo('We will send a message to this email if you need to restore access to your account.');
    }

    return (
        <View style={tw`flex-1 items-center p-4`}>
            <View style={tw`flex-1 p-4`}>
                <View style={tw`pt-2`}>
                    <Text style={tw`font-bold text-3xl  pb-4`}> Email Account</Text>
                </View>
                <View style={tw`mt-8`} />
                <View style={tw`flex items-center`}>

                    <TextInput
                        placeholder="Your email"
                        keyboardType="email-address"
                        style={[tw` w-72 px-3 py-3 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}
                        autoComplete='email'
                        onTextInput={setTheinfo}

                    />
                    <Text style={tw`pl-3 flex items-center text-xs w-72 pt-2`} >
                        {info}
                    </Text>

                </View>

                <View style={tw`mt-24`} />
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PasswordInput")}
                        style={[tw`flex justify-center shadow items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}
                    // disabled
                    >
                        <Text style={tw`text-white text-center font-bold text-base flex items-center text-xl`}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <FooterImg />
        </View>
    );
};



//make this component available to the app
export default EmailInput;
