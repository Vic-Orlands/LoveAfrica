
import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splashscreen from './src/screens/Splashscreen';
import HomeScreen from './src/screens/HomeScreen';
import Loading from './src/components/Loading';
import Load from './src/components/Load';
import Onboarding from './src/screens/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Recover from './src/screens/accountRecovery/Recover';
import EmailRecover from './src/screens/accountRecovery/EmailRecover';
import EmailSent from './src/screens/accountRecovery/EmailSent';
import Phone from './src/screens/Reigister/Phone';
import PhoneNumber from './src/screens/Reigister/PhoneNumber';
import MobileVerification from './src/screens/Reigister/MobileVerification';
const Stack = createNativeStackNavigator();

// const [isAppLaunched, setisAppLaunched] = useState(null);
// useEffect(async() => {
//   const appData = await AsyncStorage.getItem('isApLaunched');

//   if (appData == null) {
//     setisAppLaunched(true);
//     AsyncStorage.setItem('isApLaunched', 'false');
//   } else {
//     setisAppLaunched(false);
//   }
// }, []);


// create a component
const Pages = () => {
  return (

    // isAppLaunched != null && (
    <Stack.Navigator initialRouteName="Onboarding">
      {/* {isAppLaunched && ( */}
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: " ", headerShown: false }} />
      {/* )}  */}
      <Stack.Screen name="Loading" component={Loading} options={{ title: " ", headerShown: false }} />

      <Stack.Screen name="Load" component={Load} options={{ title: " ", headerShown: false }} />

      <Stack.Screen name="Home" component={HomeScreen} options={{ title: " ", headerShown: false }} />

      <Stack.Screen name="Splashscreen" component={Splashscreen} />

      <Stack.Screen name="RecoverScreen" component={Recover} options={{ title: " " }} />
      <Stack.Screen name="EmailRecover" component={EmailRecover} options={{ title: " " }} />
      <Stack.Screen name="EmailSent" component={EmailSent} options={{ title: " " }} />
      <Stack.Screen name="Phone" component={Phone} options={{ title: " " }} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ title: " " }} />
      <Stack.Screen name="MobileVerification" component={MobileVerification} options={{ title: " " }} />
      
    </Stack.Navigator>
  )
  // )
}


export default Pages;
