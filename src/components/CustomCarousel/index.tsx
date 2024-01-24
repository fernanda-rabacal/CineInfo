import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import { CarouselItem } from '../CarouselItem';
import { styles } from './styles';

interface CustomCarouselProps {
  items: any[];
}

export function CustomCarousel({ items }: CustomCarouselProps) {
  const width = Dimensions.get('window').width;
  const carouselRef = useRef<ICarouselInstance>(null);
  const [index, setIndex] = useState(0);

  function handleIndex(newIndex: number) {
    setIndex(newIndex);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={230}
        autoPlay={true}
        vertical={false}
        data={items}
        scrollAnimationDuration={5000}
        renderItem={({ item }) => (
          <CarouselItem
            itemId={item.id}
            title={item.name || item.title}
            posterPath={item.backdrop_path}
            isMovie={!!item.title}
          />
        )}
        onSnapToItem={newIndex => handleIndex(newIndex)}
      />

      <AnimatedDotsCarousel
        length={items.length}
        currentIndex={index}
        maxIndicators={items.length}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          ...styles.activeDot,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          ...styles.inactiveDot,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
    </GestureHandlerRootView>
  );
}
