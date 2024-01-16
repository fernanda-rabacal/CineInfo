import { TouchableOpacityProps } from 'react-native';
import { CarouselItemContainer, PosterImage, Title } from './styles';
import { useNavigation } from '@react-navigation/native';

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
    <CarouselItemContainer
      {...rest}
      onPress={() => navigation.navigate('Details', { itemId, isMovie })}>
      <PosterImage source={{ uri: imageUrl }} />
      <Title>{title}</Title>
    </CarouselItemContainer>
  );
}
