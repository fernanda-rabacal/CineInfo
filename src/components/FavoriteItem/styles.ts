import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  poster: {
    width: 110,
    height: 160,
    borderRadius: 10,
  },
  title: {
    fontSize: theme.FONT_SIZE.XL,
    color: theme.COLORS.GRAY_200,
    marginBottom: 25,
  },
  text: {
    fontSize: theme.FONT_SIZE.MD,
    color: theme.COLORS.GRAY_200,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
});
