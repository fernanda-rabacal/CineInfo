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

function addCategoryToItems(items: (Movie | TvSerie)[], categoryId: number) {
  return items.map(item => {
    return { ...item, category_id: categoryId };
  });
}

export const CineItemContext = createContext({} as CineItemContextProps);

export function CineItemContextProvider({ children }) {
  const [movies, setMovies] = useState<CategoriesList[]>([]);
  const [tvSeries, setTvSeries] = useState<CategoriesList[]>([]);
  const [cineItems, setCineItems] = useState<(Movie | TvSerie)[]>([]);
  const [page, setPage] = useState(1);

  async function getMovies() {
    const popularData = api.get(`/movie/popular?page=${page}`);
    const upcomingData = api.get(`/movie/upcoming?page=${page}`);
    const nowPlayingData = api.get(`/movie/now_playing?page=${page}`);
    const topRatedData = api.get(`/movie/top_rated?page=${page}`);

    await Promise.all([
      popularData,
      upcomingData,
      nowPlayingData,
      topRatedData,
    ]).then(values => {
      const popular = addCategoryToItems(values[0].data.results, 2);
      const upcoming = addCategoryToItems(values[1].data.results, 4);
      const nowPlaying = addCategoryToItems(values[2].data.results, 6);
      const topRated = addCategoryToItems(values[3].data.results, 3);

      setMovies([
        {
          name: 'Populares',
          data: popular,
        },
        {
          name: 'Lançamentos',
          data: upcoming,
        },
        {
          name: 'Mais Recentes',
          data: nowPlaying,
        },
        {
          name: 'Bem Avaliados',
          data: topRated,
        },
      ]);
    });
  }

  async function getTvSeries() {
    const popularData = api.get(`/tv/popular?page=${page}`);
    const topRatedData = api.get(`/tv/top_rated?page=${page}`);
    const airingTodayData = api.get(`/tv/airing_today?page=${page}`);
    const onTheAirData = api.get(`/tv/on_the_air?page=${page}`);

    await Promise.all([
      popularData,
      topRatedData,
      airingTodayData,
      onTheAirData,
    ]).then(values => {
      const popular = addCategoryToItems(values[0].data.results, 2);
      const topRated = addCategoryToItems(values[1].data.results, 3);
      const airingToday = addCategoryToItems(values[2].data.results, 4);
      const onTheAir = addCategoryToItems(values[3].data.results, 5);

      setTvSeries([
        {
          name: 'Populares',
          data: popular,
        },
        {
          name: 'Lançamentos',
          data: airingToday,
        },
        {
          name: 'No Ar Agora',
          data: onTheAir,
        },
        {
          name: 'Bem Avaliados',
          data: topRated,
        },
      ]);
    });
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
  }, [page]);

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
