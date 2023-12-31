import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { RouterTabs } from './src/routes/routerTabs';
import { FavoritesContextProvider } from './src/contexts/FavoritesContext';
import { CineItemContextProvider } from './src/contexts/CineItemContext';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <CineItemContextProvider>
        <FavoritesContextProvider>
          <RouterTabs />
        </FavoritesContextProvider>
      </CineItemContextProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </NavigationContainer>
  );
}
