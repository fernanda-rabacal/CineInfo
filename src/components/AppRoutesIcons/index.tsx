import { Compass, FilmStrip, MonitorPlay, Star } from 'phosphor-react-native';

export function MoviesIcon({ color, size, focused }) {
  return (
    <FilmStrip
      color={color}
      size={size}
      weight={focused ? 'fill' : 'regular'}
    />
  );
}

export function TvSeriesIcon({ color, size, focused }) {
  return (
    <MonitorPlay
      color={color}
      size={size}
      weight={focused ? 'fill' : 'regular'}
    />
  );
}

export function FavoritesIcon({ color, size, focused }) {
  return (
    <Star color={color} size={size} weight={focused ? 'fill' : 'regular'} />
  );
}

export function DiscoverIcon({ color, size, focused }) {
  return (
    <Compass color={color} size={size} weight={focused ? 'fill' : 'regular'} />
  );
}
