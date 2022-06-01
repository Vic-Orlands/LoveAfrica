//import liraries
import React from 'react';
import { View, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import footerJpeg from '../../assets/footer.png';



const FooterImg = () => {
  return (
    <View style={tw`flex items-center pl-2 justify-center content-center`}>
      <Image source={footerJpeg} style={{ width: 100, height: 30, resizeMode: 'contain' }} />
    </View>
  );
};



export default FooterImg;
