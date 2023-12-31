import { Movie, TvSerie } from './cineItems';

export type AppRouteProps = {
  Movies: undefined;
  Favorites: undefined;
  TvSeries: undefined;
  Discover: undefined;
  Details: { item: Movie | TvSerie };
};
