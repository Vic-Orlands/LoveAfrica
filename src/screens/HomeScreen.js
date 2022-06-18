import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, Text, View, Image, Button, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import loveImage from '../../assets/love_text_black.png';
import { AntDesign, Entypo } from '@expo/vector-icons';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Loading from '../components/Loading';

// const fadeAnim = React.useRef(new Animated.Value(0)).current;

// const fadeIn = () => {
//   // Will change fadeAnim value to 1 in 5 seconds
//   Animated.timing(fadeAnim, {
//     toValue: 1,
//     duration: 5000
//   }).start();
// };


const Facebook = () => { return (<AntDesign name="facebook-square" size={24} color="blue" />) }
const Google = () => { return (<AntDesign name="google" size={24} color="orange" />) }
const Phone = () => { return (<Entypo name="phone" size={24} color="black" />) }

const HomeScreen = () => {
  // let [Loaded] = useFonts({
  //   "NexaLight": require("../../assets/fonts/NexaLight.otf"),
  //   "NexaRegular": require("../../assets/fonts/NexaRegular.otf"),
  //   "NexaBold": require("../../assets/fonts/NexaBold.otf")
  // });

  // if(!Loaded) {
  //   return <Loading />;
  // }
  const navigation = useNavigation();

  const Reuse = ({ iconText, text, linkTo }) => {
    return (
      <>
        <TouchableOpacity
          style={tw`bg-white w-72 rounded-full py-4 `}
          onPress={linkTo}

        >
          <Text style={tw`pl-4 text-center font-bold `}>

            {iconText}
            <Text style={[{ fontFamily: 'Bold' }, tw`pl-12`]}>{text}
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={tw`mt-4`} />
      </>
    );
  };

  return (
    <SafeAreaView style={tw`h-full flex-1`}>
      <View style={tw` h-full flex-1 items-center`}>
        <View style={tw`mt-20`} />

        <Image source={loveImage} style={{ width: 250, height: 100, resizeMode: 'contain' }} />
        <View style={tw`mt-12`} />
        <View style={[tw`rounded-t-3xl w-full h-full`, { backgroundColor: '#CC0000' }]}>
          <View style={tw`mt-6 flex justify-center`}>
            <Text style={[{ fontFamily: 'Bold' }, tw` text-3xl text-white text-center`]}>
              Sign In
            </Text>
            {/* USer sign In */}
            <View style={tw`mt-8 flex justify-center items-center`}>
              {/* Phone reg */}

              <Reuse text='Sign in with Phone Number' iconText={<Phone />} linkTo={() => navigation.navigate("Phone")} />


              {/* Google reg */}
              <Reuse text='Sign in with Google' iconText={<Google style={tw`text-left`} />} />



              {/* Facebook reg */}
              <Reuse text='Sign in with Facebook' iconText={<Facebook style={tw`pr-12`} />} />


            </View>

            <View style={tw`mt-12`} />
            <Pressable
              onPress={() => navigation.navigate("RecoverScreen")}
            >
              <Text style={[{ fontFamily: 'Bold' }, tw`text-center text-white text-xl`]}>Can't Login?</Text>
            </Pressable>

            {/* <Button title='Splash Screen' onPress={() => navigation.navigate("Splashscreen")} /> */}
            {/* Text for sign in here */}
            <View style={tw`mt-12 w-full border border-white`} />
            <View style={tw`pt-6`}>
              <Text style={[{ fontFamily: 'Bold' }, tw`text-white max-w-sm text-center px-4 `]}>
                By signing in, you have read and agreed with our
              </Text>
              <View >
                <Pressable
                // onPress={}
                >
                  <Text style={[{ fontFamily: 'Bold' }, tw`text-center text-blue-200`]}>
                    Terms and condition
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

        </View>


      </View>
    </SafeAreaView>
  )
}


export default HomeScreen;