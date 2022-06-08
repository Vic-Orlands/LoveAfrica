import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import FooterImg from '../../components/FooterImg';
import gallery from '../../../assets/gallery.png'
import { imagePicker, Permission } from 'expo';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



// create a component
const ChoosePhoto = () => {

    const navigation = useNavigation();
    const [imageUri, setimageUri] = useState('')
    const OpenGallery = () => {

        const options = {
            storageOption: {
                path: 'images',
                mediaType: 'photo',
            },
        };

        launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('You Cancelled the image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom buttom : ', response.customButton)
            } else {
                const sourcef = { uri: 'data:image/jpeg;based64,' + response.base64 };

                setimageUri(sourcef);
            }
        });

    }

    return (
        <View style={tw`flex-1 items-center p-4`}>
            <View style={tw`flex-1 p-4`}>
                <View style={tw`pt-2`}>
                    <Text style={tw`font-bold text-2xl pb-4`}>  Profile
                        Photo</Text>
                </View>
                <View style={[tw`flex items-center pt-4  rounded-xl py-12`, styles.rounded]}>
                    <Pressable
                        // onPress={OpenGallery}
                    >
                        <Image
                            source={gallery} style={{ width: 300, height: 150, resizeMode: 'contain' }}
                        />
                    </Pressable>
                </View>

                <View style={tw`flex  items-center`}>
                    <Text>hello ther</Text>
                    {/* <Image source={imageUri} style={{ width: 300, height: 150, resizeMode: 'contain' }}/> */}
                </View>
                <View style={tw`mt-24`} />
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AlmostDone")}
                        style={[tw`flex justify-center shadow items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}
                    >
                        <Text style={tw`text-white text-center font-bold text-base flex items-center text-xl`}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <FooterImg />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    rounded: {
        borderStyle: 'dashed',
    }
});

//make this component available to the app
export default ChoosePhoto;
