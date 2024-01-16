import { styles } from './styles';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  CaretLeft,
  Check,
  Clock,
  PlayCircle,
  Plus,
  Star,
} from 'phosphor-react-native';

import { ScreenLayout } from '../../components/ScreenLayout';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { TrailerVideo } from '../../components/TrailerVideo';
import { DetailsProps } from '../../contexts/CineItemContext';
import { useFavorite } from '../../hooks/useFavorite';
import { useCineItem } from '../../hooks/useData';

export function Details({ navigation, route }) {
  const { itemId, isMovie } = route.params;
  const { favorites, addToFavorites, removeFromFavorites } = useFavorite();
  const { getDetails } = useCineItem();

  const [isFavorited, setIsFavorited] = useState(() => {
    const isFavorite = favorites.find(favorite => favorite.id === itemId);

    return !!isFavorite;
  });
  const [itemData, setItemData] = useState<DetailsProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [modalTrailerVisible, setModalTrailerVisible] = useState(false);

  function handleAddToFavorites() {
    addToFavorites(itemData);

    setIsFavorited(true);
  }

  function handleRemoveFromFavorites() {
    removeFromFavorites(itemId);

    setIsFavorited(false);
  }

  async function getItemsData() {
    const details = await getDetails(itemId, isMovie);

    setItemData(details);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getItemsData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId]),
  );

  if (!itemData) {
    return <></>;
  }

  return (
    <ScreenLayout isLoading={isLoading}>
      <TrailerVideo
        trailerKey={itemData.trailerKey}
        visible={modalTrailerVisible}
        onChangeVisible={setModalTrailerVisible}
      />

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <CaretLeft color="#fff" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }}
        />
        <Text style={styles.title}>{itemData.title || itemData.name}</Text>
        {itemData.trailerKey && (
          <TouchableOpacity
            style={styles.trailerBtnContainer}
            onPress={() => setModalTrailerVisible(true)}>
            <PlayCircle color="#ffffff" size={28} />
            <Text style={{ fontSize: 20, color: 'white' }}>Trailer</Text>
          </TouchableOpacity>
        )}
        <View style={styles.timeAndVoteContainer}>
          {itemData.runtime && (
            <View style={styles.dataContainer}>
              <Clock color="#ccc" size={17} />
              <Text style={styles.text}>{itemData.runtime} minutos</Text>
            </View>
          )}
          {itemData.number_of_seasons && (
            <View>
              <Text style={styles.text}>
                {itemData.number_of_seasons} Temporadas
              </Text>
            </View>
          )}
          <View style={styles.dataContainer}>
            <Star color="#ffb42a" size={17} />
            <Text style={styles.text}>{itemData.vote_average.toFixed(1)}</Text>
          </View>

          <TouchableOpacity
            onPress={
              isFavorited ? handleRemoveFromFavorites : handleAddToFavorites
            }
            style={{ marginEnd: 20 }}>
            {!isFavorited ? <Plus color="#fff" /> : <Check color="#fff" />}
          </TouchableOpacity>
        </View>
        <View style={styles.releaseAndGenreContainer}>
          <View style={{ width: '45%' }}>
            <Text style={styles.releaseAndGenreTitle}>Lançamento</Text>
            <Text style={styles.text}>{itemData.formattedReleaseDate}</Text>
          </View>
          <View>
            <Text style={styles.releaseAndGenreTitle}>Gêneros</Text>
            <View style={styles.dataContainer}>
              {itemData.genres &&
                itemData.genres
                  .filter((_, i) => i <= 2)
                  .map(genre => (
                    <Text style={styles.genreName} key={genre.id}>
                      {genre.name}
                    </Text>
                  ))}
            </View>
          </View>
        </View>
        <Text style={styles.overview}>{itemData.overview}</Text>

        {itemData.recommendations && itemData.recommendations.length > 0 && (
          <>
            <Text style={styles.recommendationsTitle}>
              Conteúdos semelhantes
            </Text>
            <View style={styles.recommendations}>
              {itemData.recommendations.map(recommedation => (
                <ItemDisplay
                  key={recommedation.id}
                  isMovie={!!recommedation.title}
                  posterPath={recommedation.poster_path}
                  itemId={recommedation.id}
                  recommendation
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
