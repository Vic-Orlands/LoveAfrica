//import liraries
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import Header from '../../components/Header';
import Swiper from 'react-native-deck-swiper';
import trash from '../../../assets/gallery.png'
import trashtwo from '../../../assets/splash.png'
import { Entypo, AntDesign } from '@expo/vector-icons';


const DUMMY_data = [

    {
        firstName: "Ozeee",
        lastName: "trying",
        imags: trashtwo,
        age: '40',
        id: 2,
    },
    {
        firstName: "hhhhs",
        lastName: "ccccc",
        imags: trash,
        age: '40',
        id: 1,
    },
];

// create a component
const Feeds = () => {

    const [Profile, setProfile] = useState([]);
    const Like = () => {
        return (
            <View style={tw`flex items-center`}>
                <View style={[{ backgroundColor: '#4CD964' }, tw`p-3 mb-3 rounded-full `]}>
                    <AntDesign name="heart" size={30} color="white" />
                </View>
                <Text style={[{ color: '#4CD964', borderColor: '#4CD964' }, tw`font-bold text-base border rounded-xl px-3 pt-1`]}>
                    LIKE
                </Text>
            </View>

        )
    }

    const Nope = () => {
        return (
            <View style={tw`flex items-center`}>
                <View style={[{ backgroundColor: '#cc0000' }, tw`p-3 mb-3 rounded-full `]}>
                    <Entypo name="cross" size={34} color="white" />
                </View>
                <Text style={[{ color: '#cc0000', borderColor: '#cc0000' }, tw`font-bold text-base border rounded-xl px-3 pt-1`]}>
                    NOPE
                </Text>
            </View>

        )
    }


    const swipeRef = useRef(null);
    return (
        <SafeAreaView style={[styles.container, tw``]}>
            <View style={tw`mt-3   h-full`}>
                {/* Header */}
                <Header />
                {/* Header */}


                {/* Cards */}

                <View style={tw` flex w-full rounded-xl`} >

                    <Swiper
                        ref={swipeRef}
                        containerStyle={{ backgroundColor: "transparent" }}
                        stackSize={3}
                        onSwipedLeft={
                            () => { console.log("i dont like") }
                        }
                        onSwipedRight={
                            () => { console.log("i  like") }
                        }
                        cardIndex={0}
                        overlayLabels={{

                            left: {
                                element: <Nope />,
                                title: 'NOPE',
                                style: {
                                    label: {
                                        backgroundColor: 'white',
                                        borderColor: '#cc0000',
                                        color: '#cc0000',
                                        borderWidth: 1
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-start',
                                        marginTop: 30,
                                        marginLeft: -30
                                    }
                                }
                            },
                            right: {
                                element: <Like />,
                                title: 'LIKE',
                                style: {
                                    label: {
                                        backgroundColor: 'white',
                                        borderColor: '#4ded30',
                                        color: '#4ded30',
                                        borderWidth: 1
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        marginTop: 30,
                                        marginLeft: 30
                                    }
                                }
                            },

                        }}
                        animateCardOpacity
                        verticalSwipe={false}
                        cards={DUMMY_data}
                        renderCard={(card) =>
                            // card ?
                             (
                                <View
                                    key={card.id} style={tw` bg-white h-3/4 rounded-xl`}>
                                    <Image style={tw`h-full w-full rounded-xl top-0 `}
                                        source={card.imags} />

                                    <View style={tw`flex-row items-center justify-center absolute bottom-0 bg-black w-full h-16 bg-opacity-25 rounded-b-xl`}>
                                        <View style={tw`flex  items-center`}>
                                            <Text style={tw` pt-3 text-base text-white font-bold`}>
                                                {card.firstName},   {card.age}
                                            </Text>

                                        </View>
                                        <View style={tw`flex items-center pl-2`}>
                                            <Entypo name="info-with-circle" size={20} color="#cc0000" />
                                        </View>

                                    </View>

                                </View>


                            ) 
                            // : (

                            //     <Text
                            //         style={tw` bg-white h-3/4 rounded-xl items-center justify-center shadow`}>
                            //         <Text> style={tw`text-2xl top-0 font-bold`}
                            //             Getting users...
                            //         </Text></Text>


                            // )
                        }

                    />

                </View>
                {/* Cards */}

                {/* Alt Card */}
                <View style={tw`bottom-0 pb-20 absolute w-full `} >
                    <View style={tw`flex flex-row justify-evenly mx-5 items-center bottom-0 px-4 pt-4 `}>
                        <View>
                            <TouchableOpacity
                                onPress={
                                    () => swipeRef.current.swipeLeft()
                                } style={[{ backgroundColor: '#cc0000' }, tw`p-3 mb-3 rounded-full `]}>
                                <Entypo name="cross" size={30} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={[{ backgroundColor: '#E89528' }, tw`p-3 mb-3 rounded-full `]}>
                                <AntDesign name="star" size={30} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={
                                    () => swipeRef.current.swipeRight()
                                } style={[{ backgroundColor: '#4CD964' }, tw`p-3 mb-3 rounded-full `]}>
                                <AntDesign name="heart" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Alt Card */}


            </View>


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
export default Feeds;
