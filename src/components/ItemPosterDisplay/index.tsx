import { Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Movie, TvSerie } from '../../@types/cineItems';
import { memo } from 'react';

interface ItemDisplayProps extends TouchableOpacityProps {
  item: Movie | TvSerie;
  recommendation?: boolean;
}

export const ItemDisplay = memo(
  ({ item, recommendation = false, ...rest }: ItemDisplayProps) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { item })}
        {...rest}>
        <Image
          style={[
            styles.image,
            !recommendation && {
              width: 130,
              height: 200,
            },
          ]}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        />
      </TouchableOpacity>
    );
  },
);
