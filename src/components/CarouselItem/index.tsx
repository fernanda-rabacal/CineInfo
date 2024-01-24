import {
  TouchableOpacityProps,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';

interface CarouselItemProps extends TouchableOpacityProps {
  posterPath: string;
  itemId: string;
  isMovie: boolean;
  title: string;
}

export function CarouselItem({
  posterPath,
  title,
  itemId,
  isMovie,
  ...rest
}: CarouselItemProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
      onPress={() => navigation.navigate('Details', { itemId, isMovie })}>
      <LinearGradient
        colors={['#49494900', '#000000d2']}
        style={{ height: '100%', width: '100%' }}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
