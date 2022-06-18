//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ImageBackground, SafeAreaView, Pressable } from 'react-native';
import FooterImg from '../../../components/FooterImg';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign, SimpleLineIcons, FontAwesome, FontAwesome5, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import myImgs from '../../../../assets/splash.png';
import Cards from '../../../components/Cards';
import TopNav from '../../../components/TopNav';
import Slider from '@react-native-community/slider';
import ActionButton from '../../../components/ActionButton';

// create a component
const EditProfile = () => {

    const navigation = useNavigation();

    const [Age, setAge] = useState(30);
    const [Miles, setMiles] = useState(0);



    const Photo = ({ ImageHere, icon }) => {
        return (
            <>
                <View>
                    <View style={tw`w-24 h-24 relative rounded-xl `}>
                        <ImageBackground
                            source={ImageHere}
                            resizeMode="cover"
                            style={tw`h-full w-full rounded-xl`}  >

                            <View style={[{ backgroundColor: '#cc0000' }, tw` rounded-full right-0 absolute bottom-0 flex-row items-center`]}>

                                <View>
                                    <TouchableOpacity

                                    >
                                        {icon}

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ImageBackground>
                    </View>
                </View>
            </>
        )
    }



    const AddImage = () => {
        return (
            <>
                <View style={tw`mb-6 flex-row justify-evenly`}>
                    <Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
                    <Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
                    <Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />

                </View>

                <View style={tw`mb-6 flex-row justify-evenly`}>

                    <Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
                    <Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />
                    <Photo ImageHere={myImgs} icon={<Entypo name="cross" size={20} color="white" />} />

                </View>

                <ActionButton InfoText='Add to Gallery' InfoIcon={<AntDesign name="plussquare" size={24} color="white" />} />
            </>
        )
    }

    const SettingMyProfile = () => {
        return (
            <>
                <View style={tw`w-full `}>

                    {/* Add Profile Images */}
                    <AddImage />
                    {/*  */}
                    <View style={tw`mt-12`} />
                    <Text style={[{ fontFamily: 'Bold' }, tw` text-xl`]}>My Settings</Text>


                    <Cards title='Phone Number' slug='+1234567890' yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />} />
                    <Cards title='Allow User to call' yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />} />
                    <Cards title='Change Password' yes={<Ionicons name="key-sharp" size={24} color="#cc0000" />} />
                    <Cards title='Enable push Notifications' yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />} />
                    <Cards title='Show my socials to the public.' yes={<FontAwesome name="toggle-on" size={28} color="#cc0000" />} />
                    <Cards title='Snapchat' slug={<FontAwesome name="snapchat" size={24} color="yellow" />} yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />} />


                </View>


            </>
        )
    }



    const MyProfilePreference = () => {
        return (
            <>
                <View style={tw`w-full mt-8`}>

                    <Text style={[{ fontFamily: 'Bold' }, tw` text-xl`]}>My Preferences (Show Me).</Text>
                    <Cards title='Men' yes={<Feather name="toggle-left" size={28} color="#cc0000" />}
                    //<Feather name="toggle-right"  size={28} color="#cc0000" />  
                    />
                    <Cards title=' Nigeria' slug={<Feather name="flag" size={20} color="#cc0000" />} yes={<MaterialIcons name="arrow-forward-ios" size={24} color="#cc0000" />} />


                    <Text style={tw`mt-5 pl-1`}>
                        Age
                    </Text>
                    <Cards
                        title={
                            <Slider
                                minimumValue={18}
                                maximumValue={70}
                                value={Age}
                                // onSlidingComplete
                                minimumTrackTintColor='#cc0000'
                                maximumTrackTintColor="gray"
                                onValueChange={(value) => setAge(Math.floor(value))}
                                style={[{ width: 150 }, tw``]}
                                thumbTintColor="#cc0000"

                            />}
                        yes='18 - ' no={Math.floor(Age)} />


                    <Text style={tw`mt-5 pl-1`}>
                        Distance
                    </Text>
                    <Cards title={
                        <Slider
                            minimumValue={0}
                            maximumValue={5}
                            value={Miles}
                            // onSlidingComplete
                            minimumTrackTintColor='#cc0000'
                            maximumTrackTintColor="gray"
                            onValueChange={(value) => setMiles(Math.floor(value))}
                            style={[{ width: 150 }, tw``]}
                            thumbTintColor="#cc0000"

                        />} no='mi' yes={Math.floor(Miles)} />


                    <Cards title='Clear cache' yes={<FontAwesome5 name="database" size={24} color="#cc0000" />} />

                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={[styles.container, tw``]}>
            {/* Top Navigation */}
            <TopNav Title='Edit Profile' />

            <ScrollView style={tw`h-full `}>
                <View style={tw`flex-1`}>
                    <View style={tw`flex`}>

                        <View style={tw`w-full`}>
                            <View style={tw`px-6 w-full`}>

                                <View style={tw`pb-4 mt-8 h-full`}>

                                    {/* PROFILE SETUP */}
                                    <SettingMyProfile />
                                    {/* PROFILE SETUP */}

                                    <MyProfilePreference />

                                </View>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={tw`my-6 `} />

                <FooterImg />
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    flex: {
        justifyContent: 'space-between',
    },
});

//make this component available to the app
export default EditProfile;
