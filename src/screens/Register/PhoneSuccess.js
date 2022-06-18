//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import { Ionicons } from '@expo/vector-icons';
import FooterImg from '../../components/FooterImg';


const CheckMark = () => {
    return (
        <Ionicons name="checkmark" size={150} color="black" />
    )
}

// create a component
const PhoneSuccess = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={tw`flex-1 items-center p-4`}>

                <View style={tw`flex-1 content-center items-center p-4`}>
                    <View style={tw`pt-2`}>
                        <Text style={[{ fontFamily: 'Bold'} ,tw` text-3xl text-center pb-4`]}>Successful</Text>
                    </View>
                    <View style={tw`mt-2`} />
                    <View style={tw`flex items-center`}>
                        <CheckMark /> 
                        <View style={tw`pt-12`} />
                        <Text style={[tw`pl-3 flex text-center w-72 pt-2 pb-4`, { lineHeight: 20, fontFamily: 'Regular' }]}>
                            Your number have been successfully verified. Proceed to the account setup.
                        </Text>
                        <View style={tw`pt-36`} />

                        <TouchableOpacity
                            onPress={() => navigation.navigate("EmailInput")}
                            style={[tw`flex justify-center shadow items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}

                        >
                            <Text style={[{ fontFamily: 'Bold'} , tw`text-white text-center font-bold text-base flex items-center text-xl`]}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`mt-24`} />

                </View>
                <FooterImg />
            </View>
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
export default PhoneSuccess;
