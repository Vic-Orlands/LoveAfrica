//import liraries
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet, Alert, Button, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import FooterImg from '../../components/FooterImg';

// create a component
const Passion = () => {

    const [Modals, setModals] = useState(false);

    const myModalDetails = () => {

        return (
            <Modal
                visible={Modals}
            
            >
                <View style={styles.modal}>
                    <View style={tw`flex justify-center content-center bg-gray-200 items-center rounded-xl p-4 `}>
                        <Text style={tw`text-center font-bold text-xl`}>
                            Done!
                        </Text>
                        <View>
                            <Text style={tw`text-center text-base pt-4`}>
                                Your Profile has beeen created!
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Feeds")}
                            style={[tw`flex mb-2 justify-center shadow items-center px-24 rounded-full mt-6 py-3 `, { backgroundColor: '#CC0000' }]}
                        >
                            <Text style={tw`text-white text-center font-bold text-base flex items-center text-xl`}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }

    const navigation = useNavigation();
    // const Selected = () => {
    //     Alert.alert("Done!", "Your Profile has beeen created!", [
    //         {
    //             text: <Button onPress={() => navigation.navigate("Passion")}
    //                 title='okay' />,
    //         },
    //     ]
    //     )
    // }


    return (
        <View style={tw`flex-1 items-center p-4`}>
                <Modal
                    visible={Modals}
                    transparent
                >
                    <View style={styles.modal}>
                        <View style={tw`flex justify-center content-center bg-gray-200 items-center rounded-xl p-4 `}>
                            <Text style={tw`text-center font-bold text-xl`}>
                                Done!
                            </Text>
                            <View>
                                <Text style={tw`text-center text-base pt-4`}>
                                    Your Profile has been created!
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Feeds")}
                                style={[tw`flex mb-2 justify-center shadow items-center px-24 rounded-full mt-6 py-3 `, { backgroundColor: '#CC0000' }]}
                            >
                                <Text style={tw`text-white text-center font-bold text-base flex items-center text-xl`}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            <ScrollView>
                <View style={tw`flex-1 `}>
                    <View style={tw``}>
                        <Text style={tw`font-bold text-2xl pb-4`}>  Passion</Text>
                    </View>
                    <View style={tw`px-4`}>
                        <Text style={tw`w-72`}>
                            Let everyone know what you’re passionate about. <Text style={[tw`opacity-25 text-xs`]}>(Choose Five).</Text>
                        </Text>
                    </View>
                    <View style={[tw`pt-8 rounded-xl`]}>
                        <View style={tw`flex-row`}>
                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Board Games</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Swimming</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Hiking</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`flex-row mt-4`}>
                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Tea</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Working out</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Astrology</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Cat</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>
                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Working</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Fishing</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Animals</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full border-2 border-red-700 `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Comedy</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>
                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Drawings</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Blogging</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Vlogging</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Law</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Photography</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Excursion</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Travel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Journaling</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Eating Healthy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Spirituality</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>NetFlix</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Dance</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Sports</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Gamer</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Learning new skills</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Cleaning</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Cycling</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Knitting/crocheting</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Technology</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Yoga</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Snapchat</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Instagram</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Cooking</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Instrument</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Wine</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Painting</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Coffee</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Brunch</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Organizing</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Lunch</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Volunteering</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Self Care</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Shopping</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Politics</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Finance</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Reading</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Museum</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Entrepreneurship</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Writing</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Self Defense</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Running</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Designing</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Dinner</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Medicine</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw`mt-3 flex-row`}>

                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Sleeping</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[tw`mr-2 flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Parenthood</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[tw`flex  rounded-full `, { backgroundColor: '#F0E0E0' }]}
                            >
                                <Text style={tw`text-center p-3`}>Breakfast</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={tw`mt-24`} />

                </View>
            </ScrollView>
            <View style={tw`flex items-center`}>
                <TouchableOpacity
                    onPress={() => { setModals(true) }}
                    style={[tw`flex mb-2 justify-center shadow items-center w-72 rounded-full py-3 `, { backgroundColor: '#CC0000' }]}
                >
                    <Text style={tw`text-white text-center font-bold text-base flex items-center text-xl`}>Continue</Text>
                </TouchableOpacity>

            </View>
            <FooterImg />
        </View>
    );
};



// define your styles
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalview: {
        width:300,
        height:200,
    }
});

//make this component available to the app
export default Passion;
