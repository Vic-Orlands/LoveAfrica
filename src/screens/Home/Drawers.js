//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import  {createDrawerNavigator}  from '@react-navigation/drawer';



function Feed() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
        </View>
    );
}

function Article() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Article Screen</Text>
        </View>
    );
}

// const Drawer = createDrawerNavigator();


// create a component
const Drawers = () => {

    return (
        <Drawer.Navigator useLegacyImplementation>
            <Drawer.Screen name="Feed" component={Feed} />
            <Drawer.Screen name="Article" component={Article} />
        </Drawer.Navigator>
      
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
export default Drawers;



 
