import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RouterTabs } from './src/routes/routerTabs';
import { FavoritesContextProvider } from './src/contexts/FavoritesContext';
import { CineItemContextProvider } from './src/contexts/CineItemContext';

export default function App() {
  return (
    <NavigationContainer>
      <CineItemContextProvider>
        <FavoritesContextProvider>
          <RouterTabs />
        </FavoritesContextProvider>
      </CineItemContextProvider>
      <StatusBar barStyle={'default'} translucent />
    </NavigationContainer>
  );
}
