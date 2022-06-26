import 'react-native-gesture-handler';
import Pages from './Pages';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native'
import React, { useState } from 'react';
import Load from './src/components/Load';
import Loading from './src/components/Loading';
import { AuthProvider } from './src/auth/useAuth';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreAllLogs()

export default function App() {
  let [fontsLoaded] = useFonts({
    'Bold': require('./assets/fonts/NexaBold.otf'),
    'Light': require('./assets/fonts/NexaLight.otf'),
    'Regular': require('./assets/fonts/NexaRegular.otf'),
  });
  const [LoadSplashTwo, setLoadSplashTwo] = useState(true);

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

