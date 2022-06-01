import { View, SafeAreaView, Image, ImageBackground } from 'react-native';
import React from 'react';
import load from '../../assets/splash2.png'
import tw from 'tailwind-react-native-classnames';

const Load = () => {
    return (
        <SafeAreaView style={tw` flex justify-center items-center`}>
            <View style={tw` flex justify-center items-center`}>
                <Image source={load}/> 
            </View> 
        </SafeAreaView>
    )
}

export default Load;