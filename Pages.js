
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
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
import Phone from './src/screens/Register/Phone';
import PhoneNumber from './src/screens/Register/PhoneNumber';
import MobileVerification from './src/screens/Register/MobileVerification';
import PhoneSuccess from './src/screens/Register/PhoneSuccess';
import EmailInput from './src/screens/Register/EmailInput';
import PasswordInput from './src/screens/Register/PasswordInput';
import NameInput from './src/screens/Register/NameInput';
import DobInput from './src/screens/Register/DobInput';
import Gender from './src/screens/Register/Gender';
import InterestedIn from './src/screens/Register/InterestedIn';
import ChoosePhoto from './src/screens/Register/ChoosePhoto';
import AlmostDone from './src/screens/Register/AlmostDone';
import Passion from './src/screens/Register/Passion';
import Feeds from './src/screens/Home/Feeds';
import Messages from './src/screens/Home/Messages';
import Drawers from './src/screens/Home/Drawers';
import SettingInfo from './src/screens/Home/settings/SettingInfo';
import Likes from './src/screens/Home/Likes';
import Chat from './src/screens/Home/Chat';
import Gifted from './src/screens/Home/Gifted';

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
    <Stack.Navigator initialRouteName="Messages">
      {/* {isAppLaunched && ( */}
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: "LoveAfrica", headerShown: false }} />
      {/* )}  */}
      <Stack.Screen name="Loading" component={Loading} options={{ title: "LoveAfrica", headerShown: false }} />

      <Stack.Screen name="Load" component={Load} options={{ title: "LoveAfrica", headerShown: false }} />

      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "LoveAfrica", headerShown: false }} />

      <Stack.Screen name="Splashscreen" component={Splashscreen} />

      <Stack.Screen name="RecoverScreen" component={Recover} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="EmailRecover" component={EmailRecover} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="EmailSent" component={EmailSent} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="Phone" component={Phone} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="MobileVerification" component={MobileVerification} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="PhoneSuccess" component={PhoneSuccess} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="EmailInput" component={EmailInput} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="PasswordInput" component={PasswordInput} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="NameInput" component={NameInput} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="DobInput" component={DobInput} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="Gender" component={Gender} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="InterestedIn" component={InterestedIn} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="ChoosePhoto" component={ChoosePhoto} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="AlmostDone" component={AlmostDone} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="Passion" component={Passion} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="Feeds" component={Feeds} options={{ title: " ", headerShown: false }} />
      <Stack.Screen name="Messages" component={Messages} options={{ title: " ", headerShown: false }} />
      {/* <Stack.Screen name="Drawers" component={Drawers} options={{ title: "Drawer" }} /> */}
      <Stack.Screen name="SettingInfo" component={SettingInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Likes" component={Likes} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Gifted" component={Gifted} options={{ headerShown: false }} /> */}

    </Stack.Navigator>
  )
  // )
}


export default Pages;
