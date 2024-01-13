import { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { styles } from '../Movies/styles';
import { ScreenLayout } from '../../components/ScreenLayout';
import { TvSerie } from '../../@types/cineItems';
import { useCineItem } from '../../hooks/useData';

export function TvSeries() {
  const { tvSeries } = useCineItem();
  const [search, setSearch] = useState('');
  const [filteredTvSeries, setFilteredTvSeries] = useState<TvSerie[]>([]);

  useEffect(() => {
    function filterTvSeries() {
      let tvSeriesData: TvSerie[] = [];

      for (let category of tvSeries) {
        tvSeriesData.push(...(category.data as TvSerie[]));
      }

      if (!search) {
        setFilteredTvSeries([]);
        return;
      }

      const updatedTvSeries = tvSeriesData.filter(tvSerie => {
        const lowerTitle = tvSerie.name!.trim().toLowerCase();

        return lowerTitle.includes(search.trim().toLowerCase());
      });

      setFilteredTvSeries(updatedTvSeries);
    }

    filterTvSeries();
  }, [search, tvSeries]);

  return (
    <ScreenLayout isLoading={!tvSeries.length}>
      <TextInput
        placeholder="Pesquise..."
        style={styles.searchInput}
        onChangeText={text => setSearch(text)}
      />
      {search.length > 0 ? (
        <FlatList
          data={filteredTvSeries}
          keyExtractor={(item, index) => item.id + index}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          ListEmptyComponent={
            <Text style={styles.listEmptyText}>Nenhuma série encontrada</Text>
          }
          renderItem={({ item }) => <ItemDisplay item={item} recommendation />}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {tvSeries.map(category => (
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
