import { styles } from './styles';
import { useState } from 'react';
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
import { useDetailsController } from './useDetailsController';

export function Details({ navigation, route }) {
  const { itemId, isMovie } = route.params;
  const {
    itemDetails,
    isFavorited,
    isLoading,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useDetailsController(itemId, isMovie);
  const [modalTrailerVisible, setModalTrailerVisible] = useState(false);

  return (
    <ScreenLayout isLoading={isLoading} style={styles.container}>
      {itemDetails?.trailerKey && (
        <TrailerVideo
          trailerKey={itemDetails.trailerKey}
          visible={modalTrailerVisible}
          onChangeVisible={setModalTrailerVisible}
        />
      )}

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <CaretLeft color="#fff" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${itemDetails?.backdrop_path}`,
          }}
        />
        <Text style={styles.title}>
          {itemDetails?.title || itemDetails?.name}
        </Text>
        {itemDetails?.trailerKey && (
          <TouchableOpacity
            style={styles.trailerBtnContainer}
            onPress={() => setModalTrailerVisible(true)}>
            <PlayCircle color="#ffffff" size={28} />
            <Text style={{ fontSize: 20, color: 'white' }}>Trailer</Text>
          </TouchableOpacity>
        )}
        <View style={styles.timeAndVoteContainer}>
          {itemDetails?.runtime && (
            <View style={styles.dataContainer}>
              <Clock color="#ccc" size={17} />
              <Text style={styles.text}>{itemDetails.runtime} minutos</Text>
            </View>
          )}
          {itemDetails?.number_of_seasons && (
            <View>
              <Text style={styles.text}>
                {itemDetails.number_of_seasons} Temporadas
              </Text>
            </View>
          )}
          <View style={styles.dataContainer}>
            <Star color="#ffb42a" size={17} />
            <Text style={styles.text}>
              {itemDetails?.vote_average && itemDetails.vote_average.toFixed(1)}
            </Text>
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
            <Text style={styles.text}>{itemDetails?.formattedReleaseDate}</Text>
          </View>
          <View>
            <Text style={styles.releaseAndGenreTitle}>Gêneros</Text>
            <View style={styles.dataContainer}>
              {itemDetails?.genres &&
                itemDetails.genres
                  .filter((_, i) => i <= 2)
                  .map(genre => (
                    <Text style={styles.genreName} key={genre.id}>
                      {genre.name}
                    </Text>
                  ))}
            </View>
          </View>
        </View>
        <Text style={styles.overview}>{itemDetails?.overview}</Text>

        {itemDetails?.recommendations &&
          itemDetails.recommendations.length > 0 && (
            <>
              <Text style={styles.recommendationsTitle}>
                Conteúdos semelhantes
              </Text>
              <View style={styles.recommendations}>
                {itemDetails?.recommendations.map(recommedation => (
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
