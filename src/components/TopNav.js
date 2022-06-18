import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


export default function TopNav({ Title, OpenMenu }) {
    const navigation = useNavigation();

    return (
        <>
            <View style={[tw`px-6 flex-row items-center pt-3`]}>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack(null)}
                    >
                        <Ionicons name="chevron-back" size={30} color="#cc0000" />
                    </TouchableOpacity>
                </View>

                <View style={tw`flex-grow`}>
                    <Text style={[{fontFamily: 'Bold'} , tw` pr-6 text-center text-3xl`]}>
                        {Title}
                    </Text>
                </View>

                <View style={tw`flex  `}>
                    <Text style={[{fontFamily: 'Bold'} , tw`px-1 text-center text-2xl`]}>
                        {OpenMenu}
                    </Text>
                </View>
            </View>
        </>
    )
}

