import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Pages from './Pages';
import Drawers from './src/screens/Home/Drawers';

export default function App() {
  return (
    <NavigationContainer>
      {/* <Drawers /> */}
      <Pages />
    </NavigationContainer>


  );
}

