import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Pages from './Pages';
import { AuthProvider } from './src/auth/useAuth';
import { useFonts } from 'expo-font';
import Loading from './src/components/Loading';
import Load from './src/components/Load';


export default function App() {

  let [fontsLoaded] = useFonts({
    'Bold': require('./assets/fonts/NexaBold.otf'),
    'Light': require('./assets/fonts/NexaLight.otf'),
    'Regular': require('./assets/fonts/NexaRegular.otf'),
  });

  const [LoadSplashTwo, setLoadSplashTwo] = useState(true);



  // if (!fontsLoaded) {
  //   <Loading />
  // }
  return (
    <>
      {!fontsLoaded ? <Loading /> :

        <NavigationContainer>
          <AuthProvider>
            <Pages />
          </AuthProvider>
        </NavigationContainer>
      }

    </>
  );
}

