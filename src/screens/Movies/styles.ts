import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  moviesContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  movieContainerTitle: {
    color: theme.COLORS.GRAY_100,
    fontSize: theme.FONT_SIZE.LG,
    fontFamily: theme.FONTS.TEXT,
    marginBottom: 5,
  },
});
