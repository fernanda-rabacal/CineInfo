export interface MovieOrSerie {
  id: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  name?: string;
  title?: string;
  runtime?: number;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  genres?: {
    id: number;
    name: string;
  }[];
  seasons?: Array<object>

}