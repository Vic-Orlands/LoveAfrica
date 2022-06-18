//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames' 
import FooterImg from '../../components/FooterImg';

// create a component
const Gender = () => {

    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 items-center p-4`}>
            <View style={tw`flex-1 p-4`}>
                <View style={tw`pt-2`}>
                    <Text style={[ { fontFamily: 'Bold'}, tw` text-3xl text-center pb-4`]}>Gender</Text>
                </View>
                <View style={tw`mt-8`} /> 
                <View style={tw`flex items-center pt-4`}> 
                <TouchableOpacity

                        style={[tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}

                    >
                        <Text style={[ { fontFamily: 'Regular'}, tw`text-center`]}>Male</Text>
                    </TouchableOpacity> 
                </View>

                <View style={tw`flex items-center pt-4`}> 
                <TouchableOpacity

                        // onPress={showDatepicker}
                        style={[tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}

                    >
                        <Text style={[ { fontFamily: 'Regular'}, tw`text-center`]}>Female</Text>
                    </TouchableOpacity> 
                </View>

                <View style={tw`flex items-center pt-4`}> 
                <TouchableOpacity

                        // onPress={showDatepicker}
                        style={[tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}

                    >
                        <Text style={[ { fontFamily: 'Regular'}, tw`text-center`]}>Prefer Not to say</Text>
                    </TouchableOpacity> 
                </View>

                <View style={tw`mt-24`} />
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("InterestedIn")}
                        style={[tw`flex justify-center shadow items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}
                    >
                        <Text style={[ { fontFamily: 'Bold'}, tw`text-white text-center  text-base flex items-center text-xl`]}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <FooterImg />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});



export default Gender;
