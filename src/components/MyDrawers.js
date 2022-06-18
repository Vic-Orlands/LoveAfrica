import { View, Text, StatusBar, SafeAreaView, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import splash from '../../assets/splash.png';
import { Entypo, EvilIcons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import ActionButton from './ActionButton';

const MyDrawers = (props) => {

  const navigation = useNavigation();

  const UsableCard = ({ theText, theIcon, goTo }) => {
    return (
      <TouchableOpacity style={tw`w-full flex flex-row bg-gray-200 rounded-lg mt-3 `} onPress={goTo}>
        <View style={tw`p-3  flex flex-row items-center justify-center w-full`} >

          <View style={tw` w-full flex flex-row items-center justify-center  `}>
            <View style={tw`w-3/4 flex`}>
              <Text style={[{ fontFamily: 'Bold' }, tw` text-base `]}>
                {theText}
              </Text>
            </View>
            <View style={tw`w-1/4  flex  items-end   `}>
              {theIcon}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Pressable
          onPress={() => navigation.closeDrawer()}
          style={tw`pl-8 pt-1`}
        >
          <EvilIcons name="close" size={40} color="black" />
        </Pressable>
      </View> */}
      <DrawerContentScrollView {...props} style={{ marginTop: -30 }}>
        <View style={tw`w-full flex items-center justify-center`}>
          <View style={[{ borderRadius: 40, }, tw`flex rounded-full border border-gray-200 p-1`]}>
            <View style={[{ height: 80, width: 80, borderRadius: 40, }, tw`flex rounded-full border border-gray-200`]}>
              <Image source={splash} style={[{ height: 80, width: 80, borderRadius: 40 }, tw`border border-2 p-6 `]} />
            </View>
          </View>
          <View style={tw`flex-row mt-1`}>
            <Entypo name="info-with-circle" size={20} color="#cc0000" />
            <Text style={[{ fontFamily: 'Bold' }, tw`pl-2 text-base`]}>
              Fullname Here, Age
            </Text>
          </View>
          <Text style={[{ fontFamily: 'Regular' }, tw`text-sm`]}>
            Not Verified
          </Text>
        </View>

        <View style={tw`px-4`}>



          <UsableCard theIcon={<FontAwesome5 name="user-edit" size={26} color="#CC0000" />} theText="Edit Profile" goTo={() => navigation.navigate('EditProfile')} />
          <UsableCard theIcon={<MaterialCommunityIcons name="party-popper" size={28} color="#CC0000" />} theText="Explore"
          // goTo={() => navigation.navigate('Messages')} 
          />
          <UsableCard theIcon={<MaterialIcons name="verified" size={28} color="#cc0000" />} theText="Verify your Account"
          // goTo={() => navigation.navigate('Messages')}
          />
          <UsableCard theIcon={<FontAwesome5 name="user-cog" size={26} color="#CC0000" />} theText="Settings" goTo={() => navigation.navigate('SettingInfo')} />
          <UsableCard theIcon={<FontAwesome5 name="ad" size={28} color="#CC0000" />} theText="My Ad Preference"
          // goTo={() => navigation.navigate('Messages')} 
          />
          <UsableCard theIcon={<MaterialIcons name="support" size={28} color="#CC0000" />} theText="Help & Support"
            goTo={() => navigation.navigate('SettingInfo')}
          />

        </View>

      </DrawerContentScrollView>
      <View style={[{ bottom: 0 }, tw`px-4 pb-3`]}>
        <ActionButton InfoText='Log Out' InfoIcon={<SimpleLineIcons name="logout" size={24} color="white" />} />

      </View>


    </SafeAreaView>
  )
}


// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
});



export default MyDrawers;