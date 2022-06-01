import { SafeAreaView,  Text, Image} from 'react-native'
import React from 'react'
import icon from '../../assets/splash.png'
import tw from 'tailwind-react-native-classnames'

const Loading = () => {
  return (
    <SafeAreaView  style={tw` h-full flex justify-center items-center` }>
        <Image source={icon} style={{width: 80, height: 85}} />
    </SafeAreaView>
  )
}



// define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
// });

export default Loading;