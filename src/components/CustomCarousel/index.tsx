import { Dimensions } from 'react-native';
import { Movie, TvSerie } from '../../@types/cineItems';
import { CarouselItem } from '../CarouselItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';

interface CarouselProps {
  items: (Movie & TvSerie)[];
}

export function CustomCarousel({ items }: CarouselProps) {
  const width = Dimensions.get('window').width;

  return (
    <GestureHandlerRootView style={{ marginBottom: 30 }}>
      <Carousel
        loop
        width={width}
        height={210}
        autoPlay={true}
        vertical={false}
        data={items}
        scrollAnimationDuration={3000}
        renderItem={({ item }) => (
          <CarouselItem
            itemId={'1'}
            title={'napoleão'}
            posterPath={'/f1AQhx6ZfGhPZFTVKgxG91PhEYc.jpg'}
            isMovie={true}
          />
        )}
      />
    </GestureHandlerRootView>
  );
}
