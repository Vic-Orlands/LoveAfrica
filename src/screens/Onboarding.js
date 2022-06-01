import React, { useRef, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Button, Image, StyleSheet , SafeAreaView, Text, View,  FlatList, TouchableOpacity, Dimensions} from 'react-native' 
import slideOne from '../../assets/onboardone.png';
import slideTwo from '../../assets/onboardtwo.png';

const {width, height} = Dimensions.get('window');
const whitish = { white: '#fff' };
const slides = [
    {
        id: 1,
        image: slideOne,
        caption: <Text>Make connections with people around the world and get matched with like-minded individuals. <Text style={[tw`pt-4`,{fontWeight:'bold'}]}>Dare to meet your match.</Text></Text>,
    },
    {
        id: 2,
        image: slideTwo,
        caption: 'Use the Chat Starter to engage with your matches. It is a great way to test compatability and learn about each other', 
    },
];



const Slide = ({ item }) => {
    return (
        <SafeAreaView style={tw`flex justify-center items-center`}>
            <Image 
                source={item.image} 
                style={{ height: '75%', width, resizeMode: 'contain' }} />
            <View style={[tw`text-white text-2xl font-bold mt-4 text-center`, { fontSize: '3rem', color: 'white' }]}>
                <Text style={[tw`max-w-xs px-4`,{lineHeight: 25}]}> {item.caption}</Text>
            </View>
            
        </SafeAreaView>
    )
}
const Onboarding = ({ navigation }) => {

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const ref = useRef(null);
    const Footer = () => {
        return (
            <View style={{
                height: height * 0.25,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'center'
                }}>
                    {slides.map((_, index) => (
                        <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                            backgroundColor: '#CC0000',
                            width: 10,
                            height: 5,
                            borderRadius:50,
                        }]} />
                    ))}
                </View>
                <View style={{ marginBottom: 20 }}></View>
                {
                    currentSlideIndex == slides.length - 1
                        ?
                        <View style={{ height: 50 }}>
                            <TouchableOpacity style={[styles.btn]} onPress={() => navigation.replace('Home')}>
                                <Text style={tw`text-white font-bold text-xl`}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        :

                        <View style={{ height: 50 }}>
                            <TouchableOpacity onPress={nextSlide} style={[styles.btn]}>
                                <Text style={tw`text-white font-bold text-xl`}>Next</Text>
                            </TouchableOpacity>

                        </View>

                }



            </View>
        )
    };

    const updateSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const nextSlide = () => {
        const nextSlides = currentSlideIndex + 1;
        if (nextSlides != slides.length) {
            const offset = nextSlides * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlides);
        }
    };
    return (
        <SafeAreaView>
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateSlideIndex}
                data={slides}
                contentContainerStyle={{ height: height * 0.75 }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Slide item={item} />}
            />
            <Footer />
        </SafeAreaView>
    )
}


styles = StyleSheet.create({
    indicator: {
        height: 5,
        width: 5,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 5,
    },
    btn: {
        backgroundColor: '#CC0000',
        color: whitish.white, 
        borderRadius: 50,
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',

    }

});
export default Onboarding;