import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/routes';
import { FavoritesContextProvider } from './src/contexts/FavoritesContext';
import { CineItemContextProvider } from './src/contexts/CineItemContext';

export default function App() {
  return (
    <NavigationContainer>
      <CineItemContextProvider>
        <FavoritesContextProvider>
          <Router />
        </FavoritesContextProvider>
      </CineItemContextProvider>
      <StatusBar barStyle={'default'} translucent />
    </NavigationContainer>
  );
}
