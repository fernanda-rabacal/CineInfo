import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Movies } from '../screens/Movies';
import { Details } from '../screens/Details';
import { Compass, FilmStrip, MonitorPlay, Star } from 'phosphor-react-native';
import { TvSeries } from '../screens/Tv';
import { Favorites } from '../screens/Favorites';
import { RouteProp } from '@react-navigation/native';
import { AppRouteProps } from '../@types/navigationTypes';
import { Discover } from '../screens/Discover';

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRouteProps>;

export type AppScreensNavigationProps = {
  route: RouteProp<AppRouteProps>;
  navigation: AppNavigatorRoutesProps;
};

const { Navigator, Screen } = createBottomTabNavigator<AppRouteProps>();

export function RouterTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#787878',
        tabBarStyle: {
          backgroundColor: '#1f1632',
        },
      }}>
      <Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FilmStrip color={color} size={size} />
          ),
          tabBarLabel: 'Filmes',
        }}
      />
      <Screen
        name="TvSeries"
        component={TvSeries}
        options={{
          tabBarLabel: 'Series',
          tabBarIcon: ({ color, size }) => (
            <MonitorPlay color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Star color={color} size={size} />,
        }}
      />
      <Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Descobrir',
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Details"
        component={Details}
        options={{
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />
    </Navigator>
  );
}
