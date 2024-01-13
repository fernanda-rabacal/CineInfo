export interface CineItem {
  id: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  category_id: number;
  genre_ids?: number[];
  genres: {
    id: number;
    name: string;
  }[];
}

export interface Movie extends CineItem {
  title: string;
  release_date: string;
  runtime: number;
}

export interface TvSerie extends CineItem {
  name: string;
  first_air_date: string;
  number_of_seasons: number;
}
