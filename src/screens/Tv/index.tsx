import { FlatList, ScrollView, Text, View } from 'react-native';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { styles } from '../Movies/styles';
import { ScreenLayout } from '../../components/ScreenLayout';
import { useCineItem } from '../../hooks/useData';
import { CustomCarousel } from '../../components/CustomCarousel';
import { getRandomDataForCarousel } from '../../utils/getRandomDataForCarousel';

export function TvSeries() {
  const { tvSeries } = useCineItem();

  const carouselItems = getRandomDataForCarousel(tvSeries);
  const isLoadingData = !tvSeries[0].data.length || !carouselItems.length;

  return (
    <ScreenLayout isLoading={isLoadingData}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomCarousel items={carouselItems} />
        {tvSeries.map(category => (
          <View key={category.name} style={styles.moviesContainer}>
            <Text style={styles.movieContainerTitle}>{category.name}</Text>
            <FlatList
              data={category.data}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ItemDisplay
                  isMovie={false}
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
