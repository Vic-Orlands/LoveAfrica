import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import img from '../../assets/splash.png'
import { AntDesign, Ionicons } from '@expo/vector-icons';



const MsgHeader = () => {

    const navigation = useNavigation();

    return (

        <View style={[styles.flex, tw`px-6 flex-row items-center pt-3`]}>
            <TouchableOpacity
            //   onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Feeds') }}
            >
                <Image
                    source={img}
                    style={tw`h-6 w-6`}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Messages') }}
            >
                <AntDesign name="menu-unfold" size={26} color="#000000" />

            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    flex: {
        justifyContent: 'space-between',
    },
});

export default MsgHeader