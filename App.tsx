import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/routes';
import { CineItemContextProvider } from './src/contexts/CineItemContext';

export default function App() {
  return (
    <NavigationContainer>
      <CineItemContextProvider>
        <Router />
      </CineItemContextProvider>
      <StatusBar barStyle={'default'} translucent />
    </NavigationContainer>
  );
}
