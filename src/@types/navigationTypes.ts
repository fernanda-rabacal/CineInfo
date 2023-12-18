import { MovieOrSerie } from "./movieOrSerie"

export type AppRouteProps = {
  Movies: undefined
  Favorites: undefined
  TvSeries: undefined
  Details: { item: MovieOrSerie }
}
