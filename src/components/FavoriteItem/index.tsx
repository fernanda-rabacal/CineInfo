import { styles } from './styles';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Calendar,
  Clock,
  FilmStrip,
  Star,
  VideoCamera,
} from 'phosphor-react-native';

export function FavoriteItem({ item }) {
  const navigation = useNavigation();
  const formattedDate = new Date(
    item.release_date || item.first_air_date,
  ).getFullYear();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Details', { item })}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      />

      <View>
        <Text style={styles.title}>{item.name || item.title}</Text>

        <View style={styles.dataContainer}>
          <Star color="#d7a500" size={20} />
          <Text style={styles.text}>{item.vote_average.toFixed(1)}</Text>
        </View>
        {item.runtime && (
          <View style={styles.dataContainer}>
            <Clock color="#ccc" size={18} />
            <Text style={styles.text}>{item.runtime} minutos</Text>
          </View>
        )}
        {item.seasons && (
          <View style={styles.dataContainer}>
            <VideoCamera color="#ccc" size={20} />
            <Text style={styles.text}>{item.seasons.length} Temporadas</Text>
          </View>
        )}
        <View style={styles.dataContainer}>
          <FilmStrip color="#ccc" size={20} />
          <Text style={styles.text}>{item.genres[0].name}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Calendar color="#ccc" size={20} />
          <Text style={styles.text}>{formattedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
