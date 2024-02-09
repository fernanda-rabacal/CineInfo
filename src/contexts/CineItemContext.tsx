/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { Movie, TvSerie } from '../@types/cineItems';
import { api } from '../services/api';
import { movieCategories, tvSerieCategories } from '../data/categories';

enum CategoriesFilter {
  POPULAR = 2,
  TOP_RATED,
  UPCOMING,
  ON_THE_AIR,
  NOW_PLAYING,
}

export interface DetailsProps extends Movie, TvSerie {
  recommendations: (Movie & TvSerie)[];
  formattedReleaseDate: string;
  trailerKey: string;
}

interface CineItemContextProps {
  movies: CategoriesList[];
  tvSeries: CategoriesList[];
  cineItems: (Movie | TvSerie)[];
  isLoadingNewPage: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  getDiscoverElements: () => void;
  getDetails: (itemId: string, isMovie?: boolean) => Promise<DetailsProps>;
}

export interface CategoriesList {
  id: number;
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
  const [movies, setMovies] = useState<CategoriesList[]>(movieCategories);
  const [tvSeries, setTvSeries] = useState<CategoriesList[]>(tvSerieCategories);
  const [cineItems, setCineItems] = useState<(Movie | TvSerie)[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingNewPage, setIsLoadingNewPage] = useState(false);

  async function getMovies() {
    try {
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
        const popular = addCategoryToItems(
          values[0].data.results,
          CategoriesFilter.POPULAR,
        );
        const upcoming = addCategoryToItems(
          values[1].data.results,
          CategoriesFilter.UPCOMING,
        );
        const nowPlaying = addCategoryToItems(
          values[2].data.results,
          CategoriesFilter.NOW_PLAYING,
        );
        const topRated = addCategoryToItems(
          values[3].data.results,
          CategoriesFilter.TOP_RATED,
        );

        const moviesList = movies.map(categoryList => {
          const correctList =
            categoryList.id === 1
              ? popular
              : categoryList.id === 2
              ? upcoming
              : categoryList.id === 3
              ? nowPlaying
              : topRated;

          return {
            ...categoryList,
            data: [...categoryList.data, ...correctList],
          };
        });

        setMovies(moviesList);
      });
    } catch (error: any) {
      console.error('GET MOVIES ERROR: ', error.message);
    }
  }

  async function getTvSeries() {
    try {
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
        const popular = addCategoryToItems(
          values[0].data.results,
          CategoriesFilter.POPULAR,
        );
        const topRated = addCategoryToItems(
          values[1].data.results,
          CategoriesFilter.TOP_RATED,
        );
        const airingToday = addCategoryToItems(
          values[2].data.results,
          CategoriesFilter.UPCOMING,
        );
        const onTheAir = addCategoryToItems(
          values[3].data.results,
          CategoriesFilter.ON_THE_AIR,
        );

        const tvSeriesList = tvSeries.map(categoryList => {
          const correctList =
            categoryList.id === 1
              ? popular
              : categoryList.id === 2
              ? airingToday
              : categoryList.id === 3
              ? onTheAir
              : topRated;

          return {
            ...categoryList,
            data: [...categoryList.data, ...correctList],
          };
        });

        setTvSeries(tvSeriesList);
      });
    } catch (error: any) {
      console.error('GET TV SERIES ERROR: ', error.message);
    }
  }

  function getDiscoverElements() {
    let items: (Movie | TvSerie)[] = [];

    for (let category of movies) {
      items.push(...category.data);
    }

    for (let category of tvSeries) {
      items.push(...category.data);
    }

    setCineItems(items);
  }

  async function getDetails(itemId: string, isMovie = true) {
    try {
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
        recommendations: recommendations.data?.results || [],
        trailerKey: trailers.data.results[0]?.key || '',
      };

      return itemDetails;
    } catch (error: any) {
      console.error('ITEM DETAILS ERROR: ', error.message);
      return {};
    }
  }

  useEffect(() => {
    async function callFunctions() {
      setIsLoadingNewPage(true);

      await getMovies();
      await getTvSeries();

      setIsLoadingNewPage(false);
    }

    callFunctions();
  }, [page]);

  useEffect(() => {
    getDiscoverElements();
  }, [tvSeries]);

  return (
    <CineItemContext.Provider
      value={{
        movies,
        tvSeries,
        isLoadingNewPage,
        cineItems,
        getDetails,
        setPage,
        getDiscoverElements,
      }}>
      {children}
    </CineItemContext.Provider>
  );
}
