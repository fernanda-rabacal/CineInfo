import { Movie, TvSerie } from '../@types/cineItems';
import { CategoriesList } from '../contexts/CineItemContext';

export function getRandomDataForCarousel(array: CategoriesList[]) {
  const randomElements: (Movie & TvSerie)[] = [];

  for (let category of array) {
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * 20);
      //@ts-ignore
      randomElements.push(category.data[random]);
    }
  }

  return randomElements;
}
