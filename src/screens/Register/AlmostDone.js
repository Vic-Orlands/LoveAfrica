//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native';

// create a component
const AlmostDone = () => {

    const navigation = useNavigation();
    
    useEffect(() => {
        setTimeout(() => {
          navigation.navigate("Passion");
        }, 1000);
      });


    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate("Passion")}
            >
                <Text style={[{ fontFamily: 'Bold' },tw` text-2xl`]}>You're Almost Done</Text>
            </Pressable>
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
export default AlmostDone;
