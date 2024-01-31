import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  title: {
    color: theme.COLORS.WHITE,
    fontSize: theme.FONT_SIZE.XL,
    fontFamily: theme.FONTS.TITLE,
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 10,
    left: 15,
    zIndex: 100,
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
});
