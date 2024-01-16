import styled from 'styled-components/native';

export const CarouselItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: 210px;
  position: relative;
`;

export const PosterImage = styled.Image`
  height: 210px;
`;

export const Title = styled.Text`
  position: absolute;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 20px;
  bottom: 5px;
  left: 10px;
`;
