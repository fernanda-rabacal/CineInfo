import { createContext, useEffect, useState } from 'react';
import { Movie, TvSerie } from '../@types/cineItems';
import { api } from '../services/api';

export interface DetailsProps extends Movie, TvSerie {
  recommendations: (Movie | TvSerie)[];
  formattedReleaseDate: string;
  trailerKey: string;
}

interface CineItemContextProps {
  movies: CategoriesList[];
  tvSeries: CategoriesList[];
  cineItems: (Movie | TvSerie)[];
  getDetails: (itemId: number, isMovie?: boolean) => Promise<DetailsProps>;
}

interface CategoriesList {
  name: string;
  data: (Movie | TvSerie)[];
}

export const CineItemContext = createContext({} as CineItemContextProps);

export function CineItemContextProvider({ children }) {
  const [movies, setMovies] = useState<CategoriesList[]>([]);
  const [tvSeries, setTvSeries] = useState<CategoriesList[]>([]);
  const [cineItems, setCineItems] = useState<(Movie | TvSerie)[]>([]);

  async function getMovies() {
    const popularData = await api.get('/movie/popular');
    const upcomingData = await api.get('/movie/upcoming');
    const nowPlayingData = await api.get('/movie/now_playing');
    const topRatedData = await api.get('/movie/top_rated');

    setMovies([
      {
        name: 'Populares',
        data: popularData.data.results,
      },
      {
        name: 'Lançamentos',
        data: upcomingData.data.results,
      },
      {
        name: 'Mais Recentes',
        data: nowPlayingData.data.results,
      },
      {
        name: 'Bem Avaliados',
        data: topRatedData.data.results,
      },
    ]);
  }

  async function getTvSeries() {
    const popularData = await api.get('/tv/popular');
    const topRatedData = await api.get('/tv/top_rated');
    const airingTodayData = await api.get('/tv/airing_today');
    const onTheAirData = await api.get('/tv/on_the_air');

    setTvSeries([
      {
        name: 'Populares',
        data: popularData.data.results,
      },
      {
        name: 'Lançamentos',
        data: airingTodayData.data.results,
      },
      {
        name: 'No Ar Agora',
        data: onTheAirData.data.results,
      },
      {
        name: 'Bem Avaliados',
        data: topRatedData.data.results,
      },
    ]);
  }

  async function getAllItemsList() {
    let items: (Movie | TvSerie)[] = [];

    for (let category of movies) {
      items.push(...category.data);
    }

    for (let category of tvSeries) {
      items.push(...category.data);
    }

    setCineItems(items);
  }

  async function getDetails(itemId: number, isMovie = true) {
    const url = `/${isMovie ? 'movie' : 'tv'}/${itemId}`;

    const element = await api.get(url);
    const recommendations = await api.get(`${url}/recommendations`);
    const trailers = await api.get(`${url}/videos`);
    const formattedReleaseDate = new Date(
      element.data.release_date || element.data.first_air_date,
    ).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const itemDetails = {
      ...element.data,
      formattedReleaseDate,
      recommendations: recommendations.data.results,
      trailerKey: trailers.data.results[0].key || '',
    };

    return itemDetails;
  }

  useEffect(() => {
    async function callFunctions() {
      await getTvSeries();
      await getMovies();

      getAllItemsList();
    }

    callFunctions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CineItemContext.Provider
      value={{
        movies,
        tvSeries,
        getDetails,
        cineItems,
      }}>
      {children}
    </CineItemContext.Provider>
  );
}
