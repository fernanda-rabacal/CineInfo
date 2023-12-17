import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RouterTabs } from './src/routes/routerTabs';
import { FavoritesContextProvider } from './src/contexts/FavoritesContext';

export default function App() {
  return (
    <NavigationContainer>
      <FavoritesContextProvider>
        <RouterTabs />
      </FavoritesContextProvider>
      <StatusBar 
        style="light" 
        backgroundColor='black' 
        />
    </NavigationContainer>
  );
}

