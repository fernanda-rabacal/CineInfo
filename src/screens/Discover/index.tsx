import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Select } from '../../components/Select';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { categories, genres, types } from '../../data/filterCategories';
import { useCineItem } from '../../hooks/useData';

export function Discover() {
  const { cineItems } = useCineItem();

  const [selectedTypeId, setSelectedTypeId] = useState(1);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const filteredItems = cineItems.filter(item => {
    let hasGenre = true;
    let isFromSelectedType = true;
    let isFromSelectedCategory = true;

    if (selectedGenreId !== 1) {
      hasGenre = !!item.genre_ids.includes(selectedGenreId);
    }

    if (selectedTypeId !== 1) {
      isFromSelectedType =
        (selectedTypeId === 2 && !!item.title) ||
        (selectedTypeId === 3 && !!item.name);
    }

    if (selectedCategoryId !== 1) {
      isFromSelectedCategory = item.category_id === selectedCategoryId;
    }

    return hasGenre && isFromSelectedType && isFromSelectedCategory;
  });

  return (
    <ScreenLayout isLoading={!cineItems.length}>
      <Text>Discover</Text>
      <View style={styles.selectContainer}>
        <Select
          title="Tipos"
          options={types}
          onChangeSelect={setSelectedTypeId}
        />
        <Select
          title="Gêneros"
          options={genres}
          onChangeSelect={setSelectedGenreId}
        />
        <Select
          title="Categorias"
          options={categories}
          onChangeSelect={setSelectedCategoryId}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}>
        {filteredItems.map((item, index) => (
          <ItemDisplay key={item.id + index} item={item} recommendation />
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
