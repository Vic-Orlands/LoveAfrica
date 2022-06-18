
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
import SettingInfo from './src/screens/Home/settings/SettingInfo';
import Likes from './src/screens/Home/Likes';
import Chat from './src/screens/Home/Chat';
import Gifted from './src/screens/Home/Gifted';
import ChatStarter from './src/screens/Home/ChatStarter';
import EditProfile from './src/screens/Home/settings/EditProfile';
import ProfileInfo from './src/screens/Home/ProfileInfo';
import Facebook from './src/screens/Home/Facebook';


import Drawers from './src/Drawers';
import MyDrawers from './src/components/MyDrawers';



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


const Drawer = createDrawerNavigator();

function DrawersRoutes() {
  return (
    <Drawer.Navigator swipeEnabled
      drawerContent={(props) => <MyDrawers {...props} />}
      options={{
        headerShown: false,
      }}
    >

      <Drawer.Screen name="Feeds" component={Feeds} options={{ headerShown: false }} />
      <Drawer.Screen name="Likes" component={Likes} options={{ headerShown: false }} />
      <Drawer.Screen name="Messages" component={Messages} options={{ headerShown: false }} />

    </Drawer.Navigator>
  );
}


const Pages = () => {
  return (

    // isAppLaunched != null && (
    <Stack.Navigator initialRouteName="Onboarding">
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
      <Stack.Screen name="NameInput" component={NameInput} options={{ title: "" }} />
      <Stack.Screen name="DobInput" component={DobInput} options={{ title: "" }} />
      <Stack.Screen name="Gender" component={Gender} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="InterestedIn" component={InterestedIn} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="ChoosePhoto" component={ChoosePhoto} options={{ title: "LoveAfrica" }} />
      <Stack.Screen name="AlmostDone" component={AlmostDone} options={{ headerShown: false }} />
      <Stack.Screen name="Passion" component={Passion} options={{ title: "" }} />

      <Stack.Screen name="Drawers" component={DrawersRoutes} options={{ headerShown: false }} />
      
      <Stack.Screen name="Feeds" component={Feeds} options={{ headerShown: false }} />
      <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
      <Stack.Screen name="SettingInfo" component={SettingInfo} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Likes" component={Likes} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Gifted" component={Gifted} options={{ headerShown: false }} /> */}
      <Stack.Screen name="ChatStarter" component={ChatStarter} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Facebook" component={Facebook} options={{ title: "Facebook" }} /> */}

    </Stack.Navigator>
  )
  // )
}


export default Pages;
