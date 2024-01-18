import { Compass, FilmStrip, MonitorPlay, Star } from 'phosphor-react-native';

export function MoviesIcon({ color, size }) {
  return <FilmStrip color={color} size={size} />;
}

export function TvSeriesIcon({ color, size }) {
  return <MonitorPlay color={color} size={size} />;
}

export function FavoritesIcon({ color, size }) {
  return <Star color={color} size={size} />;
}

export function DiscoverIcon({ color, size }) {
  return <Compass color={color} size={size} />;
}
