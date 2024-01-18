import { RouteProp } from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { AppRouteProps } from '../@types/navigationTypes';

import { Movies } from '../screens/Movies';
import { Details } from '../screens/Details';
import { TvSeries } from '../screens/Tv';
import { Favorites } from '../screens/Favorites';
import { Discover } from '../screens/Discover';
import {
  DiscoverIcon,
  FavoritesIcon,
  MoviesIcon,
  TvSeriesIcon,
} from '../components/AppRoutesIcons';
import { styles } from '../components/AppRoutesIcons/styles';

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
        tabBarInactiveTintColor: '#7b7b7bd9',
        tabBarStyle: {
          backgroundColor: '#1f1632',
          paddingTop: 15,
          marginBottom: 5,
        },
      }}>
      <Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: MoviesIcon,
          tabBarLabel: 'Filmes',
          tabBarLabelStyle: styles.labelStyle,
        }}
      />
      <Screen
        name="TvSeries"
        component={TvSeries}
        options={{
          tabBarLabel: 'Series',
          tabBarLabelStyle: styles.labelStyle,
          tabBarIcon: TvSeriesIcon,
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarLabelStyle: styles.labelStyle,
          tabBarIcon: FavoritesIcon,
        }}
      />
      <Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Descobrir',
          tabBarLabelStyle: styles.labelStyle,
          tabBarIcon: DiscoverIcon,
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
