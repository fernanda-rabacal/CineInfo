import { MovieOrSerie } from "./movieOrSerie"

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Movies: undefined
      Favorites: undefined
      TvSeries: undefined
      Details: { item: MovieOrSerie }
    }
  }
}
