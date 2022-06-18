import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import FooterImg from '../../components/FooterImg';

// create a component
const PasswordInput = () => {

    const navigation = useNavigation();


    return (
        <View style={tw`flex-1 items-center p-4`}>
            <View style={tw`flex-1 p-4`}>
                <View style={tw`pt-2`}>
                    <Text style={[{ fontFamily: 'Regular' }, tw` text-3xl  pb-4`]}>Password</Text>
                </View>
                <View style={tw`mt-8`} />
                <View style={tw`flex items-center`}>
                    <Text style={[{ fontFamily: 'Regular' }, tw`text-sm w-72 pt-2`]} >
                        Password
                    </Text>
                    <TextInput
                        placeholder="************"
                        keyboardType="default"
                        style={[tw` w-72 px-3 py-3 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}
                        returnKeyType='done'
                        autoComplete='password'
                        secureTextEntry={true}

                    />
                </View>

                <View style={tw`flex items-center pt-4`}>
                    <Text style={[{ fontFamily: 'Regular' }, tw`text-sm w-72 pt-2`]} >
                        Re-enter password
                    </Text>
                    <TextInput
                        placeholder="************"
                        keyboardType="default"
                        style={[tw` w-72 px-3 py-3 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}
                        returnKeyType='done'
                        autoComplete='password'

                        secureTextEntry={true}

                    />
                </View>

                <View style={tw`mt-24`} />
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("NameInput")}
                        style={[tw`flex justify-center shadow items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}
                    // disabled
                    >
                        <Text style={[{ fontFamily: 'Bold' }, tw`text-white text-center  text-base flex items-center text-xl`]}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <FooterImg />
        </View>
    );
};



//make this component available to the app
export default PasswordInput;
