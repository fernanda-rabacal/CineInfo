export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Movies: undefined;
      Favorites: undefined;
      TvSeries: undefined;
      Discover: undefined;
      Details: { itemId: string; isMovie: boolean };
    }
  }
}
