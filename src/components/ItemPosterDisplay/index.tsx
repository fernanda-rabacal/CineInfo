import { Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { memo } from 'react';

interface ItemDisplayProps extends TouchableOpacityProps {
  posterPath: string;
  itemId: string;
  isMovie: boolean;
  recommendation?: boolean;
}

export const ItemDisplay = memo(
  ({
    posterPath,
    itemId,
    isMovie,
    recommendation = false,
    ...rest
  }: ItemDisplayProps) => {
    const navigation = useNavigation();
    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { itemId, isMovie })}
        {...rest}>
        <Image
          style={[
            styles.image,
            !recommendation && {
              width: 130,
              height: 200,
            },
          ]}
          source={{ uri: imageUrl }}
        />
      </TouchableOpacity>
    );
  },
);
