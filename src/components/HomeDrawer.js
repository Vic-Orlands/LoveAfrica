import { View, SafeAreaView, StyleSheet, StatusBar, Text, Button, ImageBackground, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import splash from '../../assets/splash.png'
import tw from 'tailwind-react-native-classnames';
import { Entypo } from '@expo/vector-icons';



const HomeDrawer = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`flex justify-center items-center`}>
                <DrawerContentScrollView
                    // {...props}
                    contentContainerStyle={{ backgroundColor: "red" }}
                >
                    <View style={tw`flex justify-center items-center`}>
                        <Image source={splash}
                            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
                        <View style={tw`flex-row`}>

                            <Entypo name="info-with-circle" size={20} color="#cc0000" />
                            <Text style={[{ fontFamily: 'Bold' }, tw`pl-2 text-base`]}>
                                Fullname Here, Age
                            </Text>
                        </View>
                        <Text style={[{ fontFamily: 'Regular' }, tw`text-sm`]}>
                            Not Verified
                        </Text>
                    </View>

                    {/* <DrawerItemList /> */}


                </DrawerContentScrollView>

                <Text>Home Drawers</Text>
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
});

export default HomeDrawer;