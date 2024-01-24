import { FlatList, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { ScreenLayout } from '../../components/ScreenLayout';
import { useCineItem } from '../../hooks/useData';
import { CustomCarousel } from '../../components/CustomCarousel';
import { getRandomDataForCarousel } from '../../utils/getRandomDataForCarousel';

export function Movies() {
  const { movies } = useCineItem();

  const carouselItems = getRandomDataForCarousel(movies);
  const isLoadingData = !movies[0].data.length || !carouselItems.length;

  return (
    <ScreenLayout isLoading={isLoadingData}>
      <ScrollView>
        <CustomCarousel items={carouselItems} />

        {movies.map(category => (
          <View key={category.name} style={styles.moviesContainer}>
            <Text style={styles.movieContainerTitle}>{category.name}</Text>
            <FlatList
              data={category.data}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ItemDisplay
                  isMovie={true}
                  posterPath={item.poster_path}
                  itemId={item.id}
                />
              )}
            />
          </View>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
