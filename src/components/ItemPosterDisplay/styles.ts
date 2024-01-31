import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 175,
    borderRadius: 6,
    margin: 6,
  },
  title: {
    width: 150,
    fontSize: theme.FONT_SIZE.MD,
    color: theme.COLORS.WHITE,
    textAlign: 'center',
  },
});
