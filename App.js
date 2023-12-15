import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/routes/router';
import { RouterTabs } from './src/routes/routerTabs';
 {/* componente que envolve as rotas */}

export default function App() {
  return (
    <NavigationContainer>
      <RouterTabs />
      <StatusBar 
        style="light" 
        backgroundColor='black' 
        />
    </NavigationContainer>
  );
}

