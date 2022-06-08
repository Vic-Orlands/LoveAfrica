import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import FooterImg from '../../components/FooterImg';





const InterestedIn = () => {

    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 items-center p-4`}>
            <View style={tw`flex-1 p-4`}>
                <View style={tw`pt-2`}>
                    <Text style={tw`font-bold text-3xl text-center pb-4`}>Interested In</Text>
                </View>
                <View style={tw`mt-8`} />
                <View style={tw`flex items-center pt-4`}>
                    <TouchableOpacity

                        style={[tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}

                    >
                        <Text style={tw`text-center`}>Male</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw`flex items-center pt-4`}>
                    <TouchableOpacity

                        // onPress={showDatepicker}
                        style={[tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}

                    >
                        <Text style={tw`text-center`}>Female</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw`flex items-center pt-4`}>
                    <TouchableOpacity

                        // onPress={showDatepicker}
                        style={[tw` w-72 px-3 py-4 rounded-xl text-center shadow`, { backgroundColor: '#F0E0E0' }]}

                    >
                        <Text style={tw`text-center`}>Both</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw`mt-24`} />
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ChoosePhoto")}
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
});

//make this component available to the app
export default InterestedIn;
