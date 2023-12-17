import { RouteProp } from "@react-navigation/native"
import { MovieOrSerie } from "./movieOrSerie"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

export type AppRouteProps = {
  Movies: undefined
  Favorites: undefined
  TvSeries: undefined
  Details: { item: MovieOrSerie }
}

type DetailsScreenRouteProps = RouteProp<AppRouteProps, 'Details'>

type  DetailsScreenNavigationProp = BottomTabNavigationProp<
  AppRouteProps,
  'Details'
>;

export type TDetailsProps = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProps;
};