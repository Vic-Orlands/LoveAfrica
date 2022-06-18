//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Image, Button, Keyboard, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as FacebookLogin from 'expo-facebook';
// import { firebase } from '../../../config';
import splash from '../../../assets/splash.png';
import useAuth from '../../auth/useAuth';
// import Appload



// create a component
const Facebook = () => {


  

    const { user } = useAuth();
    //const todoRef = firebase.firestore().collection('newData');

    const [addData, setaddData] = useState('');



    const [LoggedIn, setLoggedIn] = useState(false);
    const [userData, setuserData] = useState(null);
    const [isImageLoading, setisImageLoading] = useState(false);


    const facebookLogin = async () => {
        try {
            await FacebookLogin.initializeAsync({
                appId: '716202886280415' //ID HERE
            });

            const {
                type,
                token,
            } = await FacebookLogin.logInWithReadPermissionsAsync({
                permissions: ['email', 'name', 'public_profile'],
            });
            if (type === 'success') {
                fetch(`https://graph.facebook.com/me?access_token=${token}&field=id,name,email,picture.height(500)`)
                    .then(response => response.json())
                    .then(data => {
                        setLoggedIn(true);
                        setuserData(data);
                    })
                    .catch(e => console.log(e))
            } else {
                // return (
                //     <View style={tw`rounded-lg p-2 bg-gray-200`}>
                //         <Text>
                //             cancel
                //         </Text>
                //     </View>
                // )
            }

        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    const logout = () => {
        setLoggedIn(false);
        setuserData(null);
        setisImageLoading(false);
    }

    const set = () => {
        setLoggedIn(true);
        setuserData(user);
    }


    return (

        LoggedIn ?
            userData ?
                <View style={styles.container}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={
                            splash
                            //{uri: userData.picture.data.url }
                        }
                        onLoadEnd={() => setisImageLoading(true)}
                    />

                    <ActivityIndicator
                        size='large'
                        color="#cc0000"
                        animating={!isImageLoading}
                        style={{ position: 'absolute' }}
                    />
                    <Text
                        style={[{ fontFamily: 'Bold' }, tw`underline text-xl`]}
                    >Hello {user}</Text>

                    <View style={tw`mt-24`}>
                        <TouchableOpacity style={tw`bg-gray-600`} onPress={logout}>
                            <Text style={[{ fontFamily: 'Bold' }, tw`p-2`]}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null
            :
            <View style={styles.container}>


                <TouchableOpacity style={tw`mt-12 bg-blue-300`}
                    onPress={set} >
                    <Text style={[{ fontFamily: 'Bold' }, tw`p-2` ]}>
                        Login to my Network
                    </Text>
                </TouchableOpacity>
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
export default Facebook;
