import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { ScreenLayout } from '../../components/ScreenLayout';
import { useCineItem } from '../../hooks/useData';
import { CustomCarousel } from '../../components/CustomCarousel';

export function Movies() {
  const { movies } = useCineItem();

  return (
    <ScreenLayout isLoading={!movies.length}>
      <CustomCarousel items={[...new Array(6)]} />

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
    </ScreenLayout>
  );
}
