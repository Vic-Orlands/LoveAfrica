import { View, SafeAreaView, Image, ImageBackground } from 'react-native';
import React from 'react';
import load from '../../assets/splash2.png'
import tw from 'tailwind-react-native-classnames';

const Load = () => {
    return (
        <>
            <ImageBackground
                source={load}
                resizeMode="contain"
                style={tw`h-full w-full`}  >

            </ImageBackground>
        </>

    )
}

export default Load;