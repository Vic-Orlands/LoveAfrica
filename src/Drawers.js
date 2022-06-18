//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

// create a component
const Drawers = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Drawers</Text>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
});

//make this component available to the app
export default Drawers;
