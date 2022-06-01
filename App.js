import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Pages from './Pages';

export default function App() {
  return (
      <NavigationContainer>
        <Pages />
      </NavigationContainer>


  );
}

