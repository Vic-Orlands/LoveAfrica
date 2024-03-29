import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import Loading from './src/components/Loading';
import Load from './src/components/Load';
import Onboarding from './src/screens/Onboarding';
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
import ChatStarter from './src/screens/Home/ChatStarter';
import EditProfile from './src/screens/Home/settings/EditProfile';
import ProfileInfo from './src/screens/Home/ProfileInfo';
import MatchPage from './src/screens/Home/MatchPage';
import Login from './src/screens/Login/Login';

import MyDrawers from './src/components/MyDrawers';
import useAuth from './src/auth/useAuth';

import ChangePassword from './src/screens/Home/settings/changeDetails/ChangePassword';
import ChangePhoneNumber from './src/screens/Home/settings/changeDetails/ChangePhoneNumber';
import ChangeGender from './src/screens/Home/settings/changeDetails/ChangeGender';
import ChangeAge from './src/screens/Home/settings/changeDetails/ChangeAge';
import ChangeInterest from './src/screens/Home/settings/changeDetails/ChangeInterest';
import ChangeName from './src/screens/Home/settings/changeDetails/ChangeName';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// should only be called by the DrawersRoutes()
const LoggedInPages = () => {
	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen name="Feeds" component={Feeds} options={{ headerShown: false }} />
				<Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
				<Stack.Screen name="SettingInfo" component={SettingInfo} options={{ headerShown: false }} />
				<Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
				<Stack.Screen name="Likes" component={Likes} options={{ headerShown: false }} />
				<Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
				<Stack.Screen name="ChatStarter" component={ChatStarter} options={{ headerShown: false }} />
				<Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{ headerShown: false }} />

				{/* edit profile info */}
				<Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
				<Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} options={{ headerShown: false }} />
				<Stack.Screen name="ChangeGender" component={ChangeGender} options={{ headerShown: false }} />
				<Stack.Screen name="ChangeAge" component={ChangeAge} options={{ headerShown: false }} />
				<Stack.Screen name="ChangeInterest" component={ChangeInterest} options={{ headerShown: false }} />
				<Stack.Screen name="ChangeName" component={ChangeName} options={{ headerShown: false }} />

				{/* // for profile update */}
				<Stack.Screen name="DobInput" component={DobInput} options={{ title: '' }} />
				<Stack.Screen name="Gender" component={Gender} options={{ title: 'LoveAfrica' }} />
				<Stack.Screen name="InterestedIn" component={InterestedIn} options={{ title: 'LoveAfrica' }} />
				<Stack.Screen name="ChoosePhoto" component={ChoosePhoto} options={{ title: 'LoveAfrica' }} />
				<Stack.Screen name="AlmostDone" component={AlmostDone} options={{ headerShown: false }} />
				<Stack.Screen name="Passion" component={Passion} options={{ title: '' }} />
				<Stack.Screen name="Drawers" component={DrawersRoutes} options={{ headerShown: false }} />
			</Stack.Group>
			{/* // match screen */}
			<Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
				<Stack.Screen name="MatchScreen" component={MatchPage} options={{ headerShown: false }} />
			</Stack.Group>
		</Stack.Navigator>
	);
};

function DrawersRoutes() {
	return (
		<Drawer.Navigator
			swipeEnabled
			drawerContent={(props) => <MyDrawers {...props} />}
			options={{
				headerShown: false
			}}
		>
			<Drawer.Screen name="User" component={LoggedInPages} options={{ headerShown: false }} />
		</Drawer.Navigator>
	);
}

function OffLinePages() {
	const { isNewUser } = useAuth()

	return (
		<Stack.Navigator initialRouteName={!isNewUser ? 'Onboarding' : 'Home'}>
			<Stack.Screen
				name="Onboarding"
				component={Onboarding}
				options={{ title: 'LoveAfrica', headerShown: false }}
			/>
			<Stack.Screen name="Loading" component={Loading} options={{ title: 'LoveAfrica', headerShown: false }} />
			<Stack.Screen name="Load" component={Load} options={{ title: 'LoveAfrica', headerShown: false }} />
			<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'LoveAfrica', headerShown: false }} />

			<Stack.Screen name="RecoverScreen" component={Recover} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="EmailRecover" component={EmailRecover} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="EmailSent" component={EmailSent} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="Phone" component={Phone} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="MobileVerification" component={MobileVerification} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="PhoneSuccess" component={PhoneSuccess} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="EmailInput" component={EmailInput} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="PasswordInput" component={PasswordInput} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="NameInput" component={NameInput} options={{ title: '' }} />
			<Stack.Screen name="DobInput" component={DobInput} options={{ title: '' }} />
			<Stack.Screen name="Gender" component={Gender} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="InterestedIn" component={InterestedIn} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="ChoosePhoto" component={ChoosePhoto} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="AlmostDone" component={AlmostDone} options={{ headerShown: false }} />
			<Stack.Screen name="Passion" component={Passion} options={{ title: '' }} />
			<Stack.Screen name="Login" component={Login} options={{ title: 'LoveAfrica' }} />
			<Stack.Screen name="Drawers" component={DrawersRoutes} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

const MainPages = () => {
	const { user } = useAuth();

	return (
		<Stack.Navigator>
			{!user?.photoURL ? (
				<Stack.Screen name="LoggedOut" component={OffLinePages} options={{ headerShown: false }} />
			) : (
				<Stack.Screen name="LoggedIn" component={DrawersRoutes} options={{ headerShown: false }} />
			)}
		</Stack.Navigator>
	);
};

export default MainPages;
