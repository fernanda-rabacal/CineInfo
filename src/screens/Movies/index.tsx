import { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from './styles';

import { Movie } from '../../@types/cineItems';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { ScreenLayout } from '../../components/ScreenLayout';
import { useCineItem } from '../../hooks/useData';

export function Movies() {
  const { movies } = useCineItem();
  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  function filterMovies() {
    let moviesData: Movie[] = [];

    for (let category of movies) {
      moviesData.push(...(category.data as Movie[]));
    }

    if (!search) {
      setFilteredMovies([]);
      return;
    }

    const updatedMovies = moviesData.filter(movie => {
      const lowerTitle = movie.title!.trim().toLowerCase();

      return lowerTitle.includes(search.trim().toLowerCase());
    });

    setFilteredMovies(updatedMovies);
  }

  useEffect(() => {
    filterMovies();
  }, [search]);

  return (
    <ScreenLayout isLoading={!movies.length}>
      <View style={styles.searchInput}>
        <MagnifyingGlass color="#dedede" size={20} />
        <TextInput
          placeholder="Pesquise..."
          style={{ flex: 1 }}
          onChangeText={text => setSearch(text)}
        />
      </View>

      {search.length > 0 ? (
        <FlatList
          data={filteredMovies}
          ListEmptyComponent={
            <Text style={styles.listEmptyText}>Nenhum filme encontrado</Text>
          }
          keyExtractor={(item, index) => item.id + index}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <ItemDisplay item={item} recommendation />}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {movies.map(category => (
            <View key={category.name} style={styles.moviesContainer}>
              <Text style={styles.movieContainerTitle}>{category.name}</Text>
              <FlatList
                data={category.data}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ItemDisplay item={item} />}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </ScreenLayout>
  );
}
