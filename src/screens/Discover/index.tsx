import { FlatList, ScrollView, Text, View } from 'react-native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { useCineItem } from '../../hooks/useData';
import { styles } from './styles';
import { Select } from '../../components/Select';
import { categories, genres, types } from '../../data/filterCategories';
import { ItemDisplay } from '../../components/ItemPosterDisplay';

export function Discover() {
  const { cineItems } = useCineItem();

  return (
    <ScreenLayout isLoading={!cineItems.length}>
      <Text>Discover</Text>
      <View style={styles.selectContainer}>
        <Select title="Tipos" options={types} onChangeSelect={() => {}} />
        <Select title="Gêneros" options={genres} onChangeSelect={() => {}} />
        <Select
          title="Categorias"
          options={categories}
          onChangeSelect={() => {}}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}>
        {cineItems.map((item, index) => (
          <ItemDisplay key={item.id + index} item={item} recommendation />
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
